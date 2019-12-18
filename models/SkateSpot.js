const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skateSpotSchema = new Schema(
  {
    name: {type: String, required: true},
    type: {type: String, required: true, enum: ['park', 'street', 'diy','Park', 'Street', 'DIY']},
    status: {type: String, required: true, enum: ['active', 'WIP', 'RIP','Active', 'wip', 'rip']},
    indoor: {type: String, required: true, enum: ['indoor', 'outdoor', 'Indoor', 'Outdoor']},
    description: {type: String},
    images: [String],
    creator: {type: Schema.Types.ObjectId, ref:'User'},
    // location: { 
    //     lat: {type: mongoose.Decimal128, required: false},
    //     lng: {type: mongoose.Decimal128, required: false}
    //  } 
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const SkateSpot = mongoose.model("SkateSpot", skateSpotSchema);

module.exports = SkateSpot;
