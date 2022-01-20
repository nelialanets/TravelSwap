const Listing = require('../models/Listing');
const Review = require('../models/Review')


const create = (req, res)=> {
    Listing.create(req.body, function(err, createdListing){
    if (err) res.send(err);
    return res.redirect('/listings')
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
        img: '',
    })

    try {
        const newListing = await listing.save()

        res.redirect(`listings/${newListing.id}`)
    } catch {
        res.render('listings/newlist', {
            listing: listing,
            errorMessage: 'You must fill in all fields.',
        })
    }

}
// * Show all listings
const index = async (req, res)=> {

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
};
// * Show one listing
const show = (req, res)=>{

    res.send('Show Listing ' + req.params.id)

}
// * Edit listing menu
const edit = (req, res) => {
    res.send('Edit Listing ' + req.params.id)
}

// * Update the listing
const updateListing = (req, res) => {
    res.send('Updates listing ' + req.params.id)
}

// * Delete 
const remove = (req, res)=>{
    res.send('Delete listing ' + req.params.id)
}

 
module.exports={
     index,
     show,
     newListing,
     edit,
     create,
     remove,
     postListing,
     updateListing,
}
