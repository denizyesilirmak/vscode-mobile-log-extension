const vscode = require("vscode");
const openWebview = require("./commands/openWebView");

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vslog.openWebview", openWebview)
  );
}

module.exports = { activate };
