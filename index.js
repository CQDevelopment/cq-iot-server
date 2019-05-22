const model = require('./server-model')();

require('./server-socket')(3000, model);
require('./server-web')(3001, model);

