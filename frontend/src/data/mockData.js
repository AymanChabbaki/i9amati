// Mock data for Iqamati platform

export const mockPayments = [
  {
    id: '1',
    date: 'Nov 2024',
    type: 'Monthly Charges',
    amount: 320.00,
    status: 'paid',
    currency: '€'
  },
  {
    id: '2',
    date: 'Oct 2024',
    type: 'Special Assessment',
    amount: 150.00,
    status: 'paid',
    currency: '€'
  },
  {
    id: '3',
    date: 'Sep 2024',
    type: 'Monthly Charges',
    amount: 320.00,
    status: 'pending',
    currency: '€'
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Annual General Meeting',
    date: 'December 15, 2024',
    time: '7:00 PM',
    location: 'Residential Complex A - Conference Room',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Budget Proposal Voting',
    date: 'December 10, 2024',
    description: 'Action required: Cast your vote',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Maintenance Schedule',
    date: 'December 8, 2024',
    time: '9:00 AM',
    description: 'Elevator maintenance - Building A',
    type: 'maintenance'
  }
];

export const mockVotes = [
  {
    id: '1',
    title: '2024 Annual Budget Approval',
    description: 'Vote on the proposed annual budget for building maintenance, security, and improvements.',
    deadline: 'Dec 10, 2024',
    totalOwners: 78,
    participated: 45
  },
  {
    id: '2',
    title: 'New Security System Installation',
    description: 'Proposal to install upgraded security cameras and access control systems.',
    deadline: 'Dec 15, 2024',
    totalOwners: 78,
    participated: 23
  }
];

export const mockPosts = [
  {
    id: '1',
    author: 'Mohammed Rahman',
    authorInitials: 'MR',
    content: 'Thanks to everyone who helped with the courtyard cleanup last weekend! The garden looks amazing now.',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    author: 'Sarah Younes',
    authorInitials: 'SY',
    content: 'Reminder: Please keep noise levels down after 10 PM. We\'ve had several complaints this week.',
    timestamp: '1 day ago',
    likes: 8,
    comments: 5
  }
];

export const mockComplaints = [
  {
    id: '1',
    title: 'Elevator Making Strange Noises',
    description: 'The elevator in Building A has been making unusual grinding sounds for the past week.',
    category: 'Maintenance',
    status: 'in-progress',
    submittedAt: 'Nov 28, 2024',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Parking Lot Lighting',
    description: 'Several lights in the parking area are not working, making it unsafe at night.',
    category: 'Safety',
    status: 'open',
    submittedAt: 'Nov 25, 2024',
    priority: 'medium'
  }
];

export const mockDocuments = [
  {
    id: '1',
    title: 'Building Regulations 2024',
    type: 'PDF',
    category: 'Legal',
    uploadedAt: 'Nov 15, 2024',
    size: '2.4 MB',
    url: '#'
  },
  {
    id: '2',
    title: 'Monthly Financial Report',
    type: 'PDF',
    category: 'Financial',
    uploadedAt: 'Nov 1, 2024',
    size: '1.8 MB',
    url: '#'
  }
];

export const mockVisitors = [
  {
    id: '1',
    name: 'John Smith',
    purpose: 'Family Visit',
    visitDate: 'Dec 5, 2024',
    visitTime: '2:00 PM',
    status: 'approved',
    submittedAt: 'Dec 1, 2024'
  },
  {
    id: '2',
    name: 'AC Repair Service',
    purpose: 'Maintenance',
    visitDate: 'Dec 3, 2024',
    visitTime: '10:00 AM',
    status: 'pending',
    submittedAt: 'Nov 30, 2024'
  }
];

export const mockStats = {
  paymentStatus: 'Up to Date',
  ownershipShare: '12.5%',
  pendingVotes: 2,
  openComplaints: 1,
  unreadNotifications: 3
};
