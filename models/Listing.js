const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
      listing: { 
            type: String,
             required: true 
            },
      datePosted: {
                  type: Number, 
                  default: function (){
                  return new Date().getFullYear();
                  }
            },
      location: {
             type: String,
              required: true
             },
      description: {
             type: String,
              required: true 
            },
      img: {
            type: String,
             required: true
            },
      user: {
             type:mongoose.Schema.Types.ObjectId, ref:'User'
            }
},
      {
      timestamps: true,
      }
);

module.exports = mongoose.model('Listing', listingSchema);