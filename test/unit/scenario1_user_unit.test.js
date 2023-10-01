//BUG: this code is generated exceed timeout
// userService.test.js
const { ExamUserService } = require("../../services/scenario1.service");
// 데이터베이스 연결을 모킹하는 가짜 모듈
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
    // 여기에서 실제 데이터베이스 연결을 대신하여 가짜 데이터를 반환할 수 있습니다.
    // 이 예제에서는 간단하게 가짜 데이터를 반환합니다.
    if (query === "SELECT * FROM users WHERE id = ?") {
      const userid = params[0].userid;
      const user = this.userSchema.find((e) => e.id === userid);
      if (user) {
        return callback(null, [user]); // 수정: 데이터를 배열에 넣어 반환
      } else {
        return callback(null, []); // 사용자가 존재하지 않을 경우 빈 배열 반환
      }
    } else if (query === "SELECT * FROM users") {
      return callback(null, this.userSchema);
    } else {
      return callback(new Error("invalid query"));
    }
  }
}
let examUserService; // UserService 인스턴스

beforeEach(() => {
  // 각 테스트 케이스 실행 전에 모킹된 데이터베이스 객체를 생성하여 UserService에 주입합니다.
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
  // 10초의 실행 시간 제한
});
