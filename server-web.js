module.exports = (port, model) => {
    const log = (message) => {
        console.log('SERVER-WEB: %s', message);
    };

    log('Initialising web server on port ' + port);

    const app = require('express')();
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);

    const sendUpdate = (value) => {
        io.emit('update', value);
    };

    model.subscription = (value) => {
        sendUpdate(value);
    };

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    http.listen(port, () => {
        log('Listening on ' + port);
    });

    io.on('connection', (socket) => {
        log('User connected');
        sendUpdate(model.value);
    });
};