//test
const request = require("supertest");
const app = require("../../scenario1");

describe("register", () => {
  it("exist 유저 구분(중복)", async () => {
    const response = await request(app).post("/register").send({
      userid: "cake16290",
      userpw: "1234",
    });
    expect(response.status).toBe(403);
    expect(response.text).toBe("fail");
  });

  it("유저 register 성공", async () => {
    const sendUserData = {
      userid: "cake16290000",
      userpw: "1234567889",
    };

    expect(isValidID(sendUserData.userid)).toEqual(true);
    expect(isValidPW(sendUserData.userpw)).toEqual(true);

    const response = await request(app).post("/register").send(sendUserData);
    expect(response.status).toBe(200);
    expect(response.text).toBe("succeed");
  });
});

describe("login", () => {
  it("아이디 틀렸을 떄", async () => {
    const sendUserData = {
      userid: "cake1629",
      userpw: "1234",
    };
    const response = await request(app).post("/login").send(sendUserData);
    expect(response.status).toBe(403);
    expect(response.text).toBe("id fail");
  });

  it("비밀번호 틀렸을 때", async () => {
    const sendUserData = {
      userid: "cake16290",
      userpw: "123444",
    };

    const response = await request(app).post("/login").send(sendUserData);
    expect(response.status).toBe(403);
    expect(response.text).toBe("pw fail");
  });
  it("로그인 성공했을 때", async () => {
    const sendUserData = {
      userid: "cake16290",
      userpw: "1234",
    };

    const response = await request(app).post("/login").send(sendUserData);
    expect(response.status).toBe(200);
    expect(response.text).toBe("succeed");
  });
});

function isValidID(userid) {
  const idPattern = /^[a-z0-9]{6,}$/;
  return idPattern.test(userid);
}
function isValidPW(userpw) {
  const idPattern = /^[a-z0-9]{6,}$/;
  return idPattern.test(userpw);
}
