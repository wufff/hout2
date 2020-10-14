require(["jquery", "api"], function($, api) {
  $("#loginBt").click(function() {
    var user_name = $("#mobile").val();
    var user_pwd = $("#code").val();
    if (!user_name) {
      layer.msg("请输入用户名");
      return false;
    }
    if (!user_pwd) {
      layer.msg("请输入密码")
      return false;
    }
    var URL = '/adminApi/login';
    api.ajaxPost(URL, {
      username: user_name,
      password: user_pwd
    }, function(res) {
      api.smsg("登录成功！")
    });
    return false;
  })

});
