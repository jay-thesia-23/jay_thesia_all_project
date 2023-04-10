//this file is use for pagination in a table data with sorting

import mysql2 from "mysql2";
import express from "express";
import { authentication } from "../../autheticate/auth.js";
import util from "util";
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

var query = util.promisify(connection.query).bind(connection);
//show query
app.get("/show", authentication, async function (req, res) {
  let id = Number(req.query.id) || 1;
  let col_name = req.query.col_name || "StudentID";
  let prev_order = "asc";
  let order = req.query.order || "asc";

  let limit = 10;
  let startingIndex = (id - 1) * limit || 0;
  let start = Number(req.query.start) || 1;
  let end = Number(req.query.end) || 10;

  let nextBtn = req.query.next;
  let prevBtn = req.query.prev;

  let totalSql = `select count(*) as pages from stu_express;`;

  console.log(start, end, "start end i js");

  let totalPages = await query(totalSql);
  totalPages = Math.ceil(totalPages[0].pages / limit);

  console.log(nextBtn, req.query.start, "next and start");
  if (nextBtn != undefined && (req.query.start != undefined || start != 1)) {
    console.log("inside the next btn if ");
    if (end >= totalPages) end = totalPages;
    else {
      start += 10;
      end += 10;
      id += 10;
    }
  }

  if (prevBtn != undefined) {
    if (start <= 10) {
      start = 1;
    } else {
      start -= 10;
      id -= 10;
      end -= 10;
    }
  }
  console.log(start, end, "start end i js AFTER change");

  startingIndex = (id - 1) * limit || 0;
  console.log(startingIndex, "startin g index of the after");

  let limitSql = `select * from stu_express order by ${col_name} ${order} limit ${startingIndex},${limit};`;
  let resultLimit = await query(limitSql);


  if (order == "asc") {
    prev_order = "desc";
  } else {
    prev_order = "asc";
  }

  res.render("data3.ejs", {
    resu2: resultLimit,
    count_arr: totalPages,
    page: id,
    col_name,
    prev_order,
    order,
    start,
    end,
  });
});

// app.post("/next", (req, res) => {
//   console.log(req.body);

//   let idstarting = Number(req.body.idstarting) || 1;
//   let idending = Number(req.body.idending) || 10;

//   if (idending <= 1500) {
//     idstarting = idstarting + 10;
//     idending = idending + 10;
//     res.json({ start: `${idstarting}`, end: `${idending}` });
//   } else {
//     console.log("can't go next");
//   }
// });

//  app.post("/prev", (req, res) => {
//    console.log(req.body);

//    let idstarting = Number(req.body.idstarting) || 1;
//    let idending = Number(req.body.idending) || 10;

//    if (idending > 10) {
//      idstarting = idstarting + 10;
//      idending = idending + 10;
//      res.json({ start: `${idstarting}`, end: `${idending}` });
//    } else {
//      console.log("can't go previous");
//    }
//  });
// app.listen(PORT, function (err) {
//   if (err) console.log("Error in server setup");
//   console.log("Server listening on Port", PORT);
// });

export default app;
