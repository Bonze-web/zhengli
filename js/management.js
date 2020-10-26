var userToken = {
    token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjQsInVzZXJOYW1lIjoiMTIzNDU2IiwicHdkIjoiWU9JODF4QUFuT2VFSExUY280dWhMZG12dVZ2TDVLSzRaanBWd1ZzSmp0NUNjTlUyTEExMktOWkdoT3haVi8wNGtLS0tjSWZ1dUtsdzFTNGdnV0Y1NXc9PSIsInR5cGUiOjF9.NrWs2JTiXhN1j9EzKAfsaY3C8yg7G-y5-PSoC80v_FdBuH3jKNLWKsVLKJzM0uOasnmTYW_BLoLZvXqeYKCQvg",
    type: 1,
    userName: "123456"
};

/* 模拟从本地缓存里面取token以及一些身份信息 */
// var tokenJson = localStorage.getItem("requestToken");
// var tokenObj = JSON.parse(tokenJson);
// tokenObj.token;
/* 判断是医生登录还是员工登录 */
// if(tokenObj.type == 1){

// }else{

// }


$(function () {
    var _that = null;
    class Management {
        constructor() {
            _that = this;
            _that.init();
        }

        init() {
            /* 获取病例列表 */
            _that.disposeData({
                type: "POST",
                url: "/caseInfo/getCaseAll",
                async: false,
                data: {
                    "pageNum": 1,
                    "pageSize": 10,
                    "type": 1
                },
                success: function (res) {
                    console.log(res.rows);
                    let caseListArr = [];
                    // [...$("ul li")].forEach
                    res.rows.forEach(item => {
                        caseListArr.push(`<li data-id="${item.caseId}">
                        <div class="case-header">
                            <img src="${item.headUrl&&item.headUrl.startsWith("http")?item.headUrl:"img/default-header.png"}" >
                        </div>
                        <div class="particular">
                            <div class="particular-msg">
                                <p><span>${item.patientName}</span><em class="serial">${item.outerNo}</em></p>
                                <em>${_that.formatTime(item.createTime)}</em>
                                <p><img src="img/state.png"><span>方案设计中</span></p>
                                <p class="remark"><span>备注:</span><em>备注内容示例备注内容示例备注内容示例备注内容示例备注内容示例备注内容示例</em></p>
                            </div>
                            <div class="attention">
                                <img src="img/xin.png">
                            </div>
                        </div>
                    </li>`)
                    });
                    document.querySelector(".case-message ul").innerHTML = caseListArr.join(",");
                }

            })
        }

        /* 封装一个 ajax 请求 */
        disposeData(options) {
            $.ajax({
                type: options.type,
                url: app.apiUrl + options.url + "?t=" + app.random,
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(options.data),
                async: options.async,
                beforeSend: function (xhr) {
                    /* 请求发送之前 将 token 带过去 */
                    xhr.setRequestHeader("Authorization", userToken.token);
                },
                success: function (res) {
                    if (res.code == 200) {
                        var data = JSON.parse(res.data);
                        options.success && options.success(data);
                    } else {
                        //提示
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                },
                error: function (e) {
                    //提示
                    layer.open({
                        content: e.responseJSON.message,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                }
            })
        }

        /* 处理时间格式的方法 ( 将时间戳转换成年月日 ) */
        formatTime(time){
            /* 转换成 */
            let curTime = new Date(time);
            let year = curTime.getFullYear();
            let month = curTime.getMonth() + 1;
            /* 月份小于10拼0的三目运算符 */
            month = month < 10? "0" + month:month;
            let day = curTime.getDate();
            /* 日期小于10拼0的三目运算符 */
            day = day < 10? "0" + day:day;

            let lastTime = year + "/" + month + "/" + day;
            return lastTime;
        }
    }
    new Management();



})