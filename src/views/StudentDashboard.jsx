import React, { useState } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Megaphone, 
  HeartHandshake, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Activity,
  Award,
  Bus,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Gamepad2,
  Brain,
  FileCheck,
  Trophy
} from 'lucide-react';
import HelpRequestModal from '../components/HelpRequestModal';
import ReportCardModal from '../components/ReportCardModal';
import TimetableWidget from '../components/TimetableWidget';
import BusTrackerWidget from '../components/BusTrackerWidget';
import ProfileCard from '../components/ProfileCard';
import { storageService } from '../services/storageService';

export default function StudentDashboard({ state, activeTab = 'dashboard' }) {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  const student = state.students.find(s => s.id === 's1') || state.students[0];
  const todayStatus = state.todayAttendance?.records['s1']?.status || 'Present';
  const todayTime = state.todayAttendance?.records['s1']?.time || '08:15 AM';

  const myHomework = state.homework.filter(h => h.classId === student.classId);

  const handleToggleHw = (hwId) => {
    storageService.toggleHomeworkCompletion(hwId, 's1');
  };

  // 1. DEDICATED LIVE BUS TRACKER VIEW
  if (activeTab === 'transport') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)',
          border: '1px solid rgba(14, 165, 233, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bus size={26} color="#38BDF8" />
              <h2 style={{ fontSize: '1.4rem' }}>School Transport & Live Bus Tracking</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              P.N. National Public School • Real-time GPS Route Tracker & Driver Details
            </p>
          </div>

          <span className="badge badge-info" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            ● Route #04 (Civil Lines)
          </span>
        </div>

        <BusTrackerWidget transport={state.transport} />
      </div>
    );
  }

  // 2. DEDICATED TIMETABLE VIEW
  if (activeTab === 'timetable') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={26} color="var(--color-accent-indigo)" />
              <h2 style={{ fontSize: '1.4rem' }}>Daily Period Schedule & Timetable</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Class 12-A • Science Stream • Monday Schedule
            </p>
          </div>

          <span className="badge badge-purple" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            7 Total Periods Today
          </span>
        </div>

        <TimetableWidget timetable={state.timetable} />
      </div>
    );
  }

  // 3. DEDICATED HOMEWORK VIEW
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
              <h2 style={{ fontSize: '1.4rem' }}>Homework & Assignments Portal</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Class 12-A • Track active subject assignments and submit work
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
                className="glass-card glass-card-hover"
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
                      {isDone ? '✓ Completed' : 'Pending Submission'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '8px', lineHeight: 1.5 }}>
                    {hw.description}
                  </p>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', gap: '16px' }}>
                    <span>📅 Assigned: {hw.assignedDate}</span>
                    <span>⏰ Due Date: <strong>{hw.dueDate}</strong></span>
                    <span>👨‍🏫 Teacher: {hw.teacherName}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleHw(hw.id)}
                  className={`btn ${isDone ? 'btn-accent-emerald' : 'btn-primary'}`}
                >
                  <CheckCircle2 size={16} />
                  <span>{isDone ? 'Mark as Pending' : 'Submit Assignment'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. DEDICATED TEACHER FEEDBACK VIEW
  if (activeTab === 'feedback') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={26} color="var(--color-accent-indigo)" />
              <h2 style={{ fontSize: '1.4rem' }}>Teacher Feedback & Guidance Portal</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Direct subject feedback and personal improvement remarks from class teachers
            </p>
          </div>

          <span className="badge badge-purple" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            {state.teacherFeedback.length} Teacher Reviews
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {state.teacherFeedback.map((tf) => (
            <div key={tf.id} className="glass-card" style={{ borderLeft: '4px solid var(--color-accent-indigo)', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-accent-indigo)' }}>
                  {tf.teacher} ({tf.subject})
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{tf.date}</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{tf.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. DEDICATED UPCOMING EXAMS VIEW
  if (activeTab === 'exams') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={26} color="#EC4899" />
              <h2 style={{ fontSize: '1.4rem' }}>Upcoming Mid-Term Examinations</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Class 12-A • Exam Schedule, Syllabus Topics & Hall Allocations
            </p>
          </div>

          <span className="badge badge-warning" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            {state.exams.length} Exams Scheduled
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {state.exams.map((ex) => (
            <div key={ex.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                  {ex.subject} Examination
                </h3>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                  <strong>Syllabus Topics:</strong> {ex.syllabus}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  🏫 Examination Venue: <strong>{ex.room}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#EC4899' }}>
                  {ex.date}
                </div>
                <span className="badge badge-purple" style={{ marginTop: '4px' }}>09:00 AM - 12:00 PM</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. DEDICATED SCHOOL NOTICES VIEW
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
              P.N. National Public School • Verified Official Announcements
            </p>
          </div>

          <span className="badge badge-warning" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
            {state.notices.length} Total Notices
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

  // 7. MAIN STUDENT DASHBOARD LANDING PAGE (PROFILE CARD + 360° ACADEMIC & SPORTS INTEREST MATRIX ONLY)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Full Prominent Student Executive Profile Card */}
      <ProfileCard 
        role="student" 
        state={state} 
        student={student} 
        onAction1={() => setIsReportCardOpen(true)} 
        onAction2={() => setIsHelpModalOpen(true)} 
      />

      {/* 360° Academic, Behavior & Sports Interest Performance Matrix Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Brain size={24} color="var(--color-accent-indigo)" />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>360° Academic, Behavior & Sports Performance Matrix</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {student.name} • Class 12-A • Detailed Academic Proficiency & Game/Sports Performance
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {/* Behavior & Discipline */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Behavior & Discipline</span>
              <ShieldCheck size={18} color="#10B981" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>Highly Sincere</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              Respectful conduct, active class participation & disciplined behavior.
            </div>
          </div>

          {/* Maths & Calculus */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Maths & Calculus</span>
              <Zap size={18} color="#6366F1" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent-indigo)' }}>88% (Grade A1)</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              Strong geometry proficiency & active daily practice in calculus integration.
            </div>
          </div>

          {/* Computer Science */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Computer Science</span>
              <Brain size={18} color="#0EA5E9" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38BDF8' }}>95% (Top Scorer)</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              Outstanding Python coding & SQL database query problem solving.
            </div>
          </div>

          {/* Sports & Game Performance */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sports & Games Performance</span>
              <Trophy size={18} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FBBF24' }}>Excellent Badminton Player</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              Inter-School Badminton Rank 2 • Highly interested in Cricket & Table Tennis.
            </div>
          </div>
        </div>
      </div>

      <HelpRequestModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <ReportCardModal isOpen={isReportCardOpen} onClose={() => setIsReportCardOpen(false)} reportCard={state.reportCard} schoolInfo={state.schoolInfo} />
    </div>
  );
}
