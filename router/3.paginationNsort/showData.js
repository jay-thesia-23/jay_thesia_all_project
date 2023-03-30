
//this page contains the list of the data of the dababase and show it in a form of the table data

import mysql2 from "mysql2";
import express from "express";
import querystring from 'querystring'
const app = express();

var PORT = 5000;
app.set("view engine", "ejs");
app.use(express.json());

var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_details",
});

let sql_query = "";


app.get("/show", function (req, res) {
  connection.connect();


  let limit=10;
  let offset=0;

  let resu = [];
  for (let i = 0; i < 100; i = i + 10) {
    connection.query(
      `select * from stu_express where StudentID limit ${i},10;`,
      function (err, result) {
        if (err) throw err;

        console.log(result);
        resu.push(result);
      }
    );
  }
 
  setTimeout(() => {
    console.log(resu);
    res.render("data.ejs", {  resu });
  }, 2000)


});



app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
