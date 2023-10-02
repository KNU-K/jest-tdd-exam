const { userSchema } = require("../models/scenario1.schema");
class UserService {
  static isExistUser(userid) {
    return userSchema.some((u) => u.userid === userid);
  }
  static auth(userid, userpw) {
    const user = userSchema.find((u) => u.userid === userid);

    if (user) {
      if (user.userpw === userpw) {
        return { state: true };
      } else {
        return { state: false, msg: "pw fail" };
      }
    } else {
      return { state: false, msg: "id fail" };
    }
  }
  static createUser(user) {
    try {
      userSchema.push(user);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

class ExamUserService {
  constructor(database) {
    this.database = database;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.database.query("SELECT * FROM users", [null], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          resolve([]);
        }
      });
    });
  }

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      this.database.query(
        "SELECT * FROM users WHERE userid = ?",
        [userId],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            resolve([]);
          }
        }
      );
    });
  }
}

class AuthService {
  constructor(ExamUserService) {
    this.userService = ExamUserService;
  }

  async authenticateUser(user) {
    const result = await this.userService.getUserById({ userid: user.userid });

    if (result.length) {
      if (result[0].password === user.password) {
        return true;
      }
    }
    return false;
  }
}
module.exports = { UserService, ExamUserService, AuthService };
