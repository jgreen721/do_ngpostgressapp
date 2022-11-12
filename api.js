const router = require("express").Router();
const jwt = require("jsonwebtoken");
const pool = require("./db");

const SECRET =
  "dkeifgmekdKDgoieKDmei20949359dkmfieo2924i3ndkjo20583JDkfejeidjwi2o39";

router.post("/login", async (req, res) => {
  console.log("LOGIN", req.body);
  for (let i in req.body) {
    if (req.body[i] === "")
      return res.json({ status: 403, msg: "Error -- invalid credentials" });
  }
  let token = await jwt.sign(
    { _id: (Math.random() * 500) | 0, username: req.body.username },
    SECRET
  );
  res.json({ status: 200, token, msg: "Success" });
});

router.get("/validate_token", async (req, res) => {
  console.log("/validate_token fired!", req.headers);
  let token = req.headers["auth-token"].split(" ")[1];
  let payload = await jwt.verify(token, SECRET);
  return res.json({ status: 200, msg: "Token validated", payload });
});

router.get("/data", async (req, res) => {
  let data = await pool.query("SELECT * FROM posts");
  // console.log("Data", data.rows);
  res.json({ msg: "Success", status: 200, data: data.rows });
});

router.post("/addpost", async (req, res) => {
  console.log(req.body);
  let data = await pool.query(
    "INSERT INTO posts(post,postedBy,likes) VALUES($1,$2,$3) RETURNING *",
    [req.body.post, req.body.postedBy, 0]
  );
  console.log("addpost - Data", data.rows);
  res.json({ msg: "/add/post -- Success", status: 200, newPost: data.rows });
});

router.delete("/delete/:id", async (req, res) => {
  let data = await pool.query("DELETE FROM posts WHERE id = $1", [
    req.params.id,
  ]);
  console.log("Data", data.rows);
  res.json({ msg: "/add/delete -- Success", status: 200 });
});

module.exports = router;
