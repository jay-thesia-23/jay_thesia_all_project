import express from "express";
import mysql2 from "mysql2";
import bodyparser from "body-parser";
import { authentication } from "../../autheticate/auth.js";

const app = express();
express.json();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//db connection
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "grid",
});

connection.connect();

app.get("/save",authentication, (req, res) => {
  var sql = `select * from candidate_basic_info;`;

  connection.query(sql, (err, data) => {
    console.log(data);
    res.render("save", { data });
  });
});

app.get("/edit1",authentication, (req, res) => {
  var sql = `select * from candidate_basic_info;`;
  connection.query(sql, (err, data) => {
    res.render("update", { data });
  });
});

app.post("/edit", (req, res) => {
  console.log("hello");
  console.log(req.body);
  var sql = `select count(*) as total from candidate_basic_info;`;
  var sqlId = `select candidate_id from candidate_basic_info;`;

  var currD = [];
  connection.query(sql, (err, data2) => {
    connection.query(sqlId, (err, data) => {
      console.log(data);

      let total = data2[0].total;
      let id = req.body.id;
      let fname = req.body.arrFname;
      let lname = req.body.arrLname;
      let mobile = req.body.arrMobile;
      let email = req.body.arrEmail;
      let city = req.body.arrCity;

      console.log(id);
      console.log("id");

     console.log(total+"data2");
        if (id != "") {
          let update = `update candidate_basic_info set firstname="${fname[id-1]}", lastname="${lname[id-1]}", email="${email[id-1]}", phone_number="${mobile[id-1]}", city="${city[id-1]}" where candidate_id=${id};`;

          connection.query(update,(err,data)=>{
              console.log(data);
          })

          console.log(update);
        }

        if (id == "") {
          for (let i = total ; i < fname.length; i++) {
            let insert = `insert into candidate_basic_info (firstname, lastname, email, phone_number, city) values ("${fname[i]}","${lname[i]}","${email[i]}","${mobile[i]}","${city[i]}");`;
              connection.query(insert,(err,data)=>{
                console.log(data);
              })

            console.log(insert);
          }
        }
      
    });

    // console.log("hello")
    // console.log(fname[0].value);

    // res.json(data);
  });
});

// app.listen("5001", () => {
//   console.log("data base is connected");
// });


export default app