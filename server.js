//import http from 'http'
const http = require('http')
//import app from './app'
const app = require('./app')
// The function below validates the port provided by user
//either provides number or a string
const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

//The error handler function checks for errors and handle them
//appropriately and then register the errors to the server
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()

  //"string" ? "pipe" + address : "port" + port
  const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDREINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

//The event listener callback register and log port name
//or pipe on which the server runs

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port
  console.log('Listening on ' + bind)
})

server.listen(port)
