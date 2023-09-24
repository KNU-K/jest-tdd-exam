# What is TDD?

TDD는 Test Driven Development 방식이다.

- 사용 이유

  1. 의도대로 로직 동작을 논리와 명제에 맞게 확인 가능하다.

  2. 여러 케이스를 고려함으로써, 오류를 최소화 할 수 있다.

  3. 아키텍처와 로직이 깔끔해진다.

  4. 대규모 프로젝트 시 안정성을 확보할 수 있다.

# TDD PRACTICE

> mocking를 사용해서 TDD를 진행해보자.

## E2E 테스트

- e2e test

  > end-point to end-point 로 테스트 진행

## 유닛/통합 테스트

- unit test

  > service 모듈에 대한 전반적인 동작 기능 테스트 진행 (DB, 기타 동작 정보 의존성 여부)

- integrate test

  > unit test의 집합

이를 각 시나리오를 분리하여, 시나리오에 맞춰서 테스트를 진행할 예정이다.
