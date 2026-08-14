import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ContactMessage } from '../models/ContactMessage';
import { mockStore } from '../utils/mockStore';
import { sendContactNotificationEmail } from '../services/emailService';

/**
 * @desc    Submit a new contact inquiry (Public)
 * @route   POST /api/contact/submit
 * @access  Public
 */
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, and message.',
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
      return;
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanSubject = subject ? String(subject).trim() : 'General Inquiry';
    const cleanMessage = String(message).trim();

    const isConnected = mongoose.connection.readyState === 1;
    let savedMessage;

    if (isConnected) {
      savedMessage = await ContactMessage.create({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        ipAddress: req.ip || req.socket.remoteAddress,
      });
    } else {
      savedMessage = mockStore.createContact({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
      });
    }

    // Asynchronously dispatch email notification to contact@zakariyamasjid.org (non-blocking)
    sendContactNotificationEmail({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      inquiryId: (savedMessage as any)._id,
    }).catch((err) => console.error('Background email dispatch notice:', err));

    res.status(201).json({
      success: true,
      message: 'JazakAllah Khair. Your inquiry has been sent to the Trust administration. We will get back to you shortly.',
      inquiryId: (savedMessage as any)._id,
    });
  } catch (error: any) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit your message. Please try again or call us directly.',
    });
  }
};

/**
 * @desc    Get all contact messages with filters and search (Admin)
 * @route   GET /api/admin/contacts
 * @access  Private (Admin)
 */
export const getAllContactMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const status = req.query.status ? String(req.query.status) : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const isConnected = mongoose.connection.readyState === 1;
    let messages;

    if (isConnected) {
      const query: any = {};

      if (status && ['unread', 'read', 'resolved'].includes(status)) {
        query.status = status;
      }

      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: regex },
          { email: regex },
          { phone: regex },
          { subject: regex },
          { message: regex },
        ];
      }

      messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    } else {
      messages = mockStore.getAllContacts(status, search);
    }

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact inquiries.',
    });
  }
};

/**
 * @desc    Get single contact message by ID (Admin)
 * @route   GET /api/admin/contacts/:id
 * @access  Private (Admin)
 */
export const getContactMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const isConnected = mongoose.connection.readyState === 1;
    let message;

    if (isConnected) {
      message = await ContactMessage.findById(id);
    } else {
      message = mockStore.getContactById(id);
    }

    if (!message) {
      res.status(404).json({
        success: false,
        message: 'Contact inquiry not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error: any) {
    console.error('Error fetching contact message by id:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiry details.',
    });
  }
};

/**
 * @desc    Update contact message status & internal notes (Admin)
 * @route   PATCH /api/admin/contacts/:id/status
 * @access  Private (Admin)
 */
export const updateContactMessageStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status, notes } = req.body;

    if (status && !['unread', 'read', 'resolved'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "unread", "read", or "resolved".',
      });
      return;
    }

    const isConnected = mongoose.connection.readyState === 1;
    let updatedMessage;

    if (isConnected) {
      const updates: any = {};
      if (status) updates.status = status;
      if (notes !== undefined) updates.notes = notes;

      updatedMessage = await ContactMessage.findByIdAndUpdate(id, updates, { new: true });
    } else {
      updatedMessage = mockStore.updateContactStatus(id, status, notes);
    }

    if (!updatedMessage) {
      res.status(404).json({
        success: false,
        message: 'Contact inquiry not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully.',
      inquiry: updatedMessage,
    });
  } catch (error: any) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status.',
    });
  }
};

/**
 * @desc    Delete contact message (Admin)
 * @route   DELETE /api/admin/contacts/:id
 * @access  Private (Admin)
 */
export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const isConnected = mongoose.connection.readyState === 1;
    let isDeleted = false;

    if (isConnected) {
      const result = await ContactMessage.findByIdAndDelete(id);
      isDeleted = !!result;
    } else {
      isDeleted = mockStore.deleteContact(id);
    }

    if (!isDeleted) {
      res.status(404).json({
        success: false,
        message: 'Contact inquiry not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Contact inquiry deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry.',
    });
  }
};

/**
 * @desc    Get contact inquiries summary stats (Admin)
 * @route   GET /api/admin/contacts-stats
 * @access  Private (Admin)
 */
export const getContactStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    let stats;

    if (isConnected) {
      const [total, unread, read, resolved] = await Promise.all([
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ status: 'unread' }),
        ContactMessage.countDocuments({ status: 'read' }),
        ContactMessage.countDocuments({ status: 'resolved' }),
      ]);
      stats = { total, unread, read, resolved };
    } else {
      stats = mockStore.getContactStats();
    }

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error('Error getting contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact stats.',
    });
  }
};
