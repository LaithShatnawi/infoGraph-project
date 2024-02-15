'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    // We can take another approach for this, which is create a new table for the roles and have a many-to-many relationship
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      required: true,
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ id: this.id }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET, { expiresIn: '2h' });
        return token;
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hashSync(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username } });
    const valid = await bcrypt.compareSync(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({
        where: { id: parsedToken.id },
      });
      if (user) {
        return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;
