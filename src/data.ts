/* ==========================================================================
   OWLFX Database System / IqwanEngine v3
   ========================================================================== */

import { Trader, Admin, TelegramLink, PythonScript } from './types';

export const INITIAL_TRADERS: Trader[] = [
  {
    traderName: "IqwanEngine",
    registerEmail: "iqwan@owlfx.com",
    tradingViewUsername: "iqwan_engine_v3",
    valetaxId: "VT-883719-X",
    registerDate: "2026-01-10",
    serviceDays: 365,
    updatedBy: "Super Admin",
    level: "Tier-1 VIP",
    directPartnerEmail: "p_albakri@owlfx.partner",
    balance: 145250.00,
    equity: 148900.22,
    credit: 5000.00,
    margin: 143900.22,
    leverage: "1:500",
    accountName: "Iqwan Master Engine",
    accountType: "ECN Pro",
    server: "Valetax-Live-03",
    platform: "MT5",
    dateOfCreation: "2026-01-09 14:22:11",
    currency: "USD",
    status: "Active"
  },
  {
    traderName: "Satoshi G. Nakamoto",
    registerEmail: "iqwan_owl@protonmail.com",
    tradingViewUsername: "satoshitrading",
    valetaxId: "VT-711204-A",
    registerDate: "2026-03-15",
    serviceDays: 180,
    updatedBy: "Owl_admin3677",
    level: "Tier-1 VIP",
    directPartnerEmail: "partners@owlfx.com",
    balance: 890450.00,
    equity: 910220.50,
    credit: 25000.00,
    margin: 885220.50,
    leverage: "1:200",
    accountName: "Satoshi Vault",
    accountType: "Islamic Standard",
    server: "Valetax-Live-01",
    platform: "MT5",
    dateOfCreation: "2026-03-14 09:12:00",
    currency: "USD",
    status: "Active"
  },
  {
    traderName: "Sophia Hernandez",
    registerEmail: "iqwan_owl@fintech-g.org",
    tradingViewUsername: "sophia_fx_scalper",
    valetaxId: "VT-109332-Y",
    registerDate: "2026-05-18",
    serviceDays: 90,
    updatedBy: "Owl_admin3677",
    level: "Tier-2 Executive",
    directPartnerEmail: "latam_affiliate@owlfx.net",
    balance: 42090.15,
    equity: 39500.00,
    credit: 0.00,
    margin: 39500.00,
    leverage: "1:500",
    accountName: "Sophia Swing VT",
    accountType: "ECN Classic",
    server: "Valetax-Live-02",
    platform: "MT5",
    dateOfCreation: "2026-05-18 01:29:45",
    currency: "EUR",
    status: "Active"
  },
  {
    traderName: "Marcus Aurelius",
    registerEmail: "iqwan_owl@rome.it",
    tradingViewUsername: "meditations_chart",
    valetaxId: "VT-244199-B",
    registerDate: "2026-04-02",
    serviceDays: 120,
    updatedBy: "Super Admin",
    level: "Tier-2 Executive",
    directPartnerEmail: "partners@owlfx.com",
    balance: 67320.00,
    equity: 67320.00,
    credit: 1200.00,
    margin: 66120.00,
    leverage: "1:100",
    accountName: "Stoic Equity Core",
    accountType: "Standard Gold",
    server: "Valetax-Live-01",
    platform: "MT4",
    dateOfCreation: "2026-04-01 11:11:11",
    currency: "USD",
    status: "Pending"
  },
  {
    traderName: "Yuki Tanaka",
    registerEmail: "iqwan_owl@tokyo-quant.jp",
    tradingViewUsername: "yuki_quantum",
    valetaxId: "VT-550212-Q",
    registerDate: "2026-02-28",
    serviceDays: 240,
    updatedBy: "Owl_admin3677",
    level: "Tier-1 VIP",
    directPartnerEmail: "tokyo_office@owlfx.net",
    balance: 210850.30,
    equity: 209500.00,
    credit: 10000.00,
    margin: 199500.00,
    leverage: "1:400",
    accountName: "Tanaka Arbitrage v3",
    accountType: "ECN Pro",
    server: "Valetax-Live-03",
    platform: "MT5",
    dateOfCreation: "2026-02-28 08:22:45",
    currency: "JPY",
    status: "Active"
  },
  {
    traderName: "Alexander Gray",
    registerEmail: "iqwan_owl@londoncapital.co.uk",
    tradingViewUsername: "gray_gbp_hawk",
    valetaxId: "VT-669112-E",
    registerDate: "2026-05-30",
    serviceDays: 30,
    updatedBy: "Admin Staff",
    level: "Tier-3 Standard",
    directPartnerEmail: "partners@owlfx.com",
    balance: 12400.00,
    equity: 12400.00,
    credit: 0.00,
    margin: 12400.00,
    leverage: "1:200",
    accountName: "Gray Swing GBP",
    accountType: "Micro Standard",
    server: "Valetax-Live-02",
    platform: "MT4",
    dateOfCreation: "2026-05-30 18:00:15",
    currency: "GBP",
    status: "Inactive"
  },
  {
    traderName: "Amara Diop",
    registerEmail: "iqwan_owl@dakar-invest.sn",
    tradingViewUsername: "amara_gold_hawk",
    valetaxId: "VT-304918-D",
    registerDate: "2026-06-01",
    serviceDays: 365,
    updatedBy: "Super Admin",
    level: "Tier-1 VIP",
    directPartnerEmail: "iqwan_owlb@owlfx.net",
    balance: 312000.00,
    equity: 334180.00,
    credit: 15000.00,
    margin: 319180.00,
    leverage: "1:500",
    accountName: "Amara Enterprise VT",
    accountType: "ECN Pro",
    server: "Valetax-Live-03",
    platform: "MT5",
    dateOfCreation: "2026-05-31 22:15:30",
    currency: "USD",
    status: "Active"
  }
];

export const INITIAL_ADMINS: Admin[] = [
  {
    id: "ADM-IE-01",
    username: "IqwanEngine",
    email: "iqwan@owlfx.online",
    role: "Super Admin",
    createdAt: "2026-01-01",
    password: "$2b$10$fdvSzwL1hWKKYAMf6Do5/eR8QtkPGCCKZzETM4hn84gtxlGdKJ5xe"
  },
  {
    id: "ADM-PW-02",
    username: "Paduka Wan OwlFX",
    email: "wan@owlfx.online",
    role: "Super Admin",
    createdAt: "2026-01-02",
    password: "$2b$10$fdvSzwL1hWKKYAMf6Do5/eR8QtkPGCCKZzETM4hn84gtxlGdKJ5xe"
  },
  {
    id: "ADM-HZ-03",
    username: "Haziq",
    email: "Syazzmir@owlfx.online",
    role: "Admin",
    createdAt: "2026-01-03",
    password: "$2b$10$fdvSzwL1hWKKYAMf6Do5/eR8QtkPGCCKZzETM4hn84gtxlGdKJ5xe"
  },
  {
    id: "ADM-CP-04",
    username: "Cepris",
    email: "Sheffry@owlfx.online",
    role: "Admin",
    createdAt: "2026-01-04",
    password: "$2b$10$fdvSzwL1hWKKYAMf6Do5/eR8QtkPGCCKZzETM4hn84gtxlGdKJ5xe"
  },
  {
    id: "ADM-AM-05",
    username: "Ammar",
    email: "Ammar_Arab@owlfx.online",
    role: "Admin",
    createdAt: "2026-01-05",
    password: "$2b$10$fdvSzwL1hWKKYAMf6Do5/eR8QtkPGCCKZzETM4hn84gtxlGdKJ5xe"
  }
];

export const TELEGRAM_LINKS: TelegramLink[] = [
  { id: "tg-1", name: "OWL VIP", url: "https://t.me/+5F3t6BCXfkg1Zjll", badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
  { id: "tg-2", name: "OWL PUBLIC", url: "https://t.me/OWLfxPublicChannel", badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { id: "tg-3", name: "OWL SUPPORT", url: "https://t.me/+4u1vQ4B81qlhMmI1", badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { id: "tg-4", name: "OWL ANALISIS", url: "https://t.me/+-cK5umkJ4o00YjFl", badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { id: "tg-5", name: "OWL ACADEMY", url: "https://t.me/OwlfxAcademyt", badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" }
];

export const PYTHON_SCRIPTS: PythonScript[] = [
  { id: "py-1", name: "core_valetax_sync.py", description: "Performs hourly state audits between Valetax MT5 Server and Google Sheets backend databases.", version: "3.4.1", lastUpdated: "2026-06-10 11:24", status: "Active" },
  { id: "py-2", name: "telegram_broadcaster_bot.py", description: "Broadcasts real-time signals, billing reports, and custom client alerts.", version: "2.1.0", lastUpdated: "2026-06-11 04:12", status: "Active" },
  { id: "py-3", name: "leverage_tier_adjuster.py", description: "Monitors client balance tiers and auto-updates account leverage flags recursively.", version: "1.9.3", lastUpdated: "2026-06-08 17:45", status: "Idle" },
  { id: "py-4", name: "risk_telemetry_engine.py", description: "Monitors drawdowns across top 50 VIP entity balances and pushes warnings.", version: "3.0.0-rc2", lastUpdated: "2026-06-11 12:05", status: "Refactoring" }
];

export const IPQWAN_PYTHON_CODE = `# ==========================================================================
# OWLFX Database System / IqwanEngine v3 (Super Admin Core Vault)
# ==========================================================================
import os
import json
import requests
import time

TELEGRAM_BOT_TOKEN = os.getenv("TG_BOT_TOKEN", "8371902263:AAF_xObfuscatedTokenID_********")
TELEGRAM_ALERT_CHAT_ID = os.getenv("TG_CHAT_ID", "-10022415132_********")

class IqwanEngineV3:
    def __init__(self, endpoint_url):
        self.endpoint = endpoint_url
        self.session = requests.Session()
        self.telemetry_active = True
        print("[IqwanEngine v3] Dedicated Client Core initialized successfully.")

    def fetch_live_warehouse_records(self):
        """
        Pulls read-only records containing all 21 columns from 
        the Google Sheet central repository database.
        """
        try:
            response = self.session.get(f"{self.endpoint}?action=db_warehouse")
            if response.status_code == 200:
                print(f"[SUCCESS] Retrieved {len(response.json())} active trading tracks.")
                return response.json()
            return []
        except Exception as e:
            print(f"[FATAL ENGINE ERROR] Pipeline read execution failed: {str(e)}")
            return None

    def trigger_telegram_heartbeat(self, node_id="OWLFX_LIVE_03"):
        """
        Pushes a hidden heart rate payload to security monitoring grid.
        """
        payload = {
            "chat_id": TELEGRAM_ALERT_CHAT_ID,
            "text": f"🔔 [TELEMETRY] IqwanEngine v3 live. Node: {node_id} is nominal. Integrity check: OK.",
            "parse_mode": "Markdown"
        }
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        try:
            self.session.post(url, json=payload, timeout=5)
            return True
        except Exception:
            return False

# Bootstrapping completed recursively.
`;
