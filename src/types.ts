/* ==========================================================================
   OWLFX Database System / IqwanEngine v3
   ========================================================================== */

export interface Trader {
  traderName: string;            // TRADER_NAME
  registerEmail: string;          // REGISTER_EMAIL
  tradingViewUsername: string;    // TRADING_VIEW_USERNAME
  valetaxId: string;              // VALETAX_ID
  registerDate: string;           // REGISTER_DATE
  serviceDays: number;            // SERVICE_DAYS
  updatedBy: string;              // UPDATED_BY
  level: string;                  // level
  directPartnerEmail: string;     // directPartnerEmail
  balance: number;                // balance
  equity: number;                 // equity
  credit: number;                 // credit
  margin: number;                 // margin
  leverage: string;               // leverage
  accountName: string;            // accountName
  accountType: string;            // accountType
  server: string;                 // server
  platform: string;               // platform
  dateOfCreation: string;         // dateOfCreation
  currency: string;               // currency
  status: string; // STATUS
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'Super Admin' | 'Admin';
  createdAt: string;
  password?: string;
}

export interface TerminalLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'cmd';
}

export interface SecurityAuditLog {
  timestamp: string;
  email: string;
  username: string;
  action: string;
  ipPlaceholder: string;
}

export interface ClassReminder {
  seminarTitle: string;
  date: string;
  location: string;
  whatsAppNumber: string;
}

export interface TelegramLink {
  id: string;
  name: string;
  url: string;
  badgeColor: string;
}

export interface PythonScript {
  id: string;
  name: string;
  description: string;
  version: string;
  lastUpdated: string;
  status: 'Active' | 'Idle' | 'Refactoring';
}
