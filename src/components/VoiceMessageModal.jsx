import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Volume2, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

export default function VoiceMessageModal({ 
  isOpen, 
  onClose, 
  student, 
  voiceMessage, 
  isTeacherMode = true,
  initialMode = 'view'
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioText, setAudioText] = useState('');
  const [parentReply, setParentReply] = useState('');
  const [aiDraftPrompt, setAiDraftPrompt] = useState('');
  const [showAiInput, setShowAiInput] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState(initialMode); // 'view' | 'reply'

  useEffect(() => {
    if (voiceMessage) {
      setAudioText(voiceMessage.audioText || '');
      setParentReply(voiceMessage.parentReply || '');
    } else if (student) {
      setAudioText(`नमस्ते, मैं ${student.name} की गणित में प्रगति के बारे में एक अपडेट शेयर करना चाहती हूँ।`);
    }
    setActiveModalTab(initialMode);
  }, [student, voiceMessage, initialMode]);

  if (!isOpen) return null;

  const targetStudent = student || { name: 'Aman Yadav', parentName: 'Ramesh Yadav', id: 's1' };

  // Speech Synthesis with Female / Male Hindi Voice Tuning
  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(audioText);
        utterance.lang = 'hi-IN';

        const gender = voiceMessage?.teacherGender || (voiceMessage?.teacherName?.includes('Mrs') || voiceMessage?.teacherName?.includes('Ms') || voiceMessage?.teacherName?.includes('Sunita') ? 'female' : 'male');

        if (gender === 'male' || audioText.includes('बोल रहा')) {
          utterance.pitch = 0.85; // Male voice tone
          utterance.rate = 0.9;
        } else {
          utterance.pitch = 1.25; // Female voice tone
          utterance.rate = 0.95;
        }

        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSendVoiceUpdate = (e) => {
    e.preventDefault();
    storageService.sendVoiceMessage({
      studentId: targetStudent.id,
      teacherId: 't1',
      subject: 'Mathematics Progress & Homework Update',
      audioText: audioText
    });
    onClose();
  };

  const handleAcknowledgeAndReply = (e) => {
    if (e) e.preventDefault();
    if (voiceMessage) {
      storageService.acknowledgeVoiceMessage(voiceMessage.id, parentReply || 'Acknowledged by Ramesh Yadav.');
      onClose();
    }
  };

  const handleAiDraft = () => {
    const draft = aiService.draftParentMessage(aiDraftPrompt || 'Homework incomplete for 2 assignments', targetStudent.name, targetStudent.parentName);
    setAudioText(draft);
    setShowAiInput(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        {/* Modal Header */}
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
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.4)'
            }}>
              <Volume2 size={20} color="#C084FC" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {isTeacherMode ? 'Send Parent Voice Update' : voiceMessage?.subject || 'Teacher Voice Message'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Teacher: {voiceMessage?.teacherName || 'Mrs. Priya Verma'} • Student: {targetStudent.name} (Class 12-A)
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Parent Mode: Tab Switcher (View Transcript vs Send Reply) */}
        {!isTeacherMode && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button
              type="button"
              onClick={() => setActiveModalTab('view')}
              className={`btn ${activeModalTab === 'view' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: '0.85rem' }}
            >
              <BookOpen size={16} />
              <span>📖 View Transcript & Listen</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModalTab('reply')}
              className={`btn ${activeModalTab === 'reply' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} />
              <span>💬 Send Reply to Teacher</span>
            </button>
          </div>
        )}

        {/* MODE 1: VIEW TRANSCRIPT & AUDIO PLAYBACK */}
        {(isTeacherMode || activeModalTab === 'view') && (
          <>
            {/* Audio Player Card Visual */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                type="button"
                onClick={handlePlayAudio}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  boxShadow: 'var(--shadow-glow)',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent-violet)' }}>
                    {isPlaying ? `▶ Playing ${voiceMessage?.teacherGender === 'male' ? 'Male' : 'Female'} Hindi Voice...` : '🔊 Click to listen in Hindi'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>0:24</span>
                </div>

                {/* Visual Waveform Simulator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                  {[12, 20, 15, 24, 18, 30, 22, 14, 28, 16, 22, 12, 26, 18, 14, 20, 24, 16].map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: isPlaying ? `${Math.min(28, h + (idx % 3) * 4)}px` : `${h}px`,
                        background: isPlaying ? 'var(--color-accent-indigo)' : 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '2px',
                        transition: 'all 0.15s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Written Voice Transcript */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label">Voice Message Written Transcript (Hindi & Hinglish)</label>
                {isTeacherMode && (
                  <button
                    type="button"
                    onClick={() => setShowAiInput(!showAiInput)}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={14} />
                    Draft with AI Assistant
                  </button>
                )}
              </div>

              {showAiInput && isTeacherMode && (
                <div style={{
                  background: 'rgba(14, 165, 233, 0.1)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '10px'
                }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-accent-cyan)', marginBottom: '8px' }}>
                    Enter key issue (e.g. "Homework incomplete 3 days" or "Attendance drop"):
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Needs help in Calculus Integration"
                      value={aiDraftPrompt}
                      onChange={(e) => setAiDraftPrompt(e.target.value)}
                      style={{ fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAiDraft}
                      className="btn btn-primary btn-sm"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              )}

              <textarea
                className="form-textarea"
                rows={4}
                value={audioText}
                onChange={(e) => setAudioText(e.target.value)}
                disabled={!isTeacherMode}
                style={{ fontSize: '0.92rem', lineHeight: 1.6 }}
              />
            </div>
          </>
        )}

        {/* MODE 2: PARENT REPLY SECTION */}
        {!isTeacherMode && activeModalTab === 'reply' && (
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700 }}>
              Send Response / Reply to {voiceMessage?.teacherName || 'Teacher'}
            </label>

            {/* Quick Reply Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setParentReply('नमस्ते मैम, धन्यवाद! मैं आज ही अमन से सारा काम पूरा करवाऊँगा।')}
                style={{ fontSize: '0.78rem' }}
              >
                + "नमस्ते मैम, मैं आज ही अमन से सारा काम पूरा करवाऊँगा।"
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setParentReply('जी सर, धन्यवाद! मैं ध्यान रखूँगा।')}
                style={{ fontSize: '0.78rem' }}
              >
                + "जी सर, धन्यवाद! मैं ध्यान रखूँगा।"
              </button>
            </div>

            <textarea
              className="form-textarea"
              rows={4}
              placeholder="यहाँ अपना सन्देश या उत्तर टाइप करें (e.g. नमस्ते मैम, धन्यवाद! मैं आज ही अमन से गणित का काम पूरा करवाऊँगा।)"
              value={parentReply}
              onChange={(e) => setParentReply(e.target.value)}
              style={{ fontSize: '0.92rem', lineHeight: 1.6 }}
            />
          </div>
        )}

        {/* Modal Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>

          {isTeacherMode ? (
            <button onClick={handleSendVoiceUpdate} className="btn btn-primary">
              <Send size={16} />
              <span>Send Voice Note to Parent</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAcknowledgeAndReply}
              className="btn btn-accent-emerald"
            >
              <Send size={16} />
              <span>{activeModalTab === 'reply' ? 'Send Reply to Teacher' : '✓ 1-Click Acknowledge'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
