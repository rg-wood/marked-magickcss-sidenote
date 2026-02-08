import type { TokenizerAndRendererExtension, TokenizerThis } from 'marked'
import type { Footnote, Footnotes, LexerTokens } from './types.js'

/**
 * Returns an extension object for parsing footnote definitions.
 */
export function createFootnote(lexer: LexerTokens) {
  const footnotes: Footnotes = {
    type: 'footnotes',
    raw: '',
    rawItems: [],
    items: []
  }

  return {
    name: 'footnote',
    level: 'block',
    childTokens: ['content'],
    tokenizer(this: TokenizerThis, src: string) {
      if (!lexer.hasFootnotes) {
        this.lexer.tokens.push(footnotes)

        // lexer.tokens = this.lexer.tokens
        lexer.hasFootnotes = true

        // always begin with empty items
        footnotes.rawItems = []
        footnotes.items = []
      }

      const match =
        /^\[\^([^\]\n]+)\]:(?:[ \t]+|[\n]*?|$)([^\n]*?(?:\n|$)(?:\n*?[ ]{4,}[^\n]*)*)/.exec(
          src
        )

      if (match) {
        const [raw, label, text = ''] = match
        let content = text.split('\n').reduce((acc, curr) => {
          return acc + '\n' + curr.replace(/^(?:[ ]{4}|[\t])/, '')
        }, '')

        const contentLastLine = content.trimEnd().split('\n').pop()

        content +=
          // add lines after list, blockquote, codefence, and table
          contentLastLine &&
          /^[ \t]*?[>\-*][ ]|[`]{3,}$|^[ \t]*?[|].+[|]$/.test(contentLastLine)
            ? '\n\n'
            : ''

        const token: Footnote = {
          type: 'footnote',
          raw,
          label,
          refs: [],
          content: this.lexer.blockTokens(content),
          text: content
        }

        lexer.footnotes.push(token)

        footnotes.rawItems.push(token)

        return token
      }
    },
    renderer() {
      return ''
    }
  } as TokenizerAndRendererExtension
}
