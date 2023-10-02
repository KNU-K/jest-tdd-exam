// userService.test.js
const {
  ExamUserService,
  AuthService,
} = require("../../services/scenario1.service");
// 데이터베이스 연결을 모킹하는 가짜 모듈
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
    // 여기에서 실제 데이터베이스 연결을 대신하여 가짜 데이터를 반환할 수 있습니다.
    // 이 예제에서는 간단하게 가짜 데이터를 반환합니다.
    if (query === "SELECT * FROM users WHERE userid = ?") {
      const userid = params[0].userid;
      const user = this.userSchema.find((e) => e.userid === userid);
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
let authService;
beforeEach(() => {
  // 각 테스트 케이스 실행 전에 모킹된 데이터베이스 객체를 생성하여 UserService에 주입합니다.
  const database = new MockDatabase();
  examUserService = new ExamUserService(database);
  authService = new AuthService(examUserService);
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
