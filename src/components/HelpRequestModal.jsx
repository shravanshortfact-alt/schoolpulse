import React, { useState } from 'react';
import { X, HeartHandshake, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function HelpRequestModal({ isOpen, onClose }) {
  const [category, setCategory] = useState('Study problem');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Study problem',
    'Homework problem',
    'Personal concern',
    'Bullying/peer issue',
    'Transport issue',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    storageService.submitHelpRequest({
      category,
      message
    });

    setMessage('');
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
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <HeartHandshake size={22} color="#F87171" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>I Need Help</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Private request sent directly to your teacher & counselor
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Issue Category</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: category === cat ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    border: category === cat ? '1px solid var(--color-accent-indigo)' : '1px solid var(--color-border)',
                    color: category === cat ? 'var(--color-accent-indigo)' : 'var(--color-text-secondary)',
                    fontWeight: category === cat ? 600 : 400,
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Describe how we can support you</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Write a short message explaining what you are struggling with..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
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
              Your privacy is respected. This note goes directly to Mrs. Priya Verma for supportive follow-up.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={16} />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
