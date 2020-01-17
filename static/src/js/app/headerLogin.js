define(["tools", "nicescroll", "path", "upLoad", "api","viewPhoto"], function(tool,nicescroll,path,upload,api,viewPhoto) {
  var nav = tool.cookie("nav");
  var navs = JSON.parse(nav);
  if (nav) {
    $.each(navs, function(index, val) {
      if (val == 1) {
        $(".article_nav").find(".model").eq(index).addClass('open')
      };
    });
    $("#article_nav").find(".inner").css("visibility", "visible");
  } else {
    $("#article_nav").find(".inner").css("visibility", "visible");
  }

  $("#content").niceScroll({
    cursorcolor: "#c2c2c2"
  });
  $("#article_nav").niceScroll({
    cursorcolor: "#c2c2c2"
  });
  $(".article_nav").find(".title").click(function() {
    if ($(this).parents(".model").hasClass('active')) {
      return;
    }
    if ($(this).parents(".model").hasClass('open')) {
      $(this).parents(".model").find("ul").slideUp(300, function() {
        $("#article_nav").getNiceScroll().onResize();
        $(this).parents(".model").removeClass('open');
      });

    } else {
      $(this).parents(".model").find("ul").slideDown(300, function() {
        $("#article_nav").getNiceScroll().onResize();
        $(this).parents(".model").addClass('open');
      });
    }
  })

  $(".article_nav").find("a").click(function() {
    var herf = $(this).attr("href");
    // window.location.href = herf;
    var arry = [];
    $(".article_nav").find(".model").each(function(index, el) {
      if ($(el).hasClass('open')) {
        arry.push(1)
      } else {
        arry.push(0)
      }
    });
    tool.cookie("nav", JSON.stringify(arry))
    window.location.href = herf;
    return false
  })



  upload.img("headImgbt", function(parem) {
    var url = '上传接口'
    var aData = {
      img: parem
    }
    // api.ajaxGet(url,aData,function(res){
    //    api.smsg("修改成功")
    // })
    console.log(parem);

  })


  return "wecome"
})