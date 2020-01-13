// 错误捕捉中间件
const error = async (ctx,next)=>{
    try {
        // 如果没有出错，则直接next();
        await next()
    } catch (error) {
        ctx.body={
            'static':500,
            'error':error
        }
    }
}

//暴露错误捕捉中间件出去
module.exports = error;