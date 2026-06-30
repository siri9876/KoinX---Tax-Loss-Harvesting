import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import HoldingTable from '../components/HoldingTable';
import Loader from '../components/Loader';
import { ErrorState } from '../components/EmptyState';
import { useHarvest } from '../context/HarvestContext';

function Dashboard() {
  const { status, error, preHarvest, postHarvest, reload } = useHarvest();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink tracking-tight">Tax Harvesting Dashboard</h1>
          <p className="text-base text-[#6B7184] mt-2">
            Review your capital gains and select holdings to optimize your tax position
          </p>
        </div>

        {status === 'loading' && <Loader />}

        {status === 'error' && (
          <div className="bg-white rounded-2xl border border-surface-border shadow-card">
            <ErrorState message={error} onRetry={reload} />
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <SummaryCard title="Pre Harvesting" summary={preHarvest} />
              <SummaryCard
                title="After Harvesting"
                summary={postHarvest}
                emphasis
                reduction={preHarvest.realised - postHarvest.realised}
              />
            </div>

            <HoldingTable />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
