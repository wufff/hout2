require(["headerLogin","layui","upLoad","verify","tags","lookMark"], function(headerLogin,layui,upload,verify,tags,look) {
    var layer = layui.layer;
    var form = layui.form;
    var $ = layui.jquery;
    var dialog;
    var ex_data = [{name:"新的选项",value:"1"},{name:"新的选项内容",value:"2"},{name:"新的目的",value:"3"},{name:"新的目标",value:"4"},{name:"新的撒旦法",value:"5"}];
    upload.img("upIco2");

    $("#btn").click(function(){
         dialog = layer.open({
                type: 1,
                title: "弹窗",
                content: $("#control"),
                area: ["480px", "780px"],
                btn: ["确定", "取消"],
                yes: function() {
                    $("#submitControlBt").click();
                }            
         })
    });


   $("#btn2").click(function(){
         dialog = layer.open({
                type: 1,
                title: "弹窗",
                content: $("#control2"),
                area: ["480px", "780px"],
                btn: ["确定", "取消"],
                success:function(){
                      tags.initData($("#tag_2"),null,ex_data);
                      //两个参数赋值value 三个参数赋值下拉可以再页面初始化在就渲染 这里只做赋值
                },
                yes: function() {
                    $("#submitControlBt2").click();
                }            
         })
    });


    $("#btn_img").click(function(){
        var value = $(this).attr("data-value");     
        look.initData(value) 
    });

    form.on('submit(control)',function(data){
      console.log(data);
      return false;
    });

    form.on('submit(control2)',function(data){//tags
          console.log(data.field);
          return false;
     })  

});