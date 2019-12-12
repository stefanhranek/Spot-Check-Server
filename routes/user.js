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
 


//  GET    '/'  
//  Get current user profile


//  PUT    '/'
//  Update current user profile

//  PATCH    '/'  
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