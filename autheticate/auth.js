import express from "express";
import jwt from "jsonwebtoken";

var app = express();

const authentication = (req, res, next) => {
  let acc_token = req.cookies.access_token;

  console.log(acc_token, "acc_token");
  if (acc_token) {
    jwt.verify(acc_token, "abcdedf123456", (err, data) => {
      console.log("check in auth token");
      next();
    });
  } 
  
  else {
    res.redirect("/login");
  }
};

export { authentication };
