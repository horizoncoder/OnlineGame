const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
        "SELECT u.user_name, s.stat_id, s.win, s.score FROM users AS u LEFT JOIN stats AS s ON u.user_id = s.user_id WHERE u.user_id = $1",
        [req.user] 
      ); 
    
      
      res.json(user.rows[0]);

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//создать статистику 
router.post("/stats", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const { win,score } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO stats (user_id, win, score ) VALUES ($1, $2, $3) RETURNING *",
      [req.user, win, score]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//удалить  статистику 

router.delete("/stats/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM stats WHERE stat_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
