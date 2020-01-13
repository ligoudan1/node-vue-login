const koa = require('koa'); // 引入koa模块
const router = require('koa-router')(); // 引入router并将其实例化
const bodyParser = require('koa-bodyparser'); // 引入koa-bodyparser模块
const render = require('koa-ejs'); // 引入ejs
const static = require('koa-static');
const path = require('path'); // 引入path模块
const baseUrl = require('./config/config'); // 引入设置
const error = require('./common/error'); // 错误处理中间件

let app = new koa();

app.use(error);
app.use(bodyParser());
// 初始化ejs，设置后缀为ejs，文件目录为`template`

render(app, {
    root: path.join(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});

app.context.baseUrl = baseUrl; // 引用设置好的全局设置
app.context.db = require('./lib/database'); // 引用数据库
router.use('/', require("./router/router").routes())
app.use(router.routes()); // 使用路由中间件
app.use(static(path.resolve(__dirname, './public'))); // 使用静态文件中间件

app.listen(3300); // 监听3300端口