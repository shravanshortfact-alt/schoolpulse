import React from 'react';
import { Bus, MapPin, Phone, Clock, ShieldCheck, Navigation } from 'lucide-react';

export default function BusTrackerWidget({ transport }) {
  if (!transport) return null;

  return (
    <div className="glass-card" style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
      border: '1px solid rgba(14, 165, 233, 0.3)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(14, 165, 233, 0.2)',
            border: '1px solid rgba(14, 165, 233, 0.4)'
          }}>
            <Bus size={22} color="#38BDF8" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Live School Transport Tracker</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {transport.route}
            </p>
          </div>
        </div>

        <div className="badge badge-info" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
          ● Live Tracking Active
        </div>
      </div>

      {/* Driver & ETA Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* Driver Details */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Bus & Driver Info</div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {transport.busNo} ({transport.vehicleNo})
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <Phone size={13} color="var(--color-accent-indigo)" />
            <span>{transport.driverName} ({transport.driverPhone})</span>
          </div>
        </div>

        {/* Live ETA Box */}
        <div style={{
          background: 'rgba(14, 165, 233, 0.1)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(14, 165, 233, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-cyan)' }}>ESTIMATED ARRIVAL ETA</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-heading)' }}>
              {transport.etaMinutes} Mins
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Next: {transport.nextStop}
            </div>
          </div>
          <Navigation size={28} color="#38BDF8" className="animate-pulse" />
        </div>
      </div>

      {/* Visual Route Timeline Simulator */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '14px' }}>
          ROUTE PROGRESS & STOPS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
          {transport.stops.map((stop, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: stop.status === 'current' ? '#38BDF8' : stop.status === 'passed' ? '#10B981' : 'rgba(255,255,255,0.2)',
                border: stop.status === 'current' ? '3px solid rgba(14, 165, 233, 0.4)' : 'none',
                flexShrink: 0
              }} />

              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: stop.status === 'current' ? 700 : 400,
                  color: stop.status === 'current' ? '#38BDF8' : stop.status === 'passed' ? 'var(--color-text-primary)' : 'var(--color-text-muted)'
                }}>
                  {stop.name} {stop.status === 'current' && '📍 (Current Location)'}
                </span>

                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  {stop.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
