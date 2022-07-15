const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    contact: {
      address: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    role: {
      type: String,
      required: true,
    },
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
