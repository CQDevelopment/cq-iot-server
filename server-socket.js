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

        model.update([
            message,
            duration,
            longestDuration,
            lastRx,
            parseInt(message) / 60 / 60 / 24
        ]);
    };

    wss.on('connection', (ws) => {
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