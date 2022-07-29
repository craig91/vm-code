const mysql = require("mysql2");
const express = require("express");
const app = express();
const router = app;
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

// Database credentials
const con = mysql.createConnection({
  host: "localhost",
  user: "cdejean",
  password: "password123",
  database: "users",
});

app.use(bodyParser.json());
app.use(express.static("./"));
app.use(
  cors({
    origin: "*",
  })
);

// GET REQUESTS
// ************************************************************
router.get("/users", (req, res) => {
  let deedee = "SELECT * FROM MOCK_DATA";
  con.query(deedee, (err, rows) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(rows);
    }
  });
});

router.get("/animals", (req, res) => {
  let animals = "SELECT * FROM NEW_TABLE";
  con.query(animals, (err, rows) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(rows);
    }
  });
});

// ************************************************************

// DELETE requests ********************************************

router.get("/delete", (req, res) => {
  let del = 'DELETE FROM MOCK_DATA WHERE gender = "male"';
  con.query(del, "male", (err, result, fields) => {
    if (err) throw err;
    console.log("Record deleted = ", result.affectedRows);
    console.log(result);
  });
});

router.get("/deleteFemales", (req, res) => {
  let del = 'DELETE FROM MOCK_DATA WHERE gender = "female"';
  con.query(del, "female", (err, result, fields) => {
    if (err) throw err;
    console.log("Record deleted = ", result.affectedRows);
    console.log(result);
  });
});

// ***********************************************************

// POST requests *********************************************

router.post("/userData", (req, res, next) => {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let email = req.body.email;
  let gender = req.body.gender;
  let ipAddress = req.body.ipAddress;

  let sql = `INSERT INTO MOCK_DATA (f_name, l_name, email, gender, ipAddress created_at) VALUES ("${f_name}", "${l_name}", "${email}", "${gender}", "${ipAddress}", NOW())`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("record inserted");
  });
});

// router.get('/userData', (req, res) => {
//     const data = {
//         id: 400,
//         first_name: 'Jack',
//         last_name: 'Sparrow',
//         email: 'jack@sparrow.com',
//         gender: 'Male',
//         ip_address: '192.168.1.1'
//     }

//     con.query("INSERT INTO MOCK_DATA SET?", data, (error, results, fields) => {
//         if(error) throw error;
//         res.send(results)
//     })
// })

con.connect((err) => {
  if (err) {
    console.log("Error connecting to DB");
    return;
  }
  console.log("Connection established");
});

app.listen(port);
