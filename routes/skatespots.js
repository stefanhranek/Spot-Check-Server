const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/User');
const SkateSpot = require('../models/SkateSpot');

// HELPER FUNCTIONS
const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
  } = require('../helpers/middlewares');


//  GET    '/map?long=0&lat=0'  
//  Show map view of skate spots by current location

//  GET    '/skatespots'  
//  Get info all skate spots
router.get('/', isLoggedIn, (req,res,next) => {
    const { id } = req.params;
    SkateSpot.find()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.status(400).json(err))
})

//  GET    '/favorites'  
//  Show list of the user's favorite skate spots
router.get('/favorites', isLoggedIn, (req, res, next) => {

    const userId = req.session.currentUser._id;
  
    User.findById( userId ).populate( 'favorites' )
      .then( (favoritesList) => {
        res.status(200).json( favoritesList );
      })
      .catch( (err) => {
        res.status(400).json(err);
      });
  
  })

//  GET    '/spot-details/:id'
//  Show specific skate spot
router.get('/spot-details/:id', isLoggedIn, (req,res,next) => {
  
  const { id } = req.params;

    SkateSpot.findById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.status(400).json(err))
})

//  PUT    '/skatespots/:id'  
//  Add image to spot details *** Backlog - Uses Cloudinary


//  POST    '/'
//  Create and save a new skate spot
  router.post('/', isLoggedIn, (req, res, next) => {
    const { name, type, status, indoor, description, location } = req.body;  
    const user = req.session.currentUser;  
    SkateSpot.create({ creator: user, name, type, status, indoor, description, location })
    .then( (newSkateSpot) => {
      res.status(201).json( newSkateSpot );
        User.findByIdAndUpdate(
          user,
          { $push: { mySpots: newSkateSpot } },
          { new : true }
          )
        .then( response => {
          console.log("response");
        } )
        .catch( err => {
          console.log("error time", err);
        } )
      })
      .catch( (err) => {
        res.status(400).json(err);
      });
 
  });

//  DELETE    '/:id'
//  Delete skate spot from favorites list
router.delete('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(500).json({ message: 'Specified Skate Spot id is invalid' });
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