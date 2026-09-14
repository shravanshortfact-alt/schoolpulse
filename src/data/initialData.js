// Initial seed data for P.N. National Public School Portal
export const INITIAL_DATA = {
  schoolInfo: {
    name: 'P.N. National Public School',
    shortName: 'PNNPS',
    tagline: 'Affiliated to CBSE Delhi 10+2 (Affiliation No. 2131645)',
    motto: 'तमसो मा ज्योतिर्गमय',
    logo: '/pn_logo.png'
  },
  activeUser: null, // Forces initial landing on Login Screen
  classes: ['12-A', '11-B', '10-A', '9-C', '8-A', '7-A', '6-A'],
  emergencyAlert: {
    active: false,
    title: '⚠️ Weather Alert: School Half-Day Announcement',
    message: 'Due to severe weather warnings in Delhi-NCR, P.N. National Public School will close at 12:30 PM today. Buses will depart at 12:45 PM.',
    timestamp: 'Just now',
    author: 'Dr. Anil Singh (Principal)'
  },
  demoUsers: [
    {
      id: 's1',
      username: '1201',
      password: '123',
      role: 'student',
      name: 'Aman Yadav',
      classId: '12-A',
      rollNo: '1201',
      parentId: 'p1',
      avatar: '/aman_sharma.jpg',
      details: 'Class 12-A • Science Stream'
    },
    {
      id: 'p1',
      username: '9876543210',
      password: '123',
      role: 'parent',
      name: 'Ramesh Yadav',
      studentId: 's1',
      studentName: 'Aman Yadav',
      avatar: '/raj_sharma.jpg',
      details: 'Parent of Aman Yadav (12-A)'
    },
    {
      id: 't1',
      username: 'teacher',
      password: '123',
      role: 'teacher',
      name: 'Mrs. Priya Verma',
      subject: 'Mathematics',
      classTeacher: '12-A',
      avatar: '/priya_verma.jpg',
      details: 'Head of Mathematics • Class Teacher 12-A'
    },
    {
      id: 'a1',
      username: 'admin',
      password: '123',
      role: 'principal',
      name: 'Dr. Anil Singh',
      title: 'Principal',
      avatar: '/anil_singh.jpg',
      details: 'Principal & Academic Director'
    }
  ],
  students: [
    // Class 12-A
    { id: 's1', name: 'Aman Yadav', classId: '12-A', rollNo: '1201', attendancePct: 87, homeworkPct: 78, lateCount: 2, followUps: 3, status: 'Attendance Concern', parentName: 'Ramesh Yadav', parentPhone: '+91 98765 43210', avatar: '/aman_sharma.jpg', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's2', name: 'Ananya Gupta', classId: '12-A', rollNo: '1202', attendancePct: 96, homeworkPct: 94, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Sanjay Gupta', parentPhone: '+91 98765 43211', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's3', name: 'Rohan Mehta', classId: '12-A', rollNo: '1203', attendancePct: 82, homeworkPct: 70, lateCount: 4, followUps: 2, status: 'Homework Support', parentName: 'Vikram Mehta', parentPhone: '+91 98765 43212', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's4', name: 'Sneha Patel', classId: '12-A', rollNo: '1204', attendancePct: 98, homeworkPct: 98, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Kiran Patel', parentPhone: '+91 98765 43213', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's5', name: 'Devansh Verma', classId: '12-A', rollNo: '1205', attendancePct: 91, homeworkPct: 85, lateCount: 1, followUps: 1, status: 'On Track', parentName: 'Alok Verma', parentPhone: '+91 98765 43214', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's6', name: 'Ishita Roy', classId: '12-A', rollNo: '1206', attendancePct: 89, homeworkPct: 82, lateCount: 1, followUps: 1, status: 'Follow-up Required', parentName: 'Subhash Roy', parentPhone: '+91 98765 43215', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },
    { id: 's7', name: 'Kabir Nair', classId: '12-A', rollNo: '1207', attendancePct: 94, homeworkPct: 90, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Ramesh Nair', parentPhone: '+91 98765 43216', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's8', name: 'Diya Joshi', classId: '12-A', rollNo: '1208', attendancePct: 92, homeworkPct: 88, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Mahesh Joshi', parentPhone: '+91 98765 43217', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's9', name: 'Ayush Kumar', classId: '12-A', rollNo: '1209', attendancePct: 88, homeworkPct: 80, lateCount: 2, followUps: 1, status: 'Needs Attention', parentName: 'Rakesh Kumar', parentPhone: '+91 98765 43230', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's10', name: 'Pooja Trivedi', classId: '12-A', rollNo: '1210', attendancePct: 95, homeworkPct: 92, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Gopal Trivedi', parentPhone: '+91 98765 43231', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },

    // Class 11-B
    { id: 's11', name: 'Aarav Sharma', classId: '11-B', rollNo: '1101', attendancePct: 94, homeworkPct: 90, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Sanjeev Sharma', parentPhone: '+91 98765 44001', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },
    { id: 's12', name: 'Riya Kapoor', classId: '11-B', rollNo: '1102', attendancePct: 88, homeworkPct: 82, lateCount: 2, followUps: 1, status: 'Follow-up Required', parentName: 'Amit Kapoor', parentPhone: '+91 98765 44002', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's13', name: 'Vivaan Saxena', classId: '11-B', rollNo: '1103', attendancePct: 96, homeworkPct: 95, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Rahul Saxena', parentPhone: '+91 98765 44003', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's14', name: 'Tanvi Choudhury', classId: '11-B', rollNo: '1104', attendancePct: 91, homeworkPct: 86, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Deep Choudhury', parentPhone: '+91 98765 44004', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's15', name: 'Yashwardhan Singh', classId: '11-B', rollNo: '1105', attendancePct: 85, homeworkPct: 76, lateCount: 3, followUps: 2, status: 'Homework Support', parentName: 'Rajendra Singh', parentPhone: '+91 98765 44005', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },

    // Class 10-A
    { id: 's16', name: 'Aditya Sen', classId: '10-A', rollNo: '1001', attendancePct: 95, homeworkPct: 92, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Partha Sen', parentPhone: '+91 98765 44011', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's17', name: 'Meera Deshmukh', classId: '10-A', rollNo: '1002', attendancePct: 97, homeworkPct: 96, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Nitin Deshmukh', parentPhone: '+91 98765 44012', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's18', name: 'Parth Agarwal', classId: '10-A', rollNo: '1003', attendancePct: 89, homeworkPct: 81, lateCount: 1, followUps: 1, status: 'Attendance Concern', parentName: 'Manoj Agarwal', parentPhone: '+91 98765 44013', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's19', name: 'Siya Malhotra', classId: '10-A', rollNo: '1004', attendancePct: 93, homeworkPct: 89, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Vishal Malhotra', parentPhone: '+91 98765 44014', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's20', name: 'Harshit Pandey', classId: '10-A', rollNo: '1005', attendancePct: 91, homeworkPct: 84, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Sunil Pandey', parentPhone: '+91 98765 44015', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },

    // Class 9-C
    { id: 's21', name: 'Arjun Khanna', classId: '9-C', rollNo: '901', attendancePct: 92, homeworkPct: 88, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Tarun Khanna', parentPhone: '+91 98765 44021', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's22', name: 'Kavyanjali Bose', classId: '9-C', rollNo: '902', attendancePct: 96, homeworkPct: 94, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Debashis Bose', parentPhone: '+91 98765 44022', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's23', name: 'Reyansh Bhatia', classId: '9-C', rollNo: '903', attendancePct: 86, homeworkPct: 78, lateCount: 3, followUps: 2, status: 'Homework Support', parentName: 'Karan Bhatia', parentPhone: '+91 98765 44023', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's24', name: 'Anika Pillai', classId: '9-C', rollNo: '904', attendancePct: 98, homeworkPct: 97, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Suresh Pillai', parentPhone: '+91 98765 44024', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's25', name: 'Siddharth Kulkarni', classId: '9-C', rollNo: '905', attendancePct: 90, homeworkPct: 85, lateCount: 1, followUps: 1, status: 'Follow-up Required', parentName: 'Vinay Kulkarni', parentPhone: '+91 98765 44025', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },

    // Class 8-A
    { id: 's26', name: 'Dhruv Bansal', classId: '8-A', rollNo: '801', attendancePct: 94, homeworkPct: 91, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Pawan Bansal', parentPhone: '+91 98765 44031', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's27', name: 'Navya Reddy', classId: '8-A', rollNo: '802', attendancePct: 97, homeworkPct: 95, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Venkat Reddy', parentPhone: '+91 98765 44032', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's28', name: 'Shreyas Iyer', classId: '8-A', rollNo: '803', attendancePct: 88, homeworkPct: 82, lateCount: 2, followUps: 1, status: 'Attendance Concern', parentName: 'Narayanan Iyer', parentPhone: '+91 98765 44033', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's29', name: 'Tara Nambiar', classId: '8-A', rollNo: '804', attendancePct: 96, homeworkPct: 93, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Madhavan Nambiar', parentPhone: '+91 98765 44034', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's30', name: 'Utkarsh Rastogi', classId: '8-A', rollNo: '805', attendancePct: 92, homeworkPct: 87, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Alok Rastogi', parentPhone: '+91 98765 44035', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },

    // Class 7-A
    { id: 's31', name: 'Vihaan Mukherji', classId: '7-A', rollNo: '701', attendancePct: 95, homeworkPct: 93, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Sourav Mukherji', parentPhone: '+91 98765 44041', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's32', name: 'Prisha Saxena', classId: '7-A', rollNo: '702', attendancePct: 98, homeworkPct: 97, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Rohit Saxena', parentPhone: '+91 98765 44042', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's33', name: 'Samarth Jain', classId: '7-A', rollNo: '703', attendancePct: 90, homeworkPct: 85, lateCount: 1, followUps: 1, status: 'Follow-up Required', parentName: 'Pradeep Jain', parentPhone: '+91 98765 44043', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's34', name: 'Avani Tripathi', classId: '7-A', rollNo: '704', attendancePct: 93, homeworkPct: 89, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Upendra Tripathi', parentPhone: '+91 98765 44044', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's35', name: 'Neil Singhania', classId: '7-A', rollNo: '705', attendancePct: 87, homeworkPct: 79, lateCount: 2, followUps: 2, status: 'Homework Support', parentName: 'Rajiv Singhania', parentPhone: '+91 98765 44045', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' },

    // Class 6-A
    { id: 's36', name: 'Kabir Ahuja', classId: '6-A', rollNo: '601', attendancePct: 96, homeworkPct: 94, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Mohit Ahuja', parentPhone: '+91 98765 44051', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's37', name: 'Myra Tandon', classId: '6-A', rollNo: '602', attendancePct: 99, homeworkPct: 98, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Gaurav Tandon', parentPhone: '+91 98765 44052', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #02 (Model Town)' },
    { id: 's38', name: 'Tanishq Bajaj', classId: '6-A', rollNo: '603', attendancePct: 91, homeworkPct: 86, lateCount: 1, followUps: 0, status: 'On Track', parentName: 'Varun Bajaj', parentPhone: '+91 98765 44053', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #01 (Rohini Sector 9)' },
    { id: 's39', name: 'Janhavi Joshi', classId: '6-A', rollNo: '604', attendancePct: 94, homeworkPct: 90, lateCount: 0, followUps: 0, status: 'On Track', parentName: 'Hemant Joshi', parentPhone: '+91 98765 44054', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #04 (Civil Lines)' },
    { id: 's40', name: 'Rayaan Chawla', classId: '6-A', rollNo: '605', attendancePct: 89, homeworkPct: 83, lateCount: 2, followUps: 1, status: 'Follow-up Required', parentName: 'Sameer Chawla', parentPhone: '+91 98765 44055', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', busRoute: 'Route #03 (Pitampura)' }
  ],
  reportCard: {
    studentId: 's1',
    studentName: 'Aman Yadav',
    classId: '12-A',
    rollNo: '1201',
    term: 'Mid-Term Examinations 2026-27',
    academicYear: '2026-2027',
    subjects: [
      { code: 'MATH-041', name: 'Mathematics', maxMarks: 100, marksObtained: 88, grade: 'A1', remarks: 'Strong logical concepts' },
      { code: 'PHY-042', name: 'Physics', maxMarks: 100, marksObtained: 84, grade: 'A2', remarks: 'Good practical analysis' },
      { code: 'CHEM-043', name: 'Chemistry', maxMarks: 100, marksObtained: 90, grade: 'A1', remarks: 'Excellent in organic synthesis' },
      { code: 'ENG-301', name: 'English Core', maxMarks: 100, marksObtained: 92, grade: 'A1', remarks: 'Articulate writing' },
      { code: 'CS-083', name: 'Computer Science', maxMarks: 100, marksObtained: 95, grade: 'A1', remarks: 'Outstanding programming' }
    ],
    totalMax: 500,
    totalObtained: 449,
    percentage: 89.8,
    rankInClass: '4th out of 42',
    result: 'PASSED (DISTINCTION)',
    teacherRemarks: 'Aman is a bright student with excellent potential. Regular review in calculus integration will ensure top board scores.',
    principalSeal: true
  },
  timetable: [
    { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Mathematics', teacher: 'Mrs. Priya Verma', room: 'Room 204', active: false },
    { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Physics', teacher: 'Mr. Arvind Rao', room: 'Physics Lab', active: false },
    { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Chemistry', teacher: 'Dr. Sunita Bansal', room: 'Chemistry Lab', active: true },
    { period: 4, time: '10:15 AM - 10:45 AM', subject: 'Recess / Break', teacher: 'Staff Duty', room: 'Cafeteria / Courtyard', active: false },
    { period: 5, time: '10:45 AM - 11:30 AM', subject: 'English Core', teacher: 'Ms. Ritu Sharma', room: 'Room 204', active: false },
    { period: 6, time: '11:30 AM - 12:15 PM', subject: 'Computer Science', teacher: 'Mr. Rajesh Mehra', room: 'Computer Lab 1', active: false },
    { period: 7, time: '12:15 PM - 01:00 PM', subject: 'Physical Education / Library', teacher: 'Coach Vikram Singh', room: 'Sports Complex', active: false }
  ],
  transport: {
    busNo: 'Bus #04',
    route: 'Route #04 — Civil Lines to P.N. National Public School',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98765 11223',
    vehicleNo: 'UP 53 AT 4092',
    status: 'In Transit',
    currentStop: 'Civil Lines Metro Station Stop (Stop #3 of 6)',
    nextStop: 'Mall Road Crossing',
    etaMinutes: 8,
    speedKm: 34,
    stops: [
      { name: 'Model Town III Depot', time: '07:15 AM', status: 'passed' },
      { name: 'Civil Lines Metro Station', time: '07:30 AM', status: 'current' },
      { name: 'Mall Road Crossing', time: '07:42 AM', status: 'upcoming' },
      { name: 'Kamla Nagar Square', time: '07:50 AM', status: 'upcoming' },
      { name: 'P.N. National Public School Gate', time: '08:00 AM', status: 'upcoming' }
    ]
  },
  ptmSlots: [
    {
      id: 'ptm-1',
      parentId: 'p1',
      parentName: 'Ramesh Yadav',
      studentName: 'Aman Yadav',
      teacherId: 't1',
      teacherName: 'Mrs. Priya Verma',
      subject: 'Mathematics Calculus Progress & Mid-Terms Review',
      date: 'Sep 18, 2026',
      timeSlot: '04:00 PM - 04:15 PM',
      status: 'Confirmed',
      meetingType: 'In-Person / Virtual Pass'
    }
  ],
  todayAttendance: {
    date: '2026-09-14',
    records: {
      's1': { status: 'Present', time: '08:15 AM' },
      's2': { status: 'Present', time: '08:10 AM' },
      's3': { status: 'Late', time: '08:45 AM' },
      's4': { status: 'Present', time: '08:05 AM' },
      's5': { status: 'Present', time: '08:12 AM' },
      's6': { status: 'Present', time: '08:14 AM' },
      's7': { status: 'Present', time: '08:08 AM' },
      's8': { status: 'Present', time: '08:16 AM' }
    }
  },
  homework: [
    {
      id: 'hw1',
      subject: 'Mathematics',
      title: 'Calculus: Integration by Parts Ex. 4.2',
      description: 'Complete problems 1 through 15 in notebook. Focus on definite integrals.',
      assignedDate: '2026-09-14',
      dueDate: '2026-09-16',
      classId: '12-A',
      teacherName: 'Mrs. Priya Verma',
      completedBy: ['s2', 's4', 's5', 's7']
    },
    {
      id: 'hw2',
      subject: 'Physics',
      title: 'Electromagnetic Induction Numerical Problems',
      description: 'Solve questions from Chapter 6, Page 142.',
      assignedDate: '2026-09-13',
      dueDate: '2026-09-15',
      classId: '12-A',
      teacherName: 'Mr. Arvind Rao',
      completedBy: ['s1', 's2', 's4', 's5', 's6', 's7', 's8']
    },
    {
      id: 'hw3',
      subject: 'Chemistry',
      title: 'Organic Chemistry Reactions Worksheet',
      description: 'Prepare mindmap for Aldehydes and Ketones synthesis.',
      assignedDate: '2026-09-12',
      dueDate: '2026-09-14',
      classId: '12-A',
      teacherName: 'Dr. Sunita Bansal',
      completedBy: ['s2', 's3', 's4', 's6', 's8']
    }
  ],
  notices: [
    {
      id: 'n1',
      title: 'P.N. National Public School: Half-Day Announcement',
      content: 'Please note that tomorrow, September 15th, will be a half-day for staff development. School buses will depart at 12:30 PM.',
      author: 'Dr. Anil Singh (Principal)',
      date: '2026-09-14',
      audience: 'All (Students, Parents, Staff)',
      priority: 'Important',
      pinned: true
    },
    {
      id: 'n2',
      title: 'CBSE Board Exam Preparation Schedule',
      content: 'Mid-Term revision schedules and mock test timetables for Class 10 & 12 have been uploaded to the student portal.',
      author: 'Academic Office',
      date: '2026-09-10',
      audience: 'Students & Parents',
      priority: 'Standard',
      pinned: false
    }
  ],
  voiceMessages: [
    {
      id: 'vm1',
      studentId: 's1',
      studentName: 'Aman Yadav',
      teacherId: 't1',
      teacherName: 'Mrs. Priya Verma',
      teacherGender: 'female',
      parentId: 'p1',
      parentName: 'Ramesh Yadav',
      subject: 'Mathematics Homework & Attendance Check',
      audioText: 'नमस्ते मिस्टर यादव! मैं प्रिया वर्मा बोल रही हूँ। अमन ने गणित (Mathematics) के पिछले 2 होमवर्क जमा नहीं किए हैं। कृपया घर पर उसकी मदद करें ताकि वह मिड-टर्म परीक्षा की अच्छी तैयारी कर सके।',
      timestamp: 'Sep 13, 2026 04:30 PM',
      status: 'Acknowledged',
      seenAt: 'Sep 13, 2026 06:15 PM',
      acknowledgedAt: 'Sep 13, 2026 06:20 PM',
      parentReply: 'नमस्ते मैम, धन्यवाद! मैं आज ही अमन से गणित का सारा होमवर्क पूरा करवाऊँगा।'
    },
    {
      id: 'vm2',
      studentId: 's1',
      studentName: 'Aman Yadav',
      teacherId: 't2',
      teacherName: 'Mr. Arvind Rao',
      teacherGender: 'male',
      parentId: 'p1',
      parentName: 'Ramesh Yadav',
      subject: 'Physics Lab Performance Update',
      audioText: 'नमस्ते मिस्टर यादव! मैं अरविन्द राव बोल रहा हूँ। अमन फिजिक्स प्रैक्टिकल लैब में बहुत अच्छा प्रदर्शन कर रहा है। उसकी अटेंडेंस 87% है, कृपया इसे 90% से ऊपर रखने में मदद करें।',
      timestamp: 'Sep 14, 2026 10:15 AM',
      status: 'New Voice Note',
      seenAt: null,
      acknowledgedAt: null,
      parentReply: null
    }
  ],
  supportRequests: [
    {
      id: 'sr1',
      studentId: 's1',
      studentName: 'Aman Yadav',
      classId: '12-A',
      category: 'Homework problem',
      message: 'I am finding Integration by Parts in Calculus difficult and need extra help before exams.',
      submittedAt: 'Sep 12, 2026 05:10 PM',
      status: 'Needs Attention',
      assignedTeacher: 'Mrs. Priya Verma',
      teacherResponse: 'Scheduled 15-min doubt clearing session during zero period on Tuesday.'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      userRole: 'parent',
      userId: 'p1',
      title: '🔔 Attendance Alert',
      message: 'Aman Yadav was marked present today at 08:15 AM.',
      type: 'attendance',
      timestamp: 'Today, 08:15 AM',
      read: false,
      relatedId: 's1'
    },
    {
      id: 'notif-2',
      userRole: 'parent',
      userId: 'p1',
      title: '🔊 Voice Message Received',
      message: 'Mrs. Priya Verma sent an audio update regarding Aman.',
      type: 'voice',
      timestamp: 'Yesterday, 04:30 PM',
      read: false,
      relatedId: 'vm1'
    },
    {
      id: 'notif-3',
      userRole: 'student',
      userId: 's1',
      title: '📚 New Homework Assigned',
      message: 'Mathematics: Calculus Integration by Parts Ex 4.2 due Sep 16.',
      type: 'homework',
      timestamp: 'Today, 09:00 AM',
      read: false,
      relatedId: 'hw1'
    },
    {
      id: 'notif-4',
      userRole: 'teacher',
      userId: 't1',
      title: '💬 Parent Acknowledged Voice Note',
      message: 'Ramesh Yadav acknowledged your voice message regarding Aman Yadav.',
      type: 'voice',
      timestamp: 'Yesterday, 06:20 PM',
      read: true,
      relatedId: 'vm1'
    }
  ],
  supportTimeline: [
    { id: 'tl-1', date: 'Sept 10', type: 'attendance', title: 'Present in Class', description: 'Marked present at 08:10 AM', status: 'success' },
    { id: 'tl-2', date: 'Sept 11', type: 'homework', title: 'Mathematics Homework Pending', description: 'Integration worksheet submitted late', status: 'warning' },
    { id: 'tl-3', date: 'Sept 12', type: 'support', title: 'Student Help Request', description: 'Aman requested academic support in Calculus', status: 'info' },
    { id: 'tl-4', date: 'Sept 13', type: 'voice', title: 'Teacher Voice Update Sent', description: 'Mrs. Priya Verma sent voice update to parent', status: 'info' },
    { id: 'tl-5', date: 'Sept 13', type: 'parent', title: 'Parent Acknowledged', description: 'Mr. Ramesh Yadav listened to voice update & confirmed home revision', status: 'success' }
  ],
  exams: [
    { id: 'ex1', subject: 'Mathematics', date: '2026-09-28', time: '09:00 AM - 12:00 PM', room: 'Hall A', syllabus: 'Calculus, Vectors, 3D Geometry' },
    { id: 'ex2', subject: 'Physics', date: '2026-09-30', time: '09:00 AM - 12:00 PM', room: 'Lab 2', syllabus: 'Optics, Electromagnetic Induction' },
    { id: 'ex3', subject: 'Chemistry', date: '2026-10-03', time: '09:00 AM - 12:00 PM', room: 'Hall B', syllabus: 'Organic Chemistry, Solutions' }
  ],
  teacherFeedback: [
    { id: 'tf1', teacher: 'Mrs. Priya Verma', subject: 'Mathematics', comment: 'Aman shows strong logical capability in geometry. Daily 20-min practice in calculus integration will make him excel.', date: 'Sep 08, 2026' },
    { id: 'tf2', teacher: 'Mr. Arvind Rao', subject: 'Physics', comment: 'Demonstrates great interest in practical lab sessions. Good job!', date: 'Sep 05, 2026' }
  ]
};
