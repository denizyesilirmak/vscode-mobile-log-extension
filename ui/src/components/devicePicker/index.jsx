import React from "react";
import "./styles.css";

const DevicePicker = ({ devices, selectedDevice, onDeviceChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (device) => {
        onDeviceChange(device);
        setIsOpen(false);
    };

    if (!devices || devices.length === 0) {
        return <div className="device-picker">No devices available</div>;
    }

    const getDeviceDisplayName = (device) => {
        return device ? `${device.name})` : "";
    };

    return (
        <div className={`device-picker ${isOpen ? "open" : ""}`}>
            <div className="device-picker__select" onClick={handleToggle}>
                {selectedDevice ? getDeviceDisplayName(selectedDevice) : "Select Device"}
            </div>

            <div className="device-picker__options">
                {devices.map((device) => (
                    <div
                        key={device.serial}
                        className={`device-picker__options-item ${
                            selectedDevice && device.serial === selectedDevice.serial ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(device)}
                    >
                        {getDeviceDisplayName(device)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DevicePicker;
