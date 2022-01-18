const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
      name: { 
            type: String,
            required: true 
      },
      location: {
            type: String,
            required: true
      },
      datePosted: {
            // I made this a string so it would be easier to work with. 
            // We could make it a date, but it would be a bit hard to 
            // keep it as a date when having the user fill out a form.
            // I can add it later but I want this to be a bit easier
            // to work with
            type: String,
            required: true,
      },
      description: {
            type: String,
            required: true 
      },
      // * I commented out user and img because we don't really know
      // * how to do those yet. 
      // img: {
      //       type: String,
      //        required: true
      // },
      // user: {
      //        type:mongoose.Schema.Types.ObjectId, ref:'User'
      // }
},
      {
      timestamps: true,
      }
);

module.exports = mongoose.model('Listing', listingSchema);