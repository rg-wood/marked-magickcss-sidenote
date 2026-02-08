# marked-magickcss-sidenote

A [marked](https://marked.js.org/) extension to to support [magick.css](https://css.winterveil.net/) sidenotes as [GFM footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes). Forked from [markdown-footnote](https://github.com/bent10/marked-extensions/tree/main/packages/footnote).

- [Install](#install)
- [Usage](#usage)
- [Limitations](#limitations)
- [License](#license)

## Install

You can install `marked-magickcss-sidenote` using npm or yarn:

```bash
npm i marked-magickcss-sidenote
# or
yarn add marked-magickcss-sidenote
```

## Usage

Say we have the following file `example.md`:

````md
# Example

[^1]: This is a footnote content.

Here is a simple footnote[^1]. With some additional text after it[^@#$%] and without disrupting the blocks[^bignote].

[^bignote]: The first paragraph of the definition.

    Paragraph two of the definition.

    > A blockquote with
    > multiple lines.

    ```
    a code block
    ```

    | Header 1 | Header 2 |
    | -------- | -------- |
    | Cell 1   | Cell 2   |

    A `final` paragraph before list.

    - Item 1
    - Item 2
      - Subitem 1
      - Subitem 2

[^@#$%]: A footnote on the label: "@#$%".
````

> **Note:** The position of a footnote in your Markdown does not influence
> where the footnote will be rendered. You can write a footnote right
> after your reference to the footnote, and the footnote will still render
> at the bottom of the Markdown.

And our module `example.js` looks as follows:

```js
import { readFileSync } from 'node:fs'
import { Marked } from 'marked'
import markedFootnote from 'marked-footnote'

const html = new Marked()
  .use(markedFootnote())
  .parse(readFileSync('example.md', 'utf8'))

console.log(html)
```

## Limitations

When considering the use of footnotes in your content, it's important to keep in mind the following accessibility and usability factors:

1. **Screen Reader Compatibility**: Screen readers may not effectively convey footnotes. They tend to read the footnote number without indicating that it's a footnote or using superscript. Additionally, they may not identify the link to the footnote text.
2. **Accessibility Challenges**: Footnotes pose challenges for all users on a web page. To access them, one often needs to scroll to the end of the page, read the footnote, and then click back to the main content. Not everyone is aware that they should click on the footnote at the end, potentially causing them to lose their place. Moreover, if the same footnote is repeated multiple times, clicking on the link could lead to the wrong location.

## License

![GitHub](https://img.shields.io/github/license/bent10/marked-extensions)

