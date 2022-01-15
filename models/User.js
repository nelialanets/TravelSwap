const mongoose= require("mongoose");

const userSchema = new mongoose.Schema(
     {
     name: { type: Sting, required: true},
     googleId: { type: String},
     bio: {type:String},
     listings: [{ type:mongoose.Schema.Types.ObjectId, ref:'Listing'}]
},
{
          timestamps: true,
 } 

);

module.exports = mongoose.model('User', userSchema);