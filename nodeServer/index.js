//node server which will handle socket.io connections

//its a http instance basically means we require a server
const io = require('socket.io')(8000)

const users = {};

// io.on ek instance hai jo basically bhut saare connections 
// ko listen krega means kisne kisne join kiya
//socket.on wo hai jo ek particular connections ke sath
//  kya hona chahiye wo listen krta hai
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("New user", name)
        users[socket.id] = name;                   //hmne hr new user ko ek key id dedi
        socket.broadcast.emit('user-joined', name);// jisne join kiya usko chhorkr sbko
})                                                    // ye broadcast ho jayega 


// agr kisine msg kiya aur usko sbke recieve krana ye hua hai yaha
    socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
});

//if someone leaves the chat,let others know
socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id])
})

delete users[socket.id];
    });


    // run nodemon for starting nodejs server