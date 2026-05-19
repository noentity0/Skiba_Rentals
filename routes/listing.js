import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";
import multer from "multer";
const router = express.Router();
import * as listingController from "../controllers/listings.js";
import {cloudinary,storage} from "../cloudConfig.js";

const upload = multer({ storage });

//router.route is better was of writing routes -> if common route is being used we use router.route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
         validateListing,
         upload.single("listing[image]"),
         wrapAsync(listingController.createListing));
    // .post(upload.single("listing[image]"), (req, res) => {
    //     res.send(req.file);
    // }); 


//we have written this /new route above /:id because if its below it will confuse new with id
//3.New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destoryListing));

// //1.Index Route
// router.get("/", wrapAsync(listingController.index));


// //4.Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// //2.Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

//5.Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

// //6.Update Route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

// //7.Delete Route
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destoryListing));


export default router;