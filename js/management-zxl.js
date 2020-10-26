$(function(){
    /* 存放登录页面的token */
    let token = ("login","eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzcsInVzZXJOYW1lIjoicXExNTE1NTE1IiwicHdkIjoiNTNhN2ZiMDhjYTlhYjhiNWU5MTU4YmQ0ZjZmNjQ5NmMiLCJ0eXBlIjoxfQ.17koLWzJFUwLSqLLXjSKQhDr9AOuK-TQDReLCsLfLZa4jXt8_eNzuYE70Yf60hjNY0eOA-QqBn5CY_t97fMt2A");
    /* 记录收货地址列表的数组 */
    let shippingAddress = [];
   
    /* 处理时间戳转为年月日的方法 */
    function timestampToTime(timestamp) {
        var date =new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() +'/';
        
            M = (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1) +'/';
        
            D = date.getDate() +'';
        
            h = date.getHours() +':';
        
            m = date.getMinutes() +':';
        
            s = date.getSeconds();
        
            return Y +M +D;//时分秒可以根据自己的需求加上
        
    }
    /* 病例列表tab切换 */
    app.tab(
        {
            top : ".case-tab-box",
            bottom : ".case-message",
            active : "active",
            callback : function(){},
        }
    )
    /* 病例详情tab切换 */
    app.tab(
        {
            top : ".supplement-tab-top",
            bottom : ".supplement-tab-bottom",
            active : "active",
            callback : function(){},
        }
    )
    /* 设置病例信息模块的高度 */
    let caseMsg = document.querySelector(".case-message");
    let nav = document.querySelector(".nav");
    let searchBox = document.querySelector(".search-box");
    caseMsg.style.maxHeight = window.innerHeight - nav.clientHeight - searchBox.clientHeight + "px";
    /* /设置病例信息模块的高度 */
    /* 获取搜索框 */
    let searchText = document.querySelector(".search-text");
    /* 获取文字盒子 */
    let hint = document.querySelector(".hint-box");
    /* 给搜索框注册聚焦事件 文字盒子隐藏 */
    searchText.onfocus = function(){
        hint.style.display = "none";
    }
    /* 给搜索框注册失焦事件 判断是否为空  文字盒子出现 */
    searchText.onblur = function(){
        if(searchText.value.trim() == ""){
            hint.style.display = "block";
        }
    }
    /* /tab切换 */
    /* 筛选选项 */
    /* 给筛选按钮注册点击事件 筛选区域淡入 选项区域做动画*/
    $(".filtrate").on("click",function(){
        $(".screen-box").fadeIn();
        $(".options-box").css("animation","fadeInRight .5s forwards");
    });
    /* 给筛选区域注册点击事件 筛选区域淡出 选项区域做动画*/
    $(".screen-box").on("click",function(){
        $(".options-box").css("animation","fadeOutRight .5s forwards");
        $(".screen-box").fadeOut();
    })

    /* 给所有的按钮添加点击事件  通过排他思想添加样式 */
    $(".options-box li").on("click",function(){
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
        event.stopPropagation();
    });
    /* 点击重置按钮 清空选中样式 */
    $(".replacement").on("click",function(){
        $(".options-box li").removeClass("active");
        $(this).addClass("active");
    })
    /* 点击确认按钮 返回病例管理 重新渲染病例数据*/
    $(".affirm").on("click",function(){
        $(".options-box").css("animation","fadeOutRight .5s forwards");
        $(".screen-box").fadeOut();
    })
    /* /筛选选项 */
    /* 给每个病例模块注册点击事件 点击病例详情淡入 病例管理淡出 */
    $(".case-message li").on("click",function(){
        $(".case-management").fadeOut();
        $(".case-particulars").fadeIn();
    });
    /* 给返回按钮注册点击事件 点击病例详情淡出 病例管理淡入*/
    $(".backtrack div").on("click",function(){
        $(".case-management").fadeIn();
        $(".case-particulars").fadeOut();
    });
    /* 点击展开按钮 控制展开内容展开收起 */
    let flag = 0;/* 声明一个变量来切换图片 */
    $(".unfold").on("click",function(){
        $(".spread").slideToggle();
        /* 切换图片 */
        if(flag == 0){
            $(".unfold img").attr("src","img/management-jt-s.png");
            flag = 1;
        }else {
            $(".unfold img").attr("src","img/management-jt-x.png");
            flag = 0;
        }
    })
    /* 点击展开按钮 控制展开内容展开收起 */
    let flag1 = 0;/* 声明一个变量来切换图片 */
    $(".unfold1").on("click",function(){
        $(".spread1").slideToggle();
        /* 切换图片 */
        if(flag1 == 0){
            $(".unfold1 img").attr("src","img/management-jt-s.png");
            flag1 = 1;
        }else {
            $(".unfold1 img").attr("src","img/management-jt-x.png");
            flag1 = 0;
        }
    });
    /* 点击编辑按钮 编辑资料页面显示 病例详情页面隐藏*/
    $(".compile-btn").on("click",function(){
        $(".modification-info").fadeIn();
        $(".case-particulars").fadeOut();
    });
    /* 点击返回按钮 编辑资料页面隐藏 病例详情页面显示*/
    $(".backtrack1 div").on("click",function(){
        $(".modification-info").fadeOut();
        $(".case-particulars").fadeIn();
    });
    /* 点击保存按钮  编辑资料页面隐藏 病例详情页面显示*/
    $(".preserve-btn").on("click",function(){
        $(".case-particulars").fadeIn();
        $(".modification-info").fadeOut();
    });
    /* 点击取消按钮  编辑资料页面隐藏 病例详情页面显示*/
    $(".preserve-box .cancel-btn").on("click",function(){
        $(".case-particulars").fadeIn();
        $(".modification-info").fadeOut();
    });
    /* 点击新建病例 新建病例页面显示 病例列表隐藏 */
    $(".new-case").on("click",function(){
        $(".management-box").fadeIn();
        $(".case-management").fadeOut();
    });
    /* 点击病例重启 新建病例页面显示 */
    $("#supplementRestart").on("click",function(){
        location.replace("/management.html?restart=true");
    })
    /* 点击小箭头 选择步数弹层显示 */
    $("#newlyBuildBtn").on("click",function(){
        $("#stepNumber").fadeIn();
    })
    
    /* 返回病例详情页面 */
    $("#subsequentProduction .left-arrow").on("click",function(){
        $(".case-particulars").fadeIn();
        $("#subsequentProduction").fadeOut();
    })
    /* 点击修改 跳转到指定的修改页面 将当前页面的路径作为参数传过去 */
    $("#recompose").on("click",function(){
        let url = location.href + "#productPage";
        location.href = "/center.html?site=" + url;
    });
    
    
    /* 点击保持器按钮  保持器页面显示 */
    $("#supplementMaintain").on("click",function(){
        $("#maintainStart").fadeIn();
        $(".case-particulars").fadeOut();
    })
    /* 点击保持器中的申请发货 新建保持器页面显示 */
    $("#maintainStartBd .text-c").on("click",function(){
        $("#maintainStartBd").fadeOut();
        $("#maintainStartCtrl").fadeIn();
    })
    /* 点击保持器页面中的列表 保持器发货记录页面显示 */
    $("#maintainStartBd .preoperative li").on("click",function(){
        $("#maintainStartBd").fadeOut();
        $("#maintainStartRecords").fadeIn();
    })
    /* 点击保持器发货记录页面中的返回按钮 保持器页面显示 */
    $("#maintainStartRecords .left-arrow").on("click",function(){
        $("#maintainStartBd").fadeIn();
        $("#maintainStartRecords").fadeOut();
    })
    /* 点击新建保持器中的返回按钮 保持器页面显示 */
    $("#maintainStartCtrl .left-arrow").on("click",function(){
        $("#maintainStartBd").fadeIn();
        $("#maintainStartCtrl").fadeOut();
    })
    /* 点击保持器页面中的返回按钮 病例详情显示 */
    $("#maintainStartBd .left-arrow").on("click",function(){
        $("#maintainStart").fadeOut();
        $(".case-particulars").fadeIn();
    })
    /* 给所有弹层的取消按钮注册点击事件 当前弹层隐藏 */
    $(".layer-big .cancel").on("click",function(){
        $(this).parents(".layer-big").fadeOut();
    })
    /* 点击选择类型的小箭头 选择类型弹层显示 */
    $("#innerPreoperative").on("click",function(){
        $("#genres").fadeIn();
    })
    /* 点击选择牙弓的小箭头 选择牙弓弹层显示 */
    $("#innerDentalArch").on("click",function(){
        $("#dentalArch").fadeIn();
    })
    /* 点击设计说明上颌 设计说明上颌弹层显示 */
    $("#employTop").on("click",function(){
        $("#employTopLay").fadeIn();
    })
    /* 点击特殊说明小箭头 特殊说明弹层显示 */
    $("#special").on("click",function(){
        $("#specialLay").fadeIn();
    })
    /* 点击固定舌侧保持器中的小箭头 固定舌侧保持器弹层显示 */
    $("#immobilization").on("click",function(){
        $("#lingualSide").fadeIn();
    })
    /* 给点击的li添加样式 */
    $("#specialLay  li").on("click",function(){
        $(this).toggleClass("active");
    })
    /* 点击特殊说明上的确认 将选择的牙齿编号输出到特殊说明模块上 */
    $("#specialLay .save").on("click",function(){
        let activeNum = document.querySelectorAll("#specialLay .active");
        let activeArr = [];
        for(var i = 0; i < activeNum.length;i++){
            activeArr.push(activeNum[i].querySelector("a").innerText);
        }
        $("#maintainStartCtrl li").children('.elect').text(activeArr.join("、"))
        $("#specialLay").fadeOut();
    });
    /* 点击委托加工单  委托加工单页面显示 */
    $("#schemeWorksheet").on("click",function(){
        $("#consignment").fadeIn();
        $(".case-particulars").fadeOut();
    })
    /* 点击磨牙关系中的小箭头 磨牙关系弹层显示 */
    $("#relationBtnTop").on("click",function(){
        $("#relationLay").fadeIn();
    })
    /* 点击磨牙关系中的小箭头 磨牙关系弹层显示 */
    $("#relationBtnBottom").on("click",function(){
        $("#relationLay").fadeIn();
    })
    /* 点击尖牙关系 尖牙关系弹层显示 */
    $("#canineBtnL").on("click",function(){
        $("#fangsRelationship").fadeIn();
    })
    $("#canineBtnR").on("click",function(){
        $("#fangsRelationship").fadeIn();
    })
    /* 点击错颌中的小箭头 错颌弹层显示 */
    $("#malocclusionBtn").on("click",function(){
        $("#malocclusionLay").fadeIn();
    })
    /* 点击矫治牙列中的小箭头 矫治牙列弹层显示 */
    $("#correctBtn").on("click",function(){
        $("#correctLay").fadeIn();
    })
    /* 点击覆颌模块 覆颌弹层显示 */
    $("#coveringBtn").on("click",function(){
        $("#coveringLay").fadeIn();
    })
    /* 点击覆盖模块 覆盖弹层显示 */
    $("#coverageBtn").on("click",function(){
        $("#coverageLay").fadeIn();
    })
    /* 点击磨牙关系左侧的小箭头  磨牙关系弹层显示 */
    $("#molarBtnL").on("click",function(){
        $("#molarRelationship2").fadeIn();
    })
    /* 点击磨牙关系右侧的小箭头  磨牙关系弹层显示 */
    $("#molarBtnR").on("click",function(){
        $("#molarRelationship2").fadeIn();
    })
    /* 点击尖牙关系右侧的小箭头  尖牙关系弹层显示 */
    $("#cuspidBtnL").on("click",function(){
        $("#molarRelationship").fadeIn();
    })
    /* 点击尖牙牙关系右侧的小箭头  尖牙关系弹层显示 */
    $("#cuspidBtnR").on("click",function(){
        $("#molarRelationship").fadeIn();
    })
    /* 点击后牙反𬌗中的小箭头 后牙锁颌弹层显示 */
    $("#backteethBtn").on("click",function(){
        $("#backteethLay").fadeIn();
    })
    /* 点击中线关系中的小箭头 中线关系弹层显示 */
    $("#centerLineBtnT").on("click",function(){
        $("#centerLineLay").fadeIn();
    })
    $("#centerLineBtnB").on("click",function(){
        $("#centerLineLay").fadeIn();
    })
    /* 点击牙齿间隙中的小箭头 牙齿间隙弹层显示 */
    $("#gapBtn").on("click",function(){
        $("#gapLay").fadeIn();
    })
    /* 磨牙关系排他思想 添加样式 */
    $("#relationLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到磨牙关系中点击的li的内容 */
    $("#relationLay .save").on("click",function(){
        let text = "";
        let text1 = "";
        console.log($("#relationLay ul").eq(1).children(".active").index());
        if($("#relationLay ul").eq(0).children(".active").index() == 0){
            text = "I类";
        }else if($("#relationLay ul").eq(0).children(".active").index() == 1) {
            text = "II类";
        }else if($("#relationLay ul").eq(0).children(".active").index() == 2){
            text = "III类";
        }
        if($("#relationLay ul").eq(1).children(".active").index() == 0){
            text1 = "I类";
        }else if($("#relationLay ul").eq(1).children(".active").index() == 1) {
            text1 = "II类";
        }else if($("#relationLay ul").eq(1).children(".active").index() == 2){
            text1 = "III类";
        }
        $("#relationBtnTop").parents().children("span:nth-of-type(1)").text(text);  
        $("#relationBtnBottom").parents().children("span:nth-of-type(1)").text(text1);  
        $("#relationLay").fadeOut();
    })
    /* 尖牙关系排他思想 添加样式 */
    $("#fangsRelationship ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到尖牙关系中点击的li的内容 */
    $("#fangsRelationship .save").on("click",function(){
        let text = $("#fangsRelationship ul:nth-of-type(1) .active").text();
        let text1 = $("#fangsRelationship ul:nth-of-type(2) .active").text();
        $("#canineBtnL").parent().children("span:nth-of-type(1)").text(text);
        $("#canineBtnR").parent().children("span:nth-of-type(1)").text(text1);
        $("#fangsRelationship").fadeOut();
    })
    /* 错颌类型排他思想 添加样式 */
    $("#malocclusionLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到错颌类型中点击的li的内容 */
    $("#malocclusionLay .save").on("click",function(){
        let text = $("#malocclusionLay ul .active").text();
        $("#malocclusionBtn").parent().children("span:nth-of-type(1)").text(text);
        $("#malocclusionLay").fadeOut();
    })
    /* 矫治牙列排他思想 添加样式 */
    $("#correctLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到矫治牙列中点击的li的内容 */
    $("#correctLay .save").on("click",function(){
        let text = $("#correctLay ul .active").text();
        $("#correctBtn").parent().children("span:nth-of-type(1)").text(text);
        $("#correctLay").fadeOut();
    })
    /* 覆颌排他思想 添加样式 */
    $("#coveringLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到覆颌中点击的li的内容 */
    $("#coveringLay .save").on("click",function(){
        let text = $("#coveringLay ul .active").text();
        $("#coveringBtn").children("span").text(text);
        $("#coveringLay").fadeOut();
    })
    /* 覆盖排他思想 添加样式 */
    $("#coverageLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 获取到覆盖中点击的li的内容 */
    $("#coverageLay .save").on("click",function(){
        let text = $("#coverageLay ul .active").text();
        $("#coverageBtn").children("span").text(text);
        $("#coverageLay").fadeOut();
    })


    /* 磨牙位置关系 开始 */
    /* 左侧上面的按钮点击时 input的value值清空 */
    $("#molarBoxLeft .classify li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#molarBoxLeft .millimeter input").val("");
    })
    /* 左侧input的value值发生改变时 上面的按钮失去选中样式 */
    $("#molarBoxLeft .millimeter input").on("input",function(){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        $(this).parent().siblings().children("input").val("");
        $("#molarBoxLeft .classify li").removeClass("active");
    })
    /* 右侧上面的按钮点击时 input的value值清空 */
    $("#molarBoxRight .classify li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#molarBoxRight .millimeter input").val("");
    })
    /* 右侧input的value值发生改变时 上面的按钮失去选中样式 */
    $("#molarBoxRight .millimeter input").on("input",function(){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        $(this).parent().siblings().children("input").val("");
        $("#molarBoxRight .classify li").removeClass("active");
    })
    /* 获取到磨牙位置关系中点击的li的内容 */
    $("#molarRelationship2 .save").on("click",function(){
        let text = "";
        let text1 = "";
        if(!$("#molarBoxLeft .classify li").is(".active")){
            text = ($("#molarBoxLeft .millimeter .active").text().trim()).substr(0,5) +  $("#molarBoxLeft .millimeter .active").children("input").val() +"mm";
        }else{
            text = $("#molarBoxLeft .classify .active").text();
        }
        if(!$("#molarBoxRight .classify li").is(".active")){
            text1 = ($("#molarBoxRight .millimeter .active").text().trim()).substr(0,5) +  $("#molarBoxRight .millimeter .active").children("input").val() +"mm";
        }else{
            text1 = $("#molarBoxRight .classify .active").text();
        }
        $("#molarBtnL").parent().children("span:nth-of-type(1)").text(text);
        $("#molarBtnR").parent().children("span:nth-of-type(1)").text(text1);
        $("#molarRelationship2").fadeOut();
    })
    /* /磨牙位置关系 结束*/


    /* 尖牙位置关系 开始 */
    $("#canineBoxL .classify li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#canineBoxL .millimeter input").val("");
    })
    /* 左侧input的value值发生改变时 上面的按钮失去选中样式 */
    $("#canineBoxL .millimeter input").on("input",function(){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        $(this).parent().siblings().children("input").val("");
        $("#canineBoxL .classify li").removeClass("active");
    })
    /* 右侧上面的按钮点击时 input的value值清空 */
    $("#canineBoxR .classify li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#canineBoxR .millimeter input").val("");
    })
    /* 右侧input的value值发生改变时 上面的按钮失去选中样式 */
    $("#canineBoxR .millimeter input").on("input",function(){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        $(this).parent().siblings().children("input").val("");
        $("#canineBoxR .classify li").removeClass("active");
    })
    /* 获取到磨牙位置关系中点击的li的内容 */
    $("#molarRelationship .save").on("click",function(){
        let text = "";
        let text1 = "";
        if(!$("#canineBoxL .classify li").is(".active")){
            text = ($("#canineBoxL .millimeter .active").text().trim()).substr(0,5) +  $("#canineBoxL .millimeter .active").children("input").val() +"mm";
        }else{
            text = $("#canineBoxL .classify .active").text();
        }
        if(!$("#canineBoxR .classify li").is(".active")){
            text1 = ($("#canineBoxR .millimeter .active").text().trim()).substr(0,5) +  $("#canineBoxR .millimeter .active").children("input").val() +"mm";
        }else{
            text1 = $("#canineBoxR .classify .active").text();
        }
        $("#cuspidBtnL").parent().children("span:nth-of-type(1)").text(text);
        $("#cuspidBtnR").parent().children("span:nth-of-type(1)").text(text1);
        $("#molarRelationship").fadeOut();
    })
    /* 尖牙位置关系 结束 */
    /* 后牙锁颌 开始*/
    $("#backteethLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    $("#backteethLay .save").on("click",function(){
        let text = $("#backteethLay ul .active").text();
        $("#backteethBtn").parent().children("span:nth-of-type(1)").text(text);
        $("#backteethLay").fadeOut();
    })
    /* 后牙锁颌 结束 */


    /* 中线关系 开始 */
    /* 当前点击的li添加样式 */
    $("#centerLineLay ul li").on("click",function(){
        if($(this).index() == 0){
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            $(this).siblings().children("div").children("input").val("");
        }
    })
    /* 清空未选中input的value值 */
    $("#centerLineLay ul li input").on("input",function(){
        $(this).parents("li").addClass("active");
        $(this).parents("li").siblings().removeClass("active");
        $(this).parents("li").siblings().children("div").children("input").val("");
    })
    /* 将选中内容展示 */
    $("#centerLineLay .save").on("click",function(){
        let text = "";
        let text1 = "";
        if($("#midcourtTop .active").index() > 0){
            text = ($("#midcourtTop .active").text().trim()).substr(0,5) +  $("#midcourtTop  .active").children().children("input").val() +"mm";
        }else {
            text = $("#midcourtTop .active").text();
        }
        if($("#midcourtBottom .active").index() > 0){
            text1 = ($("#midcourtBottom .active").text().trim()).substr(0,5) +  $("#midcourtBottom .active").children().children("input").val() +"mm";
        }else {
            text1 = $("#midcourtBottom .active").text();
        }
        $("#centerLineBtnT").parent().children("span:nth-of-type(1)").text(text);
        $("#centerLineBtnB").parent().children("span:nth-of-type(1)").text(text1);
        $("#centerLineLay").fadeOut();
    })
    /* 中线关系 结束 */
    /* 牙列间隙 开始 */
    $("#gapLay ul li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    $("#gapLay .save").on("click",function(){
        let text = $("#gapLay ul .active").text();
        $("#gapBtn").parent().children("span:nth-of-type(1)").text(text);
        $("#gapLay").fadeOut();
    })
    /* 牙列间隙 结束 */
    /* 点击委托加工单中的取消按钮 病例详情页面显示 清除所有选中 */
    $("#consignment .cancel").on("click",function(){
        $(".diagnose div div span:nth-of-type(1)").text("");
        $("#consignment").fadeOut();
        $(".case-particulars").fadeIn();
    })
    /* 点击委托加工单中的提交按钮 病例详情页面显示*/
    $("#consignment .referring").on("click",function(){
        $("#consignment").fadeOut();
        $(".case-particulars").fadeIn();
    })
    /* 点击委托加工单中的返回按钮 委托加工单页面隐藏 病例详情页面显示 */
    $("#consignment .back").on("click",function(){
        $("#consignment").fadeOut();
        $(".case-particulars").fadeIn();
    })
    /* 点击3D方案按钮 3D方案页面显示 */
    $("#schemePrecept").on("click",function(){
        $("#threeDimensional").fadeIn();
        $(".case-particulars").fadeOut();
    })
    /* 点击3D方案中的返回按钮 3D方案页面隐藏 病例详情页面显示 */
    $("#threeDimensional .back").on("click",function(){
        $("#threeDimensional").fadeOut();
        $(".case-particulars").fadeIn();
    })
    /* 点击治疗概况 治疗概况弹层显示 */
    $("#schemeSurvey").on("click",function(){
        $("#surveyPage").fadeIn();
    })
    /* 点击治疗概况中的关闭按钮 治疗概况弹层隐藏 */
    $("#closeBtn").on("click",function(){
        $("#surveyPage").fadeOut();
    })
    /* 点击患者照片按钮  上传患者照片弹层显示 */
    $("#schemePicture").on("click",function(){
        $("#patientPicture").fadeIn();
    })
    /* 点击上传患者照片中的关闭按钮  上传患者照片弹层隐藏 */
    $("#patientPicture .clear").on("click",function(){
        $("#patientPicture").fadeOut();
    })
    /* 点击X光片 上传X光片弹层显示 */
    $("#schemeRadiography").on("click",function(){
        $("#XlightPage").fadeIn();
    })
    /* 点击上传X光片弹层中的关闭按钮 上传X光片弹层隐藏 */
    $("#XlightPage .clear").on("click",function(){
        $("#XlightPage").fadeOut();
    })
    /* 点击矫治器生产流程按钮  矫治器生产流程弹层显示 */
    $("#additionFlow").on("click",function(){
        $("#annexationPage").fadeIn();
        $("#annexationPage .flow").fadeIn();
    })
    /* 点击矫治器生产流程中的关闭按钮 矫治器生产流程弹层隐藏 */
    $("#annexationPage .flow .divisible").on("click",function(){
        $("#annexationPage").fadeOut();
        $("#annexationPage .flow").fadeOut();
    })
    /* 点击查看印模按钮 查看印模弹层显示 */
    $("#additionScan").on("click",function(){
        $("#annexationPage").fadeIn();
        $("#annexationPage .scan").fadeIn();
    })
    /* 点击查看印模中的关闭按钮  查看印模弹层隐藏 */
    $("#annexationPage .scan .divisible").on("click",function(){
        $("#annexationPage").fadeOut();
        $("#annexationPage .scan").fadeOut();
    })


    /* 附件模板 开始 */
    /* 记录新建附件模板中的上颌数量 */
    let dentalNum = 0;
    /* 记录新建附件模板中的下颌数量 */
    let dentalNum1 = 0;
    /* 获取新建附件模板选择牙弓点击的下标 */
    let dentalIndex = 0;
    /* 点击附件模板 病例详情页面隐藏  附件模板页面显示 通过ajax请求动态创建申请列表*/
    let stateText = "";//记录病例阶段
    let src = "";//记录图片路径
    let attachmentList = [];//申请列表的数据
    let dentalFlag = "";
    $("#supplementAdjunct").on("click",function(){
        $(".case-particulars").fadeOut();
        $("#adjunct").fadeIn();
        $.ajax(
            {
                //请求方式
                type : "POST",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : app.apiUrl +"/attachmentTemplate/attachmentTemplateRecord",
                data: JSON.stringify({
                    caseInfoId: 1143,
                    stageName: 1,
                    stageCount: 1,
                }),
                //请求成功
                
                success : function(result) {
                    if(result.code == 200){
                        attachmentList = JSON.parse(result.data);
                        console.log(attachmentList)
                        let liArr = [];
                        attachmentList.forEach(item => {
                            console.log(item)
                            if(item.state == 2){
                                src = "img/toothed-gear.png"
                                stateText = "生产中"
                            }else if(item.state == 3) {
                                stateText = "已完成";
                                src = "img/face.png";
                            }else if(item.state == 0){
                                src = "img/toothed-gear.png"
                                stateText = "未批准"
                            }else if(item.state == 1){
                                src = "img/toothed-gear.png"
                                stateText = "已批准"
                            }
                            let li =  `<li id=${item.id}>
                                <span>${timestampToTime(item.time)}</span>
                                <span>${item.lower + item.upper}副</span>
                                <div>
                                    <img src=${src} alt=""><span>${stateText}</span>
                                </div>
                            </li>`;
                            liArr.push(li);
                        })
                        $("#adjunct .appliance-list").html(liArr.join(""));
                    }else{
                        layer.open({
                            content:result.msg,
                            skin:"msg",
                            time:2 //2秒自动关闭
                        })
                    }
                    
                },
                beforeSend: function(xhr) {
                    //不携带这个会报错
                    xhr.setRequestHeader("Authorization", token);
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.responseJSON.message);

                }
            }
        );
        
        
    });
    /* 点击附件模板中的申请发货 新建附件模板页面显示 通过ajax请求获取到地址列表*/
    $("#adjunct .text-c").on("click",function(){
        $("#newAttachment").fadeIn();
        $("#adjunct").fadeOut();
        $.ajax({
            //请求方式
            type : "get",
            //请求地址
            url : app.apiUrl + "/deliveryAddress/getAddressList",
            
            //请求成功
            success : function(res) {
                if(res.code == 200){
                    shippingAddress = JSON.parse(res.data);
                    console.log(shippingAddress)
                    // shippingAddress.forEach(item => {})
                    let site = `
                        <div class="site-t">
                            <span class="Sitename">${shippingAddress[0].deliveryName}</span>
                            <span class="phone">${shippingAddress[0].contactNumber}</span>
                        </div>
                        <div class="site-b">
                            <p>
                                ${shippingAddress[0].city} <span>${shippingAddress[0].area}</span>${shippingAddress[0].address}
                            </p>
                        </div>
                    `
                    $("#newAttachment .list-site>div:nth-of-type(1)").html(site);
                }else{
                    layer.open({
                        content:res.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
    })
    /* 给附件模板中列表中的li添加点击事件 */
    $("#adjunct .appliance-list").on("click","li",function(){
        $("#attachmentDelivery").fadeIn();
        $("#adjunct").fadeOut();
        $.ajax({
            //请求方式
            type : "get",
            //请求地址
            url : app.apiUrl + "/attachmentTemplate/details",
            data: {id:this.id},
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    let data = JSON.parse(result.data)
                    let dentalArchType = "双颌";
                    let dentalArchNum = 0;
                    if(data.dentalArch == 1){
                        dentalArchType = "双颌";
                        dentalArchNum = data.lower + data.upper;
                    }else if(data.dentalArch == 2){
                        dentalArchType = "上颌";
                        dentalArchNum = data.lower;
                    }else if(data.dentalArch == 3){
                        dentalArchType = "下颌";
                        dentalArchNum = data.upper;
                    }
                    let designText = ""
                    if(data.attachmentDesigns[0].id == 1){
                        if(data.dentalArch == 3){
                            designText = "患者下颌新印模将被寄出";
                        }else {
                            designText = "患者上颌新印模将被寄出";
                        }
                    }else if(data.attachmentDesigns[0].id == 2){
                        designText =   `${dentalArchType}使用最近的orthoplus方案里最后一步<br/>主动非过矫正矫治步骤`;
                    }else if(data.attachmentDesigns[0].id == 3){
                        designText =   `${dentalArchType}在orthoplus方案里注明一个特定的<br/>矫治步骤号_________`;
                    }else if(data.attachmentDesigns[0].id == 4){
                        designText =   `${dentalArchType}使用上次保持器订单的记录`;
                        
                    }
                    data.address = data.address.split(" ");
                    let rendergraph = `
                        <li class="list-dentalarch">
                            <h3>选择牙弓</h3>
                            <p>${dentalArchType}</p>
                        </li>
                        <li class="list-number">
                            <h3>数量</h3>
                            <p>${dentalArchNum}副</p>
                        </li>
                        <li class="list-explain">
                            <h3>设计说明</h3>
                            <div>
                                <div class="list-explain-t">
                                    <p>${designText}</p>
                                </div>
                                <div class="list-explain-b">
                                    <p>${designText}</p>
                                </div>
                            </div>
                        </li>
                        <li class="list-cause">
                            <h3>原因</h3>
                            <textarea class="text-field" id="text-field">
                            ${data.reason}</textarea>
                        </li>
                        <li class="list-site">
                            <h3>收货地址</h3>
                            <div>
                                <div class="site-t">
                                    <span class="Sitename"> ${data.address[0]}</span>
                                    <span class="phone"> ${data.address[1]}</span>
                                </div>
                                <div class="site-b">
                                    <p>
                                        ${data.address[2]}
                                    </p>
                                </div>
                            </div>
                        </li>
                    `
                    $("#attachmentDelivery .content-fomr").html(rendergraph);
                    $("#attachmentDelivery .right-text").text(stateText)
                }else {
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(111);

            }
        });
    })
    /* 点击附件模板发货记录中的返回按钮返回附件模板 */
    $("#attachmentDelivery .left-arrow").on("click",function(){
        $("#attachmentDelivery").fadeOut();
        $("#adjunct").fadeIn();
    })
    /* 点击新建模板中的返回按钮返回附件模板 */
    $("#newAttachment .left-arrow").on("click",function(){
        $("#newAttachment").fadeOut();
        $("#adjunct").fadeIn();
    })
    /* 点击附件模板中的返回按钮返回病例详情页面 */
    $("#adjunct .left-arrow").on("click",function(){
        $(".case-particulars").fadeIn();
        $("#adjunct").fadeOut();
    })
    /* 选择牙弓 开始*/
    $("#dentalRelationBtn").on("click",function(){
        $("#dentalArch").fadeIn();
        dentalFlag = true;
    })
    $("#dentalArch li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    })
    /* 点击选择牙弓弹层上的保存按钮  选择牙弓弹层隐藏 */
    $("#dentalArch .save").on("click",function(){
        let text = $("#dentalArch .active").text();
        $("#dentalArch").fadeOut();
        /* 获取点击的下标 */
        if(dentalFlag){
            $("#dentalRelationBtn").parent().children("p").text(text);
            dentalIndex = $("#dentalArch .active").index() + 1;
            /* 判断是双颌 下颌还是上颌 开始 */
            if(dentalIndex == 1){
                dentalNum = $("#newAttachment .list-number input").val();
                dentalNum1 = $("#newAttachment .list-number input").val();
            }else if(dentalIndex == 2){
                dentalNum = $("#newAttachment .list-number input").val();
                dentalNum1 = 0;
            }else if(dentalIndex == 3){
                dentalNum = 0;
                dentalNum1 = $("#newAttachment .list-number input").val();
            }
            /* 判断是双颌 下颌还是上颌 结束 */
        }else {
            $("#newMaintenanceStart .list-dentalarch .right-arrow").parent().children("p").text(text);
            dentalIndex = $("#dentalArch .active").index() + 1;
            /* 判断是双颌 下颌还是上颌 开始 */
            if(dentalIndex == 1){
                dentalNum = $("#newAttachment .list-number input").val();
                dentalNum1 = $("#newAttachment .list-number input").val();
            }else if(dentalIndex == 2){
                dentalNum = $("#newAttachment .list-number input").val();
                dentalNum1 = 0;
            }else if(dentalIndex == 3){
                dentalNum = 0;
                dentalNum1 = $("#newAttachment .list-number input").val();
            }
            /* 判断是双颌 下颌还是上颌 结束 */
        }
        
    })
    /* 选择牙弓 结束*/


    /* 设计说明 开始*/
    let maxillaryFlag = 0;//用于判断是上颌模块点击还是下颌模块点击
    /* 点击上颌模块中的小箭头 设计声明弹层显示 */
    $("#maxillaryBtn").on("click",function(){
        $("#employTopLay").fadeIn();
        maxillaryFlag = 0;
    })
    /* 点击下颌模块中的小箭头 设计声明弹层显示 */
    $("#mandibleBtn").on("click",function(){
        $("#employTopLay").fadeIn();
        maxillaryFlag = 1;
    })
    /* 给设计说明弹层中的li添加点击事件 排他思想 */
    $("#employTopLay li").on("click",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).children("div").children("img:nth-of-type(2)").show();
        $(this).siblings().children("div").children("img:nth-of-type(2)").hide();
    })
    /* 点击设计说明弹层中的保存按钮  改变上颌或下颌的文字 */
    $("#employTopLay .save").on("click",function(){
        /* 获取选中的li中的文字 */
        let text = $("#employTopLay .active").children("span").text().trim();
        if(maxillaryFlag == 0){
            $("#maxillaryBtn").parent().children("p").text("上颌" + text);
        }else {
            console.log($("#employTopLay .active").index())
            if($("#employTopLay .active").index() == 0){
                text = text.replace("上","下");
            }
            $("#mandibleBtn").parent().children("p").text("下颌" + text);
        } 
        $("#employTopLay").fadeOut();
        $("#employTopLay li").eq(0).addClass("active").siblings().removeClass("active");
        /* 通过ajax请求将选择的牙弓类型传值服务器 */
        $.ajax({
            //请求方式
            type : "get",
            //请求地址
            data: {
                dentalArch: dentalIndex,
            },
            url : app.apiUrl+"/attachmentTemplate/designExplains",
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    if(dentalIndex == 1){

                    }
                    console.log(result);
                }else {
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    });
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);

            }
        });
    });
    /* 设计说明 结束*/
    
    /* 点击提交按钮 通过ajax请求将数据提交到后台 */
    let checkCensoredWord = new CensoredWord(); //检测敏感词
    $("#newAttachment .submit-btn").on("click",function(){
        let dentalNumT = $("#newAttachment .list-number input").val().trim();
        /* 获取到牙弓的类型 */
        let dentalType = $("#dentalRelationBtn").parent().children("p").text().trim();
        /* 获取到填写的原因 */
        let reason = $("#text-field").val().trim();
        let response = checkCensoredWord.check(reason);
        /* 判断是否填写 开始 */
        if(dentalType == ""){
            layer.open({
                content:"请选择牙弓类型",
                skin:"msg",
                time:2 //2秒自动关闭
            });
            return false;
        }
        if(dentalNumT == ""){
            layer.open({
                content:"请输入数量",
                skin:"msg",
                time:2 //2秒自动关闭
            });
            return false;
        }
        if(reason == ""){
            layer.open({
                content:"请输入原因",
                skin:"msg",
                time:2 //2秒自动关闭
            });
            return false;
        }
        /* 判断是否填写 结束 */
        /* 检测敏感词 开始*/
        
        if(!response.result){
            response.wordList.forEach(item => {
                reason = reason.replace(item,"**");
            })
        }
        /* 检测敏感词 结束*/
        
        /* ajax请求所需的参数 */
        let saveAddress = {
            caseOperationId: 1143,
            caseInfoId: 1143,
            dentalArch: dentalIndex,
            lower: dentalNum,
            upper: dentalNum1,
            addressId: 46,
            stageName: 1,
            stageCount: 1,
            designExplains: [{
                "effective": true,
                "explain": $("#maxillaryBtn").parent().children("p").text(),
                "id": 1,
                "jaw": 0,
            }],
            reason: reason,
        };
        
        /* ajax请求 将填写的数据传到服务器 */
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl+"/attachmentTemplate/createAttachmentTemplate",
            data : JSON.stringify(saveAddress),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    let liArr = [];
                    attachmentList.forEach(item => {
                        console.log(item)
                        if(item.state == 2){
                            src = "img/toothed-gear.png"
                            stateText = "生产中"
                        }else if(item.state == 3) {
                            stateText = "已完成";
                            src = "img/face.png";
                        }else if(item.state == 0){
                            src = "img/toothed-gear.png"
                            stateText = "未批准"
                        }else if(item.state == 1){
                            src = "img/toothed-gear.png"
                            stateText = "已批准"
                        }
                        let li =  `<li id=${item.id}>
                            <span>${timestampToTime(item.time)}</span>
                            <span>${item.lower + item.upper}副</span>
                            <div>
                                <img src=${src} alt=""><span>${stateText}</span>
                            </div>
                        </li>`;
                        liArr.push(li);
                    })
                    $("#adjunct .appliance-list").html(liArr.join(""));
                    $("#newAttachment").fadeOut();
                    $("#adjunct").fadeIn();
                }else {
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
        /* 通过ajax请求再次渲染附件模板的列表 */
        $.ajax(
            {
                //请求方式
                type : "POST",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : app.apiUrl +"/attachmentTemplate/attachmentTemplateRecord",
                data: JSON.stringify({
                    caseInfoId: 1143,
                    stageName: 1,
                    stageCount: 1,
                }),
                //请求成功
                
                success : function(result) {
                    if(result.code == 200){
                        attachmentList = JSON.parse(result.data);
                        console.log(attachmentList)
                        let liArr = [];
                        attachmentList.forEach(item => {
                            console.log(item)
                            if(item.state == 2){
                                src = "img/toothed-gear.png"
                                stateText = "生产中"
                            }else if(item.state == 3) {
                                stateText = "已完成";
                                src = "img/face.png";
                            }else if(item.state == 0){
                                src = "img/toothed-gear.png"
                                stateText = "未批准"
                            }else if(item.state == 1){
                                src = "img/toothed-gear.png"
                                stateText = "已批准"
                            }
                            let li =  `<li id=${item.id}>
                                <span>${timestampToTime(item.time)}</span>
                                <span>${item.lower + item.upper}副</span>
                                <div>
                                    <img src=${src} alt=""><span>${stateText}</span>
                                </div>
                            </li>`;
                            liArr.push(li);
                        })
                        $("#adjunct .appliance-list").html(liArr.join(""));
                        $("#newAttachment").find("input").val("");
                        $("#newAttachment").find("textarea").val("");
                        $("#newAttachment .list-dentalarch").children("p").text("双颌");
                        $("#newAttachment .list-explain").find("p").eq(0).text("上颌使用最近的orthoplus方案里最后一步主动非过矫正矫治步骤");
                        $("#newAttachment .list-explain").find("p").eq(1).text("下颌使用最近的orthoplus方案里最后一步主动非过矫正矫治步骤");
                    }else{
                        layer.open({
                            content:result.msg,
                            skin:"msg",
                            time:2 //2秒自动关闭
                        })
                    }
                    
                },
                beforeSend: function(xhr) {
                    //不携带这个会报错
                    xhr.setRequestHeader("Authorization", token);
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.responseJSON.message);

                }
            }
        );
    })
    $("#newAttachment .cancel-btn").on("click",function(){
        $("#newAttachment").find("input").val("");
        $("#newAttachment").find("textarea").val("");
    })

    /* 附件模板 结束 */


    /* 后续生产 开始 */
    
    
    /* 点击返回病例详情页面 */
    $("#productPage .left-arrow").on("click",function(){
        $("#subsequentProduction").fadeIn();
        $("#productPage").fadeOut();
    })
    /* 点击取消 返回后续生产页面 */
    $("#productPage .cancel").on("click",function(){
        $("#subsequentProduction").fadeIn();
        $("#productPage").fadeOut();
    })
    /* 点击选择步数的小箭头 选择步数弹层显示 */
    $("#newlyBuildBtn1").on("click",function(){
        $("#stepNumber").fadeIn();
        stepFlag = true;
    })
    /* 点击取消按钮  选择步数弹层隐藏 */
    $("#stepNumber .cancel").on("click",function(){
        $("#stepNumber").fadeOut();
    });
    /* 返回后续生产列表 */
    $("#deliverGoods .left-arrow").on("click",function(){
        $("#deliverGoods").fadeOut();
        $("#subsequentProduction").fadeIn();
    })
    /* 点击后续生产 后续页面显示 */
    let productionText = "";
    $("#supplementFollowUp").on("click",function(){
        /* 通过ajax请求 动态渲染后续生产记录列表 */
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl + "/production/deliverGoodsRecord",
            //数据，json字符串
            data : JSON.stringify({
                caseInfoId: 1143,
                stageName: "病例阶段22222",
                stageCount: 1,
            }),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    production = JSON.parse(result.data);
                    let liArr = [];
                    production.forEach(item => {
                        if(item.productionState == 2){
                            src = "img/toothed-gear.png"
                            productionText = "生产中"
                        }else if(item.productionState == 3) {
                            productionText = "已完成";
                            src = "img/face.png";
                        }else if(item.productionState == 0){
                            src = "img/toothed-gear.png"
                            productionText = "未批准"
                        }else if(item.productionState == 1){
                            src = "img/toothed-gear.png"
                            productionText = "已批准"
                        }
                        let li =  `<li id=${item.id}>
                            <span>${timestampToTime(item.createTime)}</span>
                            <span>${item.upperStart + item.upperEnd}副</span>
                            <div>
                                <img src=${src}><span>${productionText}</span>
                            </div>
                        </li>`;
                        liArr.push(li);
                    })
                    $("#subsequentProduction .appliance-list").html(liArr.join(""));
                    $("#subsequentProduction").fadeIn();
                    $(".case-particulars").fadeOut();
                }else{
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }

        })
        
    })
      
    /* 点击后续生产中的申请发货 */
    let frontStep = 0;//记录开始的步数
    let belowStep = 0;//记录结束的步数
    let stepFlag = true; // 用于判断是从哪里点进来选择步数
    /* 点击选择步数弹窗的保存按钮 获取到填写的步数 */
    $("#stepNumber .save").on("click",function(){
        if($("#stepNumber input").eq(0).val() > $("#stepNumber input").eq(1).val()){
            layer.open({
                content: "请输入正确的步数",
                skin:"msg",
                time:2 //2秒自动关闭
            })
            return false;
        }
        frontStep = $("#stepNumber input").eq(0).val();
        belowStep = $("#stepNumber input").eq(1).val();
        if(stepFlag){
            $("#productPage .steps span:nth-of-type(2)").text(`${frontStep}-${belowStep}步`);
        }else {
            $("#newMaintenanceStart .list-step>p").text(`${frontStep}-${belowStep}步`);
        }
        $("#stepNumber").fadeOut();
    })
    /* 点击后续生产中的保存 通过ajax请求提交填写的数据到后台 并且重新渲染后续生产中数据列表*/
    $("#productPage .submit").on("click",function(){
        let remarks = $("#productPage .remarks").val().trim();
        let steps = $("#productPage .steps span:nth-of-type(2)").text().trim();
        /* 判断是否填写步数 */
        if(steps == ""){
            layer.open({
                content: "请输入步数",
                skin:"msg",
                time:2 //2秒自动关闭
            })
            return false;
        }
        /* 判断是否填写备注 */
        if(remarks == ""){
            layer.open({
                content: "请输入备注",
                skin:"msg",
                time:2 //2秒自动关闭
            })
            return false;
        }
        /* 将填写的数据存到对象中 */
        productionData = {
            addressId: shippingAddress[0],
            caseInfoId: 1143,
            caseStageId: 1,
            lowerEnd: belowStep,
            lowerStart: frontStep,
            remark: remarks,
            stageCount: 1,
            stageName: "病例阶段22222",
            upperEnd: belowStep,
            upperStart: frontStep
        }
        /* 点击后续生产保存  提交数据到后台 */
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl+"/production/deliverGoodsApply",
            data : JSON.stringify(productionData),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    console.log(result);
                }else {
                    layer.open({
                        content: result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
        /* 点击保存重新渲染后续生产的列表 */
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl + "/production/deliverGoodsRecord",
            //数据，json字符串
            data : JSON.stringify({
                caseInfoId: 1143,
                stageName: "病例阶段22222",
                stageCount: 1,
            }),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    production = JSON.parse(result.data);
                    console.log(production)
                    let liArr = [];
                    production.forEach(item => {
                        console.log(item)
                        if(item.productionState == 2){
                            src = "img/toothed-gear.png"
                            productionText = "生产中"
                        }else if(item.productionState == 3) {
                            productionText = "已完成";
                            src = "img/face.png";
                        }else if(item.productionState == 0){
                            src = "img/toothed-gear.png"
                            productionText = "未批准"
                        }else if(item.productionState == 1){
                            src = "img/toothed-gear.png"
                            productionText = "已批准"
                        }
                        let li =  `<li id=${item.id}>
                            <span>${timestampToTime(item.createTime)}</span>
                            <span>${item.upperStart + item.upperEnd}副</span>
                            <div>
                                <img src=${src}><span>${productionText}</span>
                            </div>
                        </li>`;
                        liArr.push(li);
                    })
                    $("#subsequentProduction .appliance-list").html(liArr.join(""));
                    $("#productPage").fadeOut();
                    $("#subsequentProduction").fadeIn();
                    $("#productPage .steps span:nth-of-type(2)").text("");
                    $("#productPage .remarks").val("");
                    $("#stepNumber input").val("");
                }else{
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }

        })
    })
    /* 点击后续生产 通过ajax请求获取到地址列表*/
    $("#subsequentProductionBtn").on("click",function(){
        $.ajax({
            //请求方式
            type : "get",
            //请求地址
            url : app.apiUrl + "/deliveryAddress/getAddressList",
            //请求成功
            success : function(res) {
                if(res.code == 200){
                    let productionSite = JSON.parse(res.data);
                    console.log(productionSite)
                    let site = `
                        <div class="contact">
                            <span class="name">${productionSite[0].deliveryName}</span>
                            <span class="number">${productionSite[0].contactNumber}</span>
                        </div>
                        <div class="detailed-address">
                            <span>${productionSite[0].city} ${productionSite[0].area}  ${productionSite[0].address}</span>
                        </div>
                    `
                    $("#productPage .address .information>div:nth-of-type(1)").html(site);
                    $("#productPage").fadeIn();
                    $("#subsequentProduction").fadeOut();

                }else{
                    layer.open({
                        content:res.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
    })
    /* 点击后续生产列表  后续生产发货记录页面显示 通过ajax请求获取到当前点击病例的具体信息 */
    let productionData = "";//记录后续生产的详情数据
    $("#subsequentList").on("click","li",function(){
        $.ajax({
            //请求方式
            type : "get",
            //请求地址
            url : app.apiUrl + "/production/details",
            data: {"id":this.id},
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    
                    productionData = JSON.parse(result.data);
                    console.log(productionData)
                    let addressArr = productionData.address.split(" ");
                    let productionState = productionData.productionState;
                    let productionHint = "";  
                    let productionSrc =  "";
                    if(productionState == 2){
                        productionSrc = "img/toothed-gear.png"
                        productionHint = "生产中"
                    }else if(productionState == 3) {
                        productionHint = "已完成";
                        productionSrc = "img/face.png";
                    }else if(productionState == 0){
                        productionSrc = "img/toothed-gear.png";
                        productionHint = "未批准";
                    }else if(productionState == 1){
                        productionSrc = "img/toothed-gear.png";
                        productionHint = "已批准";
                    }
                    let productionDom = `
                        <li class="steps">
                            <span>
                                <p>选择步数</p>
                            </span>
                            <span>${productionData.lowerStart}-${productionData.lowerEnd}步</span>
                        </li>
                        <li class="remarksbox">
                            <span>
                                <p>备注</p>
                            </span>
                            <div class="remarks">${productionData.remark}</div>
                        </li>
                        <li class="address address1">
                            <span class="receiving-goods">
                                <p>收货地址</p>
                            </span>
                            <div class="information">
                                <div class="contact">
                                    <span class="name">${addressArr[0]}</span>
                                    <span class="number">${addressArr[1]}</span>
                                </div>
                                <div class="detailed-address">
                                    <span>${addressArr[2]}</span>
                                </div>
                            </div>
                        </li>
                    `
                    $("#deliverGoods .newly-build").html(productionDom);
                    $("#deliverGoods .right-text").text(productionHint);
                    $("#deliverGoods").fadeIn();
                    $("#subsequentProduction").fadeOut();
                }else {
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
    })
    /* 后续生产 结束 */


    /* 备用矫治器 开始 */
    /* 点击保质矫治器 保质矫治器页面显示 通过ajax请求动态渲染保质矫治器列表*/
    let standby = "";
    $("#supplementCorrect").on("click",function(){
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl + "/applianceReplace/protectiveApplianceRecord",
            //数据，json字符串
            data : JSON.stringify({
                caseInfoId: 1143,
                stageName: "病例阶段22222",
                stageCount: 1,
            }),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    standby = JSON.parse(result.data);
                    console.log(standby)
                    let liArr = [];
                    // standby.forEach(item => {
                    //     if(item.productionState == 2){
                    //         src = "img/toothed-gear.png"
                    //         productionText = "生产中"
                    //     }else if(item.productionState == 3) {
                    //         productionText = "已完成";
                    //         src = "img/face.png";
                    //     }else if(item.productionState == 0){
                    //         src = "img/toothed-gear.png"
                    //         productionText = "未批准"
                    //     }else if(item.productionState == 1){
                    //         src = "img/toothed-gear.png"
                    //         productionText = "已批准"
                    //     }
                    //     let li =  `<li id=${item.id}>
                    //         <span>${timestampToTime(item.createTime)}</span>
                    //         <span>${item.upperStart + item.upperEnd}副</span>
                    //         <div>
                    //             <img src=${src}><span>${productionText}</span>
                    //         </div>
                    //     </li>`;
                    //     liArr.push(li);
                    // })
                    $("#subsequentProduction .appliance-list").html(liArr.join(""));
                    $("#maintenanceStart").fadeIn();
                    $(".case-particulars").fadeOut();
                }else{
                    layer.open({
                        content:result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
                
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }

        })
    })
    /* 点击保质矫治器中的申请发货按钮 新建保质矫治器页面显示 */
    $("#maintenanceStart .text-c").on("click",function(){
        $("#newMaintenanceStart").fadeIn();
        $("#maintenanceStart").fadeOut();
    })
    /* 点击保质矫治器中的数据列表 保质矫治器发货记录显示 */
    $("#maintenanceStart .appliance-list").on("click",function(){
        $("#maintenanceDeliver").fadeIn();
        $("#maintenanceStart").fadeOut();
    });
    /* 点击选择牙弓的小箭头 选择牙弓弹层显示 */
    $("#newMaintenanceStart .list-dentalarch .right-arrow").on("click",function(){
        $("#dentalArch").fadeIn();
        dentalFlag = false;
    })
    /* 点击选择步数的小箭头 选择步数弹层显示 */
    $("#newMaintenanceStart .list-step .right-arrow").on("click",function(){
        $("#stepNumber").fadeIn();
        stepFlag = false;
    })
    /* 点击保质矫治器发货记录中的返回按钮 保质矫治器页面显示 */
    $("#maintenanceDeliver .left-arrow").on("click",function(){
        $("#maintenanceDeliver").fadeOut();
        $("#maintenanceStart").fadeIn();
    })
    /* 点击新建保质矫治器中的返回按钮 保质矫治器页面显示 */
    $("#newMaintenanceStart .left-arrow").on("click",function(){
        $("#newMaintenanceStart").fadeOut();
        $("#maintenanceStart").fadeIn();
    })
    /* 点击新建保质矫治器中的取消按钮 保质矫治器页面显示 */
    $("#newMaintenanceStart .cancel-btn").on("click",function(){
        $("#newMaintenanceStart").fadeOut();
        $("#maintenanceStart").fadeIn();
    })
    /* 点击新建保质矫治器中的保存按钮 保质矫治器页面显示 */
    let maintainData = "";//存放新建保质器填写的数据
    $("#newMaintenanceStart .submit-btn").on("click",function(){
        let maintenanceNum = $("#newMaintenanceStart .list-number input").val();
        let maintenanceCause = $("#newMaintenanceStart .list-cause textarea").val();
        if($("#newMaintenanceStart .list-number input").val().trim() == ""){
            layer.open({
                content: "请输入数量",
                skin:"msg",
                time:2 //2秒自动关闭
            })
            return false;
        }
        if($("#newMaintenanceStart .list-cause textarea").val().trim() == ""){
            layer.open({
                content: "请输入原因",
                skin:"msg",
                time:2 //2秒自动关闭
            })
            return false;
        }
        maintainData = {
            CaseStageId: 1,
            caseInfoId: 1143,
            stageName: "病例阶段22222",
            stageCount: 1,
            dentalArch: dentalIndex,
            upperStart: frontStep,
            upperEnd: belowStep,
            addressId: shippingAddress[0],
            lowerEnd: belowStep,
            lowerStart: frontStep,
            remark: maintenanceCause,
        }
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : app.apiUrl+"/applianceReplace/createProtectiveAppliance",
            data : JSON.stringify(maintainData),
            //请求成功
            success : function(result) {
                if(result.code == 200){
                    console.log(result);
                    // $("#newMaintenanceStart").fadeOut();
                    // $("#maintenanceStart").fadeIn();
                }else {
                    layer.open({
                        content: result.msg,
                        skin:"msg",
                        time:2 //2秒自动关闭
                    })
                }
            },
            beforeSend: function(xhr) {
                //不携带这个会报错
                xhr.setRequestHeader("Authorization", token);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.responseJSON.message);
            }
        });
    })
    /* 点击保质矫治器中的返回按钮 保质矫治器页面隐藏 病例详情页面显示 */
    $("#maintenanceStart .left-arrow").on("click",function(){
        $("#maintenanceStart").fadeOut();
        $(".case-particulars").fadeIn();
    })

    /* 备用矫治器 结束 */
})