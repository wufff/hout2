define(['layui'],function(layui){
    var form = layui.form;
    var $  = layui.jquery;
    form.verify({
      num: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[0-9]*[1-9][0-9]*$").test(value)){
          return '请输正整数';
        }
      },
        edit:function(value,item){
        if(value == ""){
          $(item).addClass('border-danger');
          setTimeout(function(){
            $(item).blur();
          },100)
          return '请填写文本框内容';
       }
     },
     user: function(value, item){
        if(value == ""){
          return '用户名不能为空';
        }
      },  
      code: function(value, item){ 
        if(value == ""){
          return '验证码不能为空';
        }
      },            
      pass:function(value,item){
        if(!/^[\S]{6,12}$/.test(value)){
            return '密码必须6到12位，且不能出现空格';
         }          
      },
      phone:function(value,item){
          var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(16[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
          var length = value.length;
          if( !mobile.test(value) || length !== 11){
              return "请输入正确的手机号"
          }
      },
      upFile:function(value,item){
         if(value == ""){ 
            $(item).parents('.upBtn_class').find(".layui-btn").addClass('border-danger');
            return "请上传文件"
         }
      },
      tags:function(value,item){
         if(value == ""){ 
            $(item).parents('.tags-g').find("select").addClass('layui-form-danger');
            return "请完成下拉多选"
         }
      }      
    });


    return {
        phone: function (value) {
            var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(16[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            var length = value.length;
            return mobile.test(value) || length == 11;
        }
    };
});
 // var reg=/^([1-9]\d*|[0]{1,1})$/ 包含0的1到9

// var reg=/^0?$|^([1-9][0-9]*)?$/  正整数包含0
 // var tel = /^[\u2E80-\uFE4F]+$/; /汉字
 // var tel = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;   身份证或者学籍号 15位数字
 // var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(16[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/; 正确的手机号

  // jQuery.validator.addMethod("alnum", function(value, element) {//小写字母、数字
  //               return this.optional(element) || /^[a-z0-9]+$/.test($.trim(value));
  //       }, "请输入4-20个小写字母、数字");
  //       jQuery.validator.addMethod("numCheck", function(value, element) {//数字
  //               var tel = /^[0-9]+$/;
  //               return this.optional(element) || !(tel.test($.trim(value)));
  //       }, "不能为纯数字");
  //       jQuery.validator.addMethod("chcharacter", function(value, element) {//汉字
  //               var tel = /^[\u2E80-\uFE4F]+$/; 
  //               return this.optional(element) || (tel.test($.trim(value)));
  //       }, "请输入汉字");

  //       jQuery.validator.addMethod("idCardsOrStuNo", function(value, element) {//身份证和学籍号检测
  //               var tel = /(^[A-Za-z0-9]{19}$)|(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
  //               return this.optional(element) || (tel.test($.trim(value)));
  //       }, "请格式正确的身份证或者学籍号");

  //       jQuery.validator.addMethod("idCards", function(value, element) { //身份证号检测
  //               var tel = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
  //               return this.optional(element) || (tel.test($.trim(value)));
  //       }, "请格式正确的身份证或者学籍号");
  //       // 手机号码验证
  //       jQuery.validator.addMethod("isMobile", function(value, element) {
  //               var length = value.length;
  //               var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(16[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
  //               return this.optional(element) || (length == 11 && mobile.test(value));
  //       }, "请正确填写您的手机号码"); 
