module.exports = (port, model) => {
    const log = (message) => {
        console.log('SERVER-SCK: %s', message);
    };

    log('Initialising socket server on port ' + port);

    const webSocket = require('ws');

    const wss = new webSocket.Server({
        port: port
    });

    var lastRx = null;
    var longestDuration = 0;

    var processMessage = (message) => {
        var now = new Date();

        if (lastRx === null) {
            lastRx = now;
        }

        var duration = now - lastRx;

        if (duration > longestDuration) {
            longestDuration = duration;
        }

        lastRx = now;

        log('Received: ' + message +
            ' ' + duration +
            ' ' + longestDuration);

        model.update({
            index: message,
            lastIntervalSeconds: duration / 1000,
            longestIntervalSeconds: longestDuration / 1000,
            timestamp: lastRx,
            indexRuntime: (parseInt(message) / 60 / 60 / 24).toFixed(3)
        });
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

        ws.on('error', console.log);
    });
};