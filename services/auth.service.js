const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// retrieve env vars
dotenv.config()

class Auth {
  constructor() {}

  static async hashPassword(pwd) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pwd, salt);
  }

  static async matchPasswords(requestPwd, userPwd) {
    return bcrypt.compare(requestPwd, userPwd)
  }

  static generateJwt({ username, email, userId }) {
    return jwt.sign(
      { userId, email, username },
      process.env.TOKEN_SECRET,
      { expiresIn: '30 days' } // 1m for 1 minute
    )
  }

  static getJwtPayload(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }

  static getUserId(authToken) {
    if (authToken) {
      const { userId } = this.getJwtPayload(authToken)
      return userId
    }
  
    return null
  }
}

module.exports = Auth

