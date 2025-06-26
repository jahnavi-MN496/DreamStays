const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustinfo";

main()
    .then(()=>{
        console.log("COnnected to db");
    })
    .catch(err => {
        console.log("error");
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"67c0689e5cc3c244e5b6380f" }))
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();
