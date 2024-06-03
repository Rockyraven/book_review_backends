const bookModal = require("./modal/bookModal");
const books = require("./book");
const mongoose = require("mongoose");

const insertBooks = async (books) => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.en2sb1b.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
  
      const result = await bookModal.insertMany(books);
      console.log('Books inserted:', result);
    } catch (error) {
      console.error('Error inserting books:', error);
    } 
  };
  
  insertBooks(books);