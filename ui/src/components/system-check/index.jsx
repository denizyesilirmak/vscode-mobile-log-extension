import { useSystemInfoStore } from "../../store/system-info-store.js";
import "./styles.css";

const SystemCheck = () => {
  const {
    adbInstalled,
    adbVersion,
    adbDevices,
    xcodeInstalled,
    xcodeVersion,
    xcodeCLT,
    simulatorDevices,
  } = useSystemInfoStore();

  const CheckItem = ({ label, value, valueDisplay }) => (
    <li>
      {label}:{" "}
      <span className="check-result">
        {valueDisplay || value || "Checking..."}
      </span>
    </li>
  );

  return (
    <div className="system-check">
      <h1>System Check</h1>
      <p>Ensure your environment is set up correctly for VSLog.</p>
      <ul>
        <CheckItem
          label="Adb Installed"
          value={adbInstalled}
          valueDisplay={
            adbInstalled === true ? "Yes" : adbInstalled === false ? "No" : null
          }
        />
        <CheckItem label="Adb Version" value={adbVersion || "Unknown"} />
        <CheckItem
          label="Adb Devices"
          value={adbDevices}
          valueDisplay={
            adbDevices !== null
              ? `${adbDevices} Device${adbDevices !== 1 ? "s" : ""} Connected`
              : null
          }
        />
        <CheckItem
          label="Xcode Installed"
          value={xcodeInstalled}
          valueDisplay={
            xcodeInstalled === true
              ? "Yes"
              : xcodeInstalled === false
              ? "No"
              : null
          }
        />
        <CheckItem label="Xcode Version" value={xcodeVersion || "Unknown"} />
        <CheckItem
          label="Xcode Command Line Tools"
          value={xcodeCLT}
          valueDisplay={
            xcodeCLT === true ? "Yes" : xcodeCLT === false ? "No" : null
          }
        />
        <CheckItem
          label="Simulator Devices"
          value={simulatorDevices}
          valueDisplay={
            simulatorDevices.length > 0
              ? `${simulatorDevices.length} Device${
                  simulatorDevices.length !== 1 ? "s" : ""
                } Found`
              : "No Simulators Found"
          }
        />
      </ul>
    </div>
  );
};

export default SystemCheck;
