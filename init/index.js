import mongoose from "mongoose";
import initData from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/skibarentals";
main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj,owner:"6a047363d7f02fa1ae4e0593"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
} ;

initDB();