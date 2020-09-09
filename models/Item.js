const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    user_id : {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    item : [{
            name : String,
            priority : String,
          
         }]

});



module.exports = Item = mongoose.model('item', ItemSchema);
