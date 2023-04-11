
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

  startingIndex = (id - 1) * limit || 0;


  let limitSql=`select * from stu_express order by ${col_name} ${order} limit ${startingIndex},${limit};`
  let resultLimit=await query(limitSql)
 

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

app.post("/searchrecord",async (req,res)=>{

  
let searchInput=req.query.search
let start=req.body.start
let end=req.body.end
let limit = 10;

let id = Number(req.query.id) || 1;

console.log(id,"id in search");
let startingIndex = (id - 1) * limit || 0;

let col_name = req.query.col_name || "StudentID";
let prev_order = "asc";
let order = req.query.order || "asc";

let sqlSearch=`select * from stu_express  where firstname like "%${searchInput}%" or lastname like "%${searchInput}%" order by  ${col_name} ${order} limit ${startingIndex},${limit}`


let dataSearch=await query(sqlSearch)



})
export default app;