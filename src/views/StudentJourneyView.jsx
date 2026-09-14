import React, { useState } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Activity, 
  Volume2, 
  HeartHandshake, 
  Clock, 
  TrendingUp, 
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Filter,
  Users,
  ShieldCheck,
  Building,
  UserX,
  AlertCircle
} from 'lucide-react';

export default function StudentJourneyView({ state }) {
  const [activeDirectoryTab, setActiveDirectoryTab] = useState('students'); // 'students' | 'faculty'
  
  // Student Directory State
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('s1'); // Default to Aman Sharma

  // Faculty Directory State
  const [facultySearch, setFacultySearch] = useState('');
  const [facultyDeptFilter, setFacultyDeptFilter] = useState('ALL');

  // Filtered Students List
  const filteredStudents = state.students.filter(s => {
    const matchesClass = selectedClass === 'ALL' || s.classId === selectedClass;
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.rollNo.includes(studentSearch) ||
                          s.parentName.toLowerCase().includes(studentSearch.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Selected Student Data: pick from filtered list if selectedStudentId is in filtered list, else first in filtered list
  const studentInFiltered = filteredStudents.find(s => s.id === selectedStudentId);
  const student = studentInFiltered || filteredStudents[0] || state.students[0];

  const facultyMembers = [
    { id: 'f1', name: 'Mrs. Priya Verma', role: 'Head of Mathematics', dept: 'Mathematics', classTeacher: '12-A', checkIn: '07:45 AM', status: 'Present', avatar: '/priya_verma.jpg', duty: 'Period 1 • Room 204' },
    { id: 'f2', name: 'Mr. Arvind Rao', role: 'Senior PGT Physics', dept: 'Science', classTeacher: '11-B', checkIn: '07:50 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', duty: 'Period 2 • Physics Lab' },
    { id: 'f3', name: 'Dr. Sunita Bansal', role: 'PGT Chemistry', dept: 'Science', classTeacher: '10-A', checkIn: '07:55 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', duty: 'Period 3 • Chemistry Lab' },
    { id: 'f4', name: 'Ms. Ritu Sharma', role: 'PGT English Core', dept: 'Languages', classTeacher: '9-C', checkIn: '08:00 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', duty: 'Period 5 • Room 204' },
    { id: 'f5', name: 'Mr. Rajesh Mehra', role: 'PGT Computer Science', dept: 'Computer Science', classTeacher: '8-A', checkIn: '07:40 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', duty: 'Period 6 • Comp Lab 1' },
    { id: 'f6', name: 'Coach Vikram Singh', role: 'HOD Physical Education', dept: 'Sports', classTeacher: '7-A', checkIn: '07:30 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', duty: 'Period 7 • Sports Ground' },
    { id: 'f7', name: 'Mrs. Anjali Gupta', role: 'TGT Mathematics', dept: 'Mathematics', classTeacher: '6-A', checkIn: '07:52 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', duty: 'Period 4 • Room 102' },
    { id: 'f8', name: 'Mr. Alok Nath', role: 'PGT History & Social Studies', dept: 'Social Studies', classTeacher: 'None', checkIn: '08:10 AM', status: 'Late Check-in', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', duty: 'Period 2 • Room 305' },
    { id: 'f9', name: 'Mrs. Kavita Roy', role: 'TGT Hindi & Sanskrit', dept: 'Languages', classTeacher: 'None', checkIn: 'N/A', status: 'On Approved Leave', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', duty: 'Medical Leave (Substitute Assigned)' },
    { id: 'f10', name: 'Mr. Manoj Saxena', role: 'PGT Economics & Business', dept: 'Commerce', classTeacher: 'None', checkIn: '07:48 AM', status: 'Present', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', duty: 'Period 3 • Commerce Room' }
  ];

  const filteredFaculty = facultyMembers.filter(f => {
    const matchesDept = facultyDeptFilter === 'ALL' || f.dept === facultyDeptFilter;
    const matchesSearch = f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
                          f.role.toLowerCase().includes(facultySearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const presentFacultyCount = facultyMembers.filter(f => f.status.includes('Present') || f.status.includes('Late')).length;

  const isPrincipal = state.activeUser?.role === 'principal';
  const effectiveTab = isPrincipal ? 'faculty' : activeDirectoryTab;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header & Tab Switcher Bar */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building size={26} color="var(--color-accent-indigo)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {isPrincipal ? 'Campus Teaching Staff & Faculty Directory' : 'Campus Attendance & Student Journey Directory'}
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            P.N. National Public School • Real-time Attendance & Support Monitor
          </p>
        </div>

        {/* Tab Toggle Buttons (Only shown for non-Principal users) */}
        {!isPrincipal && (
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveDirectoryTab('students')}
              className={`btn ${effectiveTab === 'students' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
            >
              <Users size={16} />
              <span>Student Journey Directory ({state.students.length})</span>
            </button>

            <button
              onClick={() => setActiveDirectoryTab('faculty')}
              className={`btn ${effectiveTab === 'faculty' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
            >
              <UserCheck size={16} />
              <span>Faculty Attendance Register ({facultyMembers.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: STUDENT ATTENDANCE & 360° JOURNEY DIRECTORY */}
      {/* ======================================================== */}
      {effectiveTab === 'students' && (
        <>
          {/* Interactive Student Filter & Search Controls */}
          <div className="glass-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'rgba(15, 23, 42, 0.6)'
          }}>
            {/* Left: Search & Class Selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search student or roll no..."
                  className="form-control"
                  value={studentSearch}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStudentSearch(val);
                    const matching = state.students.filter(s => {
                      const matchesClass = selectedClass === 'ALL' || s.classId === selectedClass;
                      const matchesSearch = s.name.toLowerCase().includes(val.toLowerCase()) || 
                                            s.rollNo.includes(val) ||
                                            s.parentName.toLowerCase().includes(val.toLowerCase());
                      return matchesClass && matchesSearch;
                    });
                    if (matching.length > 0) {
                      setSelectedStudentId(matching[0].id);
                    }
                  }}
                  style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                />
              </div>

              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedClass(val);
                  const matching = state.students.filter(s => {
                    const matchesClass = val === 'ALL' || s.classId === val;
                    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                                          s.rollNo.includes(studentSearch) ||
                                          s.parentName.toLowerCase().includes(studentSearch.toLowerCase());
                    return matchesClass && matchesSearch;
                  });
                  if (matching.length > 0) {
                    setSelectedStudentId(matching[0].id);
                  }
                }}
                style={{ width: '160px', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Classes ({state.students.length})</option>
                {state.classes.map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>

            {/* Right: Select Student from Directory */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Select Student Profile:</span>
              <select
                className="form-select"
                value={student ? student.id : ''}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{ width: '220px', fontSize: '0.85rem', fontWeight: 600 }}
              >
                {filteredStudents.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.classId} • Roll #{s.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student 360° Header Banner */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={student.avatar || '/aman_sharma.jpg'}
                alt={student.name}
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-accent-indigo)', boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>{student.name} — Support & Attendance Journey</h2>
                  <span className={`badge ${student.status === 'On Track' ? 'badge-success' : 'badge-warning'}`}>
                    {student.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                  Class {student.classId} • Roll No. {student.rollNo} • Parent: <strong style={{ color: '#FFF' }}>{student.parentName}</strong> ({student.parentPhone})
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '8px 16px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid rgba(14, 165, 233, 0.4)' }}>
                🏫 Class Incharge: Mrs. Priya Verma (HOD Math)
              </span>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Attendance Rate
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {student.attendancePct}%
              </div>
              <div style={{ fontSize: '0.78rem', color: student.attendancePct >= 90 ? '#34D399' : '#FBBF24', fontWeight: 600 }}>
                {student.attendancePct >= 90 ? '✓ Satisfactory Attendance' : '↑ Needs mild boost (+2% this week)'}
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Homework Completion
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {student.homeworkPct}%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#34D399', fontWeight: 600 }}>
                ✓ Subject Assignments Active
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Late Arrivals
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {student.lateCount}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#FBBF24', fontWeight: 600 }}>
                ⏰ This Academic Month
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Teacher Follow-ups
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#C084FC' }}>
                {student.followUps}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#C084FC', fontWeight: 600 }}>
                💬 Supportive Check-ins
              </div>
            </div>
          </div>

          {/* Grid Row 2: Trend Visualization & Chronological Support Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
            {/* Trend Visualization Chart */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={22} color="var(--color-accent-cyan)" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Academic & Attendance Trend</h3>
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>5-Month Analytics</span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <svg viewBox="0 0 400 180" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="gradientAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="gradientHomework" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines & Y Axis values */}
                  <g stroke="rgba(255,255,255,0.06)" strokeDasharray="4">
                    <line x1="30" y1="20" x2="380" y2="20" />
                    <text x="5" y="24" fill="#94A3B8" fontSize="10">100%</text>

                    <line x1="30" y1="60" x2="380" y2="60" />
                    <text x="5" y="64" fill="#94A3B8" fontSize="10">80%</text>

                    <line x1="30" y1="100" x2="380" y2="100" />
                    <text x="5" y="104" fill="#94A3B8" fontSize="10">60%</text>

                    <line x1="30" y1="140" x2="380" y2="140" strokeDasharray="none" stroke="rgba(255,255,255,0.15)" />
                    <text x="5" y="144" fill="#94A3B8" fontSize="10">40%</text>
                  </g>

                  {/* X Axis Month Labels */}
                  <g fill="#94A3B8" fontSize="11" textAnchor="middle">
                    <text x="40" y="160">May</text>
                    <text x="110" y="160">Jun</text>
                    <text x="180" y="160">Jul</text>
                    <text x="250" y="160">Aug</text>
                    <text x="320" y="160">Sept</text>
                    <text x="380" y="160">Oct</text>
                  </g>

                  {/* Gradient Area Fill under Attendance */}
                  <path
                    d="M 40,30 Q 110,35 180,45 T 250,90 T 320,60 T 380,40 L 380,140 L 40,140 Z"
                    fill="url(#gradientAttendance)"
                  />

                  {/* Attendance Polyline */}
                  <path
                    d="M 40,30 Q 110,35 180,45 T 250,90 T 320,60 T 380,40"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="3.5"
                  />

                  {/* Homework Polyline */}
                  <path
                    d="M 40,45 Q 110,42 180,55 T 250,75 T 320,65 T 380,48"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />

                  {/* Data Points */}
                  <circle cx="250" cy="90" r="6" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
                  <circle cx="380" cy="40" r="6" fill="#6366F1" stroke="#FFF" strokeWidth="2" />
                  <circle cx="380" cy="48" r="5" fill="#10B981" stroke="#FFF" strokeWidth="2" />

                  {/* Tooltip Badges */}
                  <g transform="translate(230, 62)">
                    <rect width="45" height="18" rx="4" fill="#EF4444" />
                    <text x="22" y="13" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">87% Dip</text>
                  </g>
                  <g transform="translate(355, 12)">
                    <rect width="42" height="18" rx="4" fill="#6366F1" />
                    <text x="21" y="13" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">92% Now</text>
                  </g>
                </svg>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '14px', height: '4px', background: '#6366F1', borderRadius: '2px' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Attendance Rate (%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '14px', height: '4px', background: '#10B981', borderRadius: '2px' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Homework Completion (%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chronological Support Timeline */}
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={22} color="var(--color-accent-indigo)" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Chronological Support Timeline</h3>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Real-Time Log</span>
              </div>

              {/* Timeline Container with Left Connector Line */}
              <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Vertical Line Connector */}
                <div style={{
                  position: 'absolute',
                  left: '11px',
                  top: '12px',
                  bottom: '12px',
                  width: '3px',
                  background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)',
                  borderRadius: '2px'
                }} />

                {state.supportTimeline.map((tl) => (
                  <div
                    key={tl.id}
                    style={{
                      position: 'relative',
                      padding: '14px 16px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    {/* Glowing Bullet Icon on the vertical line */}
                    <div style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '16px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: tl.status === 'success' ? '#10B981' : tl.status === 'warning' ? '#F59E0B' : tl.status === 'danger' ? '#EF4444' : '#6366F1',
                      border: '3px solid #0F172A',
                      boxShadow: '0 0 10px currentColor'
                    }} />

                    <div style={{
                      padding: '8px',
                      borderRadius: '50%',
                      background: tl.status === 'success' ? 'rgba(16,185,129,0.2)' : tl.status === 'warning' ? 'rgba(245,158,11,0.2)' : tl.status === 'danger' ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)',
                      color: tl.status === 'success' ? '#34D399' : tl.status === 'warning' ? '#FBBF24' : tl.status === 'danger' ? '#F87171' : '#818CF8',
                      flexShrink: 0
                    }}>
                      {tl.type === 'attendance' ? <UserCheck size={18} /> : tl.type === 'voice' ? <Volume2 size={18} /> : tl.type === 'parent' ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-accent-indigo)', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-xs)' }}>
                            {tl.date}
                          </span>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {tl.title}
                          </h4>
                        </div>
                        {tl.tag && (
                          <span className={`badge ${tl.status === 'success' ? 'badge-success' : tl.status === 'warning' ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
                            {tl.tag}
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {tl.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FACULTY & TEACHER CAMPUS ATTENDANCE REGISTER */}
      {/* ======================================================== */}
      {effectiveTab === 'faculty' && (
        <>
          {/* 4 Faculty Summary KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="glass-card">
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Total Teaching Staff
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                45 Teachers
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-indigo)' }}>
                CBSE Certified Faculty
              </div>
            </div>

            <div className="glass-card">
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                Present Today
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34D399' }}>
                {presentFacultyCount} Staff
              </div>
              <div style={{ fontSize: '0.75rem', color: '#34D399' }}>
                93.3% Campus Presence
              </div>
            </div>

            <div className="glass-card">
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                On Duty / Seminar
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FBBF24' }}>
                2 Staff
              </div>
              <div style={{ fontSize: '0.75rem', color: '#FBBF24' }}>
                CBSE Workshop Duty
              </div>
            </div>

            <div className="glass-card">
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                On Approved Leave
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F87171' }}>
                1 Staff
              </div>
              <div style={{ fontSize: '0.75rem', color: '#F87171' }}>
                Medical Leave (Sub Active)
              </div>
            </div>
          </div>

          {/* Faculty Search & Department Filter Toolbar */}
          <div className="glass-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'rgba(15, 23, 42, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search faculty name or role..."
                  className="form-control"
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                />
              </div>

              <select
                className="form-select"
                value={facultyDeptFilter}
                onChange={(e) => setFacultyDeptFilter(e.target.value)}
                style={{ width: '180px', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <span className="badge badge-info" style={{ padding: '6px 14px' }}>
              Biometric Attendance Sync Active
            </span>
          </div>

          {/* Faculty Directory Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {filteredFaculty.map((f) => {
              const isPresent = f.status === 'Present';
              const isLate = f.status === 'Late Check-in';
              return (
                <div
                  key={f.id}
                  className="glass-card"
                  style={{
                    border: isPresent ? '1px solid rgba(16, 185, 129, 0.3)' : isLate ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                    background: 'rgba(15, 23, 42, 0.7)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                    <img
                      src={f.avatar}
                      alt={f.name}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: isPresent ? '2px solid #10B981' : isLate ? '2px solid #F59E0B' : '2px solid #EF4444'
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {f.name}
                        </h4>
                        <span className={`badge ${isPresent ? 'badge-success' : isLate ? 'badge-warning' : 'badge-danger'}`}>
                          {isPresent ? `✓ ${f.checkIn}` : isLate ? `⏰ ${f.checkIn}` : '🔴 Leave'}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--color-accent-indigo)', fontWeight: 600, marginTop: '2px' }}>
                        {f.role} ({f.dept})
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>🏫 Class Duty: <strong>{f.classTeacher !== 'None' ? `Incharge ${f.classTeacher}` : 'Subject Teacher'}</strong></span>
                    <span>📍 {f.duty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
