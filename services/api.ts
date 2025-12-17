import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile as updateAuthProfile 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';
import { Order, AffiliateUser, User, PayoutRequest, EarningData } from '../types';

export const api = {
  // Authentication
  login: async (email: string, password: string): Promise<User | AffiliateUser | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: uid, ...userDoc.data() } as User | AffiliateUser;
      }
      return null;
    } catch (error) {
      console.error("Login error", error);
      return null;
    }
  },

  register: async (data: any): Promise<User | AffiliateUser | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;
      
      // Update display name in Auth
      await updateAuthProfile(userCredential.user, { displayName: data.name });

      let newUser: User | AffiliateUser;
      const isAdmin = data.email === 'agilaxstudios@gmail.com'; // Hardcoded admin check for initial setup

      if (data.isAffiliate && !isAdmin) {
        newUser = {
          id: uid,
          name: data.name,
          email: data.email,
          role: 'affiliate',
          upiId: data.upiId || '',
          referralCode: `AGX${Math.floor(1000 + Math.random() * 9000)}`, // Simple random code
          totalReferrals: 0,
          totalEarnings: 0,
          pendingPayout: 0,
          paidAmount: 0
        };
      } else {
        newUser = {
          id: uid,
          name: data.name,
          email: data.email,
          role: isAdmin ? 'admin' : 'user'
        };
      }

      // Store in Firestore
      await setDoc(doc(db, 'users', uid), newUser);
      return newUser;
    } catch (error) {
      console.error("Registration error", error);
      return null;
    }
  },

  logout: async () => {
    await signOut(auth);
  },

  getUserProfile: async (uid: string): Promise<User | AffiliateUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: uid, ...userDoc.data() } as User | AffiliateUser;
      }
      return null;
    } catch (e) {
      return null;
    }
  },
  
  updateUser: async (userId: string, updates: Partial<User | AffiliateUser>): Promise<User | AffiliateUser | null> => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, updates);
      
      const updatedSnap = await getDoc(userRef);
      return { id: userId, ...updatedSnap.data() } as User | AffiliateUser;
    } catch (error) {
      console.error("Update user error", error);
      return null;
    }
  },

  // Orders
  submitOrder: async (email: string, screenshotFile: File | null): Promise<boolean> => {
    try {
      let screenshotUrl = 'no-image.jpg';
      
      if (screenshotFile) {
        const storageRef = ref(storage, `payment_screenshots/${Date.now()}_${screenshotFile.name}`);
        const snapshot = await uploadBytes(storageRef, screenshotFile);
        screenshotUrl = await getDownloadURL(snapshot.ref);
      }

      const newOrder: Omit<Order, 'id'> = {
        buyerEmail: email,
        amount: 999,
        screenshotUrl: screenshotUrl,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        isBundleSent: false,
        // Check local storage for referral code (assuming it was saved there on visit)
        referredBy: localStorage.getItem('agilax_ref') || undefined
      };

      await addDoc(collection(db, 'orders'), newOrder);
      return true;
    } catch (error) {
      console.error("Order submission error", error);
      return false;
    }
  },
  
  getOrders: async (): Promise<Order[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() } as Order);
      });
      return orders;
    } catch (error) {
      console.error("Get orders error", error);
      return [];
    }
  },

  updateOrder: async (orderId: string, updates: Partial<Order>) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, updates);
      return true;
    } catch (error) {
      return false;
    }
  },

  // Admin / Affiliate Data
  getAllAffiliates: async (): Promise<AffiliateUser[]> => {
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'affiliate'));
      const querySnapshot = await getDocs(q);
      const affiliates: AffiliateUser[] = [];
      querySnapshot.forEach((doc) => {
        affiliates.push({ id: doc.id, ...doc.data() } as AffiliateUser);
      });
      return affiliates;
    } catch (error) {
      return [];
    }
  },

  getPayouts: async (): Promise<PayoutRequest[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'payouts'));
      const payouts: PayoutRequest[] = [];
      querySnapshot.forEach((doc) => {
        payouts.push({ id: doc.id, ...doc.data() } as PayoutRequest);
      });
      return payouts;
    } catch (error) {
      return [];
    }
  },

  markPayoutPaid: async (payoutId: string) => {
    try {
      await updateDoc(doc(db, 'payouts', payoutId), { status: 'paid' });
      return true;
    } catch (error) {
      return false;
    }
  },

  getEarningsHistory: async (): Promise<EarningData[]> => {
    // Basic implementation: Aggregating orders locally for now
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const dailyMap: Record<string, number> = {};
      
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      // Initialize 0
      days.forEach(d => dailyMap[d] = 0);

      querySnapshot.forEach(doc => {
        const data = doc.data() as Order;
        const date = new Date(data.date);
        const dayName = days[date.getDay()];
        dailyMap[dayName] += data.amount;
      });

      return Object.keys(dailyMap).map(key => ({
        name: key,
        amount: dailyMap[key]
      }));
    } catch (error) {
      return [
        { name: 'Mon', amount: 0 },
        { name: 'Tue', amount: 0 },
        { name: 'Wed', amount: 0 },
        { name: 'Thu', amount: 0 },
        { name: 'Fri', amount: 0 },
        { name: 'Sat', amount: 0 },
        { name: 'Sun', amount: 0 },
      ];
    }
  }
};