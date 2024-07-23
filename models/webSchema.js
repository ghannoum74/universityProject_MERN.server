const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webSchema = new Schema(
  {
    Fullname: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Details: {
      type: String,
    },
  },
  { timestamps: true }
);

const WebModel = mongoose.model("WebModel", webSchema);

module.exports = WebModel;
