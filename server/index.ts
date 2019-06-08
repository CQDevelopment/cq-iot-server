import Model from "./object/model";
import SocketServer from "./object/socketServer";
import WebServer from "./object/webServer";

const model = new Model();
const socketServer = new SocketServer(3000);
const webServer = new WebServer(3001);