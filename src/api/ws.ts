class WS {
  private static _instance: WS;
  private sockets: { [key: string]: WebSocket } = {};

  private constructor() {}

  public static getInstance(): WS {
    if (!WS._instance) {
      WS._instance = new WS();
    }
    return WS._instance;
  }

  public addSocket(name: string, url: string) {
    if (!(name in this.sockets)) {
      this.sockets[name] = new WebSocket(url);
    }
  }

  public closeSocket(name: string) {
    if (name in this.sockets) {
      this.sockets[name].close(1000, "работа закончена");

      delete this.sockets[name];
    }
  }

  public getSocket(name: string) {
    if (name in this.sockets) {
      return this.sockets[name];
    }
  }
}
export default WS;
