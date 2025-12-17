export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'affiliate' | 'admin';
}

export interface AffiliateUser extends User {
  upiId: string;
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  pendingPayout: number;
  paidAmount: number;
}

export interface Order {
  id: string;
  buyerEmail: string;
  amount: number;
  screenshotUrl: string; // Simulated URL
  status: 'pending' | 'completed';
  date: string;
  isBundleSent: boolean;
  referredBy?: string; // Referral code
}

export interface PayoutRequest {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateUpi: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

// Chart Data Types
export interface EarningData {
  name: string;
  amount: number;
}