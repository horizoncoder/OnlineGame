const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//register 
router.post("/reg", validInfo, async (req,res)=>{
    try{
        // destructure req.body(name password)

        const {  name, email ,password } = req.body;
        //check user
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
          ]);
          if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
         }
         //Bcrypt password
         const saltRound=10;
         const salt = await bcrypt.genSalt(saltRound);
         const bcryptPassword = await bcrypt.hash(password, salt);


         //add user to database

         let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
          );
          res.json(newUser.rows[0]);

//jwt token
const token = jwtGenerator(newUser.rows[0].user_id);
 res.json({token});

    } catch (err){

        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
router.post("/login" , validInfo ,async (req,res)=>{
    try{

        // destruct the req body
        const {email,password} = req.body;

        //check exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
          }

        // check password

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
          );
          if (!validPassword) {
            return res.status(401).json("Invalid Credential");
          }

//give token
const token = jwtGenerator(user.rows[0].user_id);
 res.json({token});

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
router.get("/is-verify", authorization,  (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
module.exports = router;
