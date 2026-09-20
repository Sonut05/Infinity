# Infinity Space Group — Official Web Platform

**Brand Positioning:** Architects | Engineers | Contractors  
**Tagline:** From Concept to Creation  
**Headquarters:** Ranchi, Jharkhand, India  

A production-grade web application and client consultation platform for Infinity Space Group. The platform pairs a modern, high-performance architectural frontend with a Python/Flask REST API and a PostgreSQL database.

---

## Architecture Overview

```
Visitor (Browser)
       │
       ▼
React / Vite / TypeScript (Port 5173)
       │
       │ HTTP / JSON (CORS-restricted)
       ▼
Flask REST API (Port 5000)
       │
       ▼ SQLAlchemy ORM + Migrations (Alembic)
PostgreSQL Database (Port 5432 / 5433)
```

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend:** Python 3.13+, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS.
- **Database:** PostgreSQL with transactional migrations and check constraints.
- **Admin System:** Secure session cookie-based authentication, sliding-window brute force rate limiting, private enquiry management dashboard.
- **Zero-Fabrication Policy:** Factual positioning without synthetic claims, fake ratings, or unverified testimonials.

---

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask application factory, CORS credentials & security headers
│   │   ├── cli.py               # Custom Flask CLI commands (flask create-admin)
│   │   ├── config.py            # Environment-driven configuration classes & session cookies
│   │   ├── extensions.py        # SQLAlchemy, Migrate, CORS instances
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── admin_user.py    # AdminUser model with Werkzeug secure password hashing
│   │   │   └── enquiry.py       # Enquiry model with status check constraints & indexes
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── health.py        # /api/health and /api/ready probes
│   │       ├── enquiries.py     # POST /api/enquiries validation & persistence
│   │       └── admin.py         # Admin authentication, dashboard metrics & enquiry management
│   ├── migrations/              # Alembic database migration scripts (enquiries + admin_users)
│   ├── tests/                   # Pytest automated test suite (34 passed tests)
│   │   ├── conftest.py
│   │   ├── test_health.py
│   │   ├── test_enquiries.py
│   │   └── test_admin.py        # Admin authentication, rate limiting, and management tests
│   ├── requirements.txt         # Pinned Python dependencies
│   ├── run.py                   # WSGI entrypoint and development server
│   ├── .env.example
│   └── .env                     # (Ignored by git)
│
├── src/                         # React / Vite frontend
│   ├── components/
│   │   ├── admin/               # AdminLayout, AdminProtectedRoute
│   │   ├── common/              # TrustSection, TestimonialsSection, DocumentTitle
│   │   ├── contact/             # EnquiryForm (connected to real Flask API)
│   │   ├── home/                # Hero, ConceptToCreation, InstagramSection
│   │   ├── layout/              # Navbar, Footer, MobileStickyCTA
│   │   ├── projects/            # ProjectCard, ProjectGallery, BeforeAfterSlider
│   │   └── services/            # ServiceDetailModal
│   ├── config/
│   │   ├── api.ts               # Centralized API endpoints, admin client functions & types
│   │   └── contact.ts           # Centralized verified contact information
│   ├── context/
│   │   └── AdminAuthContext.tsx # Admin auth state, login/logout, session expiry handler
│   ├── data/                    # Services, projects, process data
│   ├── pages/                   # Home, About, Services, Projects, Process, Contact
│   │   └── admin/               # AdminLogin, AdminDashboard, AdminEnquiries, AdminEnquiryDetail
│   └── types/                   # TypeScript interfaces
│
├── .env.example                 # Root environment template
└── package.json
```

---

## Getting Started Locally

### 1. Prerequisites
- **Node.js:** v18+ and npm
- **Python:** v3.11+
- **PostgreSQL:** v15+

### 2. Database Setup
Create the PostgreSQL database using `psql`:
```sql
CREATE DATABASE infinity_space_group;
```

### 3. Backend Setup
Navigate into the `backend/` directory:
```bash
cd backend
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# macOS/Linux:
source venv/bin/activate

# Install dependencies:
pip install -r requirements.txt
```

Create `backend/.env` from `.env.example`:
```env
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-development-secret-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/infinity_space_group
FRONTEND_ORIGIN=http://localhost:5173
```

Run database migrations:
```bash
flask db upgrade
```

### 4. Create Initial Administrator
Never hardcode passwords or use default credentials. Create your administrator account securely via the CLI:
```bash
flask create-admin --username admin_user --email admin@infinityspacegroup.in
```
You will be securely prompted for the password (hidden input, minimum 8 characters).

Start the Flask backend:
```bash
python run.py
```
The API will be available at `http://localhost:5000`.

### 5. Frontend Setup
In the project root:
```bash
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.
- **Public Website:** `http://localhost:5173/`
- **Admin Portal:** `http://localhost:5173/admin` (redirects to `/admin/login` if unauthenticated)

---

## Admin Portal & Authentication Architecture

### Authentication Method
- **Mechanism:** HTTP-only secure cookie session (`isg_admin_session`).
- **Security Flags:** `HttpOnly=True`, `SameSite=Lax`, `Secure=True` in production.
- **Client Protection:** JavaScript cannot access authentication cookies, preventing XSS token theft.
- **Rate Limiting:** Sliding window brute force protection (maximum 5 failed attempts per 15-minute window per IP/email) returning HTTP 429.
- **Session Expiry:** Expired sessions automatically return HTTP 401; the frontend auth context catches 401s, clears state, and redirects with an expiration notice.

### Admin API Endpoints

#### 1. Admin Login
**`POST /api/admin/login`**
- **Request Body:**
```json
{
  "email": "admin@infinityspacegroup.in",
  "password": "your_secure_password"
}
```
- **Success (200 OK):**
```json
{
  "success": true,
  "admin": {
    "id": 1,
    "username": "admin_user",
    "email": "admin@infinityspacegroup.in"
  }
}
```
*Note: Password hashes and sensitive tokens are never returned.*

#### 2. Admin Logout
**`POST /api/admin/logout`**
- Clears session cookie and invalidates session.
- **Success (200 OK):** `{"success": true}`

#### 3. Current Admin Session
**`GET /api/admin/me`**
- Returns currently authenticated admin details or 401 Unauthorized.

#### 4. Dashboard Summary Statistics
**`GET /api/admin/dashboard`**
- **Success (200 OK):**
```json
{
  "total": 16,
  "new": 14,
  "contacted": 2,
  "in_progress": 0,
  "closed": 0
}
```

#### 5. List Enquiries (Paginated, Searchable, Filterable)
**`GET /api/admin/enquiries?page=1&limit=20&search=ranchi&status=new&service=Planning&sort=newest`**
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20, max: 100)
  - `search`: Search string matched safely with SQLAlchemy `ilike`
  - `status`: Allowed values: `new`, `contacted`, `in_progress`, `closed`
  - `service`: Must match one of the 9 verified services
  - `sort`: `newest` (default) or `oldest`

#### 6. Single Enquiry Detail
**`GET /api/admin/enquiries/<id>`**
- Returns complete enquiry data with reference format `ISG-<id>`.

#### 7. Update Enquiry Status
**`PATCH /api/admin/enquiries/<id>`**
- **Request Body:**
```json
{
  "status": "contacted"
}
```
- Allowed statuses: `new`, `contacted`, `in_progress`, `closed`.

---

## Public API Documentation

### 1. Health Probe
**`GET /api/health`** — Confirms Flask process is alive.

### 2. Readiness Probe
**`GET /api/ready`** — Verifies Flask and PostgreSQL database connectivity.

### 3. Create Enquiry
**`POST /api/enquiries`** — Submits a client consultation enquiry.

---

## Testing

### Automated Backend Tests
Run the complete pytest suite (47 passed tests):
```bash
cd backend
$env:PYTHONPATH="."; .\venv\Scripts\pytest.exe -v
```
Test suite includes:
- **Admin Authentication & Security (34 tests):** admin model creation, login, invalid password, unknown email, logout, `/api/admin/me` authorized/unauthorized, protected route rejection, pagination, search, status filtering, service filtering, invalid filters, detail retrieval, 404 missing enquiry, status updates, invalid status validation, dashboard summary totals, session expiration, sliding-window rate limiting (HTTP 429), state-changing request without CSRF rejected (HTTP 403), state-changing request with invalid CSRF rejected (HTTP 403), valid CSRF admin request succeeds (HTTP 200), production `DEBUG=False`, production `SESSION_COOKIE_SECURE=True`, `HttpOnly=True`, `SameSite=Lax`, custom cookie name `isg_admin_session`, CORS disallow wildcard with credentials, missing production `SECRET_KEY` raises `RuntimeError`, valid production secret initialization, development config support, and security headers.
- **Public Enquiries (11 tests):** valid submission, validation rules, deduplication, payload size limits, malformed JSON.
- **Health & Readiness Probes (2 tests):** live and database ready.

### Frontend Build Verification
Verify TypeScript compilation and Vite bundling:
```bash
npm run build
```

---

## Production Deployment Runbook (Phase 6)

### 1. Frontend Deployment (Netlify)
1. **Repository Setup:** Connect the repository to your Netlify dashboard.
2. **Build Settings:**
   - **Base directory:** Leave blank (root).
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. **Environment Variables:**
   - Add `VITE_API_BASE_URL` with the HTTPS URL of your deployed Flask API (e.g. `https://api.infinityspacegroup.in`).
4. **Routing & Headers:** `netlify.toml` automatically handles SPA fallback redirects (`/* -> /index.html 200`) and enforces strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, etc.).

### 2. Backend Deployment (Docker / Cloud Platforms)
The Flask application is packaged with Gunicorn for production container platforms (Render, Railway, AWS ECS, DigitalOcean App Platform, Fly.io):

#### Using Docker Container
```bash
# Build the production image
docker build -t isg-backend backend/

# Run the production container
docker run -d \
  -p 5000:5000 \
  -e FLASK_ENV=production \
  -e SECRET_KEY="<your-strong-production-secret>" \
  -e DATABASE_URL="postgresql+psycopg2://<user>:<pass>@<host>:5432/<dbname>?sslmode=require" \
  -e FRONTEND_ORIGIN="https://infinityspacegroup.in" \
  -e SESSION_COOKIE_SECURE=true \
  --name isg-backend-prod \
  isg-backend
```

#### Running Database Migrations
In your deployed environment or release phase, execute:
```bash
flask db upgrade
```

#### Creating the Production Administrator
Run the interactive CLI command inside the deployed container or host environment:
```bash
flask create-admin --username admin_user --email admin@infinityspacegroup.in
```

### 3. Production Environment Checklist
| Variable | Scope | Description |
|---|---|---|
| `FLASK_ENV` | Backend | Must be set to `production` |
| `SECRET_KEY` | Backend | 64+ char random hex key (`python -c 'import secrets; print(secrets.token_hex(32))'`) |
| `DATABASE_URL` | Backend | Managed PostgreSQL connection string with SSL enabled |
| `FRONTEND_ORIGIN` | Backend | Exact production frontend URL (no trailing slash, no wildcards) |
| `SESSION_COOKIE_SECURE` | Backend | `true` (enforces HTTPS cookie transmission) |
| `PORT` | Backend | Default `5000` |
| `VITE_API_BASE_URL` | Frontend | Exact deployed backend URL (configured before `npm run build`) |

