# VSLog - VS Code Extension

A powerful VS Code extension for monitoring and managing mobile development environments, providing real-time system checks and device management for Android emulators and iOS simulators.

## Features

- **System Environment Monitoring**: Real-time checks for development tools and their versions
- **Android Development Support**: 
  - ADB installation and version detection
  - Connected Android emulator discovery and management
- **iOS Development Support**:
  - Xcode installation and version detection
  - Command Line Tools verification
  - Active iOS simulator detection and management
- **Device Management**: Interactive device picker for both Android and iOS devices
- **Live Updates**: Automatic polling for device status changes

## Requirements

### For Android Development
- Android Debug Bridge (ADB) - part of Android SDK Platform Tools
- Android emulators running via Android Studio or command line

### For iOS Development (macOS only)
- Xcode
- Xcode Command Line Tools
- iOS Simulator

## Installation

1. Install the extension from the VS Code marketplace
2. Reload VS Code
3. Access VSLog through the Command Palette (`Cmd/Ctrl + Shift + P`) by typing "VSLog: Open Log View"

## Usage

### Opening VSLog
- Open Command Palette (`Cmd/Ctrl + Shift + P`)
- Type "VSLog: Open Log View"
- The extension will open in a new webview panel

### System Monitoring
The extension automatically monitors your development environment and displays:
- ADB installation status and version
- Number of connected Android devices/emulators
- Xcode installation status and version
- Xcode Command Line Tools status
- Number of active iOS simulators

### Device Selection
- Use the device picker dropdowns to select active Android emulators or iOS simulators
- The interface updates automatically when devices are connected or disconnected

## Development

### Project Structure
```
├── extension.js              # Main extension entry point
├── commands/                 # VS Code command implementations
├── webview/                  # Webview panel management
│   ├── panelManager.js      # Main webview panel logic
│   └── htmlLoader.js        # HTML loading for dev/prod modes
├── utils/                   # Utility functions
│   ├── system.js           # System checks and device detection
│   └── fetch.js            # Network utilities
└── ui/                     # React frontend
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── screens/        # Main application screens
    │   ├── store/          # State management (Zustand)
    │   └── utils/          # Frontend utilities
    └── package.json
```

### Building from Source

1. Clone the repository
```bash
git clone <repository-url>
cd vslog
```

2. Install dependencies
```bash
npm install
```

3. Development mode (with hot reload)
```bash
npm run dev
```

4. Production build
```bash
npm run prod
```

### Development Scripts
- `npm run ui:dev` - Start UI development server
- `npm run ui:build` - Build UI for production
- `npm run dev` - Run extension in development mode with hot reload
- `npm run prod` - Build and run extension in production mode

## Architecture

### Backend (Extension Host)
- **Extension Entry**: [`extension.js`](extension.js) - Main activation point
- **Commands**: [`commands/openWebView.js`](commands/openWebView.js) - VS Code command handlers
- **Panel Management**: [`webview/panelManager.js`](webview/panelManager.js) - Webview lifecycle management
- **System Utilities**: [`utils/system.js`](utils/system.js) - Device detection and system checks

### Frontend (React/Vite)
- **State Management**: Zustand stores for system info and general state
- **Components**: Modular React components for device picking and system status
- **Communication**: VS Code API integration for extension-webview messaging

### Communication Flow
1. Webview sends system check requests to extension
2. Extension executes system commands and device detection
3. Results are sent back to webview for display
4. Automatic polling ensures real-time updates

## API Reference

### System Check Commands
The extension monitors these system components:
- `checkAdbInstalled()` - Verifies ADB installation
- `getAdbVersion()` - Retrieves ADB version
- `getAdbDeviceList()` - Lists connected Android devices
- `checkXcodeInstalled()` - Verifies Xcode installation
- `checkXcodeVersion()` - Retrieves Xcode version
- `checkXcodeCommandLineTools()` - Verifies CLI tools
- `getSimulatorList()` - Lists active iOS simulators

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please use the GitHub issue tracker.