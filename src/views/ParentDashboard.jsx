import React, { useState } from 'react';
import { 
  UserCheck, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  Megaphone, 
  Calendar, 
  Bell, 
  Play, 
  Pause,
  MessageSquare,
  Activity,
  HeartHandshake,
  Award,
  Bus,
  Clock,
  Plus
} from 'lucide-react';
import VoiceMessageModal from '../components/VoiceMessageModal';
import ReportCardModal from '../components/ReportCardModal';
import PtmSchedulerModal from '../components/PtmSchedulerModal';
import BusTrackerWidget from '../components/BusTrackerWidget';
import ProfileCard from '../components/ProfileCard';
import { storageService } from '../services/storageService';

export default function ParentDashboard({ state, activeTab = 'dashboard' }) {
  const [selectedVoiceMessage, setSelectedVoiceMessage] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [isPtmModalOpen, setIsPtmModalOpen] = useState(false);
  const [activeAudioPlayingId, setActiveAudioPlayingId] = useState(null);

  const student = state.students.find(s => s.id === 's1') || state.students[0];
  const todayStatus = state.todayAttendance?.records['s1']?.status || 'Present';
  const todayTime = state.todayAttendance?.records['s1']?.time || '08:15 AM';

  const myVoiceMessages = state.voiceMessages.filter(v => v.studentId === 's1');
  const myHomework = state.homework.filter(h => h.classId === student.classId);

  const [voiceModalMode, setVoiceModalMode] = useState('view');

  const handleOpenVoice = (vm, mode = 'view') => {
    setSelectedVoiceMessage(vm);
    setVoiceModalMode(mode);
    setIsVoiceModalOpen(true);
  };

  const handleQuickPlay = (vmId, text, teacherGender = 'female') => {
    if ('speechSynthesis' in window) {
      if (activeAudioPlayingId === vmId) {
        window.speechSynthesis.cancel();
        setActiveAudioPlayingId(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';

        if (teacherGender === 'male' || text.includes('बोल रहा')) {
          utterance.pitch = 0.85; // Male voice pitch
          utterance.rate = 0.9;
        } else {
          utterance.pitch = 1.25; // Female voice pitch
          utterance.rate = 0.95;
        }

        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }

        utterance.onend = () => setActiveAudioPlayingId(null);
        utterance.onerror = () => setActiveAudioPlayingId(null);
        setActiveAudioPlayingId(vmId);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setActiveAudioPlayingId(activeAudioPlayingId === vmId ? null : vmId);
    }
  };

  const handleQuickAcknowledge = (vmId) => {
    storageService.acknowledgeVoiceMessage(vmId, 'Acknowledged via Parent Portal.');
  };

  // 1. DEDICATED LIVE BUS TRACKER VIEW
  if (activeTab === 'transport') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bus size={24} color="#34D399" />
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Child's Bus Route Live GPS Tracker</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {student.name} • Route #04 (Civil Lines Metro - P.N. National Public School)
              </p>
            </div>
          </div>
          <span className="badge badge-success">Live Tracking Active</span>
        </div>

        <BusTrackerWidget transport={state.transport} />
      </div>
    );
  }

  // 2. DEDICATED TEACHER VOICE NOTES VIEW
  if (activeTab === 'voice') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Volume2 size={26} color="#A78BFA" />
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Teacher Voice Updates Inbox</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Audio notes and academic progress updates from {student.name}'s teachers
              </p>
            </div>
          </div>
          <span className="badge badge-purple">{myVoiceMessages.length} Total Voice Notes</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myVoiceMessages.map((vm) => (
            <div
              key={vm.id}
              className="glass-card"
              style={{
                border: vm.status === 'Acknowledged' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(139, 92, 246, 0.4)',
                background: vm.status === 'Acknowledged' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(139, 92, 246, 0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {vm.teacherName} ({vm.subject})
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    📅 Sent on: {vm.timestamp || '2026-09-14 09:30 AM'} • Target: {student.name} (Class 12-A)
                  </div>
                </div>

                <span className={`badge ${vm.status === 'Acknowledged' ? 'badge-success' : 'badge-warning'}`}>
                  {vm.status === 'Acknowledged' ? '✓ Acknowledged' : '🔔 Action Required'}
                </span>
              </div>

              {/* Audio Playbox */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <button
                  onClick={() => handleQuickPlay(vm.id, vm.audioText, vm.teacherGender)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--gradient-brand)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  {activeAudioPlayingId === vm.id ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent-indigo)', marginBottom: '2px' }}>
                    {activeAudioPlayingId === vm.id ? '🔊 Playing Audio Speech Synthesis (Hindi)...' : '▶ Click to listen to voice message'}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{vm.audioText}"
                  </p>
                </div>
              </div>

              {/* Actions Row with SEPARATE View Transcript and Send Reply Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => handleOpenVoice(vm, 'view')} className="btn btn-secondary btn-sm">
                  <BookOpen size={15} />
                  <span>📖 View Transcript</span>
                </button>

                <button onClick={() => handleOpenVoice(vm, 'reply')} className="btn btn-primary btn-sm">
                  <MessageSquare size={15} />
                  <span>💬 Send Reply</span>
                </button>

                {vm.status !== 'Acknowledged' && (
                  <button onClick={() => handleQuickAcknowledge(vm.id)} className="btn btn-accent-emerald btn-sm">
                    <CheckCircle2 size={15} />
                    <span>✓ 1-Click Acknowledge</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <VoiceMessageModal
          isOpen={isVoiceModalOpen}
          onClose={() => setIsVoiceModalOpen(false)}
          student={student}
          voiceMessage={selectedVoiceMessage}
          isTeacherMode={false}
          initialMode={voiceModalMode}
        />
      </div>
    );
  }

  // 3. DEDICATED CHILD HOMEWORK & ACADEMICS VIEW
  if (activeTab === 'homework') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          border: '1px solid rgba(14, 165, 233, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={24} color="#38BDF8" />
              <h2 style={{ fontSize: '1.4rem' }}>Child's Homework & Academics Portal</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              {student.name} (Class 12-A) • Subject Assignments & Submission Progress
            </p>
          </div>

          <span className="badge badge-purple" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            Overall Completion: {student.homeworkPct}%
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myHomework.map((hw) => {
            const isDone = hw.completedBy.includes('s1');
            return (
              <div
                key={hw.id}
                className="glass-card"
                style={{
                  borderLeft: isDone ? '4px solid #10B981' : '4px solid #F59E0B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {hw.subject}: {hw.title}
                    </span>
                    <span className={`badge ${isDone ? 'badge-success' : 'badge-warning'}`}>
                      {isDone ? '✓ Completed & Submitted' : 'Pending Submission'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '8px', lineHeight: 1.5 }}>
                    {hw.description}
                  </p>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span>📅 Assigned Date: {hw.assignedDate}</span>
                    <span>⏰ Submission Due: <strong>{hw.dueDate}</strong></span>
                    <span>👨‍🏫 Subject Teacher: {hw.teacherName}</span>
                  </div>
                </div>

                <span className={`badge ${isDone ? 'badge-success' : 'badge-warning'}`} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  {isDone ? '✓ Verified by Teacher' : 'Due Soon'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. DEDICATED PTM MEETINGS VIEW
  if (activeTab === 'ptm') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={24} color="#C084FC" />
              <h2 style={{ fontSize: '1.4rem' }}>Parent-Teacher Meetings (PTM) Portal</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Book 15-minute 1-on-1 discussion slots with Class Teacher Mrs. Priya Verma
            </p>
          </div>

          <button onClick={() => setIsPtmModalOpen(true)} className="btn btn-primary" style={{ padding: '10px 18px' }}>
            <Plus size={18} />
            <span>Schedule New PTM Slot</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {state.ptmSlots.map((ptm) => (
            <div
              key={ptm.id}
              className="glass-card"
              style={{
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(139, 92, 246, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    PTM Meeting with {ptm.teacherName}
                  </h3>
                  <span className="badge badge-purple">{ptm.status}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-accent-indigo)', fontWeight: 600, marginBottom: '6px' }}>
                  Subject Focus: {ptm.subject} • {student.name} (Class 12-A)
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  📅 Date: <strong>{ptm.date}</strong> • ⏰ Time Slot: <strong>{ptm.timeSlot}</strong> • Venue: Room 204 / Online Video Link
                </div>
              </div>

              <button onClick={() => setIsPtmModalOpen(true)} className="btn btn-secondary btn-sm">
                Reschedule Slot
              </button>
            </div>
          ))}
        </div>

        <PtmSchedulerModal
          isOpen={isPtmModalOpen}
          onClose={() => setIsPtmModalOpen(false)}
          student={student}
          teacher={state.demoUsers.find(u => u.role === 'teacher')}
        />
      </div>
    );
  }

  // 5. DEDICATED SCHOOL NOTICES VIEW
  if (activeTab === 'notices') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Megaphone size={24} color="#FBBF24" />
              <h2 style={{ fontSize: '1.4rem' }}>Official School Notices & Circulars</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              P.N. National Public School • Verified Parent Announcements
            </p>
          </div>

          <span className="badge badge-warning" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            {state.notices.length} Total Circulars
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {state.notices.map((n) => (
            <div
              key={n.id}
              className="glass-card"
              style={{
                border: n.pinned ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--color-border)',
                background: n.pinned ? 'rgba(245, 158, 11, 0.06)' : 'var(--color-bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {n.title}
                </span>
                {n.pinned && <span className="badge badge-warning">📌 Pinned Circular</span>}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                {n.content}
              </p>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Issued by: <strong>{n.author}</strong></span>
                <span>Date: {n.date} • Target: {n.audience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. MAIN PARENT DASHBOARD LANDING PAGE (PROFILE CARD + TODAY ATTENDANCE ONLY)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Full Prominent Parent Executive Profile Card */}
      <ProfileCard 
        role="parent" 
        state={state} 
        student={student} 
        onAction1={() => setIsReportCardOpen(true)} 
        onAction2={() => setIsPtmModalOpen(true)} 
      />

      {/* Child's Today Attendance Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={22} color="var(--color-accent-emerald)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Child's Today Attendance & School Check-In</h3>
          </div>
          <span className={`badge ${todayStatus === 'Present' ? 'badge-success' : todayStatus === 'Late' ? 'badge-warning' : 'badge-danger'}`} style={{ padding: '6px 14px', fontSize: '0.88rem' }}>
            {todayStatus}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
            {student.attendancePct}%
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Overall Cumulative Attendance Rate (CBSE 75% Requirement Satisfied)
          </span>
        </div>

        {todayStatus === 'Absent' ? (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            color: '#F87171',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <strong>🔔 Attendance Alert: </strong> {student.name} was marked absent today in Class 12-A morning roll call by Mrs. Priya Verma.
          </div>
        ) : (
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            color: '#34D399',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle2 size={18} color="#10B981" />
            <span>✓ {student.name} arrived safely at P.N. National Public School campus today at <strong>{todayTime}</strong> (Marked by Class Teacher Mrs. Priya Verma).</span>
          </div>
        )}
      </div>

      <ReportCardModal isOpen={isReportCardOpen} onClose={() => setIsReportCardOpen(false)} reportCard={state.reportCard} schoolInfo={state.schoolInfo} />
      <PtmSchedulerModal isOpen={isPtmModalOpen} onClose={() => setIsPtmModalOpen(false)} student={student} teacher={state.demoUsers.find(u => u.role === 'teacher')} />
    </div>
  );
}
