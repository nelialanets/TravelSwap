
const db = require("../models");


const index=(req, res)=>{
     db.Listing.find({}, function(err, listings){
          if(err) return res.send(err)
          const context = {listings: listings};
          res.render('listings/show', {title: 'View Swaps',context});
     });
};


const newListing = (req, res)=>{
         res.render('listings/new', {title: "Add Swap"});
}

const show = (req, res)=>{
          db.Listing.findById(req.params.id)
          .populate("user")// basically db.Listing.findById(), lets you reference documents in other collections by automatically replacing the specified paths in the document with document(s) from other collections
          //exec executes the query
          .exec((err, foundListing)=>{
               if(err) return res.send(err);
               console.log(foundListing)
               const context = {listign: foundListing};
               res.render("listings/show", context)
          })
     }


// const edit = (req, res) => {
//      db.Listing.findById(req.params.id, (err, foundListing)=>{
//           if (err) res.send(err);
//           const context = {listing: foundListing};
//           return res.render(.)

//})

module.exports={
     index,
     show,
     newListing,
     //  create,
}
