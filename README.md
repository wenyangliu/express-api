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

- 安装jsonwebtoken
```$xslt
yarn add jsonwentoken
```
- 安装 formidable (用于上传图片)
```$xslt
yarn add formidable
```
- 解决跨域问题 (在app.js加下面一段代码)
```$xslt
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```
- 安装gm 【图片压缩】 (先安装 GraphicsMagick-1.3.30-Q16-win64-dll 软件)
- 如果有问题可以重启下电脑
```$xslt
yarn add gm
```