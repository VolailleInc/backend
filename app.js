const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Thing = require("./models/thing");

const app = express();

// Full driver code example

// Connection to our atlass database
mongoose
  .connect(
    "mongodb+srv://strivecode:<password>@cluster0.5seq3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas");
  })
  .catch((error) => {
    console.log("Unable to connect to the database");
    console.error(error);
  });

/*
This will allow requests from all origins to 
access your API
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
});

/*
take any incoming request that has Content-Type
application/json  and make its  body  available
on the  req  object, allowing you to write
*/
app.use(bodyParser.json());
// Accepts product post request from backend
app.post("/api/stuff", (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.ImageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post data saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
  next();
});

// this middleware, create an array of stuff with the
// specific data schema required by the front end.Then
// send that stuff as JSON data, along with a 200 status,
// for a successful request.

app.get("/api/stuff", (req, res) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "My first thing",
      description: "All of the info about my first thing",
      imageUrl: "/stuff",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "My second thing",
      description: "All of the info about my second thing",
      imageUrl: "/stuff",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app;
