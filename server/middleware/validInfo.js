module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }
  function validPassword(userPassword) {
    return /^(?=.*\d)(?=.*[a-z]).{4,}$/.test(userPassword);
  }
  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json('Заполните все поля');
    } if (!validEmail(email)) {
      return res.status(401).json('Неправельная почта');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Заполните все поля');
    } if (!validEmail(email)) {
      return res.status(401).json('Неправельная почта');
    }
  }

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json('Заполните все поля');
    } if (!validPassword(password)) {
      return res.status(401).json('Неправельный пароль');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Заполните все поля');
    } if (!validPassword(password)) {
      return res.status(401).json('Неправельная пароль');
    }
  }

  return next();
};
