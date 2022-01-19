const Listing = require('../models/Listing');
const Review = require('../models/Review')

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
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    })

    try {
        const newListing = await listing.save()

        // res.redirect(`listings/${newListing.id}`)
        // * This is confusing, I don't think we need to worry about this yet.
        res.redirect('listings/newlisting')
    } catch {
        res.render('listings/newlist', {
            listing: listing,
            errorMessage: 'You must fill in all fields.',
        })
    }

}

const index= async (req, res)=> {

    let searchOptions = {}

    if (req.query.location != null && req.query.location !== '') {
        searchOptions.location = new RegExp(req.query.location, 'i')
    }

    try {
        const listings = await Listing.find(searchOptions)

        res.render('listings/index', {
            listings: listings,
            searchOptions: req.query,
        })

        console.log(searchOptions)

    } catch {
        res.redirect('/')
    }

    // Listing.find({}, function(err, allListings){
    //      if(err) return res.send(err)
    //      const context = {listings: allListings};
    //      res.render('listings/showAll', context);
    // });
};

 
module.exports={
     index,
     show,
     newListing,
     edit,
     create,
     remove,
     postListing,
}
