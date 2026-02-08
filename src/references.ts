import type { TokenizerAndRendererExtension, TokenizerThis } from 'marked'
import type { FootnoteRef, Footnotes, LexerTokens } from './types.js'

export function createFootnoteRef(lexer: LexerTokens) {
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
        }

        return ref
      }
    },
    renderer(ref: FootnoteRef) {
      const footnote = lexer.footnotes[ref.index]
      return `
        <span class="sidenote-anchor"></span>
        <span class="sidenote">${footnote.text}</span>
      `
    }
  } as TokenizerAndRendererExtension
}
