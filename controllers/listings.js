const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings, hideNavbar: false, hideDarkToggle: false});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs", { hideNavbar: false, hideDarkToggle: false });
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path:"reviews",
        populate: {
            path: "author",
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested doesn't exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing, hideNavbar: false, hideDarkToggle: false});
}

module.exports.createListing = async(req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"..",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New listing is created!!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested doesn't exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing, hideNavbar: false, hideDarkToggle: false});
}

module.exports.updateListing = async (req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}