const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');
// register
// eslint-disable-next-line consistent-return
router.post('/register', validInfo, async (req, res) => {
  try {
    // destructure req.body(name password)

    const { name, email, password } = req.body;
    // check user
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json('User already exist!');
    } if (email.length > 30) {
      return res.status(401).json('почта не может быть больше 30 символов');
    } if (email.length < 14) {
      return res.status(401).json('почта не может быть меньше 14 символов');
    } if (password.length > 20) {
      return res.status(401).json('Пароль не должен быть больше 20 символов');
    } if (password.length < 3) {
      return res.status(401).json('Пароль не должен быть меньше 3 символов');
    } if (name.length > 12) {
      return res.status(401).json('Имя не должено быть больше 12 символов');
    } if (name.length < 3) {
      return res.status(401).json('Имя не должено быть меньше 3 символов');
    }

    // Bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // add user to database

    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword],
    );

    // jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login
// eslint-disable-next-line consistent-return
router.post('/login', validInfo, async (req, res) => {
  try {
    // destruct the req body
    const { email, password } = req.body;

    // check exist
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json('Неправильные данные');
    }

    // check password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password,
    );
    if (password.length > 20) {
      return res.status(401).json('Пароль не должен быть больше 20 символов');
    } if (password.length < 3) {
      return res.status(401).json('Пароль не должен быть меньше 3 символов');
    }
    if (!validPassword) {
      return res.status(401).json('Неправильные данные');
    }

    // give token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/is-verify', authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
