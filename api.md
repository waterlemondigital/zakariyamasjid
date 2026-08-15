# 📡 Zakariya Masjid & Kabrastan Trust — API Reference

Official API documentation for the Zakariya Masjid & Kabrastan Trust Backend Service.

- **Production Base URL:** `https://zakariyamasjid-backend.vercel.app/api`
- **Development Base URL:** `http://localhost:5001/api`
- **Authentication Scheme:** `Authorization: Bearer <JWT_TOKEN>`

---

## 🛡️ Security & Rate Limiting Overview

| Target Endpoint | Rate Limit | Purpose |
| :--- | :--- | :--- |
| **All Routes (Global)** | 300 requests / 15 min | General DoS protection |
| **`POST /api/auth/login`** | 20 requests / 15 min | Anti-brute-force defense |
| **`POST /api/welfare-cases/apply`** | 30 requests / 1 hour | Anti-spam application flood protection |
| **`POST /api/contact/submit`** | 30 requests / 1 hour | Contact form abuse protection |

---

## 1. System Health & Diagnostics

### `GET /api/health`
Returns live system health, timestamp, and institutional identification.
* **Access:** Public
* **Response (200 OK):**
```json
{
  "status": "online",
  "institution": "Zakariya Masjid & Kabrastan Trust, Pune",
  "service": "Welfare & Admin API",
  "timestamp": "2026-08-15T10:00:00.000Z"
}
```

### `GET /api/contact/verify-smtp`
Verifies live GoDaddy Professional Email / SMTP socket connection and environment status.
* **Access:** Public / Diagnostic
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "SMTP connection verified successfully with mail server!",
  "smtpUser": "contact@zakariyamasjid.org",
  "smtpHost": "smtpout.secureserver.net",
  "smtpPort": "465",
  "notificationEmail": "contact@zakariyamasjid.org"
}
```

---

## 2. Authentication Endpoints

### `POST /api/auth/login`
Authenticates a trustee administrator and returns a signed 24-hour JWT token.
* **Access:** Public (Rate Limited: 20/15 min)
* **Request Body:**
```json
{
  "username": "admin",
  "password": "your_secure_password"
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Authentication successful. Welcome to Zakariya Masjid Admin Portal.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "6a7ec...",
    "username": "admin",
    "role": "superadmin",
    "name": "Zakariya Trust Executive Admin",
    "email": "trustee@zakariyamasjid.org"
  }
}
```

### `GET /api/auth/me`
Fetches the currently authenticated trustee's identity from token claims.
* **Access:** Private (`Bearer <JWT>`)
* **Response (200 OK):**
```json
{
  "success": true,
  "admin": {
    "id": "6a7ec...",
    "username": "admin",
    "role": "superadmin",
    "name": "Zakariya Trust Executive Admin"
  }
}
```

---

## 3. Public Welfare & Donation Endpoints

### `GET /api/welfare-cases/public`
Returns all verified, approved, and publicly visible cases for community donation.
* **Access:** Public
* **Privacy Guarantee:** Automatically excludes private applicant phone numbers, residential addresses, and trustee verification notes.
* **Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "cases": [
    {
      "id": "6a7ec...",
      "caseNumber": "ZMT-2026-M401",
      "title": "Emergency Dialysis & Medication Support for Sister Fatima",
      "category": "Medical Relief",
      "beneficiaryName": "Sister Fatima & Family",
      "location": "Mundhwa, Pune",
      "story": "Mother of 3 requiring urgent bi-weekly hemodialysis...",
      "targetAmount": 45000,
      "raisedAmount": 18500,
      "verifiedBy": "Zakariya Masjid",
      "urgency": "Critical",
      "isZakatEligible": true,
      "bankDetails": {
        "accountHolderName": "Fatima Begum Shaikh",
        "bankName": "State Bank of India",
        "accountNumber": "38492019482",
        "ifscCode": "SBIN0001234",
        "upiId": "fatima.shaikh@oksbi",
        "branchName": "Mundhwa Branch"
      },
      "createdAt": "2026-08-10T09:30:00.000Z"
    }
  ]
}
```

### `POST /api/welfare-cases/apply`
Allows a community member to submit an application for welfare or financial assistance.
* **Access:** Public (Rate Limited: 30/hr)
* **Request Body:**
```json
{
  "fullName": "Mohammed Zubair",
  "phone": "+91 98221 44556",
  "address": "Lane 4, Near Zakariya Masjid, Mundhwa, Pune",
  "category": "Medical Relief",
  "description": "Urgent assistance required for father's cataract surgery",
  "amountNeeded": 25000,
  "bankDetails": {
    "accountHolderName": "Mohammed Zubair",
    "bankName": "HDFC Bank",
    "accountNumber": "50100293849281",
    "ifscCode": "HDFC0000123",
    "upiId": "zubair@okhdfcbank"
  }
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "JazakAllah Khair. Your assistance application has been registered securely. Our trustee committee will verify your details.",
  "caseNumber": "ZMT-2026-A789"
}
```

---

## 4. Public Contact Inquiries Endpoint

### `POST /api/contact/submit`
Submits a public inquiry from the contact form. Automatically saves to the database AND triggers an instant email to `contact@zakariyamasjid.org`.
* **Access:** Public (Rate Limited: 30/hr)
* **Request Body:**
```json
{
  "name": "Janab Farooq Ansari",
  "email": "farooq.ansari@gmail.com",
  "phone": "+91 98220 44556",
  "subject": "Kabristan & Burial Service",
  "message": "Assalamu Alaikum, I wanted to inquire regarding grave plot documentation."
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "JazakAllah Khair. Your inquiry has been sent to the Trust administration. We will get back to you shortly.",
  "inquiryId": "msg-6a7ec...",
  "emailDispatched": true
}
```

---

## 5. Admin Protected Management Endpoints (`Bearer <JWT>`)

### `GET /api/admin/dashboard-stats`
Retrieves aggregated metrics (pending, approved, rejected, completed counts, and financial totals).
* **Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "total": 12,
    "pending": 2,
    "approved": 8,
    "rejected": 1,
    "completed": 1,
    "totalTarget": 350000,
    "totalRaised": 145000
  }
}
```

### `GET /api/admin/welfare-cases`
Returns cases with optional query filters:
* **Query Parameters:**
  - `status` (`pending` | `approved` | `rejected` | `completed` | `all`)
  - `category` (`Medical Relief` | `Ration & Food` | `Orphan Education` | etc.)
  - `search` (Search by name, case number, location, title)

### `PATCH /api/admin/welfare-cases/:id/status`
Updates case status (Approve, Reject, Complete) and logs trustee verification metadata.
* **Request Body:**
```json
{
  "status": "approved",
  "verifiedBy": "Zakariya Masjid",
  "verificationNotes": "Physical verification completed by Trustee Brother Tanveer. Hospital bills checked.",
  "isPubliclyVisible": true
}
```

### `GET /api/admin/contacts-stats`
Returns counts of public inquiries (`total`, `unread`, `read`, `resolved`).

### `GET /api/admin/contacts`
Fetches contact messages with optional filtering (`status=unread|read|resolved`, `search=...`).

### `PATCH /api/admin/contacts/:id/status`
Updates status of an inquiry and saves private trustee follow-up notes.
* **Request Body:**
```json
{
  "status": "resolved",
  "notes": "Called applicant on 14th Aug. Scheduled burial document submission."
}
```

### `DELETE /api/admin/contacts/:id`
Permanently deletes a contact message from the inbox.
