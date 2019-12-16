const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skateSpotSchema = new Schema(
  {
    name: {type: String, required: true},
    type: {type: String, required: true, enum: ['park', 'street', 'diy']},
    status: {type: String, required: true, enum: ['active', 'WIP', 'RIP']},
    indoor: {type: Boolean, required: true},
    description: {type: String},
    images: [String],
    creator: {type: Schema.Types.ObjectId, ref:'User'},
    location: { 
        lat: {type: mongoose.Decimal128, required: true},
        lng: {type: mongoose.Decimal128, required: true}
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
