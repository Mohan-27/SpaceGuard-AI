import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Zap,
  Sparkles
} from "lucide-react";
import "../style/RefreshButton.css";

function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [lastRefresh, setLastRefresh] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setStatus('loading');
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% chance of success for demo
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Network error"));
          }
        }, 2000);
      });

      setProgress(100);
      setStatus('success');
      setLastRefresh(new Date());
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('dataRefreshed', { 
        detail: { timestamp: new Date() }
      }));

      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 2000);

    } catch (error) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 3000);
    } finally {
      clearInterval(progressInterval);
      setIsRefreshing(false);
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'success':
        return <CheckCircle size={18} className="status-icon success" />;
      case 'error':
        return <AlertCircle size={18} className="status-icon error" />;
      case 'loading':
        return <RefreshCw size={18} className="status-icon spinning" />;
      default:
        return <Zap size={18} className="status-icon idle" />;
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'success':
        return 'Data Updated!';
      case 'error':
        return 'Update Failed';
      case 'loading':
        return 'Updating...';
      default:
        return 'Refresh Data';
    }
  };

  const getStatusColor = () => {
    switch(status) {
      case 'success':
        return '#4ADE80';
      case 'error':
        return '#EF4444';
      case 'loading':
        return '#38BDF8';
      default:
        return '#9CA3AF';
    }
  };

  const formatTime = (date) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="refresh-container">
      <motion.div 
        className="refresh-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Button */}
        <button 
          className={`refresh-btn ${isRefreshing ? 'refreshing' : ''} ${status}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <div className="btn-content">
            <span className="btn-icon">
              {getStatusIcon()}
            </span>
            <span className="btn-text">{getStatusText()}</span>
            {!isRefreshing && status === 'idle' && (
              <span className="btn-shortcut">⌘R</span>
            )}
          </div>
          
          {/* Progress Bar */}
          {isRefreshing && (
            <motion.div 
              className="btn-progress"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="progress-glow"></div>
            </motion.div>
          )}
        </button>

        {/* Status Display */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div 
              className="refresh-status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ color: getStatusColor() }}
            >
              <span className="status-dot" style={{ background: getStatusColor() }}></span>
              <span>
                {status === 'success' && 'All systems updated successfully'}
                {status === 'error' && 'Failed to refresh data. Please try again.'}
                {status === 'loading' && `Fetching latest data... ${progress}%`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Last Refresh Time */}
        <div className="refresh-meta">
          <div className="meta-item">
            <Clock size={12} />
            <span>Last updated: {formatTime(lastRefresh)}</span>
          </div>
          <div className="meta-item">
            <Sparkles size={12} />
            <span>Auto-refresh every 30s</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="refresh-stats">
          <div className="stat-item">
            <span className="stat-label">Status</span>
            <span className={`stat-value ${status}`}>
              {status === 'idle' ? 'Ready' : 
               status === 'loading' ? 'Syncing' :
               status === 'success' ? 'Synced' : 'Error'}
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Latency</span>
            <span className="stat-value">
              {isRefreshing ? '...' : '24ms'}
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Data</span>
            <span className="stat-value">Live</span>
          </div>
        </div>
      </motion.div>

      {/* Keyboard Shortcut Hint */}
      <div className="shortcut-hint">
        <kbd>⌘</kbd> + <kbd>R</kbd>
        <span>to refresh</span>
      </div>
    </div>
  );
}

export default RefreshButton;