// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passporLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Listing" }]
})

userSchema.plugin(passporLocalMongoose);

module.exports = mongoose.model('User', userSchema);

