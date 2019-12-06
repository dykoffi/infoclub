var app = require('../app');
var debug = require('debug')('serveur:server');
var http = require('http');
var Cloudant = require('@cloudant/cloudant')
var cloudant = Cloudant("https://042093a3-40d2-45d8-b0d5-25696e87b30f-bluemix:2e29e11143ee5190718d12be2a35ad9afc17f395048113c3a09d1ef66e270662@042093a3-40d2-45d8-b0d5-25696e87b30f-bluemix.cloudantnosqldb.appdomain.cloud", (err, cloudant, pong) => {
    if (err) {
        return console.log("Failed to initialize Cloudant : " + err.message)
    }
})
var email, tel
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5500');
app.set('port', port);

/**nb g
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

var db = cloudant.use('clubinfo')
var mail = require('../functions/mail')

var io = require("socket.io").listen(server)
io.sockets.on("connection", function (socket, pseudo) {
    console.log("un user c'est connecte")
    socket.on("addUser", (data) => {
        console.log(data)
        var q = {
            selector: {
                contact: {
                    "$eq": data.contact
                }
            },
        }
        db.find(q).then((body) => {

            if (body.docs.length) tel = true
            else tel = false

            if (tel) {
                socket.emit("phoneError")
            } else {
                var q1 = {
                    selector: {
                        mail: {
                            "$eq": data.mail
                        }
                    },
                }
                db.find(q1).then((body1) => {

                    if (body1.docs.length) email = true
                    else email = false

                    if (email) {
                        socket.emit("mailError")
                    } else {
                        db.insert(data)
                            .then((body) => {
                                if (data.type == "Formateur") mail.send(data)
                                else mail.send2(data)
                                socket.emit("addOk")
                            })
                    }
                })
            }
        })
    })
})
module.exports = io