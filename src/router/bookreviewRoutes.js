const express = require("express");
const { getAllBook, createReview, getReview } = require("../controller/bookreviewController");
const auth = require("../middleware/auth")
const bookRouter = express.Router();

bookRouter.get("/getbook", getAllBook);
bookRouter.get("/getreview/:bookId", auth, getReview);
bookRouter.post("/review/:bookId", auth, createReview);

module.exports = bookRouter;
