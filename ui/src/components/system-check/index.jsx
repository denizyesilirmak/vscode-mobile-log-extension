import { useSystemInfoStore } from "../../store/system-info-store.js";
import "./styles.css";
import AndroidIcon from "../../assets/android.png";
import AppleIcon from "../../assets/iphone.png";
import ServerIcon from "../../assets/server.png";
import XcodeIcon from "../../assets/xcode.png";

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

  const CheckItem = ({ label, value, valueDisplay, icon }) => (
    <li>
      <img src={icon} alt={label} className="check-icon" />
      <div className="check-item-content">
        {label}:{" "}
        <span className="check-result">
          {valueDisplay || value || "Checking..."}
        </span>
      </div>
    </li>
  );

  console.log("simulatorDevices", simulatorDevices);

  return (
    <div className="system-check">
      <ul>
        <CheckItem
          icon={ServerIcon}
          label="Adb Installed"
          value={adbInstalled}
          valueDisplay={
            adbInstalled === true ? "Yes" : adbInstalled === false ? "No" : null
          }
        />
        <CheckItem
          icon={ServerIcon}
          label="Adb Version"
          value={adbVersion || "Unknown"}
        />
        <CheckItem
          icon={AndroidIcon}
          label="Adb Devices"
          value={adbDevices?.length || 0 || "Unknown"}
          valueDisplay={
            adbDevices?.length > 0
              ? `${adbDevices.length} Device${
                  adbDevices.length !== 1 ? "s" : ""
                } Connected`
              : null
          }
        />
        <CheckItem
          icon={XcodeIcon}
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
        <CheckItem
          icon={XcodeIcon}
          label="Xcode Version"
          value={xcodeVersion || "Unknown"}
        />
        <CheckItem
          icon={XcodeIcon}
          label="Xcode Command Line Tools"
          value={xcodeCLT}
          valueDisplay={
            xcodeCLT === true ? "Yes" : xcodeCLT === false ? "No" : null
          }
        />
        <CheckItem
          icon={AppleIcon}
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
