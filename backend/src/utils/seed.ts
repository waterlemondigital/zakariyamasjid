import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser';
import { WelfareCase } from '../models/WelfareCase';
import { initialMockCases } from './mockStore';

export const seedDatabase = async (): Promise<void> => {
  try {
    // 1. Seed Default Admin User
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const username = (process.env.DEFAULT_ADMIN_USERNAME || 'admin').toLowerCase();
      const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Zakariya@123';
      const email = process.env.DEFAULT_ADMIN_EMAIL || 'contact@zakariyamasjid.org';

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await AdminUser.create({
        username,
        email,
        passwordHash,
        name: 'Zakariya Trust Executive Trustee',
        role: 'superadmin',
        isActive: true,
      });

      console.log(`🔐 Default Admin User Seeded: username="${username}"`);
    }

    // 2. Seed Initial Verified Cases
    const casesCount = await WelfareCase.countDocuments();
    if (casesCount === 0) {
      for (const mock of initialMockCases) {
        await WelfareCase.create({
          caseNumber: mock.caseNumber,
          applicantName: mock.applicantName,
          applicantPhone: mock.applicantPhone,
          applicantAddress: mock.applicantAddress,
          title: mock.title,
          beneficiaryDisplayName: mock.beneficiaryDisplayName,
          category: mock.category,
          location: mock.location,
          story: mock.story,
          targetAmount: mock.targetAmount,
          raisedAmount: mock.raisedAmount,
          urgency: mock.urgency,
          isZakatEligible: mock.isZakatEligible,
          bankDetails: mock.bankDetails,
          status: mock.status,
          verifiedBy: mock.verifiedBy,
          verificationNotes: mock.verificationNotes,
          approvedAt: mock.approvedAt,
          isPubliclyVisible: mock.isPubliclyVisible,
        });
      }
      console.log(`📋 Initial Verified Welfare Cases Seeded (${initialMockCases.length} cases)`);
    }
  } catch (error: any) {
    console.warn(`Seed notice: ${error.message}`);
  }
};
