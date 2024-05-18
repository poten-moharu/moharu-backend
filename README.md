# Moharu Backend

---

## 시작하기


### 1. MySQL 생성하기

먼저, Docker를 사용하여 MySQL 데이터베이스를 설정합니다.

```sh
docker-compose up -d
```

위 명령어를 실행하여 Docker 컨테이너에서 MySQL을 백그라운드 모드로 실행합니다.

### 2. 환경 변수 파일 생성하기

프로젝트 루트 디렉토리에 `.env` 파일을 생성한 후, 다음 내용을 입력합니다:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASS=password
DB_NAME=db
```

### 3. 린트 활성화하기

프로젝트의 코드 스타일과 품질을 확인하고 자동 수정을 위해 다음 명령어를 실행합니다:

```sh
npm run lint
```

### 4. Swagger 정상 작동 여부 확인하기

애플리케이션을 실행한 후, 브라우저에서 다음 URL에 접속하여 Swagger 문서가 정상적으로 작동하는지 확인합니다:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

