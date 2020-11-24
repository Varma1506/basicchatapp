const express = require('express');
const router = express.Router();

//IMPORTING MODELS
const userData = require('../models/user-data');
const message = require('../models/message');

router.get('/:sendUser/:receivedUser' , (req,res)=>{
    
    sendUser = req.params.sendUser;
    receivedUser = req.params.receivedUser;
    var messagesReceivedFromDB =[];
    

    userData.findOne({username : sendUser}).then((data)=>{
        var res =0;
        var user_place = -1;
        
       
        for( i =0 ; i< data.conversations.length; i++)
        {
            if(data.conversations[i].user == receivedUser){
                res =1;
                user_place = i;
                break;
            }
        }
        if(res==0){
            const msg = new message({
                messages: []
            });
            msg.save().then((messageData)=>{
                console.log(messageData);
                userData.findOneAndUpdate({username : sendUser} ,{$push:{conversations : {convo_id: messageData._id , user: receivedUser}}}).then((updatedSender)=>{
                    userData.findOneAndUpdate({username : receivedUser } , {$push:{conversations : {convo_id : messageData._id , user:sendUser}}}).then((updatedReceiver)=>{
                        console.log(updatedReceiver , updatedSender);
                    });
                });
            });

        }
        else{
             message.findOne({_id : data.conversations[user_place].convo_id}).then((messagesReceived)=>{
                 
                messagesReceivedFromDB= messagesReceived.messages;
               
                
            }).catch((err)=>{
                console.log(err);
            });
        }
    });
    setTimeout(()=>{
      
        res.json({messages : messagesReceivedFromDB});

    },500);
    
});


module.exports = router;