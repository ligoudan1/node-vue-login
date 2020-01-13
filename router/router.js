const router =require('koa-router')(); //引入router并将其实例化
const md5 =require('md5-node');

router.get('/',async (ctx,next) =>{
    await ctx.render('index',{
        BASE_URL:ctx.baseUrl.BASE_URL
    })
})

// 监听登陆请求
router.post('/',async (ctx,next)=>{
    let {userName,pwd} =ctx.request.body;
    pwd = md5(pwd);
    let data = await ctx.db.query(`SELECT user,password FROM admin WHERE user='${userName}' AND password = '${pwd}' limit 1`)
    if (data.length>0) {
        ctx.body="登陆成功！";
    }else {
        ctx.body="登陆失败！"
    }
})

module.exports = router;