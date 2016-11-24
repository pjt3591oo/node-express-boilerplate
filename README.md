# Express Frame
express는 node.js에서 제공하는 프레임워크.
express-genderator를 설치를 통해 express 프로젝트 생성이 가능하다.


## 목차
1. express 프로젝트 시작
2. 생성 된 프로젝트 설명 및 수정
3. 디렉토리 관리
4. 코드 관리
5. DB 관리
6. API 관리
7. 설정파일 관리
8. 리소스 및 기타 관리


### express 프로젝트 시작

`express-genderator`설치

```
$ npm install -g express-genderator
```

`express` 프로젝트 생성

```
$ express {project_name}
```

project_name이라는 디렉토리가 생성이 된다.

```
$ cd project_name  # 해당 프로젝트로 이동
$ npm install      # 모듈 설치
```


# Directory Structure
- bin
    - www
- config
    - RDB.json
- models
    -
- models_RDB
    - index.js
    - play.js
    - user.js
- public
    - images
    - javascript
    - stylesheets
- routes
    - ADMIN
    - API_V1
- views
    -error.jade
    -index.jade
    -layout.jade
- app.js
- package.json
