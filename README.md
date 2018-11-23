### Express+Mongoose 测试接口

## 使用 nodemon 热加载

- 全局安装nodemon
```$xslt
npm i nodemon -g
```
- 新增nodemon.json
```$xslt
{
  "restartable": "rs",
  "ignore": [
    ".git",
    ".svn",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "watch": [
    "routes/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js json"
}
```

- 修改package.json
```$xslt
"scripts": {
    "start": "node ./bin/www",
    "auto": "nodemon ./bin/www"
  },
```
