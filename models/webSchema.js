const joi = require("joi");
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
    },
    Email: {
      type: String,
      required: true,
    },
    Details: {
      type: String,
    },
  },
  { timestamps: true }
);

const validationForm = joi.object({
  Fullname: joi.string().min(3).max(20).required(),
  PhoneNumber: joi.string().required(),
  Email: joi.string().email().required(),
  Details: joi.string(),
});

const WebModel = mongoose.model("WebModel", webSchema);

module.exports = { WebModel, validationForm };
