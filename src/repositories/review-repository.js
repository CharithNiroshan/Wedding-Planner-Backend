import {ReviewModel} from "../models/review-model.js";

let result;

export const createReview = (review) => {
    result = ReviewModel.create(review);
    return result;
}

export const checkForEligibilityToReview = (usrId, venId) => {
    result = ReviewModel.find({
        usrId: usrId,
        venId: venId
    })

    return result;
}