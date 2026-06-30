# KoinX — Tax Harvesting Dashboard

A production-quality React implementation of the KoinX Frontend Internship assignment: a tax-harvesting dashboard that shows a user's pre- and post-harvesting capital gains, recalculated live as holdings are selected for sale.

## Project Overview

The app fetches a user's crypto holdings and their current capital-gains position from two mock APIs, then lets the user select holdings to "harvest" (sell). As selections change, the **After Harvesting** card recalculates short-term and long-term profits, losses, net gains, and realised capital gains instantly — entirely on the client, with no page reload.

## Features

- **Pre Harvesting card** — current STCG/LTCG profits, losses, net gains, and total realised capital gains, straight from the API.
- **After Harvesting card** — same shape, recalculated in real time from the currently selected holdings.
- **Holdings table** — coin logo/name, holdings, average buy price, current price, short-term gain, long-term gain, and amount to sell, with per-row and "select all" checkboxes.
- **Live business logic** — selecting/deselecting a row immediately updates ST/LT profit or loss buckets, net gains, and the realised total.
- **Search** — filter holdings by coin symbol or name.
- **View All / Show less** — table initially shows the top 5 holdings by value, expandable to the full list.
- **Loading skeletons**, a **friendly error state with retry**, and an **empty state** for a zero-holdings portfolio.
- **Indian currency formatting** (`₹70,200.88`) throughout.
- **Green/red/gray gain coloring** based on sign.
- **Responsive layout** — cards stack on mobile, table scrolls horizontally with a sticky header.
- **Accessible** — labeled checkboxes/inputs, visible focus rings, semantic table markup.

## Tech Stack

- React 19 + Vite
- Tailwind CSS (custom design tokens for color/shadow/radius)
- Context API for state (no Redux)
- react-icons

## Folder Structure

```
src/
  components/
    SummaryCard.jsx       Pre/After harvesting card (reusable for both)
    HoldingTable.jsx      Table shell: search, select-all, sort, pagination
    HoldingRow.jsx        Single memoized table row
    Header.jsx            Top navigation bar
    Loader.jsx            Skeleton loading state
    EmptyState.jsx        Empty + error states
  pages/
    Dashboard.jsx         Composes header + cards + table, owns loading/error branching
  context/
    HarvestContext.jsx    Holdings + selection state, derived summaries
  api/
    holdingsApi.js        Mock holdings endpoint (Promise + delay)
    capitalGainsApi.js    Mock capital gains endpoint (Promise + delay)
  utils/
    calculations.js       Pure ST/LT gain math, shared by both cards
    currencyFormatter.js  INR currency/number formatting
  App.jsx
  main.jsx
```

## Installation

```bash
npm install
```

## How to Run

```bash
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Screenshots

_Add screenshots of the Dashboard (desktop, tablet, mobile) here once the app is running locally — `npm run dev` and capture the Pre/After Harvesting cards and the holdings table._

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
4. Deploy — no environment variables or extra config required (`vercel.json` is included for SPA route rewriting).

## Assumptions

- The assignment references a "complete holdings JSON provided in the assignment" that was not included with this prompt. `src/api/holdingsApi.js` ships a representative, schema-compatible mock dataset (mixed ST/LT, profit/loss scenarios) — swap in the real payload there with no other code changes needed.
- The Figma file requires authenticated access to open directly in this environment, so the UI was built from the written spec (cards, table columns, checkbox behavior, color rules, currency format) rather than pixel-sampled from the file. Visual details (exact spacing/typography/shadows) are a close, professional approximation and should be fine-tuned against the live Figma file before final submission.
- "Sort logically" was interpreted as sorting holdings by current market value (holdings × current price), descending, since the brief didn't specify a column.
- Coin logos are loaded from a public CDN by symbol; if a symbol's icon isn't found the image is hidden gracefully rather than showing a broken-image icon.

## Future Improvements

- Pixel-diff the layout against the live Figma file and tighten spacing/type scale to match exactly.
- Add unit tests for `calculations.js` (pure functions, ideal for Vitest).
- Persist selection in the URL or localStorage so a refresh doesn't lose in-progress harvesting selections.
- Add a "confirm harvest" flow that would, in a real product, kick off the actual sell orders.
