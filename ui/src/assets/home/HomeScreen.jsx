import { useState } from "react";
import DevicePicker from "../../components/devicePicker/index.jsx";
import SystemCheck from "../../components/system-check/index.jsx";
import { useAdbDevices } from "../../store/system-info-store.js";
import "./style.css";

const HomeScreen = () => {
  const { devices } = useAdbDevices();
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="home-screen">
      <h1>Welcome to VSLog</h1>
      <p>Your go-to tool for debugging mobile applications.</p>
      <SystemCheck />
      <DevicePicker
        devices={devices}
        selectedDevice={selectedDevice}
        onDeviceChange={setSelectedDevice}
      />
    </div>
  );
};

export default HomeScreen;
