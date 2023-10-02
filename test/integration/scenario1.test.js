// userService.test.js
const {
  ExamUserService,
  AuthService,
} = require("../../services/scenario1.service");
// �����ͺ��̽� ������ ��ŷ�ϴ� ��¥ ���
class MockDatabase {
  constructor() {
    this.userSchema = [
      { id: 1, userid: "John", password: "1234" },
      { id: 2, userid: "Kim", password: "1234" },
      { id: 3, userid: "Ahn", password: "1234" },
    ];
    this.data = {};
  }

  async query(query, params = undefined, callback) {
    // ���⿡�� ���� �����ͺ��̽� ������ ����Ͽ� ��¥ �����͸� ��ȯ�� �� �ֽ��ϴ�.
    // �� ���������� �����ϰ� ��¥ �����͸� ��ȯ�մϴ�.
    if (query === "SELECT * FROM users WHERE userid = ?") {
      const userid = params[0].userid;
      const user = this.userSchema.find((e) => e.userid === userid);
      if (user) {
        return callback(null, [user]); // ����: �����͸� �迭�� �־� ��ȯ
      } else {
        return callback(null, []); // ����ڰ� �������� ���� ��� �� �迭 ��ȯ
      }
    } else if (query === "SELECT * FROM users") {
      return callback(null, this.userSchema);
    } else {
      return callback(new Error("invalid query"));
    }
  }
}
let examUserService; // UserService �ν��Ͻ�
let authService;
beforeEach(() => {
  // �� �׽�Ʈ ���̽� ���� ���� ��ŷ�� �����ͺ��̽� ��ü�� �����Ͽ� UserService�� �����մϴ�.
  const database = new MockDatabase();
  examUserService = new ExamUserService(database);
  authService = new AuthService(examUserService);
});

describe("UserService", () => {
  test("getUsers should return all users", async () => {
    const users = await examUserService.getUsers();
    expect(users).toEqual([
      { id: 1, userid: "John", password: "1234" },
      { id: 2, userid: "Kim", password: "1234" },
      { id: 3, userid: "Ahn", password: "1234" },
    ]);
  });
  test("getUserById should return a user if the user exists", async () => {
    const user = await examUserService.getUserById({ userid: "John" });
    expect(user).toEqual([{ id: 1, userid: "John", password: "1234" }]);
  });

  test("getUserById should return an empty array if the user does not exist", async () => {
    const user = await examUserService.getUserById({ userid: "asd" });
    expect(user).toEqual([]);
  });
  // 10���� ���� �ð� ����
});

describe("test authService test", () => {
  test("succeed authenticate User", async () => {
    const isAuthenticateUser = await authService.authenticateUser({
      userid: "John",
      password: "1234",
    });
    expect(isAuthenticateUser).toBe(true);
  });

  test("userid fail", async () => {
    const isAuthenticateUser = await authService.authenticateUser({
      userid: "Joh",
      password: "1234",
    });
    expect(isAuthenticateUser).toBe(false);
  });
  test("userpw fail", async () => {
    const isAuthenticateUser = await authService.authenticateUser({
      userid: "John",
      password: "124",
    });
    expect(isAuthenticateUser).toBe(false);
  });
});
