const express = require("express");
const res = require("express/lib/response");

const app = express();

/*
take any incoming request that has Content-Type  
application/json  and make its  body  available 
on the  req  object, allowing you to write
*/

app.use(express.json());

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
  );clea
  next();
});

//Accepts product post request from backend
app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Sell offer created successfully",
  });
  next();
});

// this middleware, create an array of stuff with the
//specific data schema required by the front end.Then
//send that stuff as JSON data, along with a 200 status,
//for a successful request.

app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "My first thing",
      description: "All of the info about my first thing",
      imageUrl: "/backend/stuff",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "My second thing",
      description: "All of the info about my second thing",
      imageUrl: "/backend/stuff",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app;
