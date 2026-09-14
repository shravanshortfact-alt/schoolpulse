import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bell, 
  PlayCircle, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function Header({ 
  state, 
  onToggleDemoModal, 
  onToggleNotifications, 
  manualOffline, 
  setManualOffline,
  onLogout,
  isMobileMenuOpen,
  onToggleMobileMenu
}) {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isEffectiveOffline = manualOffline || !onlineStatus;
  const activeUser = state.activeUser;
  const school = state.schoolInfo || { name: 'P.N. National Public School', logo: '/pn_logo.png' };

  const unreadCount = activeUser ? state.notifications.filter(
    n => n.userRole === activeUser.role && !n.read
  ).length : 0;

  return (
    <header className="header-bar">
      <div className="header-left">
        {/* Mobile Hamburger Menu Toggle Button */}
        {activeUser && (
          <button
            onClick={onToggleMobileMenu}
            className="mobile-menu-btn"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        {/* School Brand Identity */}
        <div className="header-brand">
          <img
            src={school.logo}
            alt={school.name}
            className="header-logo"
          />
          <div className="header-brand-info">
            <span className="header-brand-title">
              {school.name}
            </span>
            <span className="header-brand-motto">
              {school.motto} • CBSE Delhi
            </span>
          </div>
        </div>
      </div>

      {/* Connectivity & Actions */}
      <div className="header-right">
        {/* Connectivity Status Badge & Manual Offline Toggle */}
        <div className="status-badge-container" style={{
          background: isEffectiveOffline ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          border: isEffectiveOffline ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          {isEffectiveOffline ? (
            <>
              <WifiOff size={14} color="#FBBF24" />
              <span className="status-badge-text" style={{ color: '#FBBF24' }}>Offline</span>
            </>
          ) : (
            <>
              <Wifi size={14} color="#34D399" />
              <span className="status-badge-text" style={{ color: '#34D399' }}>Online</span>
            </>
          )}

          <button
            onClick={() => setManualOffline(!manualOffline)}
            title="Toggle Manual Offline Mode for presentation"
            className="status-toggle-btn"
          >
            {manualOffline ? 'Force Online' : 'Force Offline'}
          </button>
        </div>

        {/* Presentation Demo Guided Flow Launcher */}
        <button
          onClick={onToggleDemoModal}
          className="btn btn-primary demo-flow-btn"
        >
          <PlayCircle size={15} />
          <span className="demo-flow-text">Presentation Demo</span>
        </button>

        {activeUser && (
          <>
            {/* Notification Bell Icon */}
            <button
              onClick={onToggleNotifications}
              className="icon-btn"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Session Info & Sign Out */}
            <div className="user-session-badge">
              <img 
                src={activeUser.avatar} 
                alt={activeUser.name}
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">
                  {activeUser.name}
                </span>
                <span className="user-role">
                  {activeUser.role.toUpperCase()} PORTAL
                </span>
              </div>

              <button
                onClick={onLogout}
                className="logout-btn"
                title="Sign Out to switch account"
              >
                <LogOut size={14} />
                <span className="logout-text">Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
