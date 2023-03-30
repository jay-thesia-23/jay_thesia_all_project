import express from "express";
import mysql2 from "mysql2";

var app = express();

//make connection
var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_details",
});

let select = "SELECT * FROM stu_master";
let insert =
  "INSERT INTO stu_master (FirstName, LastName, MobileNo, Email, City, CollegeName) VALUES (?,?,?,?,?,?)";

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

//select
app.get("/", (req, res) => {
  con.query(select, function (err, res2) {
    if (err) throw err;
    // console.log(res);

    res.send(res2);
  });
});

//insert
app.post("/add", (req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  let fn = req.query.fn;
  let ln = req.query.ln;
  let mobile = req.query.mobile;
  let email = req.query.email;
  let city = req.query.city;
  let college = req.query.college;

  con.query(insert, [fn, ln, mobile, email, city, college], (err, res2) => {
    if (err) throw err;

    res.write("res2");
    res.end();
  });
});

app.listen(5000, function (err) {
  if (err) console.log(err);

  console.log("Server is listening");
});
