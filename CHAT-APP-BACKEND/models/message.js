const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    messages:{
        type: Array,
        default: []
    }
});


module.exports = mongoose.model('message',messageSchema);