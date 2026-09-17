import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Bell, User, ChevronDown } from "lucide-react";
import "../style/Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => scrollToSection('hero')}>
          <div className="brand-icon">
            <Sparkles size={24} className="sparkle-icon" />
          </div>
          <span className="brand-text">SpaceGuard AI</span>
          <span className="brand-badge">BETA</span>
        </div>

        <div className="navbar-links">
          <button className="nav-link active" onClick={() => scrollToSection('hero')}>Dashboard</button>
          <button className="nav-link" onClick={() => scrollToSection('satellites')}>Satellites</button>
          <button className="nav-link" onClick={() => scrollToSection('weather')}>Space Weather</button>
          <button className="nav-link" onClick={() => scrollToSection('predictions')}>Predictions</button>
          <button className="nav-link" onClick={() => scrollToSection('analytics')}>Analytics</button>
        </div>

        <div className="navbar-actions">
          <button className="nav-action-btn notification-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <div className="user-profile">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <span className="user-name">Admin</span>
            <ChevronDown size={16} className="chevron-icon" />
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-content">
          <button className="mobile-nav-link active" onClick={() => scrollToSection('hero')}>
            Dashboard
          </button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('satellites')}>
            Satellites
          </button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('weather')}>
            Space Weather
          </button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('predictions')}>
            Predictions
          </button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('analytics')}>
            Analytics
          </button>
          <div className="mobile-menu-divider"></div>
          <div className="mobile-user-info">
            <div className="mobile-user-avatar">
              <User size={20} />
            </div>
            <span>Admin User</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;