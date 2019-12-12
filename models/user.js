const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    photo: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "SkateSpot" }],
    mySpots: [{ type: Schema.Types.ObjectId, ref: "SkateSpot" }],
    city: { type: String }
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
