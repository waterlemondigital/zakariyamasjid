import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { WelfareCase, IWelfareCase } from '../models/WelfareCase';
import { mockStore } from '../utils/mockStore';
import { sanitizeString, sanitizeHtmlString, escapeRegex } from '../utils/sanitize';

// ──────────────────────────────────────────────────────────
// PUBLIC CONTROLLER METHODS
// ──────────────────────────────────────────────────────────

/**
 * Public: Submit a new welfare assistance application
 */
export const submitApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      phone,
      address,
      category,
      description,
      amountNeeded,
      bankDetails,
    } = req.body;

    if (!fullName || !phone || !address || !description) {
      res.status(400).json({
        success: false,
        message: 'Please provide full name, contact phone, residential address, and details of assistance needed.',
      });
      return;
    }

    const validCategories = [
      'Medical Relief',
      'Ration & Food',
      'Orphan Education',
      'Widow Support',
      'Housing Emergency',
      'General Welfare',
    ] as const;

    const cleanFullName = sanitizeHtmlString(sanitizeString(fullName, 100));
    const cleanPhone = sanitizeString(phone, 30);
    const cleanAddress = sanitizeHtmlString(sanitizeString(address, 300));
    const cleanCategory: typeof validCategories[number] = validCategories.includes(category as any)
      ? (category as typeof validCategories[number])
      : 'Medical Relief';
    const cleanDescription = sanitizeHtmlString(sanitizeString(description, 4000));
    const targetAmount = Math.max(0, Math.min(Number(amountNeeded) || 0, 10000000)); // Max 1 crore boundary

    const cleanBank = {
      accountHolderName: sanitizeHtmlString(sanitizeString(bankDetails?.accountHolderName || cleanFullName, 100)),
      bankName: sanitizeHtmlString(sanitizeString(bankDetails?.bankName, 100)),
      accountNumber: sanitizeString(bankDetails?.accountNumber, 40).replace(/[^0-9A-Za-z]/g, ''),
      ifscCode: sanitizeString(bankDetails?.ifscCode, 20).toUpperCase().replace(/[^0-9A-Z]/g, ''),
      upiId: sanitizeString(bankDetails?.upiId, 100).toLowerCase(),
      branchName: sanitizeHtmlString(sanitizeString(bankDetails?.branchName, 100)),
    };

    const isDBConnected = mongoose.connection.readyState === 1;

    let savedCase: any;

    if (isDBConnected) {
      const caseNumber = await (WelfareCase as any).generateCaseNumber();
      const newCase = new WelfareCase({
        caseNumber,
        applicantName: cleanFullName,
        applicantPhone: cleanPhone,
        applicantAddress: cleanAddress,
        title: `${cleanCategory} Assistance Request for ${cleanFullName}`,
        beneficiaryDisplayName: `${cleanFullName} & Family`,
        category: cleanCategory,
        location: cleanAddress.includes('Pune') ? cleanAddress : `${cleanAddress}, Pune`,
        story: cleanDescription,
        targetAmount,
        raisedAmount: 0,
        urgency: 'High',
        isZakatEligible: true,
        bankDetails: cleanBank,
        status: 'pending',
        isPubliclyVisible: false,
      });

      savedCase = await newCase.save();
    } else {
      savedCase = mockStore.add({
        applicantName: cleanFullName,
        applicantPhone: cleanPhone,
        applicantAddress: cleanAddress,
        category: cleanCategory,
        story: cleanDescription,
        targetAmount,
        bankDetails: cleanBank,
        status: 'pending',
      });
    }

    res.status(201).json({
      success: true,
      message: 'JazakAllah Khair. Your assistance application has been registered securely. Our trustee committee will verify your details.',
      caseNumber: savedCase.caseNumber,
    });
  } catch (error: any) {
    console.error('Error in submitApplication:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register application. Please contact helpline +91 98901 85013 directly.',
    });
  }
};

/**
 * Public: Fetch approved and verified cases for the public website
 * (Strictly excludes confidential private applicant phone & address)
 */
export const getPublicApprovedCases = async (_req: Request, res: Response): Promise<void> => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    let cases: any[] = [];

    if (isDBConnected) {
      const dbCases = await WelfareCase.find({
        status: 'approved',
        isPubliclyVisible: true,
      })
        .select('-applicantPhone -applicantAddress -applicantGovtId -verificationNotes -rejectionReason')
        .sort({ createdAt: -1 });

      cases = dbCases.map((c) => ({
        id: c._id.toString(),
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
    } else {
      cases = mockStore.getPublicApproved();
    }

    res.status(200).json({
      success: true,
      count: cases.length,
      cases,
    });
  } catch (error: any) {
    console.error('Error fetching public cases:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch welfare profiles at this time.',
    });
  }
};

// ──────────────────────────────────────────────────────────
// ADMIN PROTECTED CONTROLLER METHODS
// ──────────────────────────────────────────────────────────

/**
 * Admin: Get all cases with filtering and search
 */
export const getAllCases = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, category, search } = req.query;
    const isDBConnected = mongoose.connection.readyState === 1;

    let cases: any[] = [];

    if (isDBConnected) {
      const filter: any = {};
      if (status && status !== 'all') {
        filter.status = status;
      }
      if (category && category !== 'all') {
        filter.category = category;
      }
      if (search && String(search).trim()) {
        const safeSearch = escapeRegex(String(search).trim());
        const searchRegex = new RegExp(safeSearch, 'i');
        filter.$or = [
          { caseNumber: searchRegex },
          { applicantName: searchRegex },
          { beneficiaryDisplayName: searchRegex },
          { title: searchRegex },
          { location: searchRegex },
        ];
      }

      cases = await WelfareCase.find(filter).sort({ createdAt: -1 });
    } else {
      let filtered = mockStore.getAll();
      if (status && status !== 'all') {
        filtered = filtered.filter((c) => c.status === status);
      }
      if (category && category !== 'all') {
        filtered = filtered.filter((c) => c.category === category);
      }
      if (search) {
        const query = String(search).toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.caseNumber.toLowerCase().includes(query) ||
            c.applicantName.toLowerCase().includes(query) ||
            c.beneficiaryDisplayName.toLowerCase().includes(query) ||
            c.title.toLowerCase().includes(query) ||
            c.location.toLowerCase().includes(query)
        );
      }
      cases = filtered;
    }

    res.status(200).json({
      success: true,
      count: cases.length,
      cases,
    });
  } catch (error: any) {
    console.error('Error in getAllCases:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve cases list' });
  }
};

/**
 * Admin: Get single case by ID with full confidential details
 */
export const getCaseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const isDBConnected = mongoose.connection.readyState === 1;

    let singleCase: any = null;

    if (isDBConnected && mongoose.isValidObjectId(id)) {
      singleCase = await WelfareCase.findById(id);
    } else {
      singleCase = mockStore.getById(id);
    }

    if (!singleCase) {
      res.status(404).json({ success: false, message: 'Welfare case not found' });
      return;
    }

    res.status(200).json({ success: true, case: singleCase });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching case details' });
  }
};

/**
 * Admin: Update case details & verification parameters
 */
export const updateCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updates = req.body;
    const isDBConnected = mongoose.connection.readyState === 1;

    let updatedCase: any = null;

    if (isDBConnected && mongoose.isValidObjectId(id)) {
      if (updates.status === 'approved') {
        updates.isPubliclyVisible = true;
        updates.approvedAt = new Date();
      }
      updatedCase = await WelfareCase.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    } else {
      updatedCase = mockStore.update(id, updates);
    }

    if (!updatedCase) {
      res.status(404).json({ success: false, message: 'Case not found for update' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Case details updated successfully.',
      case: updatedCase,
    });
  } catch (error: any) {
    console.error('Error updating case:', error);
    res.status(500).json({ success: false, message: 'Failed to update case' });
  }
};

/**
 * Admin: 1-Click Status Update (Approve / Reject / Mark Completed)
 */
export const updateCaseStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status, verifiedBy, verificationNotes, rejectionReason } = req.body;

    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status provided.' });
      return;
    }

    const isDBConnected = mongoose.connection.readyState === 1;
    let updatedCase: any = null;

    const updates: any = {
      status,
      isPubliclyVisible: status === 'approved',
      updatedAt: new Date(),
    };

    if (status === 'approved') {
      updates.approvedAt = new Date();
      if (verifiedBy) updates.verifiedBy = verifiedBy;
      if (verificationNotes) updates.verificationNotes = verificationNotes;
    } else if (status === 'rejected') {
      if (rejectionReason) updates.rejectionReason = rejectionReason;
    }

    if (isDBConnected && mongoose.isValidObjectId(id)) {
      updatedCase = await WelfareCase.findByIdAndUpdate(id, updates, { new: true });
    } else {
      updatedCase = mockStore.update(id, updates);
    }

    if (!updatedCase) {
      res.status(404).json({ success: false, message: 'Case not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message:
        status === 'approved'
          ? 'Case approved and published to public website!'
          : `Case status updated to ${status}.`,
      case: updatedCase,
    });
  } catch (error: any) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

/**
 * Admin: Delete Case
 */
export const deleteCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const isDBConnected = mongoose.connection.readyState === 1;

    let success = false;

    if (isDBConnected && mongoose.isValidObjectId(id)) {
      const deleted = await WelfareCase.findByIdAndDelete(id);
      success = !!deleted;
    } else {
      success = mockStore.delete(id);
    }

    if (!success) {
      res.status(404).json({ success: false, message: 'Case not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Case removed permanently.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete case' });
  }
};

/**
 * Admin: Get Dashboard Metrics & KPIs
 */
export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;

    if (isDBConnected) {
      const [total, pending, approved, rejected, completed, aggregateFunds] = await Promise.all([
        WelfareCase.countDocuments(),
        WelfareCase.countDocuments({ status: 'pending' }),
        WelfareCase.countDocuments({ status: 'approved' }),
        WelfareCase.countDocuments({ status: 'rejected' }),
        WelfareCase.countDocuments({ status: 'completed' }),
        WelfareCase.aggregate([
          { $match: { status: 'approved' } },
          {
            $group: {
              _id: null,
              totalTarget: { $sum: '$targetAmount' },
              totalRaised: { $sum: '$raisedAmount' },
            },
          },
        ]),
      ]);

      const totalTarget = aggregateFunds[0]?.totalTarget || 0;
      const totalRaised = aggregateFunds[0]?.totalRaised || 0;

      res.status(200).json({
        success: true,
        stats: {
          total,
          pending,
          approved,
          rejected,
          completed,
          totalTarget,
          totalRaised,
        },
      });
    } else {
      const stats = mockStore.getStats();
      res.status(200).json({ success: true, stats });
    }
  } catch (error: any) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate stats' });
  }
};
