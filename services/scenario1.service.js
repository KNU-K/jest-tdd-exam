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
        "SELECT * FROM users WHERE id = ?",
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

module.exports = { UserService, ExamUserService };
