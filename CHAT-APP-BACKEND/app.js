const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

const messages = [];
var socketId ;
mongoose.set('useFindAndModify', false);

//IMPORTING MODELS
const message = require('./models/message');
const userData = require('./models/user-data');

//IMPORTING ROUTES
const userRoute = require('./routes/user');
const onlineUserRoute = require('./routes/online-users');
const messageRoute = require('./routes/message');

//CONNECTING TO DB
mongoose.connect('mongodb://localhost:27017/v-chat',{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
    console.log('connected to DB');
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use('/user',userRoute);
app.use('/online-users' , onlineUserRoute);
app.use('/get-messages' , messageRoute);

const server = http.Server(app);
var onlineUsers = [];


server.listen(3000);

const io = socketIo(server);

    io.on('connection' , (socket) =>{
        console.log('user is conencted ' + socket.id);
        
        var user_name;
        socket.on('join' , (username)=>{
            console.log(socket.id);
            userData.findOneAndUpdate({username : username } , {$set:{ socket_id : socket.id }} ,{new:true}).then((data)=>{
                console.log(data);
            });
            user_name = username;
            socket.emit('update-userData' , socket.id);
            socket.join('v-chat');
        });


        socket.on('disconnect' , ()=>{
            console.log('user disconnected');
            const empty = "";
            userData.findOneAndUpdate({username : user_name } , {$set:{ socket_id : empty}},{new:true}).then((data)=>{
                console.log(data);
            });
            socket.emit('update-UserData' , empty);
        });

        socket.on('send-message' ,(data) => {
            console.log('socket-data : ',data );
            userData.findOne({ username : data.receiver }).then((user_data) =>{

                socketId = user_data.socket_id;
                for( i =0 ; i< user_data.conversations.length; i++)
                {
                    if(user_data.conversations[i].user == data.user){
                       message.findOneAndUpdate({_id :user_data.conversations[i].convo_id} ,{$push:{messages : data}}).then((updatedMsgs)=>{
                           console.log('these are updated messages :' ,updatedMsgs);
                       }).catch((err)=>{
                        console.log(err);
                       });
                       break;
                    }
                }   
            });
            setTimeout(()=>{
                io.in('v-chat').emit('new-message' , data);
            } ,100)
        });
        socket.emit('broadcast' , {onlineUsers: onlineUsers});
});



