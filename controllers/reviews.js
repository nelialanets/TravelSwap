const Listing = require('../models/Listing');
const Comment = require('../models/Comment');



const create =(req,res)=>{
     Review.create(req.body, function(err, createdReview){
          if (err) return res.send(err);
          Listing.findById(createdReview.Listing)
          .exec(function (err,foundListing){
               if(err) res.send(err);
               foundListing.Listings.push(createdReview)
               foundListing.save();
               return res.redirect(`/listings/${Listing._id}`)
          })

     })
}
const destroy =(req,res)=>{
     Listing.findById(req.params.id, function (err,) {
       if (err) return res.send(err);
       Listing.reviews.remove();
       Listing.save(function (err) {
        res.redirect(`/listings/${Listing._id}`);
      });
    });
  }



module.exports={
    create,
    destroy,
}