/* ==========================================================================
   OWLFX Database System / IqwanEngine (IE) Platform
   Dashboard Component Subsystem - Live Synchronization Core
   
   [EXTERNAL BROKER TELEMETRY MAPPING FLOW]
   +-------------------------------------------------------------+
   |  Valetax REST API                                           |
   |  https://ma.valetax.com/api.external.partner...             |
   +------------------------------+------------------------------+
                                  |
                                  v
   +-------------------------------------------------------------+
   |  IqwanEngine Handshake Client                               |
   |  App.tsx :: handleSyncLiveApi()                             |
   +------------------------------+------------------------------+
                                  |
                                  v
   +-------------------------------------------------------------+
   |  DashboardComponent :: VipDirectoryRegistry / ActiveLog    |
   |  Dynamic balance adjustment + spinner toggling              |
   +=============================================================+ */

import React from 'react';
import { 
  Edit, 
  Trash2, 
  Users, 
  ClipboardList, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  Database,
  RefreshCw
} from 'lucide-react';
import { Trader } from '../types';

// Helper component for status badges
export function StatusBadge({ status }: { status: string }) {
  const norm = status.toUpperCase();
  if (norm === 'ACTIVE' || norm === 'VALID VIP' || norm === 'VALID VIP INDICATOR') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        {status}
      </span>
    );
  }
  if (norm === 'LOW BALANCE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-amber-500/10 text-amber-450 border border-amber-500/20 uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
        Low Bal
      </span>
    );
  }
  if (norm === 'MC' || norm === 'MARGIN CALL') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-450 animate-pulse"></span>
        MC
      </span>
    );
  }
  if (norm === 'DELETED BY ADMIN') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 uppercase tracking-wide line-through">
        Deleted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase tracking-wide">
      {status}
    </span>
  );
}

interface VipDirectoryRegistryProps {
  traders: Trader[];
  selectedTraderIds: string[];
  setSelectedTraderIds: React.Dispatch<React.SetStateAction<string[]>>;
  registryPage: number;
  setRegistryPage: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (trader: Trader) => void;
  onDelete: (traderName: string) => void;
  onBulkDelete: () => void;
  onBulkUpdateStatus: (status: 'Active' | 'Inactive' | 'Pending') => void;
  onSyncLiveApi?: (valetaxId: string) => void;
  syncingIds?: Record<string, boolean>;
}

export function VipDirectoryRegistry({
  traders,
  selectedTraderIds,
  setSelectedTraderIds,
  registryPage,
  setRegistryPage,
  onEdit,
  onDelete,
  onBulkDelete,
  onBulkUpdateStatus,
  onSyncLiveApi,
  syncingIds
}: VipDirectoryRegistryProps) {
  
  // Clean sorting (newest first based on register date)
  const sortedTraders = React.useMemo(() => {
    return [...traders].sort((a, b) => b.registerDate.localeCompare(a.registerDate));
  }, [traders]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedTraders.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(registryPage, totalPages);
  
  const paginatedTraders = React.useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return sortedTraders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedTraders, safePage]);

  const allPageSelected = paginatedTraders.length > 0 && paginatedTraders.every(t => selectedTraderIds.includes(t.valetaxId));

  const toggleAllPage = () => {
    if (allPageSelected) {
      const idsToFilter = paginatedTraders.map(t => t.valetaxId);
      setSelectedTraderIds(prev => prev.filter(id => !idsToFilter.includes(id)));
    } else {
      const idsToAdd = paginatedTraders.map(t => t.valetaxId);
      setSelectedTraderIds(prev => [...new Set([...prev, ...idsToAdd])]);
    }
  };

  const toggleSelectRow = (valetaxId: string) => {
    setSelectedTraderIds(prev => 
      prev.includes(valetaxId) 
        ? prev.filter(id => id !== valetaxId) 
        : [...prev, valetaxId]
    );
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 space-y-4">
      {/* Registry Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-semibold text-white font-sans">VIP Directory Registry</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {onSyncLiveApi && (
            <button
              type="button"
              onClick={() => {
                // sync all in current paginated view
                paginatedTraders.forEach(t => onSyncLiveApi(t.valetaxId));
              }}
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-zinc-950 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 text-[10px] rounded font-mono uppercase font-bold transition-all shadow-sm"
              title="Bulk Sync visible accounts with live Valetax Broker API"
            >
              <RefreshCw className="h-3 w-3" /> Sync Page API
            </button>
          )}
          <span className="text-xs font-mono text-zinc-500">
            Total: <span className="text-amber-500 font-bold">{sortedTraders.length}</span> entries
          </span>
        </div>
      </div>

      {/* Bulk actions panel */}
      {selectedTraderIds.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span><strong>{selectedTraderIds.length}</strong> accounts selected for bulk action</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={onBulkDelete}
              className="flex items-center gap-1 bg-rose-950/40 border border-rose-500/30 hover:bg-rose-500 text-rose-400 hover:text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all"
            >
              <Trash2 className="h-3 w-3" /> Bulk Delete
            </button>
            
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-850 rounded px-2 py-0.5">
              <span className="text-[9px] text-zinc-500 uppercase font-mono">Set Status:</span>
              <select
                onChange={(e) => {
                  const val = e.target.value as 'Active' | 'Inactive' | 'Pending';
                  if (val) {
                    onBulkUpdateStatus(val);
                    e.target.value = '';
                  }
                }}
                className="bg-transparent border-0 text-amber-500 font-semibold focus:outline-none focus:ring-0 cursor-pointer uppercase text-[10px] p-0"
                defaultValue=""
              >
                <option value="" disabled className="bg-zinc-950">Select...</option>
                <option value="Active" className="bg-zinc-950 text-emerald-400">Active</option>
                <option value="Inactive" className="bg-zinc-950 text-zinc-400">Inactive</option>
                <option value="Pending" className="bg-zinc-950 text-amber-400">Pending</option>
              </select>
            </div>

            <button 
              onClick={() => setSelectedTraderIds([])}
              className="text-zinc-500 hover:text-zinc-300 px-2 py-1 text-[10px] uppercase font-mono transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto border border-zinc-900 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-900 font-mono text-xs">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="px-4 py-3 text-left font-semibold" style={{ width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={allPageSelected}
                  onChange={toggleAllPage}
                  className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Trader Name</th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Register Email</th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">TradingView</th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Valetax ID</th>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right font-semibold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950/20 divide-y divide-zinc-900">
            {paginatedTraders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-zinc-500">
                  No VIP records found. Use filters above to adjust.
                </td>
              </tr>
            ) : (
              paginatedTraders.map((trader, index) => {
                const isSelected = selectedTraderIds.includes(trader.valetaxId);
                const isDeleted = trader.status === 'Deleted by Admin';
                return (
                  <tr key={`${trader.valetaxId}-${index}`} className={`hover:bg-zinc-900/40 transition-colors ${isSelected ? 'bg-amber-500/5' : ''}`}>
                    <td className="px-4 py-3 text-left">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelectRow(trader.valetaxId)}
                        className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                      />
                    </td>
                    <td className="px-4 py-3 font-sans font-bold text-zinc-200">
                      <span className={isDeleted ? 'line-through text-zinc-600' : ''}>
                        {trader.traderName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      <span className={isDeleted ? 'line-through text-zinc-600' : ''}>
                        {trader.registerEmail}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {trader.tradingViewUsername}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-bold">
                      {trader.valetaxId}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={trader.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1.5">
                        {onSyncLiveApi && (
                          <button
                            type="button"
                            disabled={isDeleted || (syncingIds && syncingIds[trader.valetaxId])}
                            onClick={() => onSyncLiveApi(trader.valetaxId)}
                            className="p-1.5 border border-zinc-900 bg-zinc-950 hover:border-emerald-500/30 text-zinc-400 hover:text-emerald-500 rounded disabled:opacity-50 transition-colors"
                            title="Sync Live Broker API"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${syncingIds && syncingIds[trader.valetaxId] ? 'animate-spin text-emerald-500' : ''}`} />
                          </button>
                        )}
                        <button 
                          disabled={isDeleted}
                          onClick={() => onEdit(trader)}
                          className="p-1.5 border border-zinc-900 bg-zinc-950 hover:border-amber-500/30 text-zinc-400 hover:text-amber-500 rounded disabled:opacity-20 disabled:pointer-events-none transition-colors"
                          title="Edit Trader Properties"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          disabled={isDeleted}
                          onClick={() => onDelete(trader.traderName)}
                          className="p-1.5 border border-zinc-900 bg-zinc-950 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 rounded disabled:opacity-20 disabled:pointer-events-none transition-colors"
                          title="Strike out & Flag Deleted"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-xs text-zinc-500 font-mono">
          Page <span className="text-amber-500 font-bold">{safePage}</span> of {totalPages} ({sortedTraders.length} matching)
        </span>
        <div className="inline-flex gap-2">
          <button 
            disabled={safePage <= 1}
            onClick={() => setRegistryPage(prev => Math.max(prev - 1, 1))}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-amber-500 rounded-lg disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors font-mono select-none"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <button 
            disabled={safePage >= totalPages}
            onClick={() => setRegistryPage(prev => Math.min(prev + 1, totalPages))}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-amber-500 rounded-lg disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors font-mono select-none"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ActiveStatusLogProps {
  traders: Trader[];
  activeLogPage: number;
  setActiveLogPage: React.Dispatch<React.SetStateAction<number>>;
  renderBalanceWithIndicator: (balance: number, currency: string) => React.ReactNode;
  onSyncLiveApi?: (valetaxId: string) => void;
  syncingIds?: Record<string, boolean>;
}

export function ActiveStatusLog({
  traders,
  activeLogPage,
  setActiveLogPage,
  renderBalanceWithIndicator,
  onSyncLiveApi,
  syncingIds
}: ActiveStatusLogProps) {
  
  // Sort by balance descending
  const sortedTraders = React.useMemo(() => {
    // 1. Account Type Enforcement: Strictly filter out any accounts containing "Demo" or "Mock"
    const liveTraders = traders.filter(t => {
      const accType = (t.accountType || '').toLowerCase();
      return !accType.includes('demo') && !accType.includes('mock');
    });

    // 2. Duplication Guard: Deduplicate final dataset by identical "Register Email", keeping only the most recent entry
    const emailMap = new Map<string, Trader>();
    for (const t of liveTraders) {
      const email = (t.registerEmail || '').trim().toLowerCase();
      if (!email) continue;
      const existing = emailMap.get(email);
      if (!existing) {
        emailMap.set(email, t);
      } else {
        const existingTime = Date.parse(existing.registerDate) || 0;
        const tTime = Date.parse(t.registerDate) || 0;
        if (tTime > existingTime) {
          emailMap.set(email, t);
        } else if (tTime === existingTime) {
          if (t.registerDate.localeCompare(existing.registerDate) > 0) {
            emailMap.set(email, t);
          }
        }
      }
    }
    const uniqueTraders = Array.from(emailMap.values());

    // 3. Multi-Currency & Cent Normalization Logic helper
    const getStandardizedBalance = (trader: Trader) => {
      const accType = (trader.accountType || '').toLowerCase();
      const curr = (trader.currency || '').toLowerCase();
      const isCent = accType.includes('cent') || accType.includes('micro') || curr.includes('cent') || curr.includes('usc');
      return isCent ? trader.balance / 100 : trader.balance;
    };

    // 4. Ranking Order: Sort dynamically in descending order based on final calculated balance
    return uniqueTraders.sort((a, b) => getStandardizedBalance(b) - getStandardizedBalance(a));
  }, [traders]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedTraders.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(activeLogPage, totalPages);

  const paginatedTraders = React.useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return sortedTraders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedTraders, safePage]);

  return (
    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 space-y-4">
      {/* Status Log Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-semibold text-white font-sans">Active Status Log</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {onSyncLiveApi && (
            <button
              type="button"
              onClick={() => {
                paginatedTraders.forEach(t => onSyncLiveApi(t.valetaxId));
              }}
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-zinc-950 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 text-[10px] rounded font-mono uppercase font-bold transition-all shadow-sm"
              title="Bulk Sync visible accounts with live Valetax Broker API"
            >
              <RefreshCw className="h-3 w-3" /> Sync Page API
            </button>
          )}
          <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
            LIVE BALANCE RANKS (NORMALIZED)
          </span>
        </div>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto border border-zinc-900 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-900 font-mono text-xs">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Trader Name</th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Register Email</th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Valetax ID</th>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right font-semibold uppercase tracking-wider">Active Balance</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950/20 divide-y divide-zinc-900">
            {paginatedTraders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No records active inside database telemetry pipeline.
                </td>
              </tr>
            ) : (
              paginatedTraders.map((trader, index) => {
                const isDeleted = trader.status === 'Deleted by Admin';
                const accType = (trader.accountType || '').toLowerCase();
                const curr = (trader.currency || '').toLowerCase();
                const isCent = accType.includes('cent') || accType.includes('micro') || curr.includes('cent') || curr.includes('usc');
                const stdBalance = isCent ? trader.balance / 100 : trader.balance;

                return (
                  <tr key={`${trader.valetaxId}-${index}`} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="px-4 py-3 font-sans font-bold text-zinc-200">
                      <span className={isDeleted ? 'line-through text-zinc-600' : ''}>
                        {trader.traderName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      <span className={isDeleted ? 'line-through text-zinc-600' : ''}>
                        {trader.registerEmail}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <span>{trader.valetaxId}</span>
                        {onSyncLiveApi && (
                          <button
                            type="button"
                            disabled={isDeleted || (syncingIds && syncingIds[trader.valetaxId])}
                            onClick={() => onSyncLiveApi(trader.valetaxId)}
                            className="p-1 border border-zinc-900 bg-zinc-950 hover:border-emerald-500/30 text-zinc-500 hover:text-emerald-400 rounded transition-all"
                            title="Sync Live Broker API"
                          >
                            <RefreshCw className={`h-3 w-3 ${syncingIds && syncingIds[trader.valetaxId] ? 'animate-spin text-emerald-400' : ''}`} />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={trader.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-zinc-100">
                      <div className="flex flex-col items-end">
                        {renderBalanceWithIndicator(trader.balance, trader.currency)}
                        {isCent && (
                          <span className="text-[9px] text-amber-500 font-mono mt-0.5 uppercase tracking-wide">
                            Normalized: USD {stdBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-xs text-zinc-500 font-mono">
          Page <span className="text-amber-500 font-bold">{safePage}</span> of {totalPages} ({sortedTraders.length} entries)
        </span>
        <div className="inline-flex gap-2">
          <button 
            disabled={safePage <= 1}
            onClick={() => setActiveLogPage(prev => Math.max(prev - 1, 1))}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-amber-500 rounded-lg disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors font-mono select-none"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <button 
            disabled={safePage >= totalPages}
            onClick={() => setActiveLogPage(prev => Math.min(prev + 1, totalPages))}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-amber-500 rounded-lg disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors font-mono select-none"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
