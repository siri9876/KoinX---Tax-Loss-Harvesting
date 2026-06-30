import { HarvestProvider } from './context/HarvestContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <HarvestProvider>
      <Dashboard />
    </HarvestProvider>
  );
}

export default App;
