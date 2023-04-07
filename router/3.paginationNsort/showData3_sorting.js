//this file is use for pagination in a table data with sorting

import mysql2 from "mysql2";
import express from "express";
import { authentication } from "../../autheticate/auth.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var PORT = 5000;
app.set("view engine", "ejs");

//db connection
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_details",
});

//show query
app.get("/show", authentication, function (req, res) {
  connection.connect();

  let id = req.query.id || 1;
  let col_name = req.query.col_name || "StudentID";
  let prev_order = "asc";

  let order = req.query.order || "asc";

  let limit = 5;
  let offset = (id - 1) * limit || 0;

  let resu2;

  let search = req.query.search || " ";

  connection.query(
    `select * from stu_express order by ${col_name} ${order} limit ${offset},${limit};`,
    function (err, resu) {
      if (err) throw err;
      resu2 = resu;
    }
  );

  connection.query(
    `select count(*) as countTot from stu_express;`,
    function (err, count_arr) {
      let total_page = Math.ceil(count_arr[0].countTot / limit);

      console.log(order, "orderrrrr111111");
      if (order == "asc") {
        console.log(order, "orderrrrr");
        0;
        prev_order = "desc";
      } else {
        prev_order = "asc";
      }

      // console.log(resu2);
      res.render("data3.ejs", {
        resu2,
        count_arr: total_page,
        page: id,
        col_name,
        prev_order,
        order,
      });
    }
  );
});

app.post("/next", (req, res) => {
  console.log(req.body);

  let idstarting = Number(req.body.idstarting) || 1;
  let idending=Number(req.body.idending) || 10


  if (idending<=1500) {
    idstarting=idstarting+10
    idending=idending+10
    res.json({"start":`${idstarting}`,"end":`${idending}`});
  }else{
    console.log("can't go next");
  }

});

app.post("/prev", (req, res) => {
  console.log(req.body);

  let idstarting = Number(req.body.idstarting) || 1;
  let idending=Number(req.body.idending) || 10


  if (idending>10) {
    idstarting=idstarting+10
    idending=idending+10
    res.json({"start":`${idstarting}`,"end":`${idending}`});
  }else{
    console.log("can't go previous");
  }


});
// app.listen(PORT, function (err) {
//   if (err) console.log("Error in server setup");
//   console.log("Server listening on Port", PORT);
// });

export default app;
