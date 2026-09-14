import React from 'react';
import { Clock, BookOpen, User, MapPin } from 'lucide-react';

export default function TimetableWidget({ timetable }) {
  if (!timetable) return null;

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="var(--color-accent-indigo)" />
          <h3 style={{ fontSize: '1.1rem' }}>Today's Daily Timetable & Period Schedule</h3>
        </div>
        <span className="badge badge-info">Class 12-A • Monday</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {timetable.map((item) => (
          <div
            key={item.period}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: item.active ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: item.active ? '1px solid var(--color-accent-indigo)' : '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                background: item.active ? 'var(--gradient-brand)' : 'rgba(15, 23, 42, 0.6)',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                P{item.period}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {item.subject}
                  </span>
                  {item.active && <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>ONGOING NOW</span>}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                  <span><User size={12} inline /> {item.teacher}</span>
                  <span><MapPin size={12} inline /> {item.room}</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
