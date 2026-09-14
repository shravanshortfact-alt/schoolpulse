import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  HeartHandshake, 
  Megaphone, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Plus, 
  CheckCircle2, 
  Send,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  Radio,
  Grid,
  List,
  Volume2,
  Phone,
  ShieldCheck,
  Building,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import VoiceMessageModal from '../components/VoiceMessageModal';
import { storageService } from '../services/storageService';

export default function PrincipalDashboard({ state, activeTab: propActiveTab = 'dashboard', setActiveTab }) {
  const [currentTab, setCurrentTab] = useState(propActiveTab);

  React.useEffect(() => {
    if (propActiveTab) {
      setCurrentTab(propActiveTab);
    }
  }, [propActiveTab]);

  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [studentSearch, setStudentSearch] = useState('');
  
  // Faculty Search & Department Filter State
  const [facultySearch, setFacultySearch] = useState('');
  const [facultyDeptFilter, setFacultyDeptFilter] = useState('ALL');

  // Voice Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedStudentForVoice, setSelectedStudentForVoice] = useState(null);
  
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeAudience, setNoticeAudience] = useState('All (Students, Parents, Staff)');
  const [noticePriority, setNoticePriority] = useState('Important');
  const [publishSuccessMessage, setPublishSuccessMessage] = useState('');

  const emergencyActive = state.emergencyAlert?.active || false;

  const totalStudents = state.students.length;
  const todayAttendancePct = 92;
  const homeworkRate = 84;
  const parentEngagementRate = 76;
  const studentsNeedingFollowUp = state.students.filter(s => s.status !== 'On Track').length;

  const allClasses = ['12-A', '11-B', '10-A', '9-C', '8-A', '7-A', '6-A'];

  const filteredStudents = state.students.filter(s => {
    const matchesClass = selectedClassFilter === 'ALL' || s.classId === selectedClassFilter;
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.rollNo.includes(studentSearch) ||
                          s.parentName.toLowerCase().includes(studentSearch.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Faculty Members Master List
  const facultyMembers = [
    { id: 'f1', name: 'Mrs. Priya Verma', role: 'Head of Mathematics', dept: 'Mathematics', classTeacher: '12-A', checkIn: '07:45 AM', status: 'Present', avatar: '/priya_verma.jpg', phone: '+91 98112 33445', duty: 'Period 1 • Room 204' },
    { id: 'f2', name: 'Mr. Arvind Rao', role: 'Senior PGT Physics', dept: 'Science', classTeacher: '11-B', checkIn: '07:50 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33446', duty: 'Period 2 • Physics Lab' },
    { id: 'f3', name: 'Dr. Sunita Bansal', role: 'PGT Chemistry', dept: 'Science', classTeacher: '10-A', checkIn: '07:55 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33447', duty: 'Period 3 • Chemistry Lab' },
    { id: 'f4', name: 'Ms. Ritu Sharma', role: 'PGT English Core', dept: 'Languages', classTeacher: '9-C', checkIn: '08:00 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33448', duty: 'Period 5 • Room 204' },
    { id: 'f5', name: 'Mr. Rajesh Mehra', role: 'PGT Computer Science', dept: 'Computer Science', classTeacher: '8-A', checkIn: '07:40 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33449', duty: 'Period 6 • Comp Lab 1' },
    { id: 'f6', name: 'Coach Vikram Singh', role: 'HOD Physical Education', dept: 'Sports', classTeacher: '7-A', checkIn: '07:30 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33450', duty: 'Period 7 • Sports Ground' },
    { id: 'f7', name: 'Mrs. Anjali Gupta', role: 'TGT Mathematics', dept: 'Mathematics', classTeacher: '6-A', checkIn: '07:52 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33451', duty: 'Period 4 • Room 102' },
    { id: 'f8', name: 'Mr. Alok Nath', role: 'PGT History & Social Studies', dept: 'Social Studies', classTeacher: 'None', checkIn: '08:10 AM', status: 'Late Check-in', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33452', duty: 'Period 2 • Room 305' },
    { id: 'f9', name: 'Mrs. Kavita Roy', role: 'TGT Hindi & Sanskrit', dept: 'Languages', classTeacher: 'None', checkIn: 'N/A', status: 'On Approved Leave', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33453', duty: 'Medical Leave (Substitute Assigned)' },
    { id: 'f10', name: 'Mr. Manoj Saxena', role: 'PGT Economics & Business', dept: 'Commerce', classTeacher: 'None', checkIn: '07:48 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', phone: '+91 98112 33454', duty: 'Period 3 • Commerce Room' }
  ];

  const filteredFaculty = facultyMembers.filter(f => {
    const matchesDept = facultyDeptFilter === 'ALL' || f.dept === facultyDeptFilter;
    const matchesSearch = f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
                          f.role.toLowerCase().includes(facultySearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleToggleEmergencyAlert = () => {
    storageService.toggleEmergencyAlert(
      !emergencyActive,
      '⚠️ Weather Alert: School Half-Day & Early Bus Departure',
      'Due to severe weather warnings in Delhi-NCR, P.N. National Public School will close at 12:30 PM today. Buses will depart at 12:45 PM.'
    );
  };

  const handlePublishNotice = (e) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    storageService.publishNotice({
      title: noticeTitle,
      content: noticeContent,
      audience: noticeAudience,
      priority: noticePriority
    });

    setNoticeTitle('');
    setNoticeContent('');
    setPublishSuccessMessage('Notice published successfully! Broadcasted live across all student, parent, and teacher portals.');
    setTimeout(() => setPublishSuccessMessage(''), 5000);
  };

  const handleOpenVoiceModal = (studentObj) => {
    setSelectedStudentForVoice(studentObj);
    setIsVoiceModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Full Prominent Principal Executive Profile Card */}
      <ProfileCard 
        role="principal" 
        state={state} 
        onAction1={handleToggleEmergencyAlert} 
      />

      {/* ======================================================== */}
      {/* TAB 1: SCHOOL PULSE DASHBOARD */}
      {/* ======================================================== */}
      {currentTab === 'dashboard' && (
        <>
          {/* 4 Primary KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>School Attendance</span>
                <UserCheck size={20} color="#10B981" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{todayAttendancePct}%</div>
              <div style={{ fontSize: '0.78rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={14} /> Overall Daily Average
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Homework Rate</span>
                <BookOpen size={20} color="#0EA5E9" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{homeworkRate}%</div>
              <div style={{ fontSize: '0.78rem', color: '#38BDF8', marginTop: '4px' }}>Submission Rate Active</div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Parent Engagement</span>
                <HeartHandshake size={20} color="#8B5CF6" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{parentEngagementRate}%</div>
              <div style={{ fontSize: '0.78rem', color: '#C084FC', marginTop: '4px' }}>Voice Note Acknowledgements</div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Follow-up Active</span>
                <ShieldAlert size={20} color="#F87171" />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F87171' }}>{studentsNeedingFollowUp}</div>
              <div style={{ fontSize: '0.78rem', color: '#FCA5A5', marginTop: '4px' }}>Students Supported</div>
            </div>
          </div>

          {/* School Attendance Trends by Grade */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={20} color="var(--color-accent-indigo)" />
              <h3 style={{ fontSize: '1.15rem' }}>School Attendance Trends by Grade</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              {[
                { grade: 'Grade 12 (12-A, 12-B)', pct: 93, color: '#6366F1' },
                { grade: 'Grade 11 (11-A, 11-B)', pct: 89, color: '#0EA5E9' },
                { grade: 'Grade 10 (10-A, 10-B)', pct: 95, color: '#10B981' },
                { grade: 'Grade 9 to 6', pct: 92, color: '#F59E0B' }
              ].map((item) => (
                <div key={item.grade}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.grade}</span>
                    <span style={{ fontWeight: 700, color: item.color }}>{item.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PUBLISH SCHOOL NOTICE PAGE */}
      {/* ======================================================== */}
      {currentTab === 'notices' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Megaphone size={22} color="var(--color-accent-amber)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Publish Official School Notice</h3>
            </div>

            {publishSuccessMessage && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                color: '#34D399',
                fontSize: '0.85rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} />
                <span>{publishSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handlePublishNotice}>
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Tomorrow will be a half-day due to school event"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Audience</label>
                <select
                  className="form-select"
                  value={noticeAudience}
                  onChange={(e) => setNoticeAudience(e.target.value)}
                >
                  <option value="All (Students, Parents, Staff)">All (Students, Parents, Staff)</option>
                  <option value="Parents Only">Parents Only</option>
                  <option value="Students Only">Students Only</option>
                  <option value="Teachers Only">Teachers Only</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Notice Content</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Details of the announcement..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                <Send size={16} />
                <span>Publish Notice</span>
              </button>
            </form>
          </div>

          {/* Published Notices Log */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Published School Notices History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {state.notices.map((n) => (
                <div key={n.id} style={{
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{n.title}</h4>
                    <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>{n.priority}</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{n.content}</p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Audience: <strong>{n.audience}</strong></span>
                    <span>Date: {n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voice Message Modal */}
      <VoiceMessageModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        student={selectedStudentForVoice}
        teacher={state.demoUsers.find(u => u.role === 'teacher')}
      />
    </div>
  );
}
