import { useState } from "react";
import { marked } from "marked";

const defaultMarkdown = `Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`;

export const Markdown = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="markdown-container">
      <div className="markdown-header">
        <h2>Markdown Preview</h2>
        <button
          className="btn example-btn"
          onClick={() => setMarkdown(defaultMarkdown === markdown ? "" : defaultMarkdown)}
        >
          Example
        </button>
      </div>
      <div className="markdown-main">
        <textarea
          className="markdown-input"
          placeholder="Type your markdown here..."
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
        ></textarea>
        <div
          className="markdown-output"
          dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
        />
      </div>
    </div>
  );
};