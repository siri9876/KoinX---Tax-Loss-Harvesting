/**
 * Mock Capital Gains API
 * --------------------------------------------------
 * Returns the user's pre-harvesting capital gains snapshot exactly as
 * specified in the assignment brief. Wrapped in a Promise with a
 * simulated network delay to mirror a real API call.
 */

const capitalGainsResponse = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  },
};

/**
 * Fetches the pre-harvesting capital gains summary.
 * @returns {Promise<Object>} resolves with the capital gains payload
 */
export function fetchCapitalGains() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsResponse);
    }, 700);
  });
}
