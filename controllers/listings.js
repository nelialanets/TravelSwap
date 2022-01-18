const Listing = require('../models/Listing');
const User = require('../models/User')

const index=(req, res)=>{
     Listing.find({}, function(err, listings){
          if(err) return res.send(err)
          const context = {listings: listings};
          res.render('listings/showAll', {title: 'View All Swaps', listings});
     });
};

const show = (req, res)=>{
          Listing.findById(req.params.id)
          .populate("user")// basicallyUser.findById(), lets you reference documents in other collections by automatically replacing the specified paths in the document with document(s) from other collections
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
 
// * New Listing Route
const newListing = (req, res)=>{
    res.render('listings/newlist', {listing: new Listing()});
}
// * Post Listing
const postListing = async (req, res) => {

    // * Get the current date before we send the listing to mongodb
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fullDate = `${month}/${day}/${year}`;

    const listing = new Listing({
        name: req.body.name,
        location: req.body.location,
        datePosted: fullDate,
        description: req.body.description,
    })

    try {
        const newListing = await listing.save()

        // res.redirect(`listings/${newListing.id}`)
        // * This is confusing, I don't think we need to worry about this yet.
        res.redirect('listings/newlisting')
    } catch {
        res.render('listings/newlist', {
            listing: listing,
            errorMessage: 'Error creating listing',
        })
    }

}

 
module.exports={
     index,
     show,
     newListing,
     edit,
     create,
     remove,
     postListing,
}
