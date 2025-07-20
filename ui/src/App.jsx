import { useEffect, useState } from "react";
import "./App.css";
import HomeScreen from "./assets/home/HomeScreen.jsx";
import { useSystemInfoStore } from "./store/system-info-store.js";

function App() {
  const [activeScreen, setActiveScreen] = useState("home");

  useEffect(() => {
    const cleanup = useSystemInfoStore.getState().init();
    return cleanup;
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />;
      // Add other screens here as needed
      default:
        return <HomeScreen />;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;
