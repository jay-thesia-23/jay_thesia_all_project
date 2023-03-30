import mysql2 from "mysql2";
import express from "express";

//make connection
var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_details",
});

var app = express();

let firstName = [
  "Harry",
  "Ross",
  "Bruce",
  "Cook",
  "Carolyn",
  "Morgan",
  "Albert",
  "Walker",
  "Randy",
  "Reed",
  "Larry",
  "Barnes",
  "Lois",
  "Wilson",
  "Jesse",
  "Campbell",
  "Ernest",
  "Rogers",
  "Theresa",
  "Patterson",
  "Henry",
  "Simmons",
  "Michelle",
  "Perry",
  "Frank",
  "Butler",
  "Shirley",
];

let lastName = [
  "Ruth",
  "Jackson",
  "Debra",
  "Allen",
  "Gerald",
  "Harris",
  "Raymond",
  "Carter",
  "Jacqueline",
  "Torres",
  "Joseph",
  "Nelson",
  "Carlos",
  "Sanchez",
  "Ralph",
  "Clark",
  "Jean",
  "Alexander",
  "Stephen",
  "Roberts",
  "Eric",
  "Long",
  "Amanda",
  "Scott",
  "Teresa",
  "Diaz",
  "Wanda",
  "Thomas",
];

var cityArr = [
  "Ahmedabad",
  "surat",
  "rajkot",
  "bharuch",
  "bhanbagar",
  "valsad",
  "vadodra",
];

var collegeArr = [
  "Alpha",
  "L.D",
  "Vishwakarma",
  "GEC",
  "Nirma",
  "PDPU",
  "DAIICT",
  "silver oak",
  "L.J",
];

app.post("/insert", (req, res) => {
  function randomData() {
    for (let i = 0; i < 1500; i++) {
      randomFirstName();
      randomLastName();
      randomEmail();
      randomMobile();
      randomCity();
      randomCollege();
      randomDate();

      con.query(
        `INSERT INTO stu_express (FirstName, LastName, MobileNo, Email, city, collegeName, birthdate) values ('${ranfname}','${ranlname}',${mobile},'${email}','${city}','${college}','${date}');`,
        function (err, data) {
          if (err) throw err;
          console.log(data);
        }
      );
    }
  }

  randomData();
});

app.listen(5000, function (err) {
  if (err) console.log(err);

  console.log("Server is listening");
});

function randomFirstName() {
  let ranfname = firstName[parseInt(Math.random() * firstName.length)];
}

function randomLastName() {
  let ranlname = lastName[parseInt(Math.random() * lastName.length)];
}

function randomEmail() {
  var email = ranfname + ranlname + "@gmail.com";
}

function randomMobile() {
  var mobile = Math.floor(Math.random() * 9000000000) + 1000000000;
}

function randomCity() {
  var city = cityArr[parseInt(Math.random() * cityArr.length)];
}

function randomCollege() {
  var college = collegeArr[parseInt(Math.random() * collegeArr.length)];
}

function randomDate() {
  var start = new Date(1995, 0, 1);
  var end = new Date(2003, 0, 1);
  var date;
  var month;
  var day;
  var year;
  function getrandomdate() {
    var d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    (month = "" + (d.getMonth() + 1)),
      (day = "" + d.getDate()),
      (year = +d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    date = [year, month, day].join("-");
  }
}


