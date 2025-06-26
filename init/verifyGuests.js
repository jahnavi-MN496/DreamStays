const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustinfo";

async function main() {
    await mongoose.connect(MONGO_URL);
    const listings = await Listing.find({}, { title: 1, guests: 1 });
    listings.forEach(listing => {
        console.log(`Title: ${listing.title}, Guests: ${listing.guests}`);
    });
    await mongoose.disconnect();
}

main(); 