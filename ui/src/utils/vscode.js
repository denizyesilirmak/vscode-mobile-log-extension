let vscodeApi = null;

export function getVSCodeApi() {
  if (vscodeApi) {
    return vscodeApi;
  }
  if (typeof acquireVsCodeApi !== "function") {
    throw new Error("VSCode API is not available");
  }

  // eslint-disable-next-line no-undef
  vscodeApi = acquireVsCodeApi();
  return vscodeApi;
}
