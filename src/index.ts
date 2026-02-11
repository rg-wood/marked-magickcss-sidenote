import type { MarkedExtension } from 'marked'
import { createFootnote } from './footnote.js'
import { createFootnoteRef } from './references.js'
import { createFootnotes } from './footnotes.js'
import type { LexerTokens } from './types.js'

export default function markedFootnote(): MarkedExtension {
  const lexer: LexerTokens = { hasFootnotes: false, tokens: [], footnotes: [] }

  return {
    extensions: [
      createFootnote(lexer),
      createFootnoteRef(),
      createFootnotes()
    ],
    walkTokens(token) {
      if (
        token.type === 'footnotes' &&
        lexer.tokens.indexOf(token) === 0 &&
        token.items.length
      ) {
        lexer.tokens[0] = { type: 'space', raw: '' }
        lexer.tokens.push(token)
      }

      if (lexer.hasFootnotes) lexer.hasFootnotes = false
    }
  }
}

export type { Footnote, FootnoteRef, Footnotes } from './types.js'
