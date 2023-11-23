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

  socket.on('login', (data) => {
    users.push({
      id: socket.id,
      room: data.room,
      username: data.username
    });
    socket.join(data.room)
    socket.in(data.room).emit('notif', `${data.username} memasuki ruangan`)
    io.in(data.room).emit('login', {id: socket.id, ...data})
    console.log(users);
    io.in(data.room).emit('users', users.filter((e) => e.room === data.room))
  })

  socket.on('chat', (data) => {
    console.log(data);
    const user = users.find((e) => e.id === socket.id)
    io.in(user.room).emit('chat', {user: user.username, text: data.message})
    socket.in(user.room).emit('notif', `${user.username} mengirimkan pesan`)
  })

})



// 
// 1. Membuat ID unik yang memisahkan setiap client
//    Level: Hard, keamanan terjaga

// 2. membuat sebuah variable untuk membedakan 
//    antara yang sudah submit nama dan yang belum
//    Level: Easy, tidak ada penjagaan di server