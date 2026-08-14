export interface IBankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
  branchName?: string;
}

export interface WelfareCase {
  _id: string;
  caseNumber: string;
  applicantName: string;
  applicantPhone: string;
  applicantAddress: string;
  applicantGovtId?: string;

  title: string;
  beneficiaryDisplayName: string;
  category: 'Medical Relief' | 'Ration & Food' | 'Orphan Education' | 'Widow Support' | 'Housing Emergency' | 'General Welfare';
  location: string;
  story: string;
  targetAmount: number;
  raisedAmount: number;
  urgency: 'Critical' | 'High' | 'Moderate';
  isZakatEligible: boolean;
  imageUrl?: string;

  bankDetails: IBankDetails;

  status: 'pending' | 'approved' | 'rejected' | 'completed';
  verifiedBy?: string;
  verificationNotes?: string;
  rejectionReason?: string;
  approvedAt?: string;
  isPubliclyVisible: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'superadmin' | 'trustee' | 'welfare_officer';
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  totalTarget: number;
  totalRaised: number;
}

export type ContactStatus = 'unread' | 'read' | 'resolved';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactStats {
  total: number;
  unread: number;
  read: number;
  resolved: number;
}

