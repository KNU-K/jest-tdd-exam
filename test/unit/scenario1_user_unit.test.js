//BUG: this code is generated exceed timeout
// userService.test.js
const { ExamUserService } = require("../../services/scenario1.service");
// �����ͺ��̽� ������ ��ŷ�ϴ� ��¥ ���
class MockDatabase {
  constructor() {
    this.userSchema = [
      { id: 1, name: "John" },
      { id: 2, name: "Kim" },
      { id: 3, name: "Ahn" },
    ];
    this.data = {};
  }

  async query(query, params, callback) {
    // ���⿡�� ���� �����ͺ��̽� ������ ����Ͽ� ��¥ �����͸� ��ȯ�� �� �ֽ��ϴ�.
    // �� ���������� �����ϰ� ��¥ �����͸� ��ȯ�մϴ�.
    if (query === "SELECT * FROM users WHERE id = ?") {
      const userid = params[0].userid;
      const user = this.userSchema.find((e) => e.id === userid);
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

beforeEach(() => {
  // �� �׽�Ʈ ���̽� ���� ���� ��ŷ�� �����ͺ��̽� ��ü�� �����Ͽ� UserService�� �����մϴ�.
  const database = new MockDatabase();
  examUserService = new ExamUserService(database);
});

describe("UserService", () => {
  test("getUsers should return all users", async () => {
    const users = await examUserService.getUsers();
    expect(users).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Kim" },
      { id: 3, name: "Ahn" },
    ]);
  }, 90000);
  test("getUserById should return a user if the user exists", async () => {
    const user = await examUserService.getUserById({ userid: 1 });
    expect(user).toEqual([{ id: 1, name: "John" }]);
  });

  test("getUserById should return an empty array if the user does not exist", async () => {
    const user = await examUserService.getUserById({ userid: 4 });
    expect(user).toEqual([]);
  });
  // 10���� ���� �ð� ����
});
