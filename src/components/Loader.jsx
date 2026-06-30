/**
 * Skeleton loading state shown while both APIs are in flight.
 * Mirrors the layout of the real content so there's no layout shift.
 */
function Loader() {
  return (
    <div className="animate-fadeIn" aria-busy="true" aria-label="Loading your portfolio">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((i) => (
          <div key={i} className="bg-[#0F1320] rounded-2xl border border-white/5 p-6 sm:p-8">
            <div className="skeleton-dark h-6 w-44 rounded mb-6" />
            <div className="space-y-5">
              {[0, 1, 2].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4">
                  <div className="skeleton-dark h-5 w-full rounded" />
                  <div className="skeleton-dark h-5 w-full rounded" />
                  <div className="skeleton-dark h-5 w-full rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card p-5 sm:p-6">
        <div className="skeleton h-5 w-32 rounded mb-5" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
