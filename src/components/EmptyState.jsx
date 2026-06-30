import { FiAlertTriangle, FiInbox, FiRefreshCw } from 'react-icons/fi';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center mb-4">
        <FiInbox size={28} className="text-[#9AA0AC]" />
      </div>
      <h3 className="text-base font-semibold text-ink mb-1">No holdings to show</h3>
      <p className="text-sm text-[#6B7080] max-w-xs">
        Once you connect an exchange or wallet, your assets will show up here for tax harvesting.
      </p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-gain-redBg flex items-center justify-center mb-4">
        <FiAlertTriangle size={28} className="text-gain-red" />
      </div>
      <h3 className="text-base font-semibold text-ink mb-1">Couldn't load your portfolio</h3>
      <p className="text-sm text-[#6B7080] max-w-xs mb-5">
        {message || 'Something went wrong while fetching your data. Please try again.'}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 active:bg-brand-700 transition-colors"
      >
        <FiRefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}
