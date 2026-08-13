/**
 * In-Memory fallback store that provides immediate out-of-the-box functionality
 * even when MongoDB service is starting up or in offline developer mode.
 */
export interface MockWelfareCase {
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
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId?: string;
    branchName?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  verifiedBy?: string;
  verificationNotes?: string;
  rejectionReason?: string;
  approvedAt?: Date;
  isPubliclyVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const initialMockCases: MockWelfareCase[] = [
  {
    _id: 'mock-1',
    caseNumber: 'ZMT-CASE-2026-081',
    applicantName: 'Aisha Begum',
    applicantPhone: '+91 98231 44552',
    applicantAddress: 'Lane No 4, Ghorpadi Gaon, Pune',
    title: 'Emergency Cardiac Surgery Aid for Sister Aisha',
    beneficiaryDisplayName: 'Sister Aisha (Family of 4 Children)',
    category: 'Medical Relief',
    location: 'Mundhwa, Off Koregaon Park, Pune',
    story: 'Sister Aisha, a widowed mother of four in Mundhwa, requires urgent heart valve replacement surgery at Poona Hospital. The family has no active breadwinner. The Masjid Trust verification committee has personally inspected hospital bills, prescription records, and income statements.',
    targetAmount: 85000,
    raisedAmount: 58500,
    urgency: 'Critical',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Aisha Begum Sheikh',
      bankName: 'State Bank of India',
      accountNumber: '39485720194',
      ifscCode: 'SBIN0001234',
      upiId: 'aishasheikh@sbi',
      branchName: 'Koregaon Park Branch, Pune',
    },
    status: 'approved',
    verifiedBy: 'Zakariya Masjid',
    verificationNotes: 'Hospital estimate verified from Poona Hospital cardio dept. Physical residence check completed.',
    approvedAt: new Date(),
    isPubliclyVisible: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    _id: 'mock-2',
    caseNumber: 'ZMT-CASE-2026-064',
    applicantName: 'Zohra Begum',
    applicantPhone: '+91 98901 11223',
    applicantAddress: 'Near Noor Masjid, Hadapsar-Mundhwa Link Rd, Pune',
    title: 'Annual Essential Ration & Medicine Kit for Elderly Widow',
    beneficiaryDisplayName: 'Mrs. Zohra Begum (Age 72)',
    category: 'Widow Support',
    location: 'Hadapsar / Mundhwa Border, Pune',
    story: '72-year-old Zohra Begum lives alone with no immediate family members able to support her. Zakariya Masjid Trust provides her with monthly ration packs (rice, wheat flour, oil, pulses, tea, and daily hypertension medication).',
    targetAmount: 24000,
    raisedAmount: 19200,
    urgency: 'High',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Zohra Begum Qureshi',
      bankName: 'Bank of Maharashtra',
      accountNumber: '60182930491',
      ifscCode: 'MAHB0000456',
      upiId: 'zohrabegum@mahb',
      branchName: 'Mundhwa Branch, Pune',
    },
    status: 'approved',
    verifiedBy: 'Zakariya Masjid',
    verificationNotes: 'Ration verification card issued. Monthly check by trust volunteer.',
    approvedAt: new Date(),
    isPubliclyVisible: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    _id: 'mock-3',
    caseNumber: 'ZMT-CASE-2026-049',
    applicantName: 'Fatima Shaikh',
    applicantPhone: '+91 97654 33211',
    applicantAddress: 'Koregaon Park Annex, Near Bridge, Pune',
    title: 'School & Madrasa Hifz Fee Support for 2 Orphan Siblings',
    beneficiaryDisplayName: 'Sameer (10 yrs) & Zoya (8 yrs)',
    category: 'Orphan Education',
    location: 'Koregaon Park Annex, Pune',
    story: 'Following the unexpected demise of their father, Sameer and Zoya are raised by their mother who works part-time. Trust supports their annual school tuition, books, uniform, and evening Hifz-ul-Qur\'an education expenses.',
    targetAmount: 36000,
    raisedAmount: 27000,
    urgency: 'Moderate',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Fatima Mohammed Shaikh',
      bankName: 'HDFC Bank',
      accountNumber: '50100293847561',
      ifscCode: 'HDFC0000123',
      upiId: 'fatimashaikh@hdfcbank',
      branchName: 'Kalyani Nagar Branch, Pune',
    },
    status: 'approved',
    verifiedBy: 'Zakariya Masjid',
    verificationNotes: 'School fee challan and Madrasa enrollment certificates verified.',
    approvedAt: new Date(),
    isPubliclyVisible: true,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

class MockStore {
  private cases: MockWelfareCase[] = [...initialMockCases];
  private nextId = 100;

  getAll(): MockWelfareCase[] {
    return [...this.cases];
  }

  getPublicApproved(): any[] {
    return this.cases
      .filter((c) => c.status === 'approved' && c.isPubliclyVisible)
      .map((c) => ({
        id: c._id,
        caseNumber: c.caseNumber,
        title: c.title,
        category: c.category,
        beneficiaryName: c.beneficiaryDisplayName,
        location: c.location,
        story: c.story,
        targetAmount: c.targetAmount,
        raisedAmount: c.raisedAmount,
        verifiedBy: c.verifiedBy || 'Zakariya Masjid',
        urgency: c.urgency,
        isZakatEligible: c.isZakatEligible,
        imageUrl: c.imageUrl,
        bankDetails: c.bankDetails,
        createdAt: c.createdAt,
      }));
  }

  getById(id: string): MockWelfareCase | undefined {
    return this.cases.find((c) => c._id === id);
  }

  add(data: Partial<MockWelfareCase>): MockWelfareCase {
    const year = new Date().getFullYear();
    const caseNumber = `ZMT-CASE-${year}-${(this.cases.length + 1).toString().padStart(3, '0')}`;
    const newCase: MockWelfareCase = {
      _id: `case-${++this.nextId}`,
      caseNumber,
      applicantName: data.applicantName || 'Anonymous Applicant',
      applicantPhone: data.applicantPhone || '',
      applicantAddress: data.applicantAddress || 'Mundhwa / Pune',
      applicantGovtId: data.applicantGovtId || '',
      title: data.title || `${data.category || 'Welfare'} Assistance Request for ${data.applicantName || 'Family'}`,
      beneficiaryDisplayName: data.beneficiaryDisplayName || data.applicantName || 'Confidential Beneficiary',
      category: data.category || 'General Welfare',
      location: data.location || 'Mundhwa, Off Koregaon Park, Pune',
      story: data.story || '',
      targetAmount: Number(data.targetAmount) || 0,
      raisedAmount: 0,
      urgency: data.urgency || 'High',
      isZakatEligible: data.isZakatEligible ?? true,
      imageUrl: data.imageUrl,
      bankDetails: {
        accountHolderName: data.bankDetails?.accountHolderName || data.applicantName || '',
        bankName: data.bankDetails?.bankName || '',
        accountNumber: data.bankDetails?.accountNumber || '',
        ifscCode: data.bankDetails?.ifscCode || '',
        upiId: data.bankDetails?.upiId || '',
        branchName: data.bankDetails?.branchName || '',
      },
      status: data.status || 'pending',
      verifiedBy: data.verifiedBy || '',
      verificationNotes: data.verificationNotes || '',
      rejectionReason: data.rejectionReason || '',
      approvedAt: data.status === 'approved' ? new Date() : undefined,
      isPubliclyVisible: data.status === 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.cases.unshift(newCase);
    return newCase;
  }

  update(id: string, updates: Partial<MockWelfareCase>): MockWelfareCase | undefined {
    const index = this.cases.findIndex((c) => c._id === id);
    if (index === -1) return undefined;

    const existing = this.cases[index];
    const isNowApproved = updates.status === 'approved' && existing.status !== 'approved';

    const updated: MockWelfareCase = {
      ...existing,
      ...updates,
      bankDetails: {
        ...existing.bankDetails,
        ...(updates.bankDetails || {}),
      },
      approvedAt: isNowApproved ? new Date() : (updates.status && updates.status !== 'approved' ? undefined : existing.approvedAt),
      isPubliclyVisible: updates.status ? updates.status === 'approved' : existing.isPubliclyVisible,
      updatedAt: new Date(),
    };

    this.cases[index] = updated;
    return updated;
  }

  delete(id: string): boolean {
    const initialLen = this.cases.length;
    this.cases = this.cases.filter((c) => c._id !== id);
    return this.cases.length < initialLen;
  }

  getStats() {
    const total = this.cases.length;
    const pending = this.cases.filter((c) => c.status === 'pending').length;
    const approved = this.cases.filter((c) => c.status === 'approved').length;
    const rejected = this.cases.filter((c) => c.status === 'rejected').length;
    const completed = this.cases.filter((c) => c.status === 'completed').length;
    const totalTarget = this.cases
      .filter((c) => c.status === 'approved')
      .reduce((acc, c) => acc + (c.targetAmount || 0), 0);
    const totalRaised = this.cases
      .filter((c) => c.status === 'approved')
      .reduce((acc, c) => acc + (c.raisedAmount || 0), 0);

    return {
      total,
      pending,
      approved,
      rejected,
      completed,
      totalTarget,
      totalRaised,
    };
  }
}

export const mockStore = new MockStore();
