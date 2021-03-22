const db = require('../models');

const { ROLES } = db;
const User = db.user;
async function checkDuplicateUsernameOrEmail(req, res, next) {
  const { email, username } = req.body;
  await User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email is already in use!',
        });
        return;
      }

      next();
    });
  });
}

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    if (!ROLES.includes(roles)) {
      res.status(400).send({
        message: `Failed! Role does not exist = ${roles}`,
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
