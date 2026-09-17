import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import API from "./services/api";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(null);
  const [apod, setApod] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all APIs together
      const [weatherResponse, historyResponse, apodResponse] =
        await Promise.all([
          API.get("/space-weather"),
          API.get("/kp-history"),
          API.get("/apod"),
        ]);

      console.log("Weather:", weatherResponse.data);
      console.log("History:", historyResponse.data);
      console.log("APOD:", apodResponse.data);

      setWeather(weatherResponse.data);
      setHistory(historyResponse.data);
      setApod(apodResponse.data);

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "Failed to load space data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-background">
          <div className="loading-glow"></div>
          <div className="loading-grid"></div>
        </div>
        <motion.div 
          className="loading-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-logo">
            <div className="loading-icon-wrapper">
              <div className="loading-spinner"></div>
              <RefreshCw size={40} className="loading-icon" />
            </div>
          </div>
          <h1 className="loading-title">SpaceGuard AI</h1>
          <p className="loading-subtitle">Initializing mission control...</p>
          <div className="loading-progress">
            <motion.div 
              className="loading-progress-bar"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <div className="loading-status">
            <span>🛰️ Establishing connection</span>
            <span>📡 Fetching space data</span>
            <span>⚡ Calibrating sensors</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="app-error">
        <div className="error-background">
          <div className="error-glow"></div>
        </div>
        <motion.div 
          className="error-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="error-icon-wrapper">
            <AlertTriangle size={64} className="error-icon" />
          </div>
          <h1 className="error-title">Connection Lost</h1>
          <p className="error-description">
            We're having trouble reaching our space monitoring systems.
          </p>
          <div className="error-details">
            <div className="error-detail-item">
              <span className="error-detail-label">Error:</span>
              <span className="error-detail-value">{error}</span>
            </div>
            <div className="error-detail-item">
              <span className="error-detail-label">Status:</span>
              <span className="error-detail-value">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <button className="error-retry-btn" onClick={handleRefresh}>
            <RefreshCw size={18} />
            <span>Retry Connection</span>
          </button>
          {!isOnline && (
            <div className="error-offline-badge">
              <WifiOff size={16} />
              <span>You are currently offline</span>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="app-dashboard-wrapper"
        >
          <Dashboard
            weather={weather}
            history={history}
            apod={apod}
            lastUpdated={lastUpdated}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Refresh Button */}
      <motion.button 
        className="floating-refresh-btn"
        onClick={handleRefresh}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        title="Refresh Data"
      >
        <RefreshCw size={20} />
      </motion.button>

      {/* Status Indicator */}
      <div className="app-status">
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </div>
  );
}

export default App;