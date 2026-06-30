import { useMemo, useState, useCallback } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import HoldingRow from './HoldingRow';
import { EmptyState } from './EmptyState';
import { useHarvest } from '../context/HarvestContext';

const INITIAL_VISIBLE_COUNT = 5;

function HoldingTable() {
  const { holdings, selectedIds, toggleHolding, toggleAll } = useHarvest();
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return holdings;
    const q = search.trim().toLowerCase();
    return holdings.filter(
      (h) => h.coin.toLowerCase().includes(q) || h.name.toLowerCase().includes(q),
    );
  }, [holdings, search]);

  // Sort logically: largest current value first, mirrors how portfolios are usually ranked
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.holdings * b.currentPrice - a.holdings * a.currentPrice),
    [filtered],
  );

  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE_COUNT);

  const allIds = useMemo(() => sorted.map((h) => h.id), [sorted]);
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const someSelected = allIds.some((id) => selectedIds.has(id)) && !allSelected;

  const handleToggleAll = useCallback(() => toggleAll(allIds), [toggleAll, allIds]);

  if (holdings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-surface-border shadow-card">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-surface-border">
        <div>
          <h2 className="text-base font-bold text-ink">Holdings</h2>
          <p className="text-xs text-[#9AA0AC] mt-0.5">
            {selectedIds.size} of {holdings.length} selected for harvesting
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA0AC]" size={15} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search holdings"
            aria-label="Search holdings"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-muted focus:bg-white focus:border-brand-400 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="sticky top-0 z-10 bg-surface-muted text-left">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  className="kx-checkbox"
                  checked={allSelected}
                  ref={(el) => el && (el.indeterminate = someSelected)}
                  onChange={handleToggleAll}
                  aria-label="Select all holdings"
                />
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Coin</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Holdings</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Avg. Buy Price</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Current Price</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Short Term Gain</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Long Term Gain</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#9AA0AC]">Amount To Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {visible.map((holding, index) => (
              <HoldingRow
                key={holding.id}
                holding={holding}
                index={index}
                isSelected={selectedIds.has(holding.id)}
                onToggle={toggleHolding}
              />
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="text-center text-sm text-[#9AA0AC] py-10">No holdings match “{search}”.</p>
        )}
      </div>

      {sorted.length > INITIAL_VISIBLE_COUNT && (
        <div className="border-t border-surface-border px-5 sm:px-6 py-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {showAll ? 'Show less' : `View All (${sorted.length})`}
            <FiChevronDown size={14} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}

export default HoldingTable;
