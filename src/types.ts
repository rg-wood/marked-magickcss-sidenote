import type { Token } from 'marked'

/**
 * Represents a collection of footnotes.
 */
export type Footnotes = {
  type: 'footnotes'
  raw: string
  rawItems: Footnote[]
  items: Footnote[]
}

/**
 * Represents a single footnote.
 */
export type Footnote = {
  type: 'footnote'
  raw: string
  label: string
  refs: FootnoteRef[]
  content: Token[],
  text: string
}

/**
 * Represents a reference to a footnote.
 */
export type FootnoteRef = {
  type: 'footnoteRef'
  raw: string
  index: number
}

export type LexerTokens = {
  hasFootnotes: boolean
  tokens: Token[]
  footnotes: Footnote[]
}
