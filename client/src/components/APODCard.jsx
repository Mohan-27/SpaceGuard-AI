import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Info, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  Image,
  Video,
  Clock,
  Star,
  ZoomIn
} from "lucide-react";
import "../style/APODCard.css";

function APODCard({ apod }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!apod) {
    return (
      <motion.div 
        className="apod-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading NASA APOD...</p>
        <span className="loading-sub">Astronomy Picture of the Day</span>
      </motion.div>
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "Today";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get media type icon
  const MediaIcon = apod.media_type === "video" ? Video : Image;

  return (
    <motion.div 
      className={`apod-card ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect"></div>
      
      {/* Header */}
      <div className="apod-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <Star size={22} className="header-icon" />
          </div>
          <div>
            <h3 className="apod-title">NASA APOD</h3>
            <p className="apod-subtitle">Astronomy Picture of the Day</p>
          </div>
        </div>
        <div className="header-right">
          <div className="media-badge">
            <MediaIcon size={14} />
            <span>{apod.media_type || "image"}</span>
          </div>
          <button className="expand-btn" onClick={toggleExpand}>
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Image/Video Container */}
      <div className="apod-media-container">
        <AnimatePresence mode="wait">
          {apod.media_type === "image" ? (
            <motion.div 
              className="apod-image-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {!isImageLoaded && (
                <div className="image-loader">
                  <div className="loader-spinner"></div>
                  <span>Loading image...</span>
                </div>
              )}
              <img
                src={apod.url}
                alt={apod.title}
                className={`apod-image ${isImageLoaded ? 'loaded' : 'loading'}`}
                onLoad={handleImageLoad}
                loading="lazy"
              />
              <div className="image-overlay">
                <button className="zoom-btn" onClick={toggleExpand}>
                  <ZoomIn size={20} />
                  <span>Expand</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="apod-video-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                src={apod.url}
                title="NASA APOD Video"
                className="apod-video"
                allowFullScreen
                frameBorder="0"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="apod-content">
        <div className="apod-title-section">
          <h4 className="apod-image-title">{apod.title}</h4>
          <div className="apod-meta">
            <div className="meta-item">
              <Calendar size={14} />
              <span>{formatDate(apod.date)}</span>
            </div>
            {apod.copyright && (
              <div className="meta-item">
                <Info size={14} />
                <span>© {apod.copyright}</span>
              </div>
            )}
          </div>
        </div>

        <motion.div 
          className={`apod-explanation ${isExpanded ? 'expanded' : ''}`}
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '120px' }}
          transition={{ duration: 0.3 }}
        >
          <p>{apod.explanation}</p>
        </motion.div>

        {!isExpanded && apod.explanation && apod.explanation.length > 200 && (
          <button className="read-more-btn" onClick={toggleExpand}>
            <span>Read More</span>
            <ExternalLink size={14} />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="apod-footer">
        <div className="footer-info">
          <div className="info-item">
            <Clock size={14} />
            <span>Updated Daily</span>
          </div>
          <div className="info-item">
            <Star size={14} />
            <span>NASA • {new Date().getFullYear()}</span>
          </div>
        </div>
        <a 
          href={apod.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nasa-link"
        >
          <span>View on NASA</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="apod-stars">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
      </div>
    </motion.div>
  );
}

export default APODCard;