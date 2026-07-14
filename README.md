# 🦅 IqwanEngine v3.5 - OWLFX Administrative Core

<div align="center">
  <h3>Premium Midnight Gold Technology | Cyberpunk Security Infrastructure</h3>
  <p><i>Proprietary Administrative Database Dashboard & Security Gateway for the OWLFX Trading Ecosystem.</i></p>
</div>

---

### 🌌 Project Overview
**IqwanEngine** is a high-performance, secure administrative layer designed to manage VIP traders, monitor live telemetries, and safeguard sensitive API handshakes between Valetax MT5 servers and Google Spreadsheet databases.

```ascii
+-----------------------------------------------------------+
| [ IQWANENGINE CORE V3.5 ]                                 |
|                                                           |
|  >> SECURITY: ACTIVATED                                   |
|  >> TELEMETRY: NOMINAL                                    |
|  >> DATA PERSISTENCE: GOOGLE CLOUD SYNC                   |
+-----------------------------------------------------------+
          |                      |                      |
    [ ADMIN DASH ]        [ PROXY GATEWAY ]       [ VIP REGISTRY ]
    Midnight Gold UI      Express.ts Core        Tiered Auth System
```

---

### 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 + Vite 6 + TypeScript |
| **Styling** | Tailwind CSS 4.0 (Cyberpunk Glow Engine) |
| **Backend** | Node.js + Express.ts (Security Handshake) |
| **Animations** | Framer Motion / Motion One |
| **Data Fetching** | SWR (Stale-While-Revalidate) |
| **Security** | Bcrypt.js + Iqwan Rate-Limiter |

---

### 🛡️ Security Architecture: IqwanEngine Gate
The system implements a multi-tiered security handshake to prevent unauthorized access and data exposure.

```ascii
+-----------------------+      +-----------------------+      +-----------------------+
|   CLIENT (Browser)    |      |    IQWAN GATEWAY      |      |   REMOTE DATA PROVIDER|
|                       |      |                       |      |                       |
| [X-IQWAN-API-KEY] ----+----> | [SANITY CHECK & RATE] | ----+----> [SENSITIVE TOKEN] |
|                       |      | [LIM-AUDIT-LOGGING  ] |      |                       |
+-----------------------+      +-----------------------+      +-----------------------+
```

1.  **Sanitized Proxies**: Sensitive tokens (Valetax/Sheets) never touch the client browser.
2.  **Rate Limiting**: Brute-force protection on the `/api/auth` gate.
3.  **Cryptographic Integrity**: Admin passwords are encrypted using `bcryptjs` with high-cost salt factors.
4.  **Audit Logs**: Real-time logging of all administrative actions within the "Terminal" view.

---

### 🚀 Deployment Instructions (Vercel)

#### 1. Pre-deployment Configuration
Ensure you have the `vercel.json` and `.env.example` mapped in your local root.

#### 2. Clean Reset Workflow
```bash
# Push fresh codebase to GitHub
git push origin main --force

# Deploy to Vercel (Ignoring Cache)
vercel --prod --force
```

#### 3. Required Environment Variables
| Variable | Description |
| :--- | :--- |
| `VITE_APPS_SCRIPT_URL` | Raw Google Macro stream endpoint |
| `VITE_VALETAX_TOKEN` | Master Partner Token for MT5 Sync |
| `VITE_API_SHARED_SECRET` | Master Handshake Key (Client <-> Server) |

---

### 📁 Directory Structure
```ascii
UPDATE ADMIN PAGE COMPLETE/
├── server.ts           # The Security Handshake Node (Backend)
├── vercel.json         # Vercel Deployment Orchestrator
├── src/
│   ├── components/     # High-Fidelity UI Modules
│   ├── data/           # Mock Data & Telemetry Definitions
│   └── App.tsx         # Main Logic & Routing Engine
└── public/             # Static Assets & Fallback Handlers
```

---

<div align="center">
  <p><b>Designed & Engineered by Senior Developer & Cyber Security Lead</b></p>
  <p><i>"Safeguarding the future of OWLFX Trading."</i></p>
</div>
