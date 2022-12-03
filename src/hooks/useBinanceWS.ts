import { useCallback, useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface UseBinanceWSProps {
  onOpen?: () => void
  onClose?: () => void
  actionMap?: {[key: string]: (data: any) => void}
}

interface UseBinanceWSResultProps {
  sendMessage: (data: Record<string, unknown>) => void,
  lastMessage: MessageEvent<any> | null,
  readyState: ReadyState
  subscribe: (stream: string, id: number) => void
}

export default function useBinanceWS({
  onOpen,
  onClose, 
  actionMap
}: UseBinanceWSProps): UseBinanceWSResultProps {
  const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://stream.binance.com:9443/stream`);

  const subscribe = useCallback(
		(stream: string, id: number) =>
			sendMessage(JSON.stringify({
				method: 'SUBSCRIBE',
				params: [stream],
				id,
			})),
		[sendMessage],
	);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      onOpen?.()
    }
    if (readyState === ReadyState.CLOSED) {
      onClose?.()
    }
  }, [readyState])

  const rawMsg = (lastMessage as any)?.data
  const msg = rawMsg ? JSON.parse((lastMessage as any)?.data) : null

  useEffect(() => {
    if ((msg as any)?.stream) {
      actionMap?.[(msg as any)?.stream]?.(msg.data)
    }
  }, [msg])

  return useMemo(
    () => ({
      sendMessage: (data: Record<string, unknown>) => sendMessage(JSON.stringify(data)),
      lastMessage: msg,
      readyState,
      subscribe
    }),
    [sendMessage, msg, readyState, subscribe]
  );
}
