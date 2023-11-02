const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3004;
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));
// Route to get all posts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM USERDETAILS", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one post
app.get("/api/getFromEmail/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT * FROM USERDETAILS WHERE email = ?",
    email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// // Route for creating the post
app.post("/api/register", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  db.query(
    "INSERT INTO USERDETAILS (email, name, password) VALUES (?,?,?)",
    [email, name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// // Route to like a post
app.post("/api/update/:email", (req, res) => {
  //const id = req.params.id;
  const data = req.body;
  console.log(data);
  db.query(
    "UPDATE USERDETAILS SET age=? ,gender = ?,dateofbirth = ?,mobile=? WHERE email = ?",
    [data.age, data.gender, data.dateofbirth, data.mobile, data.email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
