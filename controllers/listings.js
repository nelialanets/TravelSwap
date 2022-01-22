const Listing = require('../models/Listing');
const Comment = require('../models/Comment')


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

    } catch {
        res.redirect('/')
    }
};
// * Show one listing
const show = async (req, res)=>{
    try {
        const listing = await Listing.findById(req.params.id);

        const comments = [];

        for (let comm of listing.comment) {
            let comment = await Comment.findById(comm);
            comments.push(comment);
        }

        res.render('listings/singleListing', {listing: listing, comments: comments})
    } catch {
        res.redirect('/listings')
    }
}
// * Edit listing menu
const edit = async (req, res) => {
    try {
        const listing =  await Listing.findById(req.params.id)
        res.render('listings/edit', {listing: listing})
    } catch {
        res.redirect('/listings')
    }
}

// * Update the listing
const updateListing = async (req, res) => {

    let listing;

    try {

        listing = await Listing.findById(req.params.id)

        listing.name = req.body.name
        listing.location = req.body.location
        listing.description = req.body.description
        listing.startDate = req.body.startDate
        listing.endDate = req.body.endDate
        listing.img = ''

        await listing.save()
        res.redirect(`/listings/${listing.id}`)

    } catch {
        if (listing == null) {
            res.redirect('/')
        } else {
            res.render('listings/edit', {
                listing: listing,
                errorMessage: 'You must fill in all fields.',
            })
        }
        
    }
}
// * Add Comment
const addComment = async (req, res) => {

    try {

        let listing = await Listing.findById(req.params.id)

        if (req.body.commentName === '' || req.body.commentDescription === '') {
            res.render('listings/singleListing', {
                listing: listing,
                errorMessage: 'You must fill in all fields.',
            })

            return;
        }

        const newComment = new Comment({
            name: req.body.commentName,
            text: req.body.commentDescription,
        })

        listing.comment.push(newComment);

        await listing.save()
        await newComment.save()
        res.redirect(`/listings/${listing.id}`)

    } catch {
        res.redirect('/');
        
    }
}


// * Delete 
const remove = async (req, res)=>{
    let listing;

    try {

        listing = await Listing.findById(req.params.id)

        await listing.remove()
        res.redirect('/listings')

    } catch {
        if (listing == null) {
            res.redirect('/')
        } else {
            res.redirect(`/listings/${listing.id}`)
        }
        
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
     updateListing,
     addComment,
}
