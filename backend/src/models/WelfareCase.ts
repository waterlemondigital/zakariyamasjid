import mongoose, { Document, Schema } from 'mongoose';

export interface IBankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
  branchName?: string;
}

export interface IWelfareCase extends Document {
  caseNumber: string;
  // Confidential Applicant Information (Private to Admin)
  applicantName: string;
  applicantPhone: string;
  applicantAddress: string;
  applicantGovtId?: string;

  // Public Presentation Fields (Sanitized for Donor View)
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

  // Verified Bank Details (Shown to Donors for Direct Contributions once Approved)
  bankDetails: IBankDetails;

  // Trust Workflow & Verification Status
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  verifiedBy?: string;
  verificationNotes?: string;
  rejectionReason?: string;
  approvedAt?: Date;
  isPubliclyVisible: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const BankDetailsSchema = new Schema<IBankDetails>(
  {
    accountHolderName: { type: String, trim: true, default: '' },
    bankName: { type: String, trim: true, default: '' },
    accountNumber: { type: String, trim: true, default: '' },
    ifscCode: { type: String, trim: true, uppercase: true, default: '' },
    upiId: { type: String, trim: true, lowercase: true, default: '' },
    branchName: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const WelfareCaseSchema = new Schema<IWelfareCase>(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    // Confidential Applicant Info
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    applicantPhone: {
      type: String,
      required: true,
      trim: true,
    },
    applicantAddress: {
      type: String,
      required: true,
      trim: true,
    },
    applicantGovtId: {
      type: String,
      trim: true,
    },

    // Public Display Info
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    beneficiaryDisplayName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Medical Relief',
        'Ration & Food',
        'Orphan Education',
        'Widow Support',
        'Housing Emergency',
        'General Welfare',
      ],
      default: 'Medical Relief',
      index: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      default: 'Mundhwa, Off Koregaon Park, Pune',
    },
    story: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    raisedAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    urgency: {
      type: String,
      enum: ['Critical', 'High', 'Moderate'],
      default: 'High',
      index: true,
    },
    isZakatEligible: {
      type: Boolean,
      default: true,
      index: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },

    // Bank Details
    bankDetails: {
      type: BankDetailsSchema,
      default: () => ({}),
    },

    // Status & Verification
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
      index: true,
    },
    verifiedBy: {
      type: String,
      trim: true,
      default: 'Zakariya Masjid',
    },
    verificationNotes: {
      type: String,
      trim: true,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    approvedAt: {
      type: Date,
    },
    isPubliclyVisible: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method / Static Helper for generating next sequential case number
WelfareCaseSchema.statics.generateCaseNumber = async function (): Promise<string> {
  const currentYear = new Date().getFullYear();
  const count = await this.countDocuments();
  const nextNum = (count + 1).toString().padStart(3, '0');
  return `ZMT-CASE-${currentYear}-${nextNum}`;
};

export const WelfareCase = mongoose.model<IWelfareCase>('WelfareCase', WelfareCaseSchema);
