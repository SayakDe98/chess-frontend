export function createSocket(onMessage) {
  const domain = import.meta.env.VITE_API_DOMAIN;

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${protocol}://${domain}/ws`);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return socket;
}