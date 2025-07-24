const panelManager = require("../webview/panelManager");

module.exports = async function openWebview() {
  return panelManager.createAndShow();
};
