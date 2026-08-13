export interface PrayerTime {
  name: string;
  arabicName: string;
  azaan: string;
  jamaat: string;
  isNext?: boolean;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  suggestedAmount?: number;
  popular?: boolean;
}

export interface KhutbahItem {
  id: string;
  title: string;
  speaker: string;
  date: string;
  topic: string;
  audioUrl?: string;
  pdfUrl?: string;
}

export interface TrusteeItem {
  name: string;
  role: string;
  qualification?: string;
  bio?: string;
}

export interface AuditDoc {
  year: string;
  title: string;
  fileSize: string;
  downloadUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'masjid' | 'ramadan';
  imageUrl: string;
  caption?: string;
}

export interface BeforeAfterSet {
  id: string;
  title: string;
  category: 'masjid' | 'kabristan' | 'facilities' | 'community';
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  completedDate?: string;
}

export interface BurialRuleCategory {
  title: string;
  icon: string;
  rules: string[];
}

export interface IBankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
  branchName?: string;
}

export interface NeedyProfile {
  id: string;
  caseNumber: string;
  title: string;
  category: 'Medical Relief' | 'Ration & Food' | 'Orphan Education' | 'Widow Support' | 'Housing Emergency' | 'General Welfare';
  beneficiaryName: string;
  location: string;
  story: string;
  targetAmount: number;
  raisedAmount: number;
  verifiedBy: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  isZakatEligible: boolean;
  imageUrl?: string;
  bankDetails?: IBankDetails;
}
