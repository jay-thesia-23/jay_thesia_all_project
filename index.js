import bodyParser from "body-parser";
import express from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mysql2 from "mysql2";
import cookieParser from "cookie-parser";
import path from "path";
import allroutes from "./allroutes.js";
import { authentication } from "./autheticate/auth.js";

var app = express();
var __dirname = path.resolve();



console.log(path.join(__dirname, "public", "tic_tac_toe"));

app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use("/", allroutes);
app.use("/publicProjects", authentication, express.static("publicProjects"));

var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "jwt",
});

/* global localStorage, */

connection.connect((err) => {
  console.log("database is connected");
});

var isEmail;
let getname;

// register
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {



  var name = req.body.name || "";
  var email = req.body.email || "";
  var password = req.body.password || "";
  var con_password = req.body.con_password || "";


  let sqlEmail = `select email from users;`;

  try {
    var emailArr = [];

    if (name != "" && password != "" && con_password != "" && email != "") {
  
      connection.query(sqlEmail, (err, data) => {
        emailArr = data.map((item) => item.email);

        if (emailArr.includes(email)) {
          isEmail = true;
        } else {
          isEmail = false;
        }

        checkEmail(isEmail);
      });

      async function checkEmail(isEmail) {

        if (isEmail == false) {
          const hashedPassword = await bcrypt.hash(password, 10);

          console.log(hashedPassword);

          var token = jwt.sign({ email: email }, "abcdedf123456", {
            expiresIn: "1d",
          });

          console.log(token);
          let insert = `insert into users (name,email,password) values ("${name}","${email}","${hashedPassword}");`;

          res.cookie("access_token", token);

          connection.query(insert, (err, data) => {
         
          });

          res.redirect("/activationLink");
        } else {
          connection.query(sqlEmail, (err, data) => {
            emailArr = data.map((item) => item.email);

            if (emailArr.includes(email)) {
              isEmail = true;
            } else {
              isEmail = false;
            }

            checkEmail(isEmail);
          });
        }
      }
    } else {

      connection.query(sqlEmail, (err, data) => {
        if (err) throw err;
        emailArr = data.map((item) => item.email);
        emailArr.includes(email) ? res.json(true) : res.json(false);
      });
    }
  } catch (error) {
    if (error) {
      res.json({ msg: error });
    }
  }
});

//login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  // console.log(req.body);

  let email = req.body.email || "";
  let password = req.body.password || "";

  // console.log(password);

  if (email != "" && password != "") {
    let checkActive = `select * from users where email="${email}" and isActivated=1;`;

    let getEmail = `select * from users where email="${email}" `;
    connection.query(getEmail, async (err, dataUser) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }


      if (dataUser.length == 0) {
        return res.status(401).send({
          msg: "email or password is incorrect!",
        });
      }

      console.log(dataUser[0].password);
      var compare = await bcrypt.compare(password, dataUser[0].password);

      // console.log(compare);

      if (dataUser.length == 1 && compare == false) {
        res.json({
          msg: "email or password is incorrect!",
        });
      } else if (dataUser.length == 1 && dataUser[0].isActivated == 0) {
        res.redirect("/activationLink");
      }

      if (compare) {
        const token = jwt.sign({ email: email }, "abcdedf123456", {
          expiresIn: "1d",
        });

   

        res.cookie("access_token", token, {
          httpOnly: true,
        });

        const accessToken = req.cookies.access_token;
     

        jwt.verify(accessToken, "abcdedf123456", function (err, decoded) {
          getname = dataUser[0].name;


          res.redirect("/home");
        });

        // res.render("home",{getname})
        // .status(200)
        // .send({mes:"Logged in successfully"})
      }
    });
  } else {
  }
});

app.get("/home", (req, res) => {
  // let checkActive = `select * from users where email="${email}" and isActivated=1;`;

  console.log(req.cookies.access_token, "cokkies chhe bhai");

  if (req.cookies.access_token != undefined && getname != undefined) {

    res.render("home", { getname });
  } else {
    res.redirect("login");
  }
});

app.post("/home", (req, res) => {
 

  if (req.body.logout == "LOGOUT") {
    res.clearCookie("access_token");
  }

  res.redirect("/login");
});

app.get("/activationLink", async (req, res) => {
  var tokenActiveLink = req.cookies.access_token;

  jwt.verify(tokenActiveLink, "abcdedf123456", (err, payload) => {


    let checkActive = `select * from users where email="${payload.email}" and isActivated=1;`;

    connection.query(checkActive, (err, data) => {


      // if (data.length == 0) {
      //   res.redirect("/login");
      // } else {
      //   res.redirect("/home");
      // }
    });
  });

  // if(tokenActiveLink)
  res.render("activationLink");
});

app.post("/activationLink", (req, res) => {


  let link = req.body.linkactive;
  let accessToken = req.cookies.access_token;



  jwt.verify(accessToken, "abcdedf123456", function (err, decoded) {

    // res.render("home", { getname });
    console.log(decoded.email);
    let updateAct = `update users SET isActivated="1" where email="${decoded.email}";`;

    console.log(updateAct);
    if ((link = "LINK")) {
      connection.query(updateAct, (err, data) => {
        res.redirect("/home");
      });
    } else {
    }
  });
});

app.get("/tic_tac_toe", (req, res) => {
  res.sendFile(path.join(path.join(__dirname, "public")), "tic_tac_toe");
});

app.listen("5001", () => {
  console.log("server is connected");
});
