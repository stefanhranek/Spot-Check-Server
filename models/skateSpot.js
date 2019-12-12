const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skateSpotSchema = new Schema(
  {
    name: {type: String, required: true},
    type: {type: String, required: true, enum: ['park', 'street', 'diy']},
    status: {type: String, required: true, enum: ['active', 'WIP', 'RIP']},
    indoor: {type: Boolean, required: true},
    images: [String],
    creator: {type: Schema.Types.ObjectId,ref:'User'},
    location: {type: String, coordinates: [] } 
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
