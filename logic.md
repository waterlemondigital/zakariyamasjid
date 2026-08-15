# 🧠 Zakariya Masjid & Kabrastan Trust — Component & Business Logic

This document details the underlying business rules, architectural patterns, algorithmic design decisions, and component logic implemented across the application.

---

## 1. 💰 Direct Beneficiary Bank Isolation & Shariah Zakat Model

### The Problem
Traditional charity portals pool donations into an intermediary trust account before distributing them. In Islamic jurisprudence (Shariah), **Zakat** requires *Tamleek* (direct unconditional transfer of ownership to eligible beneficiaries without intermediary deduction or interest delays).

### The Solution: Direct Peer-to-Peer Donation Architecture
1. **No Intermediary Fund Holding**: The Zakariya Masjid web platform does not accept or store online credit card/gateway funds for individual welfare cases.
2. **Trustee Verification as a Service**:
   - The Trust acts as an authentic **verification authority**.
   - Trustees conduct physical home visits, hospital bill verification, and identity checks.
   - Once verified, the **beneficiary's actual personal Bank Account / UPI ID** is displayed directly on the public card.
3. **1-Click Copy & Direct App Transfer**:
   - Donors click "Transfer Sadaqah / Zakat" to view the verified bank details and IFSC.
   - 1-click clipboard buttons allow seamless pasting into Google Pay, PhonePe, Paytm, or Net Banking apps.
   - **Result:** 100% of donor funds reach the needy family instantly with zero processing fees.

---

## 2. 🛡️ Public Privacy & Data Masking Logic

To preserve the dignity of applicants and protect vulnerable families from harassment or public exposure:

| Field Name | Public Website (`/welfare-cases`) | Trustee Admin Portal (`/cases`) |
| :--- | :---: | :---: |
| **Case Title** | ✅ Public Display | ✅ Full |
| **Category** | ✅ Public Display | ✅ Full |
| **Beneficiary Name** | 🛡️ Sanitized (`Fatima Begum & Family`) | 🔒 Full Legal Name |
| **Applicant Phone** | ❌ **Strictly Hidden** | 🔒 Visible for Verification |
| **Home Address** | 🛡️ Generalized (`Mundhwa, Pune`) | 🔒 Full Street Address |
| **Govt ID / Aadhaar** | ❌ **Strictly Hidden** | 🔒 Visible to Trustees |
| **Trustee Verification Notes**| ❌ **Strictly Hidden** | 🔒 Private Internal Notes |
| **Bank Account & IFSC** | ✅ Verified for Direct Donation | ✅ Full & Verified |

### Backend Implementation ([welfareController.ts](file:///Users/tousif/Downloads/zakariya-masjid-&-kabrastan-trust/backend/src/controllers/welfareController.ts)):
```typescript
// Strict Exclusion via Mongoose Projection
const dbCases = await WelfareCase.find({ status: 'approved', isPubliclyVisible: true })
  .select('-applicantPhone -applicantAddress -applicantGovtId -verificationNotes -rejectionReason')
  .sort({ createdAt: -1 });
```

---

## 3. ⚡ Dual-Persistence Engine (MongoDB + Fallback)

To guarantee 100% uptime even during database outages or maintenance:
- Every controller dynamically checks `mongoose.connection.readyState === 1`.
- If connected to MongoDB Atlas, queries execute against persistent MongoDB collections.
- If disconnected or running in local mock mode, queries automatically switch to the high-fidelity in-memory `mockStore.ts`.
- **Result:** The frontend and admin panel never crash with database timeouts; graceful fallback maintains full UI interactivity.

---

## 4. ✉️ GoDaddy SMTP Email Dispatch & Serverless Execution Logic

### The Serverless Freeze Challenge
On serverless platforms like **Vercel** (AWS Lambda backend), when an API route sends `res.json(...)`, the execution container is immediately **frozen** to save CPU resources. If an outbound email promise is still running in the background, the network socket is aborted before the TCP handshake completes with GoDaddy.

### The Solution ([contactController.ts](file:///Users/tousif/Downloads/zakariya-masjid-&-kabrastan-trust/backend/src/controllers/contactController.ts)):
```typescript
// Explicitly await the SMTP handshake BEFORE completing the response
let emailResult = { success: false };
try {
  emailResult = await sendContactNotificationEmail({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    subject: cleanSubject,
    message: cleanMessage,
    inquiryId: (savedMessage as any)._id,
  });
} catch (err) {
  console.error('Background email dispatch notice:', err);
}

res.status(201).json({
  success: true,
  emailDispatched: emailResult.success,
});
```

### GoDaddy Professional Email Transport Parameters ([emailService.ts](file:///Users/tousif/Downloads/zakariya-masjid-&-kabrastan-trust/backend/src/services/emailService.ts)):
- **Host:** `smtpout.secureserver.net`
- **Port:** `465` (SSL)
- **Security:** `secure: true`, `tls: { rejectUnauthorized: false }`
- **Reply-To Header:** Set to the sender's actual email so clicking "Reply" in Outlook/Gmail replies directly to the citizen.

---

## 5. 🛡️ Input Sanitization, XSS & ReDoS Protection Logic

### 1. HTML Sanitization (`sanitizeHtmlString`)
Prevents stored XSS attacks where attackers submit malicious script tags into message boxes:
```typescript
export const sanitizeHtmlString = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
```

### 2. Regular Expression Escaping (`escapeRegex`)
Prevents **ReDoS (Regular Expression Denial of Service)** when admins search records using special characters (e.g. `(`, `[`, `*`, `+`, `?`):
```typescript
export const escapeRegex = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
```

---

## 6. 🌐 Dynamic Client-Side SEO Engine ([useSEO.ts](file:///Users/tousif/Downloads/zakariya-masjid-&-kabrastan-trust/frontend/src/hooks/useSEO.ts))

In Single Page Applications (SPAs), traditional static HTML only contains the root page metadata. To ensure each route achieves top Google search rankings:
1. `useSEO` listens to `location.pathname` changes via `react-router-dom`.
2. It dynamically updates:
   - `document.title` (e.g. *Daily Prayer Timings & Jumu'ah Schedule | Zakariya Masjid, Pune*)
   - `<meta name="description">`
   - OpenGraph `og:title` & `og:description`
3. Automatically triggers window scroll-to-top on route changes.
