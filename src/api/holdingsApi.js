/**
 * Mock Holdings API
 * --------------------------------------------------
 * In a real KoinX integration this would hit a backend endpoint that
 * returns the user's portfolio along with realised short/long term gains
 * per asset. Since no backend is available for this assignment, we
 * simulate the network round trip with a Promise + setTimeout.
 *
 * NOTE: The original assignment brief references a "complete holdings JSON"
 * supplied separately in the assignment materials. That payload was not
 * included with this prompt, so a representative, schema-compatible mock
 * dataset (covering both short-term and long-term, profit and loss
 * scenarios) has been authored here. Swap the array below for the real
 * payload at any time — no other code changes are required because every
 * consumer reads from this single shape.
 */

export const holdingsData = [
  {
    id: 'btc',
    coin: 'BTC',
    name: 'Bitcoin',
    logo: 'https://assets.coincap.io/assets/icons/btc@2x.png',
    holdings: 0.04256,
    avgBuyPrice: 4123000,
    currentPrice: 5650000,
    stGain: 3210.45,
    ltGain: 8120.6,
  },
  {
    id: 'eth',
    coin: 'ETH',
    name: 'Ethereum',
    logo: 'https://assets.coincap.io/assets/icons/eth@2x.png',
    holdings: 1.2345,
    avgBuyPrice: 198500,
    currentPrice: 215300,
    stGain: 2075.32,
    ltGain: -1245.18,
  },
  {
    id: 'matic',
    coin: 'MATIC',
    name: 'Polygon',
    logo: 'https://assets.coincap.io/assets/icons/matic@2x.png',
    holdings: 1450.8,
    avgBuyPrice: 62.4,
    currentPrice: 48.1,
    stGain: -2075.6,
    ltGain: -890.25,
  },
  {
    id: 'sol',
    coin: 'SOL',
    name: 'Solana',
    logo: 'https://assets.coincap.io/assets/icons/sol@2x.png',
    holdings: 12.6,
    avgBuyPrice: 5400,
    currentPrice: 7120,
    stGain: 1986.4,
    ltGain: 4520.75,
  },
  {
    id: 'doge',
    coin: 'DOGE',
    name: 'Dogecoin',
    logo: 'https://assets.coincap.io/assets/icons/doge@2x.png',
    holdings: 8400,
    avgBuyPrice: 6.2,
    currentPrice: 5.1,
    stGain: -924.0,
    ltGain: 0,
  },
  {
    id: 'ada',
    coin: 'ADA',
    name: 'Cardano',
    logo: 'https://assets.coincap.io/assets/icons/ada@2x.png',
    holdings: 980.5,
    avgBuyPrice: 38.9,
    currentPrice: 41.2,
    stGain: 0,
    ltGain: 2254.55,
  },
  {
    id: 'dot',
    coin: 'DOT',
    name: 'Polkadot',
    logo: 'https://assets.coincap.io/assets/icons/dot@2x.png',
    holdings: 64.2,
    avgBuyPrice: 520,
    currentPrice: 470,
    stGain: -1281.0,
    ltGain: -640.5,
  },
  {
    id: 'link',
    coin: 'LINK',
    name: 'Chainlink',
    logo: 'https://assets.coincap.io/assets/icons/link@2x.png',
    holdings: 142.0,
    avgBuyPrice: 980,
    currentPrice: 1180,
    stGain: 4120.85,
    ltGain: 1890.2,
  },
];

/**
 * Fetches the user's holdings.
 * @returns {Promise<Array>} resolves with the holdings array after a simulated delay
 */
export function fetchHoldings() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData);
    }, 900);
  });
}
