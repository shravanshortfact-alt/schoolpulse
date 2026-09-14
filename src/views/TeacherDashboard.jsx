import React, { useState } from 'react';
import { 
  UserCheck, 
  UserX, 
  Clock, 
  Volume2, 
  BookOpen, 
  Plus, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Send,
  MessageSquare,
  TrendingDown,
  Search,
  Users,
  Filter,
  Eye,
  Award,
  GraduationCap,
  Briefcase,
  BookMarked,
  Mail
} from 'lucide-react';
import VoiceMessageModal from '../components/VoiceMessageModal';
import ProfileCard from '../components/ProfileCard';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

export default function TeacherDashboard({ state, activeTab: propActiveTab = 'dashboard' }) {
  const [selectedClass, setSelectedClass] = useState('12-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [currentTab, setCurrentTab] = useState(propActiveTab);

  // Sync internal tab state if prop changes
  React.useEffect(() => {
    if (propActiveTab) {
      setCurrentTab(propActiveTab);
    }
  }, [propActiveTab]);
  
  // Student Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Voice Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [targetStudentForVoice, setTargetStudentForVoice] = useState(null);

  // Daily Cutoff Reminder State
  const [showHomeworkCutoffReminder, setShowHomeworkCutoffReminder] = useState(true);

  // Homework Form State
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState('2026-09-16');

  // AI Assistant Box State
  const [aiSummary, setAiSummary] = useState('');

  const allClasses = ['12-A', '11-B', '10-A', '9-C', '8-A', '7-A', '6-A'];

  // Filtered Students Directory
  const filteredStudents = state.students.filter(s => {
    const matchesClass = selectedClass === 'ALL' || s.classId === selectedClass;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNo.includes(searchQuery) ||
                          s.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleMarkAttendance = (studentId, status) => {
    storageService.markAttendance(studentId, status);
  };

  const handleOpenVoice = (student) => {
    setTargetStudentForVoice(student);
    setIsVoiceModalOpen(true);
  };

  const handleCreateHomework = (e) => {
    e.preventDefault();
    if (!hwTitle) return;
    storageService.createHomework({
      subject: selectedSubject,
      title: hwTitle,
      description: hwDesc,
      dueDate: hwDueDate,
      classId: selectedClass === 'ALL' ? '12-A' : selectedClass
    });
    setHwTitle('');
    setHwDesc('');
    setShowHomeworkCutoffReminder(false);
  };

  const handleGenerateAiSummary = (student) => {
    const summary = aiService.generateStudentSummary(student);
    setAiSummary(summary);
  };

  const hasHomeworkToday = state.homework.some(h => h.subject === 'Mathematics' && h.assignedDate === '2026-09-14');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Full Prominent Teacher Executive Profile Card */}
      <ProfileCard 
        role="teacher" 
        state={state} 
        onAction1={() => {
          setTargetStudentForVoice(state.students[0]);
          setIsVoiceModalOpen(true);
        }}
      />

      {/* ======================================================== */}
      {/* VIEW 1: TEACHER HUB LANDING (PROFILE & FACULTY DOSSIER)  */}
      {/* ======================================================== */}
      {currentTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Hub Navigation Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div 
              className="glass-card glass-card-hover" 
              onClick={() => setCurrentTab('attendance')}
              style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <UserCheck size={24} color="var(--color-accent-indigo)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Attendance Register</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                View & mark student attendance cards for Classes 6th to 12th
              </p>
            </div>

            <div 
              className="glass-card glass-card-hover" 
              onClick={() => setCurrentTab('homework')}
              style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <BookOpen size={24} color="#34D399" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Homework Manager</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                Assign new homework and review active submissions
              </p>
            </div>

            <div 
              className="glass-card glass-card-hover" 
              onClick={() => setCurrentTab('voice')}
              style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Volume2 size={24} color="#C084FC" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Send Voice Update</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                Transmit Hindi voice notes to parents and track replies
              </p>
            </div>
          </div>

          {/* Executive Faculty Biography, Degrees & Credentials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>

            {/* Card 1: Educational Degrees & Qualifications */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.7) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <GraduationCap size={24} color="var(--color-accent-indigo)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Qualifications & Degrees</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <Award size={20} color="#FBBF24" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>M.Sc. Mathematics (Gold Medalist)</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Delhi University • First Class Distinction</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <BookOpen size={20} color="#6366F1" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Bachelor of Education (B.Ed.)</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Pedagogy & Curriculum Instruction • CBSE Accredited</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <Sparkles size={20} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>CBSE Master Trainer Certification</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Senior Board Examiner & Calculus Specialist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Professional Teaching Experience & Accomplishments */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.7) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <Briefcase size={24} color="#34D399" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Experience & Track Record</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Experience</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399' }}>14+ Academic Years</h4>
                  </div>
                  <span className="badge badge-success">CBSE Senior Faculty</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>100% Board Pass Rate</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent-indigo)' }}>5 Consecutive Years</h4>
                  </div>
                  <span className="badge badge-info">Class XII CBSE Results</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Key Honor / Award</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FBBF24' }}>🏆 Best Educator Award 2025</h4>
                  </div>
                  <span className="badge badge-warning">P.N. Public School</span>
                </div>
              </div>
            </div>

            {/* Card 3: Department Leadership, Specialization & Contact Availability */}
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(15, 23, 42, 0.7) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <BookMarked size={24} color="#C084FC" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Charges & Specialization</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  📍 <strong>Leadership Charge:</strong> Head of Mathematics Department<br />
                  🏫 <strong>Class Incharge:</strong> Class 12-A (30 Enrolled Students)<br />
                  📐 <strong>Specialization:</strong> Differential Calculus, Integration & Algebra<br />
                  ⏰ <strong>Parent Office Hours:</strong> Daily 02:00 PM – 02:30 PM (Room 204)<br />
                  📧 <strong>Official Email:</strong> <span style={{ color: 'var(--color-accent-cyan)' }}>priya.verma@pnnps.edu.in</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>Class 12-A Incharge</span>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Math HOD Lead</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>Board Evaluator</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: ATTENDANCE REGISTER & CLASS STUDENT DIRECTORY */}
      {/* ======================================================== */}
      {currentTab === 'attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Class Filter & Search Control Toolbar */}
          <div className="glass-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '14px 20px',
            background: 'rgba(15, 23, 42, 0.7)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Filter size={18} color="var(--color-accent-indigo)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Select Class Directory:
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ width: '180px', padding: '8px 12px', fontSize: '0.88rem', fontWeight: 700 }}
              >
                <option value="ALL">All Classes (40 Students)</option>
                {allClasses.map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>

              <span className="badge badge-info" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                Showing {filteredStudents.length} Student Profiles
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Search student by name (e.g. Aman, Ananya, Ayush), roll no, or parent name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm">
                Clear Search
              </button>
            )}
          </div>

          {/* Student Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {filteredStudents.map((st) => {
              const todayRec = state.todayAttendance?.records[st.id]?.status || 'Present';
              return (
                <div
                  key={st.id}
                  className="glass-card glass-card-hover"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '12px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent-indigo)' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                          {st.name}
                        </h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          Class {st.classId} • Roll No. {st.rollNo}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Attendance: <strong style={{ color: st.attendancePct >= 90 ? '#34D399' : '#FBBF24' }}>{st.attendancePct}%</strong></span>
                      <span className={`badge ${st.status === 'On Track' ? 'badge-success' : 'badge-warning'}`}>
                        {st.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      👨‍👦 Parent: <strong style={{ color: 'var(--color-text-primary)' }}>{st.parentName}</strong> ({st.parentPhone})
                    </div>

                    {/* Attendance P/A/L Mark Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Mark Today:</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleMarkAttendance(st.id, 'Present')} style={{ padding: '4px 10px', borderRadius: '4px', background: todayRec === 'Present' ? '#10B981' : 'rgba(255,255,255,0.05)', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>P</button>
                        <button onClick={() => handleMarkAttendance(st.id, 'Absent')} style={{ padding: '4px 10px', borderRadius: '4px', background: todayRec === 'Absent' ? '#EF4444' : 'rgba(255,255,255,0.05)', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>A</button>
                        <button onClick={() => handleMarkAttendance(st.id, 'Late')} style={{ padding: '4px 10px', borderRadius: '4px', background: todayRec === 'Late' ? '#F59E0B' : 'rgba(255,255,255,0.05)', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>L</button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                    <button
                      onClick={() => handleOpenVoice(st)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, fontSize: '0.78rem', justifyContent: 'center' }}
                    >
                      <Volume2 size={14} />
                      <span>Send Voice Update</span>
                    </button>
                    <button
                      onClick={() => handleGenerateAiSummary(st)}
                      className="btn btn-secondary btn-sm"
                      title="Generate AI Insight"
                    >
                      <Sparkles size={14} color="var(--color-accent-cyan)" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: HOMEWORK MANAGER */}
      {/* ======================================================== */}
      {currentTab === 'homework' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Assign New Homework</h3>
            <form onSubmit={handleCreateHomework}>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="e.g. Calculus Integration Ex 4.2" value={hwTitle} onChange={(e) => setHwTitle(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Instructions</label>
                <textarea className="form-textarea" rows={3} placeholder="Homework guidelines..." value={hwDesc} onChange={(e) => setHwDesc(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-input" value={hwDueDate} onChange={(e) => setHwDueDate(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                <Plus size={16} /> Assign Homework
              </button>
            </form>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Active Assignments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {state.homework.map((hw) => (
                <div key={hw.id} style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{hw.subject}: {hw.title}</span>
                    <span className="badge badge-info">Due: {hw.dueDate}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{hw.description}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class: {hw.classId}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 4: VOICE COMMUNICATIONS */}
      {/* ======================================================== */}
      {currentTab === 'voice' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Sent Voice Updates & Parent Replies</h3>
            <button onClick={() => handleOpenVoice(filteredStudents[0] || state.students[0])} className="btn btn-primary btn-sm">
              <Volume2 size={15} /> New Voice Note
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {state.voiceMessages.map((vm) => (
              <div key={vm.id} style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', border: vm.status === 'Acknowledged' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>To: {vm.parentName} (Parent of {vm.studentName})</span>
                  <span className={`badge ${vm.status === 'Acknowledged' ? 'badge-success' : 'badge-warning'}`}>
                    {vm.status === 'Acknowledged' ? '✓ Parent Acknowledged' : 'Sent - Pending View'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '10px' }}>"{vm.audioText}"</p>
                {vm.parentReply && (
                  <div style={{ fontSize: '0.82rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '8px 12px', borderRadius: '4px', color: '#34D399' }}>
                    <strong>Parent Reply: </strong> "{vm.parentReply}" ({vm.acknowledgedAt})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Update Modal */}
      <VoiceMessageModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        student={targetStudentForVoice}
        isTeacherMode={true}
      />
    </div>
  );
}
