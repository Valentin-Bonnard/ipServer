
/*
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses.toString());
app.get('/', function (req, res, err) {
    var ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        var list = ipAddr.split(",");
        ipAddr = list[list.length - 1];
        console.log(ipAddr);
    } else {
        ipAddr = req.connection.remoteAddress;
        console.log(ipAddr + "    " + 2);
    }
});
locate.methis('173.194.33.104', function (_err, _result) {
    if (_err) console.log('Error');

    console.log(_result);
});
*/
/*

io.sockets.on('connection', function (socket) {
  var address = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
  console.log('New connection from ' + address.address + ':' + address.port);
});
*/


const express = require('express')
    , app = express()
    , http = require('http')
    , locate = require('owllocation')
    , port = 3000;

const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(app)
    , io = require('socket.io').listen(server)

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

/*
io.on('connection', (socket) => {
    socket.emit('ip', (so) => {
        let ip = so.handshake.address || so.client.conn.remoteAddress || so.conn.remoteAddress;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
            console.info(ip);
        } else if (ip == "::1")
            console.info('127.0.0.1');
        else {
            console.info('client IP: ', so.handshake.address);
            // this should work too
            console.info('client IP: ', so.client.conn.remoteAddress);
        }
    })
});*/

io.on('connection', (socket) => {
    let ip = socket.handshake.address || socket.client.conn.remoteAddress || socket.conn.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    } else if (ip == "::1")
        ip = '127.0.0.1';
    socket.emit('ip',
        {
            ip: ip
        });
});

server.listen(port, (err) => {
    if (err)
        return console.info('something bad happened', err)

    console.info(`server is listening on ${port}`)
})