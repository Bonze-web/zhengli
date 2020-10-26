/* 登录首页tab切换 */
app.tab(
    {
        top : "#login ul",
        bottom : ".login-tab-inner",
        active : "active",
        callback : function(){},
    }
)
/* 登录首页tab切换 */

/* 忘记密码账户tab切换 */
app.tab(
    {
        top : "#forget ul",
        bottom : ".new-tab-inner",
        active : "active",
        callback : function(){},
    }
)
/* 忘记密码账户tab切换 */

/* 忘记密码账户结果tab切换 */
app.tab(
    {
        top : "#forgetRes ul",
        bottom : ".forget-tab-inner",
        active : "active",
        callback : function(){},
    }
)
/* 忘记密码账户结果tab切换 */


/* 忘记密码账户tab切换 */

/* 点击登录 显示病例列表页 */
$(".login-btn").on("click",function(){
    location.replace("/management.html");
})