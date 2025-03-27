const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    ImageUrl : {
        type : String,
        default : ""
    },
    text : {
        type : String,
        default : ""
    }
});

module.exports = mongoose.model("UserData", UserDataSchema);