import React, {
  FC, useState
} from 'react';
import cs from 'classnames';
import { useAppSelector } from '../redux/store'; 
import MarketTableRow from './MarketTableRow';

export interface MarketTableProps { 
  isLoading: boolean
}

const MarketTable: FC<MarketTableProps> = ({
  isLoading
}: MarketTableProps) => {
  const quoteFilters = ['USDT', 'BTC', 'ETH', 'BNB']
  const [selectedQuote, setSelectedQuote] = useState(quoteFilters[0])
  
  const {tickers} = useAppSelector((state) => state.rootReducer.tickers)
  
  const finalTickers = Object.values(tickers)?.filter(item => item.s.endsWith(selectedQuote)).sort((a:Ticker, b:Ticker) => parseFloat(a.q) > parseFloat(b.q) ? -1 : 1)

  return isLoading ?
    (<div>Loading ...</div>) :
    (
      <>
      <div className=' flex flex-row items-center justify-center space-x-4 my-6'>
        {quoteFilters.map(item => (
          <button 
            key={item}
            className={cs(
              'border border-green-300 py-4 px-10 rounded', 
              item === selectedQuote && 'bg-green-200'
            )} 
            onClick={() => setSelectedQuote(item)}
          >
            {item}
          </button>
        )
        )}
      </div>
      <table className='table-fixed w-full'>
        <thead>
          <tr className='h-14 bg-slate-600 text-white '>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price Change</th> 
            <th>Vol</th>
          </tr>
        </thead>
        <tbody>
          {finalTickers.map((ticker:Ticker) => (
            <MarketTableRow key={ticker?.s} data={ticker}/>
          ) )}            
        </tbody>
      </table>
      </>
    )
};

export default MarketTable;
