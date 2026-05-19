import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {isLoggedIn, validateReview,isReviewAuthor} from "../middleware.js";

import * as reviewController from "../controllers/reviews.js";

const router = express.Router({mergeParams:true});

//Reviews - Post Route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destoryReview));

export default router;