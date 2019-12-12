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


//  GET    '/map?long=0&lat=0'  
//  Show map view of skate spots by current location


//  GET    '/favorites'  
//  Show list of favorite skate spots


//  GET    '/spot-details/:id'
//  Show specific skate spot


//  PUT    '/skatespots/:id'  
//  Add image to spot details


//  POST    '/'
//  Create and save a new skate spot
router.post('/', (req, res, next) => {
    const { name, type, status, indoor, description, location } = req.body;

    const newSkateSpot = SkateSpot.create({ name, type, status, indoor, description, location });
        req.session.currentUser = newUser;
        res
          .status(201) //  OK
          .json(newSkateSpot);

    },
  );

//  DELETE    '/:id'
//  Delete skate spot from favorites list

router.delete('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(500).json({ message: 'Specified task id is invalid' });
      return;
    }

    const userId = req.session.currentUser._id;
  
    User.findOneAndUpdate( userId, { $pull:{ favorites: id } }, { new:true } )
      .then( (updatedUser) => {
        res.status(201).json( updatedUser );
      })
      .catch( (err) => {
        res.status(400).json(err);
      });
  
  
  })


module.exports = router;