const express = require("express");
const mongoose = require("mongoose");
// Allows us to control the app's Cross-Origin Resource Sharing Settings
const cors = require("cors");

// routes
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")


const app = express()

// mongoDB connection
mongoose.connect("",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the database"));

// allows all resources to access our backend application
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Heroku deployment
// Procfile - 



// process.env.PORT handles the environment of the hosting websites should app be hosted in a website such as Heroku
app.listen(process.env.PORT || 4000, () => {console.log(`API now online at port ${process.env.PORT || 4000}`)})