
const Listing = require('../models/Listing');
const Review = require('../models/Review')

const index=(req, res)=>{
     Listing.find({}, function(err, listings){
          if(err) return res.send(err)
          const context = {listings: listings};
          res.render('listings/showAll', {title: 'View All Swaps', listings});
     });
};

const newListing = (req, res)=>{
     
         res.render('listings/newlist', {title: "Add Swap"});
}


const show = (req, res)=>{
          Listing.findById(req.params.id)
          .populate("reviews")// basicallyUser.findById(), lets you reference documents in other collections by automatically replacing the specified paths in the document with document(s) from other collections
          //exec executes the query
          .exec((err, foundListing)=>{
               if(err) return res.send(err);
               console.log(foundListing)
               const context = {listign: foundListing};
               res.render("listings/showAll", context)
          })
     }

     const create = (req, res)=> {
        Listing.create(req.body, function(err, createdListing){
            if (err) res.send(err);
            return res.redirect('/listings')
        })
    }


 const edit = (req, res) => {
     Listing.findById(req.params.id, (err, foundListing)=>{
         if (err) res.send(err);
          const context = {listing: foundListing};
          return res.render('listings/edit', context)
})
 }

 const remove = (req, res)=>{
     addEventListener.Listing.findByIdandDelete(req.params.id, (err, deleteListing)=>{
         if(err) return res.send(err);
         Review.deleteMany(
            {listing: deleteListing._id},
             (err, deleteListing)=>{
                 console.log(deleteListing);
                 if(err) return res.send(err)
            return res.redirect('/listings')
            }

        )
    })
 }
 
module.exports={
     index,
     show,
     newListing,
     edit,
     create,
     remove,
     
}
