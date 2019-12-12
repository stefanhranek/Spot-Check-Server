const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/user');
const SkateSpot = require('../models/skateSpot');

// HELPER FUNCTIONS
const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
  } = require('../helpers/middlewares');
 


//  GET    '/:id'  
//  Get current user profile
router.get('/:id', isLoggedIn, (req,res,next) => {
    const { id } = req.params;
    User.findById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.status(400).json(err))
})

//  PUT    '/:id'
//  Update current user profile
router.put('/', isLoggedIn, (req,res,next) => {
    const { _id } = req.session.currentUser;
    const { username, password, city, image } = req.body;

    User.findOne( { username } )
      .then( (usernameExists) => {

        if (usernameExists) {
          next(createError(400));
          return;
        }

        User.findByIdAndUpdate( _id, { username, password, city, image }, {new: true} )
          .then( (updatedUser) => {

            res.status(200).json(updatedUser)
          })
          .catch( (err) => console.log(err));

      })
      .catch( (err) => console.log(err));
})


//  PATCH    ':id/'  
//  Update current user's favorite spots

router.patch('/', isLoggedIn, (req,res,next) => {


    const { spotId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(spotId)) {
      res.status(500).json({ message: 'Specified task id is invalid' });
      return;
    }

    const userId = req.session.currentUser._id;
  
    User.findOneAndUpdate( userId, { $push:{ favorites: spotId } }, {new: true} )
      .then( (updatedUser) => {
        res.status(201).json(updatedUser);
      })
      .catch( (err) => {
        res.status(400).json(err);
      });
})


module.exports = router;