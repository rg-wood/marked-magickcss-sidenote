import type { RendererExtension, RendererThis } from 'marked'
import type { Footnotes } from './types.js'

/**
 * Returns an extension object for rendering the list of footnotes.
 */
export function createFootnotes() {
  return {
    name: 'footnotes',
    renderer(this: RendererThis) {
      return ""
    }
  } as RendererExtension
}
