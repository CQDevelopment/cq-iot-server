import Model from "./object/model";
import SocketServer from "./object/socket";
import WebServer from "./object/web";

const model = new Model();
const socketServer = new SocketServer(3000);
const webServer = new WebServer(3001);

// const model = require('./server/model')();

// require('./server/socket')(3000, model);
// require('./server/web')(3001, model);