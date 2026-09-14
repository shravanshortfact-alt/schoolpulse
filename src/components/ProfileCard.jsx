import React from 'react';
import { 
  UserCheck, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Volume2, 
  Megaphone, 
  ShieldAlert, 
  Building, 
  Sparkles, 
  TrendingUp,
  User,
  Hash,
  Briefcase,
  Users
} from 'lucide-react';

export default function ProfileCard({ 
  role, 
  state, 
  student, 
  onAction1, 
  onAction2, 
  onAction3 
}) {
  const activeUser = state.activeUser;
  
  if (role === 'student') {
    const st = student || state.students.find(s => s.id === 's1') || state.students[0];
    return (
      <div className="glass-card" style={{
        padding: '0',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Top Header Cover Banner */}
        <div style={{
          background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #0284C7 100%)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#FFF" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFF', letterSpacing: '0.5px' }}>
              P.N. NATIONAL PUBLIC SCHOOL • OFFICIAL CBSE STUDENT PROFILE
            </span>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
            padding: '3px 10px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)'
          }}>
            ID: PNP-2026-CS1201
          </span>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative' }}>
              <img
                src={activeUser?.avatar || '/aman_sharma.jpg'}
                alt={st.name}
                style={{
                  width: '105px',
                  height: '105px',
                  borderRadius: '18px',
                  objectFit: 'cover',
                  border: '3px solid var(--color-accent-indigo)',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: '#10B981',
                borderRadius: '50%',
                padding: '4px',
                border: '2px solid #0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={14} color="#FFF" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div style={{ flex: 1, minWidth: '0', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC' }}>{st.name}</h1>
                <span className="badge badge-info" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  {st.status}
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  A1 Top Performer
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#94A3B8', fontWeight: 600, marginBottom: '16px' }}>
                Class 12-A • Science Stream • Roll No. 1201 • CBSE Delhi Board (10+2)
              </p>

              {/* Quick Info Grid */}
              <div className="profile-metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👨‍🏫 Class Teacher</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>Mrs. Priya Verma</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📊 Today's Attendance</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#34D399', marginTop: '2px' }}>{st.attendancePct}% (Present)</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📚 Homework Completed</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>{st.homeworkPct}% Active</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👨‍👦 Parent / Guardian</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>{st.parentName || 'Mr. Ramesh Yadav'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {onAction1 && (
            <button
              onClick={onAction1}
              className="btn btn-secondary"
              style={{ borderColor: '#F59E0B', color: '#FBBF24', padding: '10px 18px' }}
            >
              <Award size={18} />
              <span>Digital CBSE Report Card</span>
            </button>
          )}

          {onAction2 && (
            <button
              onClick={onAction2}
              className="btn btn-accent-rose"
              style={{ padding: '10px 18px', fontWeight: 700 }}
            >
              <HeartHandshake size={18} />
              <span>I Need Help</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (role === 'parent') {
    const st = student || state.students.find(s => s.id === 's1') || state.students[0];
    return (
      <div className="glass-card" style={{
        padding: '0',
        overflow: 'hidden',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(6, 78, 59, 0.4) 100%)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Top Header Cover Banner */}
        <div style={{
          background: 'linear-gradient(90deg, #059669 0%, #0D9488 50%, #0284C7 100%)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#FFF" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFF', letterSpacing: '0.5px' }}>
              P.N. NATIONAL PUBLIC SCHOOL • OFFICIAL PARENT & GUARDIAN PROFILE
            </span>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
            padding: '3px 10px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)'
          }}>
            PARENT ID: PRN-2026-9876
          </span>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative' }}>
              <img
                src={activeUser?.avatar || '/raj_sharma.jpg'}
                alt="Mr. Ramesh Yadav"
                style={{
                  width: '105px',
                  height: '105px',
                  borderRadius: '18px',
                  objectFit: 'cover',
                  border: '3px solid #10B981',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: '#10B981',
                borderRadius: '50%',
                padding: '4px',
                border: '2px solid #0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={14} color="#FFF" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div style={{ flex: 1, minWidth: '0', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC' }}>Mr. Ramesh Yadav</h1>
                <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  ✓ Verified Guardian
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#94A3B8', fontWeight: 600, marginBottom: '16px' }}>
                Parent of <strong>{st.name}</strong> (Class 12-A • Roll No. 1201 • Science Stream)
              </p>

              {/* Quick Info Grid */}
              <div className="profile-metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👦 Child / Ward</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>{st.name} (Class 12-A)</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👨‍🏫 Class Teacher</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>Mrs. Priya Verma</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📞 Registered Phone</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>+91 98765 43210</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📍 Address / Route</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>Civil Lines Metro, Bus #04</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {onAction1 && (
            <button
              onClick={onAction1}
              className="btn btn-secondary"
              style={{ borderColor: '#F59E0B', color: '#FBBF24', padding: '10px 18px' }}
            >
              <Award size={18} />
              <span>Digital Report Card</span>
            </button>
          )}

          {onAction2 && (
            <button
              onClick={onAction2}
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontWeight: 700 }}
            >
              <Calendar size={18} />
              <span>Schedule PTM Meeting</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (role === 'teacher') {
    return (
      <div className="glass-card" style={{
        padding: '0',
        overflow: 'hidden',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(88, 28, 135, 0.4) 100%)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Top Header Cover Banner */}
        <div style={{
          background: 'linear-gradient(90deg, #7C3AED 0%, #6366F1 50%, #2563EB 100%)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#FFF" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFF', letterSpacing: '0.5px' }}>
              P.N. NATIONAL PUBLIC SCHOOL • SENIOR FACULTY EXECUTIVE PROFILE
            </span>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
            padding: '3px 10px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)'
          }}>
            FACULTY ID: PNP-FAC-204
          </span>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative' }}>
              <img
                src={activeUser?.avatar || '/priya_verma.jpg'}
                alt="Mrs. Priya Verma"
                style={{
                  width: '105px',
                  height: '105px',
                  borderRadius: '18px',
                  objectFit: 'cover',
                  border: '3px solid #8B5CF6',
                  boxShadow: '0 8px 20px rgba(139, 92, 246, 0.35)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: '#8B5CF6',
                borderRadius: '50%',
                padding: '4px',
                border: '2px solid #0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={14} color="#FFF" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div style={{ flex: 1, minWidth: '0', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC' }}>Mrs. Priya Verma</h1>
                <span className="badge badge-purple" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  Senior PGT Faculty
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#94A3B8', fontWeight: 600, marginBottom: '16px' }}>
                Class Incharge: <strong>Class 12-A</strong> • Mathematics & Science Department Lead
              </p>

              {/* Quick Info Grid */}
              <div className="profile-metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>🏫 Primary Incharge</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>Class 12-A (30 Students)</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👥 Total Directory Strength</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#A78BFA', marginTop: '2px' }}>70 Students (Classes 6-12)</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📖 Primary Subject</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>Mathematics & Calculus</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>⏰ Active Shift</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>08:00 AM - 02:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {onAction1 && (
            <button
              onClick={onAction1}
              className="btn btn-secondary"
              style={{ borderColor: '#8B5CF6', color: '#C084FC', padding: '10px 18px' }}
            >
              <Volume2 size={18} />
              <span>Voice Note to Parent</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (role === 'principal') {
    return (
      <div className="glass-card" style={{
        padding: '0',
        overflow: 'hidden',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(120, 53, 15, 0.4) 100%)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Top Header Cover Banner */}
        <div style={{
          background: 'linear-gradient(90deg, #D97706 0%, #B45309 50%, #4F46E5 100%)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#FFF" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFF', letterSpacing: '0.5px' }}>
              P.N. NATIONAL PUBLIC SCHOOL • CHIEF EXECUTIVE & ACADEMIC DIRECTOR
            </span>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
            padding: '3px 10px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)'
          }}>
            CBSE AFFILIATION NO. 2131645
          </span>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative' }}>
              <img
                src={activeUser?.avatar || '/anil_singh.jpg'}
                alt="Dr. Anil Singh"
                style={{
                  width: '105px',
                  height: '105px',
                  borderRadius: '18px',
                  objectFit: 'cover',
                  border: '3px solid #F59E0B',
                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: '#F59E0B',
                borderRadius: '50%',
                padding: '4px',
                border: '2px solid #0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={14} color="#FFF" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div style={{ flex: 1, minWidth: '0', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F8FAFC' }}>Dr. Anil Singh</h1>
                <span className="badge badge-warning" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  Principal & Director
                </span>
                <span className="badge badge-info" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  Ph.D. Education
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#94A3B8', fontWeight: 600, marginBottom: '16px' }}>
                P.N. National Public School • Motto: <em>"तमसो मा ज्योतिर्गमय"</em> (CBSE Delhi 10+2)
              </p>

              {/* Quick Info Grid */}
              <div className="profile-metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>🏫 Campus Strength</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>700+ Enrolled Students</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>👨‍🏫 Teaching Faculty</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FBBF24', marginTop: '2px' }}>45 Senior PGT/TGT Staff</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>📊 Daily Attendance Avg</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#34D399', marginTop: '2px' }}>92% Overall Campus</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>🚨 Emergency Broadcast</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: state.emergencyAlert?.active ? '#F87171' : '#38BDF8', marginTop: '2px' }}>
                    {state.emergencyAlert?.active ? '⚠️ ALERT ACTIVE' : 'Normal Operations'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {onAction1 && (
            <button
              onClick={onAction1}
              className={`btn ${state.emergencyAlert?.active ? 'btn-accent-rose' : 'btn-secondary'}`}
              style={{ padding: '10px 18px', fontWeight: 700 }}
            >
              <ShieldAlert size={18} />
              <span>{state.emergencyAlert?.active ? 'Deactivate Weather Alert' : 'Trigger Emergency Alert'}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
