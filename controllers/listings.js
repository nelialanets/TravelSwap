
const Listing = require('../models/Listing');
const User = require('../models/User')

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
          .populate("rewievs")// basicallyUser.findById(), lets you reference documents in other collections by automatically replacing the specified paths in the document with document(s) from other collections
          //exec executes the query
          .exec((err, foundListing)=>{
               if(err) return res.send(err);
               console.log(foundListing)
               const context = {listign: foundListing};
               res.render("listings/showAll", context)
          })
     }
     const create = (req, res) => {
          Listing.create(req.body, (err, createdArticle) => {
              if(err) return res.send(err);
              // allow us to add an alistign to the author
                //.exec short for execute. 
              User.findById(createdListing.user)
                  .exec(function(err, foundUser) {
                      if(err) return res.send(err);
                      foundUser.listings.push(createdListing) 
                      foundUser.save(); 
                      res.redirect("/listings")
                  })
          })
      }
      

 const edit = (req, res) => {
     Listing.findById(req.params.id, (err, foundListing)=>{
         if (err) res.send(err);
          const context = {listing: foundListing};
          return res.render('listings/edit', context)
})
 }

 const remove = (req, res) => {
     Listing.findByIdAndDelete(req.params.id, (err, deletedListing) => {
         if(err) return res.send(err);
         User.findById(deletedListing.user, (err, foundUser) => {
             foundUser.listings.remove(deletedListing);
             foundAuthor.save();
             res.redirect("/listings")
         })
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
