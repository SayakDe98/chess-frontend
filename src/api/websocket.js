export function createSocket(onMessage) {
  const socket = new WebSocket("ws://localhost:8080/ws");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return socket;
}