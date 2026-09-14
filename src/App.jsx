import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotificationPanel from './components/NotificationPanel';
import PresentationDemoModal from './components/PresentationDemoModal';
import EmergencyBroadcastBanner from './components/EmergencyBroadcastBanner';

import LoginView from './views/LoginView';
import StudentDashboard from './views/StudentDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import ParentDashboard from './views/ParentDashboard';
import PrincipalDashboard from './views/PrincipalDashboard';
import StudentJourneyView from './views/StudentJourneyView';

import { storageService } from './services/storageService';
import './styles/globals.css';

export default function App() {
  const [state, setState] = useState(storageService.getState());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [manualOffline, setManualOffline] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = storageService.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const activeUser = state.activeUser;
  const activeRole = activeUser?.role;

  const handleLogout = () => {
    storageService.setActiveUser(null);
    setActiveTab('dashboard');
    setIsMobileMenuOpen(false);
  };

  const renderActiveView = () => {
    if (!activeUser) {
      return (
        <LoginView
          state={state}
          onLoginSuccess={(user) => {
            setActiveTab('dashboard');
            setIsMobileMenuOpen(false);
          }}
        />
      );
    }

    if (activeTab === 'journey' && activeRole !== 'teacher') {
      return <StudentJourneyView state={state} />;
    }

    switch (activeRole) {
      case 'student':
        return <StudentDashboard state={state} activeTab={activeTab} />;
      case 'parent':
        return <ParentDashboard state={state} activeTab={activeTab} />;
      case 'teacher':
        return <TeacherDashboard state={state} activeTab={activeTab} />;
      case 'principal':
        return <PrincipalDashboard state={state} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <StudentDashboard state={state} activeTab={activeTab} />;
    }
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <EmergencyBroadcastBanner
          alert={state.emergencyAlert}
          isPrincipal={activeRole === 'principal'}
        />

        <Header
          state={state}
          onToggleDemoModal={() => setIsDemoModalOpen(true)}
          onToggleNotifications={() => setIsNotificationsOpen(true)}
          manualOffline={manualOffline}
          setManualOffline={setManualOffline}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="app-body-layout">
          {activeUser && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeRole={activeRole}
              onOpenLogin={handleLogout}
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}

          <main className="content-area">
            {renderActiveView()}
          </main>
        </div>
      </div>

      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        state={state}
      />

      <PresentationDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        state={state}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
      />
    </div>
  );
}
