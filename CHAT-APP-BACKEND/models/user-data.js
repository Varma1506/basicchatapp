const mongoose = require('mongoose');

const userDataSchema  =  new mongoose.Schema({
    username :{
        type : String 
    },
    email :{
        type : String 
    },
    password :{
        type : String 
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    socket_id:{
        type: String,
        default: ''
    },
    conversations:{
        type : Array,
        default: []
    }
});
module.exports = mongoose.model('userData' , userDataSchema);