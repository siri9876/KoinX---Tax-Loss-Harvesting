import { memo } from 'react';
import { formatCurrency, formatNumber } from '../utils/currencyFormatter';
import { gainTone, calculateAmountToSell } from '../utils/calculations';

const toneClasses = {
  positive: 'text-gain-green',
  negative: 'text-gain-red',
  neutral: 'text-gain-gray',
};

function GainCell({ value }) {
  const tone = gainTone(value);
  return <span className={`tabular-nums font-medium ${toneClasses[tone]}`}>{formatCurrency(value, { showSign: true })}</span>;
}

function HoldingRow({ holding, isSelected, onToggle, index }) {
  const amountToSell = calculateAmountToSell(holding, isSelected);

  return (
    <tr
      className={`group transition-colors ${
        isSelected ? 'bg-brand-50/60' : index % 2 === 0 ? 'bg-white' : 'bg-surface-muted/60'
      } hover:bg-brand-50`}
    >
      <td className="px-4 py-3.5 w-10">
        <input
          type="checkbox"
          className="kx-checkbox"
          checked={isSelected}
          onChange={() => onToggle(holding.id)}
          aria-label={`Select ${holding.name}`}
        />
      </td>
      <td className="px-4 py-3.5 min-w-[180px]">
        <div className="flex items-center gap-3">
          <img
            src={holding.logo}
            alt=""
            className="w-7 h-7 rounded-full bg-surface-muted object-contain"
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden';
            }}
          />
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">{holding.coin}</p>
            <p className="text-xs text-[#9AA0AC] leading-tight">{holding.name}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-ink tabular-nums whitespace-nowrap">
        {formatNumber(holding.holdings, 4)}
      </td>
      <td className="px-4 py-3.5 text-sm text-ink tabular-nums whitespace-nowrap">
        {formatCurrency(holding.avgBuyPrice)}
      </td>
      <td className="px-4 py-3.5 text-sm text-ink tabular-nums whitespace-nowrap">
        {formatCurrency(holding.currentPrice)}
      </td>
      <td className="px-4 py-3.5 whitespace-nowrap">
        <GainCell value={holding.stGain} />
      </td>
      <td className="px-4 py-3.5 whitespace-nowrap">
        <GainCell value={holding.ltGain} />
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold text-ink tabular-nums whitespace-nowrap">
        {formatCurrency(amountToSell)}
      </td>
    </tr>
  );
}

export default memo(HoldingRow);
