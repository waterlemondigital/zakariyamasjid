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

  // ─────────────────────────────────────────────
  // CONTACT MESSAGES STORE
  // ─────────────────────────────────────────────
  private contacts: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'resolved';
    notes: string;
    createdAt: Date;
    updatedAt: Date;
  }> = [
    {
      _id: 'msg-1',
      name: 'Janab Farooq Ansari',
      email: 'farooq.ansari@gmail.com',
      phone: '+91 98220 44556',
      subject: 'Kabristan & Burial Service',
      message: 'Assalamu Alaikum. I wanted to inquire about the grave registration and documentation procedure for the family record at Zakariya Kabristan.',
      status: 'unread',
      notes: '',
      createdAt: new Date(Date.now() - 3600000 * 4), // 4 hrs ago
      updatedAt: new Date(Date.now() - 3600000 * 4),
    },
    {
      _id: 'msg-2',
      name: 'Sister Maryam Khan',
      email: 'maryam.k@yahoo.com',
      phone: '+91 98901 22334',
      subject: 'Madrasa Admission',
      message: 'Respected Trustees, I would like to enroll my 7-year-old son in the evening Qur\'an Nazirah and basic Islamic studies batch. Please let me know the timings and teacher details.',
      status: 'unread',
      notes: '',
      createdAt: new Date(Date.now() - 3600000 * 26), // 1 day ago
      updatedAt: new Date(Date.now() - 3600000 * 26),
    },
    {
      _id: 'msg-3',
      name: 'Brother Zaid Shaikh',
      email: 'zaid.shaikh99@gmail.com',
      phone: '+91 97654 88990',
      subject: 'Donation Inquiry',
      message: 'Assalamu Alaikum, we would like to sponsor the Friday Jumu\'ah clean drinking water dispenser maintenance for 1 year. Please share trustee coordinator contact.',
      status: 'read',
      notes: 'Informed trustee Brother Tanveer to follow up via phone.',
      createdAt: new Date(Date.now() - 3600000 * 72), // 3 days ago
      updatedAt: new Date(Date.now() - 3600000 * 48),
    },
  ];

  createContact(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    const newMsg = {
      _id: `msg-${Date.now().toString(36)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject || 'General Inquiry',
      message: data.message,
      status: 'unread' as const,
      notes: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.contacts.unshift(newMsg);
    return newMsg;
  }

  getAllContacts(status?: string, search?: string) {
    let result = [...this.contacts];

    if (status && ['unread', 'read', 'resolved'].includes(status)) {
      result = result.filter((m) => m.status === status);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.phone.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }

    return result;
  }

  getContactById(id: string) {
    return this.contacts.find((m) => m._id === id);
  }

  updateContactStatus(id: string, status: 'unread' | 'read' | 'resolved', notes?: string) {
    const index = this.contacts.findIndex((m) => m._id === id);
    if (index === -1) return null;

    const existing = this.contacts[index];
    const updated = {
      ...existing,
      status,
      notes: notes !== undefined ? notes : existing.notes,
      updatedAt: new Date(),
    };

    this.contacts[index] = updated;
    return updated;
  }

  deleteContact(id: string): boolean {
    const initialLen = this.contacts.length;
    this.contacts = this.contacts.filter((m) => m._id !== id);
    return this.contacts.length < initialLen;
  }

  getContactStats() {
    const total = this.contacts.length;
    const unread = this.contacts.filter((m) => m.status === 'unread').length;
    const read = this.contacts.filter((m) => m.status === 'read').length;
    const resolved = this.contacts.filter((m) => m.status === 'resolved').length;

    return { total, unread, read, resolved };
  }
}

export const mockStore = new MockStore();

