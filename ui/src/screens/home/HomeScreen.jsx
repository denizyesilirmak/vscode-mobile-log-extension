import DevicePicker from "../../components/devicePicker/index.jsx";
import SystemCheck from "../../components/system-check/index.jsx";
import {
  useAdbDevices,
  useSimulatorDevices,
} from "../../store/system-info-store.js";
import "./style.css";
import { useSelectedEmulator, useSelectedSimulator } from "../../store/general-store.js";

const HomeScreen = () => {
  const { devices: emulatorDevices } = useAdbDevices();
  const { devices: simulatorDevices } = useSimulatorDevices();

  const { selectedEmulator, setSelectedEmulator } = useSelectedEmulator();
  const { selectedSimulator, setSelectedSimulator } = useSelectedSimulator();

  return (
    <div className="home-screen">
      <h1>Welcome to VSLog</h1>
      <SystemCheck />
      <div className="device-selection">
        <DevicePicker
          devices={emulatorDevices}
          selectedDevice={selectedEmulator}
          onDeviceChange={setSelectedEmulator}
        />
        <DevicePicker
          devices={simulatorDevices}
          selectedDevice={selectedSimulator}
          onDeviceChange={setSelectedSimulator}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
