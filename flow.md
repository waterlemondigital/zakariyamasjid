# 🕌 Zakariya Masjid & Kabrastan Trust — Complete System Flow

This document details the complete end-to-end user journeys, system architectures, data flows, and state transitions of the Zakariya Masjid & Kabrastan Trust web application.

---

## 🏛️ 1. High-Level Architecture Overview

The system consists of three distinct, loosely coupled services:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            1. PUBLIC WEBSITE                                │
│                     (Vite + React SPA + Tailwind CSS)                       │
│                   https://frontend-seven-rosy-33.vercel.app                 │
│                                                                             │
│  • Prayer Timings & Jumu'ah        • Kabristan Burial Assistance            │
│  • Public Welfare Donation Cases   • Financial Transparency                 │
│  • Online Assistance Application   • Multilingual Contact Form              │
└───────────────────────┬─────────────────────────────▲───────────────────────┘
                        │ HTTP POST (Applications)    │ HTTP GET (Live Data)
                        │ HTTP POST (Contact Inquiries)
                        ▼                             │
┌─────────────────────────────────────────────────────┴───────────────────────┐
│                           2. BACKEND API SERVICE                            │
│                  (Node.js + Express + TypeScript + MongoDB)                 │
│                   https://zakariyamasjid-backend.vercel.app                 │
│                                                                             │
│  • Security Middleware (Helmet, CORS, Rate Limiters, Sanitization)          │
│  • Welfare Cases Controller (Approval, Sanitization, Masking)               │
│  • Contact Controller & GoDaddy SMTP Notification Dispatcher                │
│  • JWT Admin Authentication & Role-Based Access Control                     │
│  • Dual-Persistence Engine (MongoDB Atlas + In-Memory Fallback)             │
└───────────────────────▲─────────────────────────────┬───────────────────────┘
                        │ JWT Auth / Mutations        │ HTTP GET (Admin Inboxes)
                        │ Status Updates & Notes      │ Verification Queues
┌───────────────────────┴─────────────────────────────▼───────────────────────┐
│                         3. TRUSTEE ADMIN PORTAL                             │
│                     (Vite + React SPA + Tailwind CSS)                       │
│                    https://admin-one-blond-57.vercel.app                    │
│                                                                             │
│  • Secure Trustee Login & Session Management                                │
│  • Welfare Verification Queue (Review, Approve, Edit, Reject)               │
│  • Contact Inquiries Desk (WhatsApp, Call, Email, Statuses, Notes)          │
│  • Real-Time Metrics & Analytics Dashboard                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 2. Core User Flows & Journeys

---

### 🌊 Flow A: Community Welfare Assistance Request & Trustee Approval

```mermaid
sequenceDiagram
    autonumber
    actor Needy as Applicant (Needy Family)
    participant Web as Public Website
    participant API as Backend API
    participant DB as MongoDB Atlas
    actor Trustee as Trustee Committee
    participant Admin as Admin Panel
    actor Donor as Community Donor

    Needy->>Web: Opens Assistance Form (/welfare-cases or /contact)
    Needy->>Web: Enters Details (Name, Phone + Country Code, Address, Story, Bank Details)
    Web->>API: POST /api/welfare-cases/apply
    API->>API: Sanitize Inputs, Strip HTML, Enforce Length Boundaries
    API->>DB: Save case with status="pending", isPubliclyVisible=false
    API-->>Web: Returns Case Number (e.g. ZMT-2026-A1B2)
    Web-->>Needy: Displays Confirmation & Reference ID

    Note over Trustee, Admin: Trustee Committee Review
    Trustee->>Admin: Logs into Trustee Admin Portal
    Admin->>API: GET /api/admin/welfare-cases?status=pending
    API-->>Admin: Returns pending applications queue
    Trustee->>Admin: Reviews Case Story, Calls Applicant, Verifies Bank Details
    Trustee->>Admin: Edits sanitized public story, sets Target Amount & Urgency
    Trustee->>Admin: Clicks "Approve & Publish to Website"
    Admin->>API: PATCH /api/admin/welfare-cases/:id/status (status="approved", isPubliclyVisible=true)
    API->>DB: Update Case in Database

    Note over Donor, Web: Public Donation Phase
    Donor->>Web: Visits /welfare-cases page
    Web->>API: GET /api/welfare-cases/public
    API->>API: Strip private data (applicantPhone, homeAddress, govtId)
    API-->>Web: Returns sanitized verified profiles & bank details
    Donor->>Web: Clicks "Transfer Sadaqah / Zakat"
    Web-->>Donor: Expands Direct Bank & UPI Details (1-Click Copy)
    Donor->>Donor: Transfers funds directly from GPay / PhonePe / Bank App to Beneficiary
```

---

### 📬 Flow B: Public Contact Inquiry & Automated Email Notification

```mermaid
sequenceDiagram
    autonumber
    actor User as Website Visitor
    participant Web as Public Website (/contact)
    participant API as Backend API (/api/contact/submit)
    participant DB as MongoDB / Store
    participant SMTP as GoDaddy Mail Server
    actor Inbox as Trustee Email (contact@zakariyamasjid.org)
    actor AdminUser as Trustee on Admin Portal

    User->>Web: Fills Contact Form (Name, Country Code + Phone, Email, Subject, Message)
    User->>Web: Clicks "Submit Inquiry"
    Web->>API: POST /api/contact/submit
    API->>API: Validate fields, sanitize HTML strings, escape regex
    API->>DB: Store Inquiry (status="unread")
    API->>SMTP: Dispatch HTML Email via Nodemailer (Port 465 SSL)
    SMTP-->>Inbox: Delivers formatted email with Reply-To & WhatsApp chat link
    API-->>Web: Returns success: true, inquiryId
    Web-->>User: Displays "Message Received" with reference token

    Note over AdminUser, API: Admin Management
    AdminUser->>AdminUser: Receives Email in Inbox OR opens Admin Portal (/contacts)
    AdminUser->>API: PATCH /api/admin/contacts/:id/status (status="read" or "resolved")
    AdminUser->>API: Add private internal follow-up notes
```

---

### 🔐 Flow C: Admin Authentication & Session Management

```mermaid
sequenceDiagram
    autonumber
    actor Trustee as Trustee / Admin
    participant AdminApp as Admin Frontend
    participant API as Backend (/api/auth/login)
    participant DB as MongoDB (AdminUser collection)

    Trustee->>AdminApp: Visits https://admin-one-blond-57.vercel.app/login
    Trustee->>AdminApp: Enters Username & Password
    AdminApp->>API: POST /api/auth/login
    API->>API: Rate Limiter Check (Max 20 per 15 min)
    API->>DB: Find user by lowercase username or email
    API->>API: Verify password with bcrypt.compare()
    API->>API: Generate signed JWT (expires in 24 hours)
    API-->>AdminApp: Returns token & sanitized admin user object
    AdminApp->>AdminApp: Stores token in localStorage ('zmt_admin_token')
    AdminApp->>AdminApp: Redirects to Dashboard (/)
    
    Note over AdminApp, API: Subsequent Protected Requests
    AdminApp->>API: GET /api/admin/dashboard-stats (Authorization: Bearer <token>)
    API->>API: Verify JWT signature & expiration via authMiddleware
    API-->>AdminApp: Returns protected metrics & stats
```

---

## 🗂️ 3. State Lifecycle Models

### Welfare Case Lifecycle
```
[User Submits Form]
         │
         ▼
    ┌─────────┐
    │ PENDING │  ◄── Hidden from public website, only visible in Admin Queue
    └────┬────┘
         │
         ├──────────────────────────┐
         ▼                          ▼
   ┌──────────┐               ┌──────────┐
   │ APPROVED │               │ REJECTED │
   └─────┬────┘               └──────────┘
         │
         │  ◄── Publicly visible on /welfare-cases for direct donor transfers
         │
         ▼
   ┌───────────┐
   │ COMPLETED │  ◄── Archived once target amount is fulfilled
   └───────────┘
```

### Contact Inquiry Lifecycle
```
[User Submits Contact Form]
         │
         ▼
    ┌────────┐
    │ UNREAD │  ◄── Triggers instant email to contact@zakariyamasjid.org + pulsing alert in Admin
    └───┬────┘
        │
        ├───────────────────────────┐
        ▼                           ▼
    ┌──────┐                  ┌──────────┐
    │ READ │ ── (Follow-up) ──►│ RESOLVED │
    └──────┘                  └──────────┘
```
