import { Order, AffiliateUser, User, PayoutRequest, EarningData } from '../types';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Database
let users: (User | AffiliateUser)[] = [
  // Admin User
  { id: 'ADM-001', name: 'Agilax Admin', email: 'agilaxstudios@gmail.com', role: 'admin' },
  // Affiliate User
  { 
    id: 'AFF-001', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'affiliate', 
    upiId: 'john@upi', 
    referralCode: 'AGX123', 
    totalReferrals: 5, 
    totalEarnings: 2500, 
    pendingPayout: 500, 
    paidAmount: 2000 
  }
];

// Stores passwords simply for mock purposes
const passwords: Record<string, string> = {
  'agilaxstudios@gmail.com': 'Admi@010302',
  'john@example.com': 'password'
};

let orders: Order[] = [
  { id: 'ORD-001', buyerEmail: 'client1@example.com', amount: 999, screenshotUrl: 'fake-img-1.jpg', status: 'completed', date: '2023-10-01', isBundleSent: true, referredBy: 'AGX123' },
];

let payouts: PayoutRequest[] = [
  { id: 'PAY-001', affiliateId: 'AFF-001', affiliateName: 'John Doe', affiliateUpi: 'john@upi', amount: 500, status: 'pending', date: '2023-10-03' }
];

export const mockService = {
  // Authentication
  login: async (email: string, password: string): Promise<User | AffiliateUser | null> => {
    await delay(800);
    if (passwords[email] === password) {
      const user = users.find(u => u.email === email);
      return user || null;
    }
    return null;
  },

  register: async (data: any): Promise<User | AffiliateUser> => {
    await delay(1000);
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) throw new Error("User already exists");

    passwords[data.email] = data.password;

    let newUser: User | AffiliateUser;

    if (data.isAffiliate) {
      newUser = {
        id: `AFF-${Math.floor(Math.random() * 10000)}`,
        name: data.name,
        email: data.email,
        role: 'affiliate',
        upiId: data.upiId || '',
        referralCode: `AGX${Math.floor(Math.random() * 1000)}`,
        totalReferrals: 0,
        totalEarnings: 0,
        pendingPayout: 0,
        paidAmount: 0
      } as AffiliateUser;
    } else {
      newUser = {
        id: `USR-${Math.floor(Math.random() * 10000)}`,
        name: data.name,
        email: data.email,
        role: 'user'
      };
    }

    users.push(newUser);
    return newUser;
  },
  
  updateUser: async (userId: string, updates: Partial<User | AffiliateUser>): Promise<User | AffiliateUser | null> => {
    await delay(500);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        return users[index];
    }
    return null;
  },

  // Orders
  submitOrder: async (email: string, screenshotFile: File | null): Promise<boolean> => {
    await delay(1000);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      buyerEmail: email,
      amount: 999,
      screenshotUrl: screenshotFile ? screenshotFile.name : 'no-image.jpg',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      isBundleSent: false
    };
    orders.push(newOrder);
    return true;
  },
  
  getOrders: async (): Promise<Order[]> => {
    await delay(500);
    return [...orders];
  },

  updateOrder: async (orderId: string, updates: Partial<Order>) => {
    await delay(500);
    orders = orders.map(o => o.id === orderId ? { ...o, ...updates } : o);
    return true;
  },

  // Data Getters for Admin/Affiliate
  getAllAffiliates: async (): Promise<AffiliateUser[]> => {
    await delay(500);
    return users.filter(u => u.role === 'affiliate') as AffiliateUser[];
  },

  getPayouts: async (): Promise<PayoutRequest[]> => {
    await delay(500);
    return [...payouts];
  },

  markPayoutPaid: async (payoutId: string) => {
    await delay(500);
    payouts = payouts.map(p => p.id === payoutId ? { ...p, status: 'paid' } : p);
    return true;
  },

  getEarningsHistory: async (): Promise<EarningData[]> => {
    return [
      { name: 'Mon', amount: 0 },
      { name: 'Tue', amount: 500 },
      { name: 'Wed', amount: 1000 },
      { name: 'Thu', amount: 500 },
      { name: 'Fri', amount: 1500 },
      { name: 'Sat', amount: 2000 },
      { name: 'Sun', amount: 2500 },
    ];
  }
};