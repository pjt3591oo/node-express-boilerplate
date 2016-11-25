# Express Frame
express는 node.js에서 제공하는 프레임워크.
express-genderator를 설치를 통해 express 프로젝트 생성이 가능하다.

아래의 내용은 Mysql 혹은 MariaDB, MongoDb(mongodb모듈을 통해 로우단에서 mongodb를 다룬다.)를 기준으로 디비에 대한 설명을 다룰 것 이다.

## 목차
1. express 프로젝트 시작
2. 생성 된 프로젝트 설명 및 수정
3. 디렉토리 관리
4. 설정파일 관리 및 정적파일 관리
5. 클러스터링 설정
6. DB 관리
7. ORM 및 모델링 방법
8. API 관리


### 1. express 프로젝트 시작

`express-genderator`설치

```
$ npm install -g express-generator
```

express-generator이외의 서버를 실행 시키기 위한 패키지를 받아보자.
- nodemon : 서버 내부의 코드가 바뀌면 서버를 자동으로 재시작 해주는 패키지
- forever : 서버를 백그라운드로 띄어주는 패키지

```
$ npm install -g nodemon
$ npm install -g forever
```

`express` 프로젝트 생성

```
$ express {project_name}
```

project_name이라는 디렉토리가 생성이 된다.

```
$ cd project_name  # 해당 프로젝트로 이동
$ npm install      # 모듈 설치
$ npm install -s mysql # mysql설치(sequelize설치시 필요)
$ npm install -s sequelize # sequelize설치(ORM)
$ npm install -s mongodb # mongodb설치(mongodb connector)
```

### 2. 생성 된 프로젝트 설명 및 수정

#### `original Directory Structure`
- bin
    - www
- public
    - images
    - javascript
    - stylesheets
- routes
    - index.js
    - user.js
- views
    - error.jade
    - index.jade
    - layout.jade
- app.js
- package.json

express를 통해 프로젝트를 생성을 하면 위와 같은 구조로 프로젝트가 생성이 된다. 위의 구조만을 가지고는 프로젝트를 관리하기가 아직은 불편하다.
디비, 각종 설정파일, 라우팅 관리 등이 잘 되어있지 않기 때문에 좀더 수정을 하였다. 수정을 하기 앞서 위의 프로젝트 구조에 대해서 약간의 설명을 해보겠다.

우선 4개의 디렉토리와 2개의 파일이 생성이 된다.
- directory :
    * bin : 실제 서버가 실행
    * public : images, js, css파일과 같은 정적파일 관리
    * routes : 실제 서버 로직이 처리
    * views : html, jade, ejs같은 웹 페이지 관리
- file :
    * app.js : 미들 웨어 설정
    * package.json : 프로젝트 관리

#### `Modified Directory Structure`
- bin
    - www
- config
    - RDB.json
    - MONGO.json
    - AWSconfig.json
- models_mong
    - index.js
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

기존의 프로젝트에서 models와 config디렉토리를 생성을 하였다.

### 3. 디렉토리 관리
잠깐! node.js에서의 모듈을 호출되는 방식에 대해서 설명을 해보겠다.

첫번째로 node.js에서는 c++과 같은 컴파일 언어와 달리 require자체가 해당 파일을 객체로 가지고 오게 된다. 또한 해당 파일 객체를 중첩접으로 호출을 하지 않는다. 즉, `require('module')`을 아무리 많이 해도 module이라는 파일을 한번만 가지고 오게 된다. 이를 잘 명심하는 것이 중요하다.

두번째로 `require`를 할 때 디렉토리를 모듈로 가지고 올 경우 해당 디렉토리 내부에 있는 index.js를 자동으로 가지고 오게 된다. 즉 해당 프로젝트에서 require('models_RDB')를 항경우 models_RDB내부에 있는 index.js를 호출을 하게된다.


### 4. 설정파일 관리 및 각종 리소스 관리
- config :
각종 디비에 연결되는 정보 및 aws에 연결되는 설정 정보는 config내부에 넣도록 한다. 또한 해당 디렉토리는 `.gitignore`에 포함하여 github나 원격 저장소에 올라가지 않도록 관리를 해준다.

- 정적파일 관리 :
javascript, css, image등을 public 내부에서 관리를 해준다.
```.js
app.use(express.static(path.join(__dirname, 'public')));
```

app에서 static경로를 설정하여 다른 파일에서 js, image, css파일을 사용할 때 /을 통해 바로 public내부로 접근이 가능하도록 한다.


### 5. 클러스터링 설정
클러스터링이란 여러개의 서버를 띄어 부하분산을 하는 것이다.
클러스터링은 bin/www에서 해주면 된다.
bin/www를 보면...

```.js
const numCPUs = require('os').cpus().length; // CPU갯수 가져오기
...중략
if (cluster.isMaster) {
    // Fork workers.
    // master 영역
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}else{
    // 실제 서버가 실행되는 영역
    // fork할 경우 해당 로직이 실행된다.(CPU갯수만큼)
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}
...중략
```

`cluster.fork()`를 사용해서 `server.listen(port)` CPU갯수만큼 서버를 띄어주고 있다. 여기서 만약에 서버가 죽었을 때 다시 띄어주고 싶으면 다음과 같이 마스터 영역에 추가해주면 된다.

```.js
cluster.on('exit', ()=>{
        cluster.fork();
})
```

### 6. DB 관리

해당 프로젝트에서는 RDB:mysql, NoSQL:mongodb를 다룬다.
mysql은 orm모듈인 sequelize를 사용하고 있고
mongodb는 연결 커넥터를 통해 직접 디비접속을 다루고 있다.

mysql
---
`modelss_RDB`에서
user.js, play.js와 같은 모델파일들을 만들어 준다.
index.js는 모델들을 객체로 만들어주는 역할을 한다.

index.js는 `config/RDB.json`에 있는 DB 설정 객체를 가지고 온다.

```.js
"use strict";
module.exports = function(sequelize, DataTypes) {
    var play = sequelize.define("play", {
        playName :   DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return play;
};
```

routes/API_V1/rdb.js에서 해당 모델을 사용을 해보자

```.js
const {
        play,
        user
      } = require('../../models_RDB');
```

잘 보면 해당 디렉토리를 객체로 가져오고 있다. 이때 중요한건 해당 디렉토리 index.js파일이 모델파일들을 객체로 가지고 오면서 직접 호출을 하지 않아도 된다. 저기서 `const {model1, model2}`처럼 모델 파일을 만들 때 return 하는 변수명을 그대로 가져다 쓰면 해당 모델을 사용할 수 있게 된다.
만약 모델을 추가 할 때, 모델파일을 만들고 쓰는 곳에서 `const {추가된 모델 return변수 명} = require('models_RDB')`해주면 된다.

mongodb
---
`models-mong`에서 mongodb와 연결 되는 커넥터 객체를 생성 및 객체를 반환을 해준다.

`config/MONGO.json`에 있는 DB 설정 객체를 가지고 온다.

```
const mongodb = require('../models_mong');
const url =require('../config/MONGO.json');

...중략
var server = http.createServer(app);
mongodb.connect(url, function(err){
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});
...중략
```

bin/www에서 서버가 띄어지는 부분을 위처럼 수정을 해주자.

초기에 서버가 생성이 되면 connect를 통해 객체를 생성을 해준다.

```.js
var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}
```

해당 객체의 connect를 호출을 해면 state.db를 생성하게 된다.
이제 get()을 사용하여 해당 객체를 가져와 mongodb를 사용 할 수 있게된다.

routes/API_V1/mongo.js
```.js
...중략
router.get('/',(req, res, next)=>{
    /*
        * mongodb에서 collection불러오기
        * collection은 RDB에서 table의 개념
    */
    mongoConnect.get().collection('');
    res.end('hello world');
});
...중략
```
`get().collection()`으로 해당 collection을 가져올 수 있다.


### 7. ORM 및 모델링 방법
ORM을 사용하게 되면 가장 힘든 부분중 하나가 모델파일을 생성하는 것이다. 만약에 기존에 이미 테이블이 존재하는 것이라면 모델링 파일을 생성하는 것이 굉장히 귀찮아진다.
하지만 이것을 쉽게 해주는 방법이 `sequelize-auto`를 이용하면 이미 존재하는 디비의 테이블들을 파일로 내려받을 수 있다.

설치
```
$ npm install -g sequelize-auto
```

사용방법
```
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models]
```

옵션
```
-h, --host      IP/Hostname for the database.                                      [required]
-d, --database  Database name.                                                     [required]
-u, --user      Username for database.                                             [required]
-x, --pass      Password for database.
-p, --port      Port number for database.
-c, --config    JSON file for sending additional options to the Sequelize object.
-o, --output    What directory to place the models.
-e, --dialect   The dialect/engine that you're using: postgres, mysql, sqlite
```

예시
```
$ sequelize-auto -o "./models" -d database -h localhost -u root -p 3306 -x password -e mysql
```

./models내부에 모델파일들을 생성해준다.

### 8. API 관리
