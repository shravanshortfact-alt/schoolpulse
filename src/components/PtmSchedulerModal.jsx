import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Send, ShieldCheck, User } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function PtmSchedulerModal({ isOpen, onClose, student, teacher }) {
  const [date, setDate] = useState('2026-09-18');
  const [timeSlot, setTimeSlot] = useState('04:00 PM - 04:15 PM');
  const [subject, setSubject] = useState('Mathematics Calculus Progress Review');

  if (!isOpen) return null;

  const targetStudent = student || { name: 'Aman Sharma', classId: '12-A' };
  const targetTeacher = teacher || { name: 'Mrs. Priya Verma', subject: 'Mathematics' };

  const handleBook = (e) => {
    e.preventDefault();
    storageService.bookPtmSlot({
      date,
      timeSlot,
      subject
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '14px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <Calendar size={22} color="#C084FC" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Schedule Parent-Teacher Meeting</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Teacher: {targetTeacher.name} ({targetTeacher.subject})
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleBook}>
          <div className="form-group">
            <label className="form-label">Discussion Agenda / Topic</label>
            <input
              type="text"
              className="form-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Discussing Calculus Mid-term preparation"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select 15-Minute Slot</label>
            <select
              className="form-select"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="03:30 PM - 03:45 PM">03:30 PM - 03:45 PM</option>
              <option value="03:45 PM - 04:00 PM">03:45 PM - 04:00 PM</option>
              <option value="04:00 PM - 04:15 PM">04:00 PM - 04:15 PM (Recommended)</option>
              <option value="04:15 PM - 04:30 PM">04:15 PM - 04:30 PM</option>
              <option value="04:30 PM - 04:45 PM">04:45 PM - 05:00 PM</option>
            </select>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <ShieldCheck size={18} color="#34D399" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.78rem', color: '#34D399', lineHeight: 1.4 }}>
              An instant PTM Virtual Gate Pass will be issued upon teacher confirmation.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Confirm PTM Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
