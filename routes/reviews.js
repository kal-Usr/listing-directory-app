// Import express library
const express = require("express")
const router = express.Router({ mergeParams: true })

// Import Controller
const ReviewController = require("../controllers/reviews")

// Import Utils
const wrapAsync = require("../utils/wrapAsync")

// Import middlewares
const isValidObjectId = require("../middlewares/isValidObjectId")
const isAuth = require("../middlewares/isAuth")
const { isAuthorReview } = require("../middlewares/isAuthor")
const { validateReview } = require("../middlewares/validator")

router.post(
  "/",
  isAuth,
  validateReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.store)
)

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.destroy)
)

module.exports = router
