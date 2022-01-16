const Listing = require('../models/Listing');
const User = require('../models/User');

const index=(req, res)=>{
     User.find({}, function(err, allUsers){
     if(err) return res.send(err);
     const context = {users: allUsers}
     res.render('users/index', context);
});
}


const show = (req, res)=>{
     User.findById(rew.params.id)
     .populate('listings')
     .exec((err, foundUser)=>{
     if (err) return res.send(err);  
     const context = {user: foundUser},
     return res.render('users/index')
     })

}

const newUser = (req, res)=>{
     
     res.render('users/new', {title: "Create an Account"});
}

//CREATE
//UPDATE
//DELLITE

module.exports={
     newUser,
     index,
     show,
}