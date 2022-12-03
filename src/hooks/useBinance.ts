import { useEffect, useMemo } from 'react';
import { ReadyState } from 'react-use-websocket';
import { setMarketData } from '../redux/actions';
import { useAppDispatch } from '../redux/store';
import useBinanceWS from './useBinanceWS';

interface UseBinanceWSResultProps {
  sendMessage: (data: Record<string, unknown>) => void,
  lastMessage: MessageEvent<any> | null,
  readyState: ReadyState
  subscribe: (stream: string, id: number) => void
}

export default function useBinance(): UseBinanceWSResultProps {
  const dispatch = useAppDispatch()
  const onOpen = () => {
    console.log('opened')
  }
  const onClose = () => {
    console.log('closed')
  }
  const onMarketData = (data: Ticker[]) => {
    const dataMap: {[key:string]: Ticker} = {}

    data.forEach(item => {
      dataMap[item.s] = item
     })
    dispatch(setMarketData(dataMap))
  }

  const {sendMessage, lastMessage, readyState, subscribe } = useBinanceWS({ 
    onOpen,
    onClose,
    actionMap: {
      '!ticker@arr': onMarketData
    }
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      subscribe('!ticker@arr', 2)
    }
  }, [readyState, subscribe])

  return useMemo(
    () => ({
      sendMessage,
      lastMessage,
      readyState,
      subscribe
    }),
    [sendMessage, lastMessage, readyState, subscribe]
  );
}
