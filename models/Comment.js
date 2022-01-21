const mongoose= require("mongoose");


const commentSchema = new mongoose.Schema(
     {
     name: { type: String, required: true},
     text:{String},
     // * Don't see why this would be necessary 
     // listings: { type:mongoose.Schema.Types.ObjectId, ref:'Listing'}
},
{
          timestamps: true,
 } 

);

module.exports = mongoose.model('Comment', commentSchema);