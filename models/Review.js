const mongoose= require("mongoose");


const userSchema = new mongoose.Schema(
     {
     name: { type: String, required: true},
     text:{String},
     listings: { type:mongoose.Schema.Types.ObjectId, ref:'Listing'}
},
{
          timestamps: true,
 } 

);

module.exports = mongoose.model('Review', userSchema);