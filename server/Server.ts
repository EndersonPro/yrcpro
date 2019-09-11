import express, { Application } from "express";
import socketIO, { Server as IOServer, Socket } from "socket.io";
import http, { Server as HTTPServer } from "http";
import * as socket from '../sockets/Socket';

export class Server {

  private static _instance: Server;

  public app: Application;
  public port: number;
  public io: IOServer;
  private httpServer: HTTPServer;

  constructor() {
    this.app = express();
    this.port = 9000;
    this.httpServer = new HTTPServer(this.app);
    this.io = socketIO(this.httpServer);
    //   this.listenSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private listenSockets() {
    this.io.on("connection", (client: Socket) => {
      console.log("Cliente Conectado");
      socket.disconnect(client);
    });
  }

  public init(callback: Function, port?: number) {
    this.port = port || this.port;
    this.httpServer.listen(this.port, callback());
  }
}
