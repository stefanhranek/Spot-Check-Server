const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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

const User = mongoose.model("User", userSchema);

module.exports = User;
