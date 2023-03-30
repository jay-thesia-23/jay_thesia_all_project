import express from "express";
import mysql2 from "mysql2";
import bodyparser from "body-parser";
import util from "util";
const app = express();
express.json();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
//db connection
var connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "generate",
});

const query = util.promisify(connection.query).bind(connection);
var s = "";
let sql = `select select_name from select_master`;

async function generate_combo(field_name, field_type, id) {
  var str = "";
  var sql2 = `select option_name from select_master 
                inner join option_master
                on select_master.select_id=option_master.select_id where select_name="${field_name}";`;

  var data2 = await query(sql2);

  if (field_type == "combobox") {
    str = `<select name=${field_name}> `;

    for (let i = 0; i < data2.length; i++) {
      str += `<option value="${data2[i].option_name}">${data2[i].option_name}</option>`;
    }
    str += `</select>`;

    console.log(str + "for combo");
  } else if (field_type == "checkbox") {
    for (let i = 0; i < data2.length; i++) {
      str += `<input type="checkbox" name="${data2[i].option_name}" value="${data2[i].option_name}">${data2[i].option_name}`;
    }
    console.log(str + "checkbox");
  }else if(field_type=="radio"){
    for (let i = 0; i < data2.length; i++) {
        str += `<input type="radio" name="radio" value="${data2[i].option_name}">${data2[i].option_name}`;
      }
  }

  return str;
}

app.get("/", async (req, res) => {
  let data1 = await generate_combo("gender", "radio", "GEN");
  let data2 = await generate_combo("language", "checkbox", "LANG");
  let data3=await generate_combo("course","combobox","COUR")
  let data4= await generate_combo("university","combobox","UNI")
  let data5=await generate_combo("subject","combobox","SUB")
  let data6=await generate_combo("relation","combobox","RELA")
  let data7=await generate_combo("department","combobox","DEPT")
  let data8=await generate_combo("result","combobox","RES")
  let data9=await generate_combo("category","combobox","CATE")
  res.render("combo", { data1, data2,data3,data4,data5,data6,data7,data8,data9});
});

app.listen("5000", () => {
  console.log("database is connected");
});
