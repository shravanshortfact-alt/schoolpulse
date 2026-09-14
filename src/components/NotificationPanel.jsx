import React from 'react';
import { X, CheckCheck, Bell, MessageSquare, Volume2, UserCheck, BookOpen, Megaphone, LifeBuoy } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function NotificationPanel({ isOpen, onClose, state }) {
  if (!isOpen) return null;

  const activeRole = state.activeUser?.role || 'student';
  const roleNotifications = state.notifications.filter(n => n.userRole === activeRole);

  const getIcon = (type) => {
    switch (type) {
      case 'attendance': return <UserCheck size={16} color="#F59E0B" />;
      case 'voice': return <Volume2 size={16} color="#8B5CF6" />;
      case 'homework': return <BookOpen size={16} color="#0EA5E9" />;
      case 'notice': return <Megaphone size={16} color="#10B981" />;
      case 'support': return <LifeBuoy size={16} color="#EF4444" />;
      default: return <Bell size={16} color="#6366F1" />;
    }
  };

  const handleMarkAllRead = () => {
    storageService.markAllNotificationsRead(activeRole);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        background: '#0F172A',
        borderLeft: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={18} color="var(--color-accent-indigo)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Notifications</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {roleNotifications.some(n => !n.read) && (
              <button
                onClick={handleMarkAllRead}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-accent-indigo)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {roleNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
              No notifications for your role.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {roleNotifications.map(item => (
                <div
                  key={item.id}
                  onClick={() => storageService.markNotificationRead(item.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: item.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(99, 102, 241, 0.1)',
                    border: item.read ? '1px solid var(--color-border)' : '1px solid rgba(99, 102, 241, 0.3)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(15, 23, 42, 0.6)'
                    }}>
                      {getIcon(item.type)}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {item.title}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                          {item.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
