import express from "express";
import mysql2 from "mysql2";
import bodyparser from "body-parser";
import { authentication } from "../../autheticate/auth.js";

const app = express();
express.json();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
//db connection
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_portal",
});

app.get("/", authentication, (req, res) => {
  connection.connect();

  let state = req.query.state;

  let sql = `SELECT state_name FROM state_master ;`;
  let sql2 = `SELECT DISTINCT option_name FROM option_master where select_id="2" ORDER BY option_name ASC `;
  let sql3 = `SELECT DISTINCT option_name FROM option_master where select_id="3" ORDER BY option_name ASC `;
  let sql5 = `SELECT DISTINCT option_name FROM option_master where select_id="5" ORDER BY option_name ASC`;
  let sql6 = `SELECT DISTINCT option_name FROM option_master where select_id="6" ORDER BY option_name ASC`;
  let sql7 = `SELECT DISTINCT option_name FROM option_master where select_id="7" ORDER BY option_name ASC`;

  // let fname=req.body.fname;

  // console.log(fname+"fnammme");

  connection.query(sql, function (error, data) {
    connection.query(sql2, function (err, data2) {
      connection.query(sql3, function (err, data3) {
        connection.query(sql5, function (err, data5) {
          connection.query(sql6, function (err, data6) {
            connection.query(sql7, function (err, data7) {
              if (error) throw error;

              console.log(data);
              console.log(data2);
              console.log(data3);
              console.log(data5);
              console.log(data6);
              console.log(data7);
              // console.log("state" + state);

              res.render("form.ejs", {
                data,
                data2,
                data3,
                data5,
                data6,
                data7,
                state,
              });
            });
          });
        });
      });
    });
  });
});

app.post("/form", async function (req, res) {
  connection.connect();
  console.log(req.body);
  var fname = req.body.fname;
  var lname = req.body.lname;
  var designation = req.body.designation;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var mobile = req.body.mobile;
  var gender = req.body.gender;
  var state = req.body.stateSel;
  var zip = req.body.zip;
  var relatioship = req.body.relationship;
  var dob = req.body.date;

  //edu

  var course = req.body.course;
  var percentage = req.body.percentage;
  var university = req.body.university;
  var yearStart = req.body.yearStart;
  var yearEnd = req.body.yearEnd;

  //experience

  var companyName = req.body.companyName;
  var designationPast = req.body.designationPast;
  var from = req.body.from;
  var to = req.body.to;

  //company

  var techname = req.body.tech;

  //lang

  var lang = req.body.lang;
  var read = req.body.read;
  var write = req.body.write;
  var speak = req.body.speak;

  //refrences

  var p1 = req.body.p1;
  var con1 = req.body.con1;
  var rel1 = req.body.rel1;
  var email1 = req.body.email1;

  var p2 = req.body.p2;
  var con2 = req.body.con2;
  var rel2 = req.body.rel2;
  var email2 = req.body.email2;

  //reference
  var loc1 = req.body.loc1;
  var loc2 = req.body.loc2;
  var loc3 = req.body.loc3;

  var location = [];
  location.push(loc1, loc2, loc3);
  var ctcExp = req.body.ctcExp;
  var ctcCurr = req.body.ctcCurr;

  var department = req.body.department;
  var notice = req.body.notice;

  var insertedId;

  let insertBasic = `insert into candidate_basic_info (firstname, lastname,designation,email,address, city,phone_number, gender,state,zip_code,relationship,birth_date) values ("${fname}","${lname}","${designation}","${email}","${address}","${city}","${mobile}","${gender}","${state}","${zip}","${relatioship}","${dob}")`;

  await new Promise(function (resolve, reject) {
    connection.query(insertBasic, async (error, data) => {
      if (error) throw error;

      resolve(data.insertId);

      res.send("data added successfully");
      insertedId = data.insertId;
      console.log(data);
    });
  });

  //education

  if (typeof course == "object") {
    for (let i = 0; i < course.length; i++) {
      let insertEdu = `INSERT INTO education_table(candidate_id,edu_level,percentage,board_unverisy_name,starting_year,ending_year) VALUES ("${insertedId}","${course[i]}","${percentage[i]}","${university[i]}","${yearStart[i]}","${yearEnd[i]}");`;

      connection.query(insertEdu, (error, data) => {
        if (error) throw error;

        console.log(insertEdu);
      });
    }
  } else {
    let insertEdu = `INSERT INTO education_table(candidate_id,edu_level,percentage,board_unverisy_name,starting_year,ending_year) VALUES ("${insertedId}","${course}","${percentage}","${university}","${yearStart}","${yearEnd}");`;

    connection.query(insertEdu, (error, data) => {
      if (error) throw error;

      console.log(insertEdu);
    });
  }

  //company

  if (typeof companyName == "object") {
    for (let i = 0; i < companyName.length; i++) {
      let insertCourse = `INSERT INTO experience_table(candidate_id, company_name, designation, from_date, to_date) VALUES ("${insertedId}","${companyName[i]}","${designationPast[i]}","${from[i]}","${to[i]}");`;

      connection.query(insertCourse, (error, data) => {
        if (error) throw error;
      });
    }
  } else {
    let insertCourse = `INSERT INTO experience_table(candidate_id, company_name, designation, from_date, to_date) VALUES ("${insertedId}","${companyName}","${designationPast}","${from}","${to}");`;

    connection.query(insertCourse, (error, data) => {
      if (error) throw error;
    });

    console.log(companyName + " " + designation + " " + from + " " + to);
    console.log(insertCourse);
  }

  //tech

  if (techname == undefined) {
    techname = [];
  }

  if (Array.isArray(techname)) {
    for (let i = 0; i < techname.length; i++) {
      if (techname[i] == undefined) {
        var techProficiency = eval("req.body." + techname[i]);

        let insertTech = `INSERT INTO technologies_table (candidate_id, tech_name, tech_proficiency) VALUES ("${insertedId}","${techname[i]}","${techProficiency}");`;

        console.log(insertTech);
        connection.query(insertTech, function (error, data) {
          if (error) throw error;
        });
      }
    }
  } else {
    console.log(techname, "technnnnnnnnnnnnnnnnnnnnnname");
    var techProficiency = eval("req.body." + techname);

    console.log(techname);
    let insertTech = `INSERT INTO technologies_table (candidate_id, tech_name, tech_proficiency) VALUES ("${insertedId}","${techname}","${techProficiency}");`;

    console.log(insertTech);
    connection.query(insertTech, function (error, data) {
      if (error) throw error;
      // res.send("tech is added succesfully")
    });
  }
  //lang

  // console.log(lang);
  if (lang == undefined) {
    lang = [];
  }

  if (typeof lang == "object") {
    for (let i = 0; i < lang.length; i++) {
      let currRead = read.includes(lang[i]) ? "yes" : "no";
      let currWrite = write.includes(lang[i]) ? "yes" : "no";
      let currSpeak = speak.includes(lang[i]) ? "yes" : "no";
      console.log(
        currRead + " " + currWrite + " " + currSpeak + " " + "currRWS"
      );

      let insertLang = `INSERT INTO language_known(candidate_id,language_name, lang_read, lang_write, lang_speak) VALUES ("${insertedId}","${lang[i]}","${currRead}","${currWrite}","${currSpeak}");`;

      connection.query(insertLang, function (err, data) {
        if (err) throw err;
      });

      console.log(insertLang);
    }
  } else {
    let currRead = read != undefined ? "yes" : "no";
    let currWrite = write != undefined ? "yes" : "no";
    let currSpeak;
    if (speak != undefined) {
      currSpeak = "yes";
    } else {
      currSpeak = "no";
    }

    let insertLang = `INSERT INTO language_known(candidate_id,language_name, lang_read, lang_write, lang_speak) VALUES ("${insertedId}","${lang}","${currRead}","${currWrite}","${currSpeak}");`;
    connection.query(insertLang, function (err, data) {
      if (err) throw err;
    });

    console.log(insertLang);
  }

  //refrences

  var insertRef = `insert into reference_contact_table(candidate_id, refer_name, refer_mobile, refer_email, refer_relation)values('${insertedId}','${p1}','${con1}','${email1}','${rel1}')`;
  connection.query(insertRef, (err, data8) => {
    if (err) throw err;
  });
  console.log(insertRef);

  var insertRef2 = `insert into reference_contact_table(candidate_id, refer_name, refer_mobile, refer_email, refer_relation)values('${insertedId}','${p2}','${con2}','${email2}','${rel2}')`;
  connection.query(insertRef, (err, data8) => {
    if (err) throw err;
  });
  console.log(insertRef2);

  //preference

  var insertPref = `insert into preferances_table (candidate_id, prefered_location, notice_period, expected_ctc, current_ctc, department) VALUES ("${insertedId}","${location}","${notice}","${ctcExp}","${ctcCurr}","${department}");`;
  console.log(insertPref);

  connection.query(insertPref, (err, data8) => {
    if (err) throw err;
  });
});

//city end point
app.get("/getCity", authentication, async (req, res) => {
  connection.connect();

  let state = req.query.state;

  let newRe = `select state_id from state_master where state_name="${state}"`;

  connection.query(newRe, (err, data) => {
    console.log(data[0].state_id);

    // console.log(ans."state_id");
    let cityNames = `select city_name from city_master where state_id=${data[0].state_id}`;
    connection.query(cityNames, (err, data2) => {
      if (err) throw err;
      console.log(data2);
      res.json(data2);
    });
  });
});

app.get("/searchform", authentication, (req, res) => {
  connection.connect();

  let id = req.query.id || 1;
  let col_name = req.query.col_name || "candidate_id";
  let limit = 10;
  let sort = req.query.sort || "asc";

  let offset = (id - 1) * limit || 0;
  let search = req.query.search || " ";

  let arrAns = search;

  var searchFname = "";
  var searchLname = "";
  var searchMoblie = "";
  var searchEmail = "";
  var searchCity = "";
  var searchGender = "";
  var searchDOB = "";

  let fNameArr = [];
  let lNameArr = [];
  let emailArr = [];
  let mobileArr = [];
  let gender = [];
  let city = [];

  console.log(arrAns, "answer ans arr");

  // for (let i = 0; i < arrAns.length; i++) {

  let i = 0;
  let currchar = arrAns[0];
  console.log("name1=" + currchar);

  console.log(currchar, "ansswer");

  //fname
  if (currchar == "^") {
    for (let j = i + 1; j < arrAns.length; j++) {
      let newchar = arrAns[j];

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

    fNameArr.push(searchFname);
    searchFname = "";
    console.log(fNameArr);
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

  //gender
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

      searchGender += newchar;
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
  // }

  // if (searchFname.length =="") {
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

  // if (searchGender == "") {
  //   searchGender = null;
  // }

  // if (searchDOB == "") {
  //   searchDOB = null;
  // }

  // if (searchEmail == "") {
  //   searchEmail = null;
  // }

  let sqlfname;
  if (fNameArr.length != 0) {
    sqlfname = `firstname LIKE '%${fNameArr[0]}%' `;

    for (let i = 1; i < fNameArr.length; i++) {
      sqlfname += `OR firstname LIKE '%${fNameArr[i]}%'`;
      console.log("go inside");
    }
  } else {
    sqlfname = `firstname LIKE '%${searchFname}%'`;
  }

  let finalsql = `select * from candidate_basic_info where ${sqlfname} AND lastname LIKE '%${searchLname}%' AND city LIKE '%${searchCity}%' AND phone_number LIKE '%${searchMoblie}%' AND gender LIKE '%${searchGender}%' AND email LIKE '%${searchEmail}%';`;

  connection.query(finalsql, function (err, resu) {
    if (err) throw err;

    console.log("final sql " + finalsql);
    connection.query(
      `select count(*) as countTotal from candidate_basic_info;`,
      function (err, count_arr) {
        if (sort == "asc") {
          sort = "desc";
        } else {
          sort = "asc";
        }

        let total_page = Math.ceil(count_arr[0].countTotal / limit);

        res.render("search", {
          resu,
          count_arr: total_page,
          page: id,
          col_name,
          sort,
        });
      }
    );
  });
  //showdata only startt ************************************

  /*
  let basicSql = `select * from candidate_basic_info`;
  var limitSql = `select * from candidate_basic_info order by ${col_name} ${sort} limit ${offset},${limit};`;
  var countSql = `select count(*) as countTotal from candidate_basic_info ;`;

  connection.query(limitSql, (err, resu) => {
    if (err) throw err;

    connection.query(countSql, function (err, count_arr) {
      if (sort == "asc") {
        sort = "desc";
      } else {
        sort = "asc";
      }

      let total_page = Math.ceil(count_arr[0].countTotal / limit);

      res.render("search", {
        resu,
        count_arr: total_page,
        page: id,
        col_name,
        sort,
      });
    });
  });
*/

  // ****show only data end
});

//delete the records
app.get("/deleteform", authentication, (req, res) => {
  connection.connect();

  let id = req.query.id;
  let ajax = req.query.ajax || false;
  // console.log(id + "from js");

  let col_name = req.query.col_name || "candidate_id";
  let limit = 10;
  let sort = req.query.sort || "asc";

  let offset = (id - 1) * limit || 0;
  let search = req.query.search || " ";

  let arrAns = search;

  var searchFname = "";
  var searchLname = "";
  var searchMoblie = "";
  var searchEmail = "";
  var searchCity = "";
  var searchGender = "";
  var searchDOB = "";

  let fNameArr = [];
  let lNameArr = [];
  let emailArr = [];
  let mobileArr = [];
  let gender = [];
  let city = [];

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

      fNameArr.push(searchFname);
      searchFname = "";
      console.log(searchFname);
      console.log(fNameArr);
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

    //gender
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

        searchGender += newchar;
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

  let sqlfname;
  if (fNameArr.length != 0) {
    sqlfname = `firstname LIKE '%${fNameArr[0]}%' `;

    for (let i = 1; i < fNameArr.length; i++) {
      sqlfname += `OR firstname LIKE '%${fNameArr[i]}%'`;
      console.log("go inside");
    }
  } else {
    sqlfname = `firstname LIKE '%${searchFname}%'`;
  }

  console.log();

  let sqlLimit = `select * from candidate_basic_info where isDeleted=0 limit ${offset},${limit};`;
  console.log(sqlLimit);

  connection.query(sqlLimit, (err, data2) => {
    console.log(data2, "saqlimmitttttt");
    connection.query(
      `select count(*) as countTotal from candidate_basic_info ;`,
      function (err, count_arr) {
        if (sort == "asc") {
          sort = "desc";
        } else {
          sort = "asc";
        }

        let total_page = Math.ceil(count_arr[0].countTotal / limit);

        if (ajax == false) {
          res.render("delete", {
            data2,
            count_arr: total_page,
            page: id,
            col_name,
            sort,
          });
        } else {
          res.json(data2);
        }
      }
    );
  });
});

app.get("/deleteallform", authentication, (req, res) => {
  connection.connect();

  let idArr = req.query.idArr;
  var up = `UPDATE candidate_basic_info SET isDeleted=1 WHERE candidate_id IN (${idArr}); `;

  connection.query(up, (err, data) => {
    if (err) throw err;
  });
});

//edit

app.get("/editform", authentication, (req, res) => {
  connection.connect();

  let id = req.query.id;
  //console.log(id + "currId");

  var getData = `select * from candidate_basic_info where candidate_id=${id}`;
  var getState = `select state_name from state_master;`;
  var getEdu = `select * from education_table where candidate_id=${id}; `;
  var getCourse = `select option_name from option_master where select_id=3;`;
  var getUniversity = `select option_name from option_master where select_id=5;`;
  var getCompany = `select * from experience_table where candidate_id=${id};`;
  var getTech = `select * from technologies_table where candidate_id=${id};`;
  var getLang = `select * from language_known where candidate_id=${id};`;
  var getRef = `select * from reference_contact_table where candidate_id=${id};`;
  var getDep = `select option_name from option_master where select_id=2;`;
  var getPre = `select * from preferances_table where candidate_id=${id};`;

  var states = "";
  var edu = "";
  var course = "";
  var university = "";
  var company = "";
  var tech = "";
  var lang = "";
  var ref = "";
  var pre = "";
  var dep = "";
  var loc_arr = [];

  connection.query(getDep, (err, data2) => {
    dep = data2;
  });

  connection.query(getPre, (err, data) => {
    pre = data;

    loc_arr = pre[0].prefered_location.split(",");
    // loc_arr="ahme"
    console.log(loc_arr);
  });

  connection.query(getRef, (err, data) => {
    ref = data;
  });

  connection.query(getLang, (err, data) => {
    lang = data;
  });
  connection.query(getTech, (err, data) => {
    tech = data;
  });
  connection.query(getCompany, (err, data6) => {
    company = data6;
  });
  connection.query(getUniversity, (err, data5) => {
    university = data5;
  });

  connection.query(getCourse, (err, data4) => {
    course = data4;
  });

  connection.query(getEdu, (err, data3) => {
    if (err) throw err;
    edu = data3;
  });
  connection.query(getState, (err, data2) => {
    if (err) throw err;

    states = data2;
  });

  connection.query(getData, (err, data) => {
    if (err) throw err;

    console.log(data);

    var data = data[0];

    // console.log(states);
    // res.json(data)

    // course=JSON.stringify(course)
    // university=JSON.stringify(university)

    // console.log(course);
    // console.log(university);
    // console.log(edu);
    // console.log(getCourse);
    // console.log(company);
    // console.log(tech);
    // console.log(lang);
    // console.log(ref);

    console.log(pre);
    console.log(dep);
    res.render("edit", {
      data,
      states,
      edu,
      course,
      university,
      company,
      tech,
      lang,
      ref,
      pre,
      dep,
      loc_arr,
    });
  });
});

app.post("/updated", authentication, (req, res) => {
  let id2 = req.body.candidate;

  console.log(id2);

  var fname = req.body.fname;
  var lname = req.body.lname;
  var designation = req.body.designation;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var mobile = req.body.mobile;
  var gender = req.body.gender;
  var state = req.body.stateSel;
  var zip = req.body.zip;
  var relatioship = req.body.relationship;
  var dob = req.body.date;

  //edu

  var edu_id = req.body.edu_id;
  var course = req.body.course;
  var percentage = req.body.percentage;
  var university = req.body.university;
  var yearStart = req.body.yearStart;
  var yearEnd = req.body.yearEnd;

  //experience

  var companyName = req.body.companyName;
  var designationPast = req.body.designationPast;
  var from = req.body.from;
  var to = req.body.to;
  var exp_id = req.body.exp_id;

  //company

  var techname = req.body.tech;
  var tech_id = req.body.tech_id;

  //lang

  var lang = req.body.lang;
  var read = req.body.read;
  var write = req.body.write;
  var speak = req.body.speak;
  var lang_id = req.body.lang_id;

  //refrences

  var p1 = req.body.p1;
  var con1 = req.body.con1;
  var rel1 = req.body.rel1;
  var email1 = req.body.email1;
  var ref1_id = req.body.ref1_id;

  var p2 = req.body.p2;
  var con2 = req.body.con2;
  var rel2 = req.body.rel2;
  var email2 = req.body.email2;
  var ref2_id = req.body.ref2_id;

  //reference
  var loc1 = req.body.loc1;
  var loc2 = req.body.loc2;
  var loc3 = req.body.loc3;

  var location = [];
  location.push(loc1, loc2, loc3);
  var ctcExp = req.body.ctcExp;
  var ctcCurr = req.body.ctcCurr;

  var department = req.body.department;
  var notice = req.body.notice;

  console.log(req.body);

  let updated = `update candidate_basic_info
  set firstname="${fname}", lastname="${lname}", email="${email}", phone_number="${mobile}", city="${city}", 
  state="${state}", gender="${gender}", zip_code="${zip}", birth_date="${dob}", address="${address}", 
  relationship="${relatioship}", designation="${designation}" where candidate_id="${id2}";`;

  let updatePre = `update preferances_table SET prefered_location="${location}", notice_period="${notice}", expected_ctc="${ctcExp}", current_ctc="${ctcCurr}", department="${department}"  where candidate_id="${id2}";`;

  connection.query(updatePre, (err, data) => {
    console.log(updatePre);
    console.log(data);
  });

  let updateRef = `update reference_contact_table set refer_name='${p1}', refer_mobile="${con1}", refer_email='${email1}', refer_relation='${rel1}' where refer_id="${ref1_id}" ; `;

  let updateRef2 = `update reference_contact_table set refer_name='${p2}', refer_mobile="${con2}", refer_email='${email2}', refer_relation='${rel2}' where refer_id="${ref2_id}" ;`;

  connection.query(updateRef, (err, data) => {
    connection.query(updateRef2, (err, data2) => {
      // console.log(data);
      // console.log(data2);
    });
  });

  // console.log(updateRef);
  // console.log(updateRef2);

  if (typeof lang == "object") {
    for (let i = 0; i < lang.length; i++) {
      let currRead = read.includes(lang[i]) ? "yes" : "no";
      let currWrite = write.includes(lang[i]) ? "yes" : "no";
      let currSpeak = speak.includes(lang[i]) ? "yes" : "no";
      console.log(
        currRead + " " + currWrite + " " + currSpeak + " " + "currRWS"
      );

      let updateLang = `update language_known set language_name="${lang[i]}", lang_read="${currRead}", lang_write="${currWrite}", lang_speak="${currSpeak}" where lang_id="${lang_id[i]}" ;`;

      // connection.query(updateLang, function (err, data) {
      //   if (err) throw err;
      // });

      console.log(updateLang);
    }
  } else {
    let currRead = read != "undefined" ? "yes" : "no";
    let currWrite = write != "undefined" ? "yes" : "no";
    let currSpeak = speak != "undefined" ? "yes" : "no";

    let updateLang = `update language_known set language_name="${lang}", lang_read="${currRead}", lang_write="${currWrite}", lang_speak="${currSpeak}" where lang_id="${lang_id}" ;`;

    connection.query(updateLang, function (err, data) {
      if (err) throw err;
    });

    console.log(updateLang);
  }

  if (typeof techname == "object") {
    for (let i = 0; i < techname.length; i++) {
      var techProficiency = eval("req.body." + techname[i]);

      console.log(techProficiency);

      let updateTech = `update technologies_table
    set tech_name="${techname[i]}", tech_proficiency="${techProficiency}"
    where tech_id=${tech_id[i]} `;

      // connection.query(updateTech, (err, data) => {
      //   console.log(data + "addeed tech");
      // });

      console.log(updateTech);
    }
  } else {
    var techProficiency = eval("req.body." + techname);

    console.log(techProficiency);

    let updateTech = `update technologies_table
  set tech_name="${techname}", tech_proficiency="${techProficiency}"
  where tech_id=${tech_id} `;

    connection.query(updateTech, (err, data) => {
      console.log(data + "addeed tech");
    });

    console.log(updateTech);
  }

  if (typeof course == "object") {
    for (let i = 0; i < course.length; i++) {
      if (edu_id[i] != "undefined") {
        let updateEdu = `update education_table
    set edu_level="${course[i]}", percentage="${percentage[i]}", 
    board_unverisy_name="${university[i]}", starting_year="${yearStart[i]}", ending_year="${yearEnd[i]}" where edu_id="${edu_id[i]}";
    `;

        // connection.query(updateEdu, (err, data2) => {
        //   console.log("edu update");
        // });
        console.log(updateEdu);
      } else {
        let updateEdu = ``;
      }
    }
  } else {
    let updateEdu = `update education_table
    set edu_level="${course}", percentage="${percentage}", 
    board_unverisy_name="${university}", starting_year="${yearStart}", ending_year="${yearEnd}" where edu_id="${edu_id}";
    `;

    connection.query(updateEdu, (err, data2) => {
      console.log("edu update");
    });
    console.log(updateEdu);
  }

  if (typeof companyName == "object") {
    for (let i = 0; i < companyName.length; i++) {
      let updateCompany = `update experience_table
    set company_name="${companyName[i]}", designation="${designationPast[i]}", from_date="${from[i]}", to_date="${to[i]}"
     where exp_id=${exp_id[i]};
    `;

      // connection.query(updateCompany, (err, data2) => {
      //   console.log("edu update");
      // });
      console.log(updateCompany);
    }
  } else {
    let updateCompany = `update experience_table
    set company_name="${companyName}", designation="${designationPast}", from_date="${from}", to_date="${to}"
     where exp_id=${exp_id};
    `;

    connection.query(updateCompany, (err, data2) => {
      console.log("edu update");
    });
    console.log(updateCompany);
  }

  connection.query(updated, (err, data) => {
    if (err) throw err;
    console.log("data is updated");
  });

  console.log(updated);

  res.redirect("/delete");
});

// app.listen("5001", function (err) {
//   console.log("server is running");
// });

export default app;
