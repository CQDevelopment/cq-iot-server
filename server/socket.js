module.exports = (port, model) => {
    const log = (message) => {
        console.log('SERVER-SCK: %s', message);
    };

    log('Initialising socket server on port ' + port);

    const webSocket = require('ws');

    const wss = new webSocket.Server({
        port: port
    });

    const processMessage = (message) => {
        log('Received: ' + message);
    };

    wss.on('connection', (ws) => {
        log('Client connected');

        ws.on('message', (message) => {
            try {
                processMessage(message);
            } catch (exception) {
                log('Error: ' + exception);
            }
        });

        ws.on('close', () => {
            log('Client disconnected');
        });

        ws.on('error', log);
    });
};