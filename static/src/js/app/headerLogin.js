/**
 *
 * @authors Your Name (you@example.org)
 * @date    2019-02-22 15:01:00
 * @version $Id$
 */
define(["tools","nicescroll","path","viewPhoto"],function(tool,nicescroll,path,viewPhoto){
  var nowScroll = window.sessionStorage.getItem("scroll") ? window.sessionStorage.getItem("scroll") : 0;
  window.sessionStorage.setItem("scroll","0");
  var nav = tool.cookie("nav");
  var navs = JSON.parse(nav);
  if(nav){
    $.each(navs,function(index, val) {
      if (val == 1) {
        $(".article_nav").find(".model").eq(index).addClass('open')
      };
    });
    $("#article_nav").find(".inner").css("visibility","visible");
  }else{
    $("#article_nav").find(".inner").css("visibility","visible");
  }
  $("#article_nav").niceScroll({cursorcolor: "#424242"});

  if($("#content").length > 0){
    $("#content").niceScroll({cursorcolor:"#c2c2c2"});
    // console.log($("#content").getNiceScroll(0).doScrollTop);
    $("#content").getNiceScroll(0).doScrollTop(nowScroll,0);
    setTimeout(function () {
      $("#content").css("visibility","visible");
    },100);
  }

  $(".article_nav").find(".title").click(function(){
    if($(this).parents(".model").hasClass('active')){
      return;
    }
    if($(this).parents(".model").hasClass('open')){
      $(this).parents(".model").find("ul").slideUp(300,function(){
        $("#article_nav").getNiceScroll().onResize();
        $(this).parents(".model").removeClass('open');
      });

    }else{
      $(this).parents(".model").find("ul").slideDown(300,function(){
        $("#article_nav").getNiceScroll().onResize();
        $(this).parents(".model").addClass('open');
      });
    }
  });


  $(".article_nav").find("a").click(function(){
    var herf  = $(this).attr("href");
    // window.location.href = herf;
    var arry = [];
    $(".article_nav").find(".model").each(function(index, el) {
      if($(el).hasClass('open')){
        arry.push(1)
      }else{
        arry.push(0)
      }
    });
    tool.cookie("nav",JSON.stringify(arry));
    window.location.href = herf;
    return false
  });


  var obj = {
    resh:function () {
      if($("#content").length > 0){
        var scrollTop = $("#content").getNiceScroll()[0].getScrollTop();
        window.sessionStorage.setItem("scroll",scrollTop);
      }
      setTimeout(function () {
        window.location.reload();
      },400)
    }
  };

  return obj;
});
