const Listing = require('../models/Listing');
const Comment = require('../models/Comment');


// * Add Comment
const addComment = async (req, res) => {

     try {
 
         let listing = await Listing.findById(req.params.id)
 
         if (req.body.commentName === '' || req.body.commentDescription === '') {
 
             const comments = [];
 
             for (let comm of listing.comment) {
                 let comment = await Comment.findById(comm);
                 comments.push(comment);
             }
 
 
             res.render('listings/singleListing', {
                 listing: listing,
                 errorMessage: 'You must fill in all fields.',
                 comments: comments,
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
 
 

module.exports={
   addComment,
}