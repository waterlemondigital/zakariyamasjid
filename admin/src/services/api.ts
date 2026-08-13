import { WelfareCase, DashboardStats, AdminUser } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getHeaders = () => {
  const token = localStorage.getItem('zmt_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  async login(credentials: { username: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Dashboard Metrics
  async getDashboardStats(): Promise<{ success: boolean; stats: DashboardStats; message?: string }> {
    const res = await fetch(`${API_BASE}/admin/dashboard-stats`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Welfare Cases
  async getCases(params?: { status?: string; category?: string; search?: string }): Promise<{
    success: boolean;
    count: number;
    cases: WelfareCase[];
  }> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/admin/welfare-cases?${query.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getCaseById(id: string): Promise<{ success: boolean; case: WelfareCase }> {
    const res = await fetch(`${API_BASE}/admin/welfare-cases/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async updateCase(id: string, updates: Partial<WelfareCase>): Promise<{ success: boolean; case: WelfareCase; message: string }> {
    const res = await fetch(`${API_BASE}/admin/welfare-cases/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async updateStatus(
    id: string,
    statusPayload: {
      status: 'pending' | 'approved' | 'rejected' | 'completed';
      verifiedBy?: string;
      verificationNotes?: string;
      rejectionReason?: string;
    }
  ): Promise<{ success: boolean; case: WelfareCase; message: string }> {
    const res = await fetch(`${API_BASE}/admin/welfare-cases/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(statusPayload),
    });
    return res.json();
  },

  async deleteCase(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/admin/welfare-cases/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Manual Case Creation from Admin
  async createCase(caseData: any): Promise<{ success: boolean; message: string; caseNumber?: string }> {
    const res = await fetch(`${API_BASE}/welfare-cases/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return res.json();
  },
};
