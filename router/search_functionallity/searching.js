import mysql2 from "mysql2";
import express from "express";

const app = express();

var PORT = 5000;
app.set("view engine", "ejs");
app.use(express.json());

//db connection
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_details",
});

//query
//show query
app.get("/search", function (req, res) {
  connection.connect();

  let id = req.query.id || 1;
  let col_name = req.query.col_name || "StudentID";
  let sort = req.query.sort || "asc";
  let search = req.query.search || " ";

  let arrAns = search;

  var searchFname = "";
  var searchLname = "";
  var searchMoblie = "";
  var searchEmail = "";
  var searchCity = "";
  var searchCollege = "";
  var searchDOB = "";

  let fNameArr = [];

  for (let i = 0; i < arrAns.length; i++) {
    let currchar = arrAns[i][0];

    //fname
    if (currchar == "^") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "$" ||
          newchar == "-" ||
          newchar == "~" ||
          newchar == "@" ||
          newchar == "#" ||
          newchar == "^"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij" + " " + currchar);
          break;
        }

        searchFname += newchar;
      }

      console.log(searchFname);
      fNameArr.push(searchFname);
    }

    //lname
    if (currchar == "$") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "^" ||
          newchar == "-" ||
          newchar == "~" ||
          newchar == "@" ||
          newchar == "#" ||
          newchar == "$"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij");
          break;
        }

        searchLname += newchar;
        console.log(searchLname);
      }
    }

    //mobile
    if (currchar == "~") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "^" ||
          newchar == "-" ||
          newchar == "$" ||
          newchar == "@" ||
          newchar == "#" ||
          newchar == "~"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij");
          break;
        }

        searchMoblie += newchar;
      }
    }

    //city
    if (currchar == "-") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "^" ||
          newchar == "$" ||
          newchar == "~" ||
          newchar == "@" ||
          newchar == "#" ||
          newchar == "-"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij");
          break;
        }

        searchCity += newchar;
      }
    }

    //college
    if (currchar == "@") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "^" ||
          newchar == "$" ||
          newchar == "~" ||
          newchar == "-" ||
          newchar == "#" ||
          newchar == "@"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij");
          break;
        }

        searchCollege += newchar;
      }
    }

    //email
    if (currchar == "#") {
      for (let j = i + 1; j < arrAns.length; j++) {
        let newchar = arrAns.charAt(j);

        if (
          newchar == "^" ||
          newchar == "$" ||
          newchar == "~" ||
          newchar == "-" ||
          newchar == "@" ||
          newchar == "#"
        ) {
          i = j - 1;
          currchar = newchar;
          console.log(i + " " + j + "ij");
          break;
        }

        searchEmail += newchar;
      }
    }
  }

  console.log(fNameArr);

  let prev_order = "asc";

  let order=req.query.order || "asc";

  let limit = 5;
  let offset = (id - 1) * limit || 0;
  // if (searchFname == "") {
  //   searchFname = null;
  // }

  // if (searchLname == "") {
  //   searchLname = null;
  // }

  // if (searchMoblie == "") {
  //   searchMoblie = null;
  // }

  // if (searchCity == "") {
  //   searchCity = null;
  // }

  // if (searchCollege == "") {
  //   searchCollege = null;
  // }

  // if (searchDOB == "") {
  //   searchDOB = null;
  // }

  // if (searchEmail == "") {
  //   searchEmail = null;
  // }

  // let sqlfname=`FirstName LIKE '%${fNameArr[0]}%' `


  // for(let i=1;i<fNameArr.length;i++){
  //   sqlfname+=`OR FirstName LIKE '%${fNameArr[i]}%'`
  //   console.log("go inside");
  // }

  let finalsql = `select * from stu_express where FirstName LIKE '%${searchFname}%' AND LastName LIKE '%${searchLname}%' AND city LIKE '%${searchCity}%' AND MobileNo LIKE '%${searchMoblie}%' AND collegeName LIKE '%${searchCollege}%' AND email LIKE '%${searchEmail}%';`;
  let resu2;
  connection.query(
    `select * from stu_express order by ${col_name} ${order} limit ${offset},${limit};`,
    function (err, resu) {

      if (err) throw err;
      resu2=resu;
    });

  connection.query(finalsql, function (err, resu) {
    if (err) throw err;

    console.log("final sql " + finalsql);
    connection.query(
      `select count(*) as countTot from stu_express;`,
      function (err, count_arr) {
        if (sort == "asc") {
          sort = "desc";
        } else {
          sort = "asc";
        }
        let total_page = Math.ceil(count_arr[0].countTot / limit);

        res.render("data3.ejs", {
          resu,
          count_arr: total_page,
          page: id,
          col_name,
          sort,
          search,
          src: search,
          prev_order
        });
      }
    );
  });
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
