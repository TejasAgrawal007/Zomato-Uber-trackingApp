const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

const socketio = require('socket.io')
const server = http.createServer(app);
const io = socketio(server)

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("recived-location", {id : socket.id, ...data});
    })
    console.log("Connected!");

    socket.on("diconnect", (id) => function(){
        io.emit("user-discoonected", socket.id)
    })
})

app.get('/', (req, res) => {
    res.render('index')
})


server.listen(port, () => {
    console.log(`Example app listening on port port`)
})