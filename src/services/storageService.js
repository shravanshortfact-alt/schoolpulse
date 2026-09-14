import { INITIAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'schoolpulse_demo_state_v11';

class StorageService {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.students || parsed.students.length < INITIAL_DATA.students.length) {
          parsed.students = INITIAL_DATA.students;
        }
        if (!parsed.reportCard) {
          parsed.reportCard = INITIAL_DATA.reportCard;
        }
        if (!parsed.transport) {
          parsed.transport = INITIAL_DATA.transport;
        }
        if (!parsed.timetable) {
          parsed.timetable = INITIAL_DATA.timetable;
        }
        if (!parsed.ptmSlots) {
          parsed.ptmSlots = INITIAL_DATA.ptmSlots;
        }
        if (!parsed.emergencyAlert) {
          parsed.emergencyAlert = INITIAL_DATA.emergencyAlert;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage, falling back to initial data', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState(newState) {
    this.state = newState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
    this.notifyListeners();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  resetDemo() {
    const fresh = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveState(fresh);
    return fresh;
  }

  // Active User / Role management
  setActiveUser(user) {
    const newState = { ...this.state, activeUser: user };
    this.saveState(newState);
  }

  // Emergency Alert Toggle (Principal)
  toggleEmergencyAlert(active, title = '', message = '') {
    const newState = { ...this.state };
    newState.emergencyAlert = {
      active,
      title: title || '⚠️ Emergency Weather Announcement',
      message: message || 'P.N. National Public School will close at 12:30 PM due to heavy weather alerts.',
      timestamp: 'Just now',
      author: 'Dr. Anil Singh (Principal)'
    };
    this.saveState(newState);
  }

  // PTM Appointment Booking
  bookPtmSlot({ date, timeSlot, subject }) {
    const newState = { ...this.state };
    const newSlot = {
      id: 'ptm-' + Date.now(),
      parentId: 'p1',
      parentName: 'Ramesh Yadav',
      studentName: 'Aman Yadav',
      teacherId: 't1',
      teacherName: 'Mrs. Priya Verma',
      subject: subject || 'Mathematics Calculus Progress Review',
      date: date || 'Sep 18, 2026',
      timeSlot: timeSlot || '04:00 PM - 04:15 PM',
      status: 'Confirmed',
      meetingType: 'In-Person / Virtual Pass'
    };
    newState.ptmSlots = [newSlot, ...newState.ptmSlots];

    // Notification to Teacher
    const notif = {
      id: 'notif-ptm-' + Date.now(),
      userRole: 'teacher',
      userId: 't1',
      title: '📅 PTM Meeting Booked',
      message: `Ramesh Yadav booked a PTM meeting for ${newSlot.date} (${newSlot.timeSlot}).`,
      type: 'voice',
      timestamp: 'Just now',
      read: false,
      relatedId: newSlot.id
    };
    newState.notifications = [notif, ...newState.notifications];

    this.saveState(newState);
  }

  // Attendance Management
  markAttendance(studentId, status, time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
    const newState = { ...this.state };
    const date = '2026-09-14';
    
    if (!newState.todayAttendance) {
      newState.todayAttendance = { date, records: {} };
    }
    
    newState.todayAttendance.records[studentId] = { status, time };

    const studentIndex = newState.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
      const student = { ...newState.students[studentIndex] };
      if (status === 'Absent') {
        student.status = 'Attendance Concern';
        student.attendancePct = Math.max(70, student.attendancePct - 2);
        
        const notif = {
          id: 'notif-' + Date.now(),
          userRole: 'parent',
          userId: student.parentId || 'p1',
          title: '🔔 Attendance Alert',
          message: `${student.name} was marked absent today in Class ${student.classId}.`,
          type: 'attendance',
          timestamp: 'Just now',
          read: false,
          relatedId: studentId
        };
        newState.notifications = [notif, ...newState.notifications];

        if (studentId === 's1') {
          newState.supportTimeline = [
            {
              id: 'tl-' + Date.now(),
              date: 'Sept 14',
              type: 'attendance',
              title: 'Marked Absent Today',
              description: `Parent ${student.parentName} notified automatically via SMS/App alert`,
              status: 'danger'
            },
            ...newState.supportTimeline
          ];
        }
      } else if (status === 'Present') {
        if (student.status === 'Attendance Concern') {
          student.status = 'Follow-up Required';
        }
      } else if (status === 'Late') {
        student.lateCount += 1;
      }
      newState.students[studentIndex] = student;
    }

    this.saveState(newState);
  }

  // Teacher Voice Updates
  sendVoiceMessage({ studentId, teacherId, subject, audioText }) {
    const newState = { ...this.state };
    const student = newState.students.find(s => s.id === studentId) || { name: 'Aman Yadav', parentName: 'Ramesh Yadav', parentId: 'p1' };
    
    const newVm = {
      id: 'vm-' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      teacherId: teacherId || 't1',
      teacherName: 'Mrs. Priya Verma',
      parentId: student.parentId || 'p1',
      parentName: student.parentName,
      subject: subject || 'Academic & Homework Progress Update',
      audioText: audioText || `Hello ${student.parentName}, I wanted to give you a quick update regarding ${student.name}'s progress today.`,
      timestamp: 'Just now',
      status: 'Sent',
      seenAt: null,
      acknowledgedAt: null,
      parentReply: null
    };

    newState.voiceMessages = [newVm, ...newState.voiceMessages];

    const notif = {
      id: 'notif-vm-' + Date.now(),
      userRole: 'parent',
      userId: student.parentId || 'p1',
      title: '🔊 Teacher Voice Message',
      message: `Mrs. Priya Verma sent an audio update regarding ${student.name}.`,
      type: 'voice',
      timestamp: 'Just now',
      read: false,
      relatedId: newVm.id
    };

    newState.notifications = [notif, ...newState.notifications];

    if (studentId === 's1') {
      newState.supportTimeline = [
        {
          id: 'tl-vm-' + Date.now(),
          date: 'Sept 14',
          type: 'voice',
          title: 'Teacher Voice Update Sent',
          description: 'Voice note transmitted to parent portal',
          status: 'info'
        },
        ...newState.supportTimeline
      ];
    }

    this.saveState(newState);
    return newVm;
  }

  // Parent Voice Message Acknowledgement
  acknowledgeVoiceMessage(vmId, replyText = '') {
    const newState = { ...this.state };
    const vmIndex = newState.voiceMessages.findIndex(v => v.id === vmId);
    
    if (vmIndex !== -1) {
      const vm = { ...newState.voiceMessages[vmIndex] };
      vm.status = 'Acknowledged';
      vm.acknowledgedAt = 'Just now';
      if (replyText) {
        vm.parentReply = replyText;
      }
      newState.voiceMessages[vmIndex] = vm;

      const notif = {
        id: 'notif-ack-' + Date.now(),
        userRole: 'teacher',
        userId: vm.teacherId || 't1',
        title: '✓ Parent Acknowledged Voice Note',
        message: `${vm.parentName} acknowledged your voice update regarding ${vm.studentName}.`,
        type: 'voice',
        timestamp: 'Just now',
        read: false,
        relatedId: vm.id
      };
      newState.notifications = [notif, ...newState.notifications];

      if (vm.studentId === 's1') {
        newState.supportTimeline = [
          {
            id: 'tl-ack-' + Date.now(),
            date: 'Sept 14',
            type: 'parent',
            title: 'Parent Acknowledged Voice Note',
            description: `${vm.parentName} verified audio update and confirmed home support.`,
            status: 'success'
          },
          ...newState.supportTimeline
        ];
      }
    }

    this.saveState(newState);
  }

  // Homework creation
  createHomework(hwData) {
    const newState = { ...this.state };
    const newHw = {
      id: 'hw-' + Date.now(),
      subject: hwData.subject || 'Mathematics',
      title: hwData.title,
      description: hwData.description,
      assignedDate: '2026-09-14',
      dueDate: hwData.dueDate || '2026-09-16',
      classId: hwData.classId || '12-A',
      teacherName: 'Mrs. Priya Verma',
      completedBy: []
    };

    newState.homework = [newHw, ...newState.homework];

    const notif = {
      id: 'notif-hw-' + Date.now(),
      userRole: 'student',
      userId: 's1',
      title: '📚 New Homework Assigned',
      message: `${newHw.subject}: ${newHw.title} (Due: ${newHw.dueDate})`,
      type: 'homework',
      timestamp: 'Just now',
      relatedId: newHw.id
    };
    newState.notifications = [notif, ...newState.notifications];

    this.saveState(newState);
  }

  toggleHomeworkCompletion(hwId, studentId = 's1') {
    const newState = { ...this.state };
    const hwIndex = newState.homework.findIndex(h => h.id === hwId);
    
    if (hwIndex !== -1) {
      const hw = { ...newState.homework[hwIndex] };
      if (hw.completedBy.includes(studentId)) {
        hw.completedBy = hw.completedBy.filter(id => id !== studentId);
      } else {
        hw.completedBy = [...hw.completedBy, studentId];
      }
      newState.homework[hwIndex] = hw;
    }

    this.saveState(newState);
  }

  submitHelpRequest({ category, message }) {
    const newState = { ...this.state };
    const req = {
      id: 'sr-' + Date.now(),
      studentId: 's1',
      studentName: 'Aman Yadav',
      classId: '12-A',
      category: category || 'Study problem',
      message: message || 'I need help understanding recent class concepts.',
      submittedAt: 'Just now',
      status: 'Needs Attention',
      assignedTeacher: 'Mrs. Priya Verma',
      teacherResponse: null
    };

    newState.supportRequests = [req, ...newState.supportRequests];

    const notif = {
      id: 'notif-sr-' + Date.now(),
      userRole: 'teacher',
      userId: 't1',
      title: '🙋 Student Support Request',
      message: `Aman Sharma submitted a support request: [${category}]`,
      type: 'support',
      timestamp: 'Just now',
      read: false,
      relatedId: req.id
    };
    newState.notifications = [notif, ...newState.notifications];

    newState.supportTimeline = [
      {
        id: 'tl-sr-' + Date.now(),
        date: 'Sept 14',
        type: 'support',
        title: `Help Request Submitted (${category})`,
        description: 'Privately routed to Class Teacher & Counselor',
        status: 'info'
      },
      ...newState.supportTimeline
    ];

    this.saveState(newState);
  }

  publishNotice({ title, content, audience, priority }) {
    const newState = { ...this.state };
    const newNotice = {
      id: 'n-' + Date.now(),
      title,
      content,
      author: 'Dr. Anil Singh (Principal)',
      date: '2026-09-14',
      audience: audience || 'All (Students, Parents, Staff)',
      priority: priority || 'Important',
      pinned: true
    };

    newState.notices = [newNotice, ...newState.notices];

    ['student', 'parent', 'teacher'].forEach(role => {
      newState.notifications.unshift({
        id: `notif-notice-${role}-${Date.now()}`,
        userRole: role,
        userId: role === 'student' ? 's1' : role === 'parent' ? 'p1' : 't1',
        title: '📢 Official School Notice',
        message: title,
        type: 'notice',
        timestamp: 'Just now',
        read: false,
        relatedId: newNotice.id
      });
    });

    this.saveState(newState);
  }

  markNotificationRead(id) {
    const newState = { ...this.state };
    const n = newState.notifications.find(item => item.id === id);
    if (n) {
      n.read = true;
    }
    this.saveState(newState);
  }

  markAllNotificationsRead(userRole) {
    const newState = { ...this.state };
    newState.notifications.forEach(n => {
      if (n.userRole === userRole) {
        n.read = true;
      }
    });
    this.saveState(newState);
  }
}

export const storageService = new StorageService();
