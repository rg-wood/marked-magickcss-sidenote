import type { TokenizerAndRendererExtension, TokenizerThis } from 'marked'
import type { FootnoteRef, Footnotes, LexerTokens } from './types.js'

export function createFootnoteRef() {
  return {
    name: 'footnoteRef',
    level: 'inline',
    tokenizer(this: TokenizerThis, src: string) {
      const match = /^\[\^([^\]\n]+)\]/.exec(src)

      if (match) {
        const [raw, label] = match
        const footnotes = this.lexer.tokens[0] as Footnotes
        const filteredRawItems = footnotes.rawItems.filter(
          item => item.label === label
        )

        if (!filteredRawItems.length) return

        const rawFootnote = filteredRawItems[0]

        const ref: FootnoteRef = {
          type: 'footnoteRef',
          raw,
          index: rawFootnote.refs.length,
          footnote: rawFootnote
        }

        return ref
      }
    },
    renderer(ref: FootnoteRef) {
      return `
        <span class="sidenote-anchor"></span>
        <span class="sidenote">${ref.footnote.text}</span>
      `
    }
  } as TokenizerAndRendererExtension
}
