import { ReadyState } from 'react-use-websocket';
import './App.css';
import MarketTable from './components/MarketTable';
import useBinance from './hooks/useBinance'; 

function App() {
  const { readyState } = useBinance()

  return (
    <div className="App">
      <MarketTable isLoading={readyState !== ReadyState.OPEN} />
  </div>
  );
}

export default App;
