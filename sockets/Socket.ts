import { Socket } from "socket.io";

export const disconnect = (client: Socket) => {
  client.on("connect", () => {
    console.log("Cliente Conectado");
  });

  client.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  client.on("test", data => {
    console.log(data);
  });
};
