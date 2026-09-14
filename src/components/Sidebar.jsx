import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  BookOpen, 
  Volume2, 
  BellRing, 
  Activity, 
  RotateCcw,
  LogOut,
  Sparkles,
  LifeBuoy,
  Bus,
  Clock,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function Sidebar({ activeTab, setActiveTab, activeRole, onOpenLogin }) {
  const getNavItems = () => {
    switch (activeRole) {
      case 'student':
        return [
          { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
          { id: 'journey', label: 'My Support Journey', icon: Activity },
          { id: 'homework', label: 'Homework & Assignments', icon: BookOpen },
          { id: 'feedback', label: 'Teacher Feedback', icon: MessageSquare },
          { id: 'exams', label: 'Upcoming Exams', icon: Calendar },
          { id: 'transport', label: 'Live Bus Tracker', icon: Bus },
          { id: 'timetable', label: 'Daily Timetable', icon: Clock },
          { id: 'notices', label: 'School Notices', icon: BellRing }
        ];
      case 'parent':
        return [
          { id: 'dashboard', label: 'Parent Dashboard', icon: LayoutDashboard },
          { id: 'transport', label: 'Live Bus Tracker', icon: Bus },
          { id: 'voice', label: 'Teacher Voice Notes', icon: Volume2 },
          { id: 'homework', label: 'Child Homework', icon: BookOpen },
          { id: 'ptm', label: 'PTM Meetings', icon: Calendar },
          { id: 'journey', label: 'Child Support Timeline', icon: Activity },
          { id: 'notices', label: 'School Notices', icon: BellRing }
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Teacher Hub', icon: LayoutDashboard },
          { id: 'attendance', label: 'Attendance Register', icon: UserCheck },
          { id: 'homework', label: 'Homework Manager', icon: BookOpen },
          { id: 'voice', label: 'Send Voice Update', icon: Volume2 }
        ];
      case 'principal':
        return [
          { id: 'dashboard', label: 'School Pulse Dashboard', icon: LayoutDashboard },
          { id: 'journey', label: 'Campus Faculty Directory', icon: UserCheck },
          { id: 'notices', label: 'Publish School Notice', icon: BellRing }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleReset = () => {
    if (window.confirm('Reset all demo state to fresh default data?')) {
      storageService.resetDemo();
    }
  };

  return (
    <aside style={{
      width: '260px',
      background: 'var(--color-bg-sidebar)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      height: 'calc(100vh - 70px)',
      position: 'sticky',
      top: '70px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '0 8px' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Navigation
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  color: isActive ? 'var(--color-accent-indigo)' : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-accent-indigo)' : 'var(--color-text-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: 'var(--color-text-muted)',
            fontSize: '0.82rem',
            transition: 'var(--transition-fast)'
          }}
          title="Reset local storage data to initial demo state"
        >
          <RotateCcw size={15} />
          <span>Reset Demo Data</span>
        </button>

        <button
          onClick={onOpenLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#F87171',
            fontSize: '0.82rem',
            transition: 'var(--transition-fast)'
          }}
        >
          <LogOut size={15} />
          <span>Switch Account / Logout</span>
        </button>
      </div>
    </aside>
  );
}
