import { memo } from 'react';
import { formatCurrency } from '../utils/currencyFormatter';

function Cell({ value, muted = false }) {
  return (
    <span className={`text-sm font-semibold tabular-nums ${muted ? 'opacity-90' : ''}`}>
      {formatCurrency(value)}
    </span>
  );
}

/**
 * Pre/After Harvesting summary card, laid out as a small table:
 * a header row (blank, Short-term, Long-term) followed by Profits,
 * Losses, and Net Capital Gains rows, then a Realised Capital Gains
 * total beneath. Mirrors the official KoinX assignment demo.
 *
 * @param {string} title
 * @param {{stcg:{profits:number,losses:number,net:number}, ltcg:{profits:number,losses:number,net:number}, realised:number}} summary
 * @param {boolean} [emphasis] true for the "After Harvesting" card (blue fill)
 * @param {number} [reduction] amount the taxable gain was reduced by (After Harvesting only)
 */
function SummaryCard({ title, summary, emphasis = false, reduction }) {
  const labelClass = emphasis ? 'text-white/80' : 'text-[#9AA0AC]';
  const headerLabelClass = emphasis ? 'text-white/70' : 'text-[#9AA0AC]';
  const valueClass = emphasis ? 'text-white' : 'text-white';
  const netClass = emphasis ? 'text-white' : 'text-white';

  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.18)] animate-fadeIn ${
        emphasis
          ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white'
          : 'bg-[#0F1320] border border-white/5 text-white'
      }`}
    >
      <h2 className="text-lg font-bold mb-5">{title}</h2>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 sm:gap-x-10 gap-y-3">
        <span />
        <span className={`text-xs font-semibold uppercase tracking-wide text-right ${headerLabelClass}`}>
          Short-term
        </span>
        <span className={`text-xs font-semibold uppercase tracking-wide text-right ${headerLabelClass}`}>
          Long-term
        </span>

        <span className={`text-sm ${labelClass}`}>Profits</span>
        <span className={`text-right ${valueClass}`}><Cell value={summary.stcg.profits} /></span>
        <span className={`text-right ${valueClass}`}><Cell value={summary.ltcg.profits} /></span>

        <span className={`text-sm ${labelClass}`}>Losses</span>
        <span className="text-right text-[#FF7A7A]"><Cell value={-Math.abs(summary.stcg.losses)} /></span>
        <span className="text-right text-[#FF7A7A]"><Cell value={-Math.abs(summary.ltcg.losses)} /></span>

        <span className={`text-sm font-medium ${labelClass}`}>Net Capital Gains</span>
        <span className={`text-right font-bold ${netClass}`}><Cell value={summary.stcg.net} /></span>
        <span className={`text-right font-bold ${netClass}`}><Cell value={summary.ltcg.net} /></span>
      </div>

      <div className={`mt-6 pt-5 border-t ${emphasis ? 'border-white/20' : 'border-white/10'}`}>
        <div className="flex items-baseline justify-between">
          <span className={`text-sm font-medium ${labelClass}`}>
            {emphasis ? 'Effective Capital Gains' : 'Realised Capital Gains'}
          </span>
          <span className="text-2xl font-extrabold tabular-nums">{formatCurrency(summary.realised)}</span>
        </div>

        {emphasis && typeof reduction === 'number' && reduction !== 0 && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 text-white px-3 py-1.5 rounded-lg">
            🎉 Your taxable capital gains are reduced by:&nbsp;
            <span className="font-bold">{formatCurrency(Math.abs(reduction))}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SummaryCard);
