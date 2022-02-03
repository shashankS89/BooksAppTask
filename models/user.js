const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema(
  {
    
    Name: {
      type: String,
    },
    Email: {
        type: String,
    },
    RefferedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPaymentMade: {
        type: Boolean,
        default: false,
    },
    TotalEarnings:{
        type: Number,
        default: 0,
    }
  }
);

module.exports = mongoose.model("User", user);