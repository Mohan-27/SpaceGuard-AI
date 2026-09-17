import Navbar from "../components/Navbar";
import SpaceWeatherCard from "../components/SpaceWeatherCard";
import RiskCard from "../components/RiskCard";
import RecommendationCard from "../components/RecommendationCard";
import KpChart from "../components/KpChart";
import SatelliteStatus from "../components/SatelliteStatus";
import PredictionCard from "../components/PredictionCard";
import APODCard from "../components/APODCard";
import RefreshButton from "../components/RefreshButton";
import SatelliteTracker from "../components/SatelliteTracker";
import ISSMap from "../components/ISSMap";
import AIChat from "../components/AIChat";
import { motion } from "framer-motion";
import { LayoutDashboard, Clock, Zap, Shield, Satellite, Cpu } from "lucide-react";
import "../style/Dashboard.css";

function Dashboard({ weather, history, apod, lastUpdated }) {
  // Calculate stats for the header
  const getStats = () => {
    const stats = {
      satellites: "24",
      monitoring: "Active",
      alerts: "0",
      accuracy: "99.9%"
    };
    
    if (weather) {
      const kp = weather.kp || 0;
      if (kp >= 7) stats.alerts = "Critical";
      else if (kp >= 5) stats.alerts = "Warning";
      else stats.alerts = "Normal";
    }
    
    return stats;
  };

  const stats = getStats();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getAlertStatus = () => {
    if (weather && weather.kp) {
      if (weather.kp >= 7) return "critical";
      if (weather.kp >= 5) return "warning";
    }
    return "normal";
  };

  const alertStatus = getAlertStatus();

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        {/* Header Section */}
        <motion.div 
          id="hero"
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-left">
            <div className="header-icon-wrapper">
              <LayoutDashboard size={28} className="header-icon" />
            </div>
            <div>
              <h1 className="dashboard-title">Mission Control</h1>
              <p className="dashboard-subtitle">Real-time space monitoring dashboard</p>
            </div>
          </div>

          <div className="header-right">
            <div className={`alert-badge alert-${alertStatus}`}>
              <div className="alert-dot"></div>
              <span>
                {alertStatus === "critical" ? "⚠️ Critical Alert" : 
                 alertStatus === "warning" ? "⚡ Storm Warning" : 
                 "✅ All Systems Nominal"}
              </span>
            </div>
            <div className="last-updated-wrapper">
              <Clock size={16} className="clock-icon" />
              <span className="last-updated">Updated: {lastUpdated || "Just now"}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="quick-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-card-icon">
              <Satellite size={20} />
            </div>
            <div className="stat-card-info">
              <span className="stat-card-value">{stats.satellites}</span>
              <span className="stat-card-label">Active Satellites</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <Zap size={20} />
            </div>
            <div className="stat-card-info">
              <span className="stat-card-value">{stats.monitoring}</span>
              <span className="stat-card-label">Monitoring Status</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <Shield size={20} />
            </div>
            <div className="stat-card-info">
              <span className="stat-card-value">{stats.alerts}</span>
              <span className="stat-card-label">Alert Status</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <Cpu size={20} />
            </div>
            <div className="stat-card-info">
              <span className="stat-card-value">{stats.accuracy}</span>
              <span className="stat-card-label">AI Accuracy</span>
            </div>
          </div>
        </motion.div>

        {/* Card Grid */}
        <motion.div 
          className="card-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Space Weather */}
          <motion.div id="weather" className="card card-weather" variants={itemVariants}>
            <div className="card-glow"></div>
            <SpaceWeatherCard weather={weather} />
          </motion.div>

          {/* Risk */}
          <motion.div className="card card-risk" variants={itemVariants}>
            <div className="card-glow"></div>
            <RiskCard weather={weather} />
          </motion.div>

          {/* Recommendation */}
          <motion.div className="card card-recommendation" variants={itemVariants}>
            <div className="card-glow"></div>
            <RecommendationCard weather={weather} />
          </motion.div>

          {/* Kp Chart */}
          <motion.div id="analytics" className="card card-chart" variants={itemVariants}>
            <div className="card-glow"></div>
            <KpChart history={history} />
          </motion.div>

          {/* Satellite Tracker */}
          <motion.div id="satellites" className="card card-tracker" variants={itemVariants}>
            <div className="card-glow"></div>
            <SatelliteTracker />
          </motion.div>

          {/* ISS Map */}
          <motion.div className="card card-map" variants={itemVariants}>
            <div className="card-glow"></div>
            <ISSMap />
          </motion.div>

          {/* APOD */}
          <motion.div className="card card-apod" variants={itemVariants}>
            <div className="card-glow"></div>
            <APODCard apod={apod} />
          </motion.div>

          {/* Satellite Status */}
          <motion.div className="card card-status" variants={itemVariants}>
            <div className="card-glow"></div>
            <SatelliteStatus weather={weather} />
          </motion.div>

          {/* Prediction */}
          <motion.div id="predictions" className="card card-prediction" variants={itemVariants}>
            <div className="card-glow"></div>
            <PredictionCard weather={weather} />
          </motion.div>

          {/* AI Chat */}
          <motion.div className="card card-chat" variants={itemVariants}>
            <div className="card-glow"></div>
            <AIChat />
          </motion.div>

          {/* Refresh Button */}
          <motion.div className="card card-refresh" variants={itemVariants}>
            <div className="refresh-wrapper">
              <RefreshButton />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;