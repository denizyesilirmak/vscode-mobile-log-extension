const fetch = require("node-fetch").default;
const path = require("path");
const fs = require("fs");

async function getDevHtml(url) {
  const res = await fetch(url);
  let html = await res.text();
  return html.replace(
    /<head([^>]*)>/i,
    `<head$1><base href="${url}/">`
  );
}

function getProdHtml(extensionPath, panel) {
  const file = path.join(extensionPath, "ui", "dist", "index.html");
  let html = fs.readFileSync(file, "utf8");
  return html.replace(/(src|href)="(.+?)"/g, (_, attr, src) => {
    const asset = vscode.Uri.file(
      path.join(extensionPath, "ui", "dist", src)
    );
    return `${attr}="${panel.webview.asWebviewUri(asset)}"`;
  });
}

module.exports = { getDevHtml, getProdHtml };
