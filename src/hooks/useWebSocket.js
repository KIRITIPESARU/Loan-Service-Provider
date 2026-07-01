// src/hooks/useWebSocket.js

export const useWebSocket = () => {
  return {
    lastMessage: null,
    readyState: 3, // CLOSED
    sendMessage: () => {},
    disconnect: () => {}
  };
};
