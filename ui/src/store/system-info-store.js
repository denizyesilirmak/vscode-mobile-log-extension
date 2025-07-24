// src/systemInfoStore.js
import { create } from "zustand";
import { getVSCodeApi } from "../utils/vscode.js";

export const useSystemInfoStore = create((set, get) => {
  let interval;

  return {
    adbInstalled: null,
    adbVersion: null,
    adbDevices: null,
    xcodeInstalled: null,
    xcodeVersion: null,
    xcodeCLT: null,
    simulatorDevices: [],

    setAdbInstalled: (v) => set({ adbInstalled: v }),
    setAdbVersion: (v) => set({ adbVersion: v }),
    setAdbDevices: (v) => set({ adbDevices: v }),
    setXcodeInstalled: (v) => set({ xcodeInstalled: v }),
    setXcodeVersion: (v) => set({ xcodeVersion: v }),
    setXcodeCLT: (v) => set({ xcodeCLT: v }),
    setSimulatorDevices: (v) => set({ simulatorDevices: v }),

    init: () => {
      const vscode = getVSCodeApi();

      // Message handler
      const handler = (event) => {
        const msg = event.data;
        if (msg.command === "systemCheckResult") {
          const p = msg.payload;

          console.log("Received system check result:", p);

          set({
            adbInstalled: p.adbInstalled,
            adbVersion: p.adbVersion,
            adbDevices: p.adbDevices,
            xcodeInstalled: p.xcodeInstalled,
            xcodeVersion: p.xcodeVersion,
            xcodeCLT: p.xcodeCLT,
            simulatorDevices: p.simulators,
          });
        }
      };
      window.addEventListener("message", handler);

      // Kick off the polling
      interval = setInterval(() => {
        vscode.postMessage({ command: "requestSystemCheck" });
      }, 5000);

      // Also fire one immediately
      vscode.postMessage({ command: "requestSystemCheck" });

      // Cleanup on hot-reload or unmount
      return () => {
        window.removeEventListener("message", handler);
        clearInterval(interval);
      };
    },
  };
});

export const useAdbDevices = () => {
  const devices = useSystemInfoStore(state => state.adbDevices);
  return {
    devices,
    isLoading: devices === null,
  };
};
