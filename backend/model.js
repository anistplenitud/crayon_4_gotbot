const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let employee = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    mobile: {
      type: String
    }
  },
  { collection: "Employees" }
);

module.exports = mongoose.model("employees", employee);