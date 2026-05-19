import { cloudinary } from "../cloudConfig.js";
import Listing from "../models/listing.js";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


export const index = async(req,res)=>{
    let { search } = req.query;
    let filter = {};

    if (search && search.trim()) {
        let safeSearch = escapeRegex(search.trim());
        filter = {
            $or: [
                { title: { $regex: safeSearch, $options: "i" } },
                { location: { $regex: safeSearch, $options: "i" } },
                { country: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } }
            ]
        };
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs",{allListings});
};

export const renderNewForm = async(req,res)=>{
    res.render("listings/new.ejs");
};

export const showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing Your Requested Does Not Exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

export const createListing = async(req,res)=>{
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send()

    // console.log(response.body.features[0].geometry);
    // res,send("done!");

    // let {title,description,image,price,location,country} = req.body;
    let url = req.file.path;        
    let filename = req.file.filename;
    // console.log(url,"...",filename);

    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image = {url,filename};  
    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

export const renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Your Requested Does Not Exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250,h_300/");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

export const updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    // res.redirect(`/listings/${id}`);
    if(req.file){
        //delete the old image
        if(listing.image && listing.image.filename){
            cloudinary.uploader.destroy(listing.image.filename);
        }
        // this is for saving the newly uploaded image
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","Listing Updated");
    res.redirect("/listings");
};

export const destoryListing = async(req,res)=>{
    let {id} = req.params;
    let listing =   await Listing.findById(id);
    // Before deleting the lisitng , delete the image from cloudinary
    if(listing.image && listing.image.filename){        
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings"); 
};
