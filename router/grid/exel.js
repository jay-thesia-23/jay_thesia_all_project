import express from "express";
import mysql2 from "mysql2";
import bodyparser from "body-parser";
import { authentication } from "../../autheticate/auth.js";

const app = express();
express.json();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "grid",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// show data

app.get("/table", function (req, res) {
  con.query(
    `select * from  candidate_basic_info where isdelete = 0 ;`,
    function (error, result) {
      if (error) throw error;
      // console.log(result)
      res.render("excel.ejs", { result });
    }
  );
});

// update data

app.get("/update", function (req, res) {
  // console.log(req.body.colm1.length)
  // console.log(req.body.colm1[0])
  // var update = req.query.upd;
  var id = req.query.idd;
  // console.log(id)

  var phone = req.query.phone;
  var fname = req.query.fname;

  var lname = req.query.lname;
  var ccity = req.query.ccity;
  var semail = req.query.semail;
  con.query(
    `update candidate_basic_info set phone_number = '${phone}',firstname = '${fname}',lastname = '${lname}',city = '${ccity}',email = '${semail}' where candidate_id = ${id};`,
    function (error, result) {
      if (error) throw error;
    }
  );
});

// delete data

app.get("/delete", function (req, res) {
  // console.log(req.body.colm1.length)
  // console.log(req.body.colm1[0])
  // var update = req.query.upd;
  var id = req.query.idd;
  console.log(id, "idddd");

  var sqlDelete = `update candidate_basic_info set isdelete = 1  where candidate_id = ${id};`;
  con.query(sqlDelete, function (error, result) {
    if (error) throw error;
  });
});

//  insert  single data

app.get("/single_insert_exel", function (req, res) {
  // console.log("inserted");

  // var arr = ['id'+q,'fname'+q,'lname'+q,'city'+q,'state'+q]
  // console.log(arr);

  var phone = req.query.phone;
  var fname = req.query.fname;

  var lname = req.query.lname;
  var ccity = req.query.ccity;
  var semail = req.query.semail;
  var del_6 = 0;

  con.query(
    `insert into candidate_basic_info (phone_number,firstname,lastname,city,email) values('${phone}','${fname}','${lname}','${ccity}','${semail}');`,
    function (error, result) {
      if (error) throw error;
      res.send({});
    }
  );
});

export default app;
