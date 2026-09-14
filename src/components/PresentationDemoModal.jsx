import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  UserX, 
  Bell, 
  Volume2, 
  UserCheck, 
  Activity, 
  BarChart3,
  Sparkles
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function PresentationDemoModal({ isOpen, onClose, state, setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Teacher Marks Attendance',
      role: 'teacher',
      view: 'attendance',
      icon: UserX,
      color: '#EF4444',
      description: 'Mrs. Priya Verma opens Attendance Register for Class 12-A and marks Aman Sharma ABSENT.',
      actionLabel: 'Execute: Mark Aman Absent',
      execute: () => {
        storageService.markAttendance('s1', 'Absent');
      }
    },
    {
      step: 2,
      title: 'Auto Parent Attendance Notification',
      role: 'parent',
      view: 'dashboard',
      icon: Bell,
      color: '#F59E0B',
      description: 'System automatically generates an instant alert to parent Raj Sharma: "Attendance Alert: Aman Sharma was marked absent today".',
      actionLabel: 'View Parent Alert',
      execute: () => {
        const parentUser = state.demoUsers.find(u => u.role === 'parent');
        if (parentUser) storageService.setActiveUser(parentUser);
      }
    },
    {
      step: 3,
      title: 'Teacher Sends Voice Update',
      role: 'teacher',
      view: 'voice',
      icon: Volume2,
      color: '#8B5CF6',
      description: 'Mrs. Priya Verma sends a supportive voice update explaining Aman\'s missing assignment and asking for home help.',
      actionLabel: 'Execute: Send Voice Message',
      execute: () => {
        storageService.sendVoiceMessage({
          studentId: 's1',
          teacherId: 't1',
          subject: 'Mathematics Homework & Attendance Check',
          audioText: 'Hello Mr. Sharma, I noticed Aman was absent today and missed the Calculus homework. Please help him review integration exercises so he stays confident.'
        });
      }
    },
    {
      step: 4,
      title: 'Parent Receives Voice Notification',
      role: 'parent',
      view: 'voice',
      icon: Bell,
      color: '#0EA5E9',
      description: 'Raj Sharma receives a prominent voice message alert on his dashboard with an audio player and complete transcript.',
      actionLabel: 'Switch to Parent Inbox',
      execute: () => {
        const parentUser = state.demoUsers.find(u => u.role === 'parent');
        if (parentUser) storageService.setActiveUser(parentUser);
      }
    },
    {
      step: 5,
      title: 'Parent Listens & Acknowledges',
      role: 'parent',
      view: 'voice',
      icon: CheckCircle2,
      color: '#10B981',
      description: 'Parent plays audio message and clicks "✓ Acknowledge Message" with optional reply: "I will make sure Aman completes it today."',
      actionLabel: 'Execute: Parent Acknowledges',
      execute: () => {
        const latestVm = state.voiceMessages[0];
        if (latestVm) {
          storageService.acknowledgeVoiceMessage(latestVm.id, 'I will make sure Aman completes his calculus practice today.');
        }
      }
    },
    {
      step: 6,
      title: 'Teacher Status Updated',
      role: 'teacher',
      view: 'voice',
      icon: UserCheck,
      color: '#6366F1',
      description: 'Teacher dashboard updates live: "Parent Acknowledged" with green timestamp & parent reply details.',
      actionLabel: 'Switch to Teacher Hub',
      execute: () => {
        const teacherUser = state.demoUsers.find(u => u.role === 'teacher');
        if (teacherUser) storageService.setActiveUser(teacherUser);
      }
    },
    {
      step: 7,
      title: 'Student Support Journey Updated',
      role: 'student',
      view: 'journey',
      icon: Activity,
      color: '#EC4899',
      description: 'Aman Sharma\'s 360° Support Journey timeline logs every step chronologically without negative labeling.',
      actionLabel: 'View Student Journey Timeline',
      execute: () => {
        const studentUser = state.demoUsers.find(u => u.role === 'student');
        if (studentUser) storageService.setActiveUser(studentUser);
      }
    },
    {
      step: 8,
      title: 'School Pulse Dashboard Refreshed',
      role: 'principal',
      view: 'dashboard',
      icon: BarChart3,
      color: '#3B82F6',
      description: 'Dr. Anil Singh sees updated school-wide attendance metrics (92% -> 91.8%) and "Students Needing Support" counter.',
      actionLabel: 'View School Pulse Dashboard',
      execute: () => {
        const principalUser = state.demoUsers.find(u => u.role === 'principal');
        if (principalUser) storageService.setActiveUser(principalUser);
      }
    }
  ];

  const activeStepObj = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextS = currentStep + 1;
      setCurrentStep(nextS);
      const targetStep = steps[nextS - 1];
      targetStep.execute();
      if (setActiveTab) setActiveTab(targetStep.view);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevS = currentStep - 1;
      setCurrentStep(prevS);
      const targetStep = steps[prevS - 1];
      targetStep.execute();
      if (setActiveTab) setActiveTab(targetStep.view);
    }
  };

  const handleReset = () => {
    storageService.resetDemo();
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '680px', padding: '0', overflow: 'hidden' }}>
        {/* Modal Banner Header */}
        <div style={{
          background: 'var(--gradient-brand)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={24} />
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>Interactive Presentation Demo Flow</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                Live 8-Step USP Workflow Demonstration (100% Offline Compatible)
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#FFF', opacity: 0.8 }}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Stepper Pills */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(15, 23, 42, 0.6)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto'
        }}>
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                s.execute();
                if (setActiveTab) setActiveTab(s.view);
              }}
              style={{
                flex: 1,
                minWidth: '32px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                background: s.step === currentStep ? s.color : s.step < currentStep ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                transition: 'var(--transition-fast)'
              }}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

        {/* Active Step Display Body */}
        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: `rgba(${parseInt(activeStepObj.color.slice(1,3),16)}, ${parseInt(activeStepObj.color.slice(3,5),16)}, ${parseInt(activeStepObj.color.slice(5,7),16)}, 0.2)`,
              border: `1px solid ${activeStepObj.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <activeStepObj.icon size={24} color={activeStepObj.color} />
            </div>

            <div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: activeStepObj.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                STEP {activeStepObj.step} OF 8 • ROLE: {activeStepObj.role.toUpperCase()}
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {activeStepObj.title}
              </h4>
            </div>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-secondary)',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {activeStepObj.description}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <button
              onClick={handleReset}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <RotateCcw size={15} />
              <span>Reset Demo</span>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="btn btn-secondary"
                style={{ opacity: currentStep === 1 ? 0.4 : 1 }}
              >
                <ChevronLeft size={16} />
                <span>Previous Step</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === steps.length}
                className="btn btn-primary"
                style={{ opacity: currentStep === steps.length ? 0.4 : 1 }}
              >
                <span>{activeStepObj.actionLabel}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
