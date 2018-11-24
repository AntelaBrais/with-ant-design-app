const express = require('express')
const app = express()
const server = app.listen(process.env.PORT || 4000)

const io = require('socket.io').listen(server)

io.once('connection', (socket) => {
  console.log(`Cliente conectado`)
  socket.on('saludo', (nombre) => {
    console.log(`Hello ${nombre}`)
    socket.emit('pollas')
  })
})

server.listen(process.env.PORT || 4000, function() {
  console.log('Servidor hablando en http://localhost:4000')
})
