import React from 'react';
import { AlertTriangle, Bell, X } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function EmergencyBroadcastBanner({ alert, isPrincipal }) {
  if (!alert || !alert.active) return null;

  const handleDismiss = () => {
    if (isPrincipal) {
      storageService.toggleEmergencyAlert(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #DC2626 0%, #EF4444 50%, #991B1B 100%)',
      color: '#FFF',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.88rem',
      fontWeight: 600,
      boxShadow: '0 4px 16px rgba(220, 38, 38, 0.4)',
      position: 'relative',
      zIndex: 90
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
        <AlertTriangle size={20} color="#FFF" style={{ flexShrink: 0 }} className="animate-pulse" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#FFF', color: '#991B1B', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
            URGENT BROADCAST
          </span>
          <span>{alert.title}:</span>
          <span style={{ fontWeight: 400, opacity: 0.95 }}>{alert.message}</span>
        </div>
      </div>

      {isPrincipal && (
        <button
          onClick={handleDismiss}
          style={{
            background: 'rgba(0,0,0,0.2)',
            color: '#FFF',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '0.78rem',
            marginLeft: '12px',
            flexShrink: 0
          }}
        >
          Deactivate Broadcast
        </button>
      )}
    </div>
  );
}
