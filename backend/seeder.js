const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//connect tp mongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data
const seedData = async () => {
  try {
    //cleat existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //Create default Admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "12345",
      role: "admin",
    });

    //Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //INsert the products into DATABASE
    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

seedData();
