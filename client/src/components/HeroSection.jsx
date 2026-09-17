import { motion } from "framer-motion";
import { ArrowRight, Shield, Satellite, Zap, ChevronDown } from "lucide-react";
import "../style/HeroSection.css";

function HeroSection() {
  const scrollToContent = () => {
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-glow glow-1"></div>
        <div className="hero-glow glow-2"></div>
        <div className="hero-glow glow-3"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="badge-dot"></span>
            <span>AI-Powered Space Monitoring</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="title-line">Guardian of the</span>
            <span className="title-highlight">Final Frontier</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Real-time space weather monitoring, satellite tracking, and AI-driven 
            predictions to protect your assets from solar storms and cosmic threats.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="hero-primary-btn" onClick={scrollToContent}>
              <span>Explore Dashboard</span>
              <ArrowRight size={18} />
            </button>
            <button className="hero-secondary-btn">
              <span>Watch Demo</span>
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="stat-item">
              <div className="stat-icon">
                <Satellite size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-number">2,500+</span>
                <span className="stat-label">Satellites Tracked</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Prediction Accuracy</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon">
                <Shield size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Real-time Monitoring</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="visual-container">
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="orbit-ring ring-3"></div>
            <div className="satellite-icon satellite-1">
              <Satellite size={32} />
            </div>
            <div className="satellite-icon satellite-2">
              <Satellite size={24} />
            </div>
            <div className="satellite-icon satellite-3">
              <Satellite size={28} />
            </div>
            <div className="center-glow"></div>
            <div className="pulse-wave wave-1"></div>
            <div className="pulse-wave wave-2"></div>
            <div className="pulse-wave wave-3"></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span>Scroll to explore</span>
        <ChevronDown size={20} className="scroll-chevron" />
      </motion.div>
    </section>
  );
}

export default HeroSection;