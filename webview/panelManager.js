const vscode = require("vscode");
const { getDevHtml, getProdHtml } = require("./htmlLoader");
const system = require("../utils/system");
const isDev = process.env.NODE_ENV === "development";

async function createAndShow() {
  const panel = vscode.window.createWebviewPanel(
    "vslog", "VSLog", vscode.ViewColumn.One, { enableScripts: true }
  );

  // HTML yükle
  let html;
  if (isDev) {
    try {
      html = await getDevHtml("http://localhost:3000");
    } catch (e) {
      html = `<h1>Failed to load dev server</h1><p>${e.message}</p>`;
    }
  } else {
    html = getProdHtml(vscode.extensions.getExtension("your.id").extensionPath, panel);
  }
  panel.webview.html = html;

  // Mesaj dinleme
  panel.webview.onDidReceiveMessage(message => {
    if (message.command === "requestSystemCheck") {
      panel.webview.postMessage({
        command: "systemCheckResult",
        payload: {
          adbInstalled: system.checkAdbInstalled(),
          adbVersion: system.getAdbVersion(),
          adbDevices: system.getAdbDeviceList().length,
          xcodeInstalled: system.checkXcodeInstalled(),
          xcodeVersion: system.checkXcodeVersion(),
          xcodeCLT: system.checkXcodeCommandLineTools(),
          simulators: system.getSimulatorList(),
        },
      });
    }
  });
}

module.exports = { createAndShow };
