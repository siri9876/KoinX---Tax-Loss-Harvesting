/**
 * Core tax-harvesting calculation utilities.
 * Kept pure and side-effect free so they're trivially testable.
 */

/** Net of profits minus losses */
export function netGain(profits, losses) {
  return Number((profits - losses).toFixed(2));
}

/**
 * Builds the harvesting summary (ST/LT profits, losses, net gains,
 * and realised capital gains) given a base capital-gains snapshot
 * and a set of currently-selected holding ids.
 *
 * Business rules (per assignment brief):
 *  - For every selected holding:
 *      - if stGain > 0 -> add to ST profit
 *      - if stGain < 0 -> add abs(stGain) to ST loss
 *      - if ltGain > 0 -> add to LT profit
 *      - if ltGain < 0 -> add abs(ltGain) to LT loss
 *  - Net ST = ST profit - ST loss
 *  - Net LT = LT profit - LT loss
 *  - Realised Capital Gain = Net ST + Net LT
 */
export function calculateHarvestSummary(baseCapitalGains, holdings, selectedIds) {
  const base = baseCapitalGains?.capitalGains ?? {
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  };

  let stProfit = base.stcg.profits;
  let stLoss = base.stcg.losses;
  let ltProfit = base.ltcg.profits;
  let ltLoss = base.ltcg.losses;

  // NOTE: Pre-harvesting numbers come straight from the API and represent
  // the "as is" position. After-harvesting numbers start from the SAME
  // baseline and are adjusted in real time as the user selects holdings
  // to sell, per the assignment's "After Harvesting" requirement.
  for (const holding of holdings) {
    if (!selectedIds.has(holding.id)) continue;

    if (holding.stGain > 0) stProfit += holding.stGain;
    else if (holding.stGain < 0) stLoss += Math.abs(holding.stGain);

    if (holding.ltGain > 0) ltProfit += holding.ltGain;
    else if (holding.ltGain < 0) ltLoss += Math.abs(holding.ltGain);
  }

  const netST = netGain(stProfit, stLoss);
  const netLT = netGain(ltProfit, ltLoss);
  const realised = Number((netST + netLT).toFixed(2));

  return {
    stcg: { profits: round2(stProfit), losses: round2(stLoss), net: netST },
    ltcg: { profits: round2(ltProfit), losses: round2(ltLoss), net: netLT },
    realised,
  };
}

/** Pre-harvesting summary derived straight from the raw API payload (no selection applied) */
export function calculatePreHarvestSummary(baseCapitalGains) {
  return calculateHarvestSummary(baseCapitalGains, [], new Set());
}

function round2(n) {
  return Number(n.toFixed(2));
}

/** Total "Amount To Sell" value across selected holdings (holdings qty * current price) */
export function calculateAmountToSell(holding, isSelected) {
  if (!isSelected) return 0;
  return holding.holdings * holding.currentPrice;
}

/** Classifies a gain value into a semantic tone used for color coding */
export function gainTone(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}
