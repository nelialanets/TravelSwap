const mongoose = require('mongoose');
const Comment = require('./Comment');

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
            type: String,
            required: true,
      },
      description: {
            type: String,
            required: true 
      },
      startDate: {
            type: String,
            required: true,
      },
      endDate: {
            type: String,
            required: true,
      },
      img: {
          type: String,
       },
       comment: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
       }
},
      {
      timestamps: true,
      }
);

module.exports = mongoose.model('Listing', listingSchema);