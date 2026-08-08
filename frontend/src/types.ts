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
  category: 'masjid' | 'kabristan' | 'events' | 'ramadan';
  imageUrl: string;
  caption?: string;
}

export interface BurialRuleCategory {
  title: string;
  icon: string;
  rules: string[];
}
