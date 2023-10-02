# SCENARIO 1

## 로그인 회원가입(non DB)

- [e2e 진행](../../test/e2e/scenario1.test.js)

> 간단한 로그인 회원가입 e2e 테스트 진행

## user service 테스트(using DB, non execute sql)

- [User Unit Test](../../test/unit/scenario1_user_unit.test.js)

- [Auth Unit Test](../../test/unit/scenario1_auth_unit.test.js)

- [integration Test](../../test/integration/scenario1.test.js)

* Mock 기법으로 주입해서 mysql 과 대응되지만, 직접적으로 db를 쓰지않고 test를 진했다.

## user Service 테스트(using DB, sql 까지 (transaction 으로))
