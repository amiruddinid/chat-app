const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

http.listen(3000, ()=>{
  console.log('listened on port 3000')
})

app.use('/', (req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

io.on('connect', (socket) => {
  const users = [];
  console.log('user conected')

  socket.on('username', (data) => {
    users.push(data);
    io.sockets.emit('username', data)
  })

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
    io.sockets.emit('notif', 
      `${data.user} mengirimkan pesan`)
  })

  socket.on('notif', (data) => {
    io.sockets.emit('notification', data)
  })
})



// 
// 1. Membuat ID unik yang memisahkan setiap client
//    Level: Hard, keamanan terjaga

// 2. membuat sebuah variable untuk membedakan 
//    antara yang sudah submit nama dan yang belum
//    Level: Easy, tidak ada penjagaan di server