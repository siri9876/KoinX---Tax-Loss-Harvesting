import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchHoldings } from '../api/holdingsApi';
import { fetchCapitalGains } from '../api/capitalGainsApi';
import { calculateHarvestSummary, calculatePreHarvestSummary } from '../utils/calculations';

const HarvestContext = createContext(null);

export function HarvestProvider({ children }) {
  const [holdings, setHoldings] = useState([]);
  const [baseCapitalGains, setBaseCapitalGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const [holdingsRes, gainsRes] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
      setHoldings(holdingsRes);
      setBaseCapitalGains(gainsRes);
      setSelectedIds(new Set());
      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Something went wrong while fetching your portfolio.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleHolding = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(
    (ids) => {
      setSelectedIds((prev) => {
        const allSelected = ids.length > 0 && ids.every((id) => prev.has(id));
        return allSelected ? new Set() : new Set(ids);
      });
    },
    [],
  );

  const preHarvest = useMemo(
    () => calculatePreHarvestSummary(baseCapitalGains),
    [baseCapitalGains],
  );

  const postHarvest = useMemo(
    () => calculateHarvestSummary(baseCapitalGains, holdings, selectedIds),
    [baseCapitalGains, holdings, selectedIds],
  );

  const value = useMemo(
    () => ({
      holdings,
      status,
      error,
      selectedIds,
      toggleHolding,
      toggleAll,
      preHarvest,
      postHarvest,
      reload: loadData,
    }),
    [holdings, status, error, selectedIds, toggleHolding, toggleAll, preHarvest, postHarvest, loadData],
  );

  return <HarvestContext.Provider value={value}>{children}</HarvestContext.Provider>;
}

export function useHarvest() {
  const ctx = useContext(HarvestContext);
  if (!ctx) throw new Error('useHarvest must be used within a HarvestProvider');
  return ctx;
}
