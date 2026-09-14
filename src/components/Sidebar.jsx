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

export default function Sidebar({ activeTab, setActiveTab, activeRole, onOpenLogin, isOpen, onClose }) {
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
      if (onClose) onClose();
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar-aside ${isOpen ? 'is-open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
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
            className="sidebar-bottom-btn"
            title="Reset local storage data to initial demo state"
          >
            <RotateCcw size={15} />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => {
              onOpenLogin();
              if (onClose) onClose();
            }}
            className="sidebar-logout-btn"
          >
            <LogOut size={15} />
            <span>Switch Account / Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
