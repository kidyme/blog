import fs from "fs";
import { marked } from "marked";
import { log } from "../utils/logger";
const renderer = new marked.Renderer();

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
            <div><span class='copy-btn' onclick="copyToClipboard(this)">复制</span></div>
            <pre><code class="${language}">${escapeHTML(code)}</code></pre>
          </div>`;
};

const htmlFea = {
  func: {
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
  },
};

marked.setOptions({ renderer });

export function md2html(mdPath, htmlPath) {
  try {
    const data = fs.readFileSync(mdPath, "utf8");
    let html = marked(data);
    html += htmlFea.func.copy;
    fs.writeFileSync(htmlPath, html);
    log("trans successfully", "md2html");
    return true;
  } catch (err) {
    log(`trans err: ${err}`, "md2html");
    return false;
  }
}
