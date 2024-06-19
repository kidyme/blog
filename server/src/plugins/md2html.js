import fs from "fs";
import { marked } from "marked";
import { log } from "../utils/logger.js";
const renderer = new marked.Renderer();

const tags = [
  { tag: "heading", abbreviation: "h", special: true },
  { tag: "paragraph", abbreviation: "p" },
  { tag: "em", abbreviation: "em" },
  { tag: "strong", abbreviation: "str" },
  { tag: "link", abbreviation: "lnk" },
  { tag: "image", abbreviation: "img" },
  { tag: "code", abbreviation: "cd", special: true },
  { tag: "blockquote", abbreviation: "bq" },
  { tag: "list", abbreviation: "lst" },
  { tag: "listitem", abbreviation: "li" },
  { tag: "table", abbreviation: "tbl" },
  { tag: "tablerow", abbreviation: "tr" },
  { tag: "tablecell", abbreviation: "tc" },
  { tag: "hr", abbreviation: "hr" },
  { tag: "html", abbreviation: "html" },
];

tags.forEach((tag) => {
  if (tag.special) return;
  renderer[tag.tag] = function (...args) {
    const defaultRender = marked.Renderer.prototype[tag.tag].bind(this);
    let output = defaultRender(...args);
    output = output.replace(/<([^ >]+)/, `<$1 class="md-${tag.abbreviation}"`);
    return output;
  };
});

renderer.heading = (text, level) => {
  const tag = `h${level}`;
  return `<${tag} class="md-${tag}">${text}</${tag}>`;
};

renderer.code = function (code, language) {
  const escapeHTML = (str) => {
    const entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
    };
    return String(str).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
  };
  return `<div class="code-container">
            <div><span class='md-copy-btn' onclick="copyToClipboard(this)">复制</span></div>
            <pre><code class="md-code${
              language ? ` md-code-${language}` : ""
            }">${escapeHTML(code)}</code></pre>
          </div>`;
};

const funcs = {
  copy: `
    <script>
    function copyToClipboard(button) {
      const code = button.parentNode.querySelector('pre code').textContent;
      navigator.clipboard.writeText(code).then(() => {
      }).catch(err => {
      });
    }
    </script>
    `,
};

marked.setOptions({ renderer });

export function md2html(mdPath, htmlPath) {
  try {
    const data = fs.readFileSync(mdPath, "utf8");
    let html = marked(data);
    html += funcs.copy;
    fs.writeFileSync(htmlPath, html);
    log("trans successfully", "md2html");
    return true;
  } catch (err) {
    log(`trans err: ${err}`, "md2html");
    return false;
  }
}
