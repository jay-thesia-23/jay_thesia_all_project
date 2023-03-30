//this file is use for the pagenation 

import mysql2 from "mysql2";
import express from "express";
import querystring from "querystring";
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

  let id = req.query.id || 1;

  let limit = 100;
  let offset = (id - 1) * limit || 0;

  let resu = [];

  connection.query(
    `select * from stu_express where StudentID limit ${offset},${limit};`,
    function (err, resu) {
      if (err) throw err;

      connection.query(
        `select count(*) as countTot from stu_express;`,
        function (err, count_arr) {
          console.log(count_arr);
          var total_page = Math.ceil(count_arr[0].countTot / limit);
          console.log(total_page);
          res.render("data2", { resu, total_page });
        }
      );
    }
  );
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
