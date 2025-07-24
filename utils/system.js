const { execSync } = require("child_process");

const checkAdbInstalled = () => {
  try {
    execSync("adb version", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
};

const getAdbDeviceList = () => {
  try {
    // First identify all emulator devices
    const command =
      "for serial in $(adb devices | awk 'NR>1&&$2==\"device\"&&$1~/^emulator-/ {print $1}'); do " +
      "avd=$(adb -s \"$serial\" emu avd name </dev/null 2>/dev/null | tr -d '\\r' | sed '/^OK$/d' | head -n1); " +
      "model=$(adb -s \"$serial\" shell getprop ro.product.model | tr -d '\\r'); " +
      'echo "${avd}#${serial}#${model}"; ' +
      "done";

    const output = execSync(command, { encoding: "utf-8", shell: "/bin/bash" });

    const parsedOutput = output
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [name, serial, model] = line.split("#");
        return { name, serial, model };
      });

    console.log("Parsed ADB Device List:", parsedOutput);

    return parsedOutput;
  } catch (error) {
    console.error("Error getting ADB device list:", error.message);
    return [];
  }
};

const getAdbVersion = () => {
  try {
    const output = execSync("adb version", { encoding: "utf-8" });
    const match = output.match(/Android Debug Bridge version (\d+\.\d+\.\d+)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};

const checkXcodeInstalled = () => {
  try {
    execSync("xcrun --version", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
};

const checkXcodeCommandLineTools = () => {
  try {
    execSync("xcode-select -p", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
};

const checkXcodeVersion = () => {
  try {
    const output = execSync("xcodebuild -version", { encoding: "utf8" });
    const firstLine = output.split("\n")[0];
    const match = firstLine.match(/Xcode\s+(\d+(?:\.\d+){1,2})/);

    return match ? match[1] : null;
  } catch (err) {
    console.error("Failed to check Xcode version:", err);
    return null;
  }
};

const getSimulatorList = () => {
  try {
    const output = execSync("xcrun simctl list devices", { encoding: "utf8" });
    const devices = output
      .split("\n")
      .filter((line) => line.includes("Booted"));
    return devices.map((device) => device.trim());
  } catch (error) {
    return [];
  }
};

module.exports = {
  checkAdbInstalled,
  getAdbDeviceList,
  getAdbVersion,
  checkXcodeInstalled,
  checkXcodeCommandLineTools,
  checkXcodeVersion,
  getSimulatorList,
};
