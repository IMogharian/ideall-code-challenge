import React, {
  FC, useEffect, useState
} from 'react';
import cs from 'classnames';

export interface MarketTableRowProps { 
  data: Ticker
}

const MarketTableRow: FC<MarketTableRowProps> = ({
  data
}: MarketTableRowProps) => {
  const [lastData, setLastData] = useState<Ticker>()
  const [direction, setDirection] = useState(0)
  
  useEffect(() => {
    if (lastData?.c) {
      if (data.c < (lastData?.c || 0)) setDirection(-1)
      else if (data.c > (lastData?.c || 0)) setDirection(1)
    }
    setTimeout(() => setDirection(0), 500);
    setLastData(data)
  }, [data])
  
  const numericData = {
    c: parseFloat(data?.c).toFixed(4),
    p: parseFloat(data?.p).toFixed(4),
    P: parseFloat(data?.P).toFixed(2),
    q: parseFloat(data?.q).toFixed(4),
  } 
  return (
    <tr className='h-10 border-b border-stone-100'>
      <td>{data?.s}</td>
      <td className={cs('transition-all ease-linear', direction === 1 && 'bg-green-200', direction === -1 && 'bg-red-200') }>{numericData?.c}</td>
      <td className={cs('transition-all ease-linear', parseFloat(data?.P) > 0 && 'text-green-500', parseFloat(data?.P) < 0 && 'text-red-500') }>{numericData.p}({numericData.P} %)</td>
      <td>{numericData.q}</td>
    </tr>
  )
};

export default MarketTableRow;
