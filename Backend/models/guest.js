const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema({
    name: {type: String},
    participate: {type: Boolean}
});

module.exports = mongoose.model("Guest", guestSchema);