const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const fetch = require("node-fetch").default;
const isDev = process.env.NODE_ENV === "development";
const systemUtils = require("./utils/system");

async function getDevHtml() {
  const url = "http://localhost:3000";
  const res = await fetch(url);
  let html = await res.text();

  // 1. Başlığa <base> etiketi enjekte et
  html = html.replace(
    /<head([^>]*)>/i,
    `<head$1>
  <base href="${url}/">`
  );

  return html;
}

async function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vslog.openWebview", async () => {
      console.log(
        "Opening VSLog webview...",
        isDev ? "Development mode" : "Production mode"
      );

      console.log("env:", process.env.NODE_ENV);

      const panel = vscode.window.createWebviewPanel(
        "vslog",
        "VSLog",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      let html;

      if (isDev) {
        try {
          html = await getDevHtml();
          console.log("Loading HTML content...", html);
        } catch (e) {
          html = `<html><body><h1>Failed to load dev server</h1><p>${e}</p></body></html>`;
        }
      } else {
        const file = path.join(
          context.extensionPath,
          "ui",
          "dist",
          "index.html"
        );
        html = fs.readFileSync(file, "utf8");
        html = html.replace(/(src|href)="(.+?)"/g, (_, attr, src) => {
          const asset = vscode.Uri.file(
            path.join(context.extensionPath, "ui", "dist", src)
          );
          return `${attr}="${panel.webview.asWebviewUri(asset)}"`;
        });
      }

      panel.webview.html = html;

      panel.webview.onDidReceiveMessage(async (message) => {

        const payload = {
          adbInstalled: systemUtils.checkAdbInstalled(),
          adbVersion: systemUtils.getAdbVersion(),
          adbDevices: systemUtils.getAdbDeviceList().length,
          xcodeInstalled: systemUtils.checkXcodeInstalled(),
          xcodeVersion: systemUtils.checkXcodeVersion(),
          xcodeCLT: systemUtils.checkXcodeCommandLineTools(),
          getSimulatorList: systemUtils.getSimulatorList(),
        }

        switch (message.command) {
          case "requestSystemCheck":
            // Gather system info and respond
            panel.webview.postMessage({
              command: "systemCheckResult",
              payload: {
                adbInstalled: payload.adbInstalled,
                adbVersion: payload.adbVersion,
                adbDevices: payload.adbDevices,
                xcodeInstalled: payload.xcodeInstalled,
                xcodeVersion: payload.xcodeVersion,
                xcodeCLT: payload.xcodeCLT,
                simulators: payload.getSimulatorList,
              },
            });
            break;
        }
      });
    })
  );
}

module.exports = { activate };
