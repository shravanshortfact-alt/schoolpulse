import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bell, 
  PlayCircle, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function Header({ 
  state, 
  onToggleDemoModal, 
  onToggleNotifications, 
  manualOffline, 
  setManualOffline,
  onLogout 
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
    <header className="header-bar" style={{
      height: '70px',
      background: 'var(--color-bg-header)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* School Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img
          src={school.logo}
          alt={school.name}
          style={{
            height: '42px',
            maxWidth: '180px',
            objectFit: 'contain'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--color-text-primary)',
            lineHeight: 1.2
          }}>
            {school.name}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#FBBF24', fontWeight: 600 }}>
            {school.motto} • CBSE Delhi
          </span>
        </div>
      </div>

      {/* Connectivity & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Connectivity Status Badge & Manual Offline Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isEffectiveOffline ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          border: isEffectiveOffline ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 600
        }}>
          {isEffectiveOffline ? (
            <>
              <WifiOff size={15} color="#FBBF24" />
              <span style={{ color: '#FBBF24' }}>Offline Demo</span>
            </>
          ) : (
            <>
              <Wifi size={15} color="#34D399" />
              <span style={{ color: '#34D399' }}>Online</span>
            </>
          )}

          <button
            onClick={() => setManualOffline(!manualOffline)}
            title="Toggle Manual Offline Mode for presentation"
            style={{
              marginLeft: '4px',
              padding: '2px 8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            {manualOffline ? 'Force Online' : 'Force Offline'}
          </button>
        </div>

        {/* Presentation Demo Guided Flow Launcher */}
        <button
          onClick={onToggleDemoModal}
          className="btn btn-primary"
          style={{
            padding: '7px 14px',
            fontSize: '0.85rem'
          }}
        >
          <PlayCircle size={16} />
          <span>Presentation Demo</span>
        </button>

        {activeUser && (
          <>
            {/* Notification Bell Icon */}
            <button
              onClick={onToggleNotifications}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--color-border)',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--color-accent-rose)',
                  color: '#FFF',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Session Info & Sign Out */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--color-border)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)'
            }}>
              <img 
                src={activeUser.avatar} 
                alt={activeUser.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                  {activeUser.name}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-accent-indigo)', textTransform: 'capitalize', fontWeight: 600 }}>
                  {activeUser.role.toUpperCase()} PORTAL
                </span>
              </div>

              <button
                onClick={onLogout}
                style={{
                  marginLeft: '8px',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#F87171',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Sign Out to switch account"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
