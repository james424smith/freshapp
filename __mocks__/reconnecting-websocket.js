import WS from "jest-websocket-mock";

export default class ReconnectingWebsocketsMock {
  _url;
  _protocols;
  _options;
  _shouldReconnect;
  _ws;
  _connect = async (url, temp, options) => {
    await url();
    temp;
    options;
  };

  connect = async (url) => {
    const server = new WS(url);
    const client = new WebSocket(url);
    await server.connected;
    return {
      ...client,
      close: jest.fn(),
      addEventListener: jest.fn(),
    };
  };

  constructor(url, protocols, options) {
    const url2 = `${url()}-${Math.random() * 100}`;

    this._url = url;
    this._protocols = protocols;
    this._options = options;
    this._connect();
    return this.connect(url2);
  }
}
