const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/userRoutes");
const books = require("./book");
const bookRouter = require("./router/bookreviewRoutes");


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000

app.use("/user", userRouter);
app.use("/api", bookRouter);

// console.log(books);



mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.en2sb1b.mongodb.net/"
  )
  .then(() => {
    console.log("database connected ");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Server is started");
});
