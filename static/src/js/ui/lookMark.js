/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-11-08 15:11:16
 * @version $Id$
 */
 define(["layui"], function(layui) {
 	 var $ = layui.jquery;
	 var lookMark = $("#lookMark");
 	 var current = lookMark.find("#current");
 	 var total = lookMark.find("#total");
 	 var bars = lookMark.find(".bar");
 	 var pre = lookMark.find(".left_bar");
 	 var next = lookMark.find(".right_bar");
 	 var rotate =  lookMark.find(".rotate");
 	 var layer = layui.layer;
     var me = {
        lib:[],
        bar:function(){
             next.click(function(){
             	  console.log(me.lib.length);
                 if(current.text() < me.lib.length){
			         var number  = Number(current.text())+1;
			         var thisImgBox = $("#lookMark .imgBox");
			         current.text(number);
					 thisImgBox.hide();
					 thisImgBox.eq(number-1).show();
			     }
             });
              pre.click(function(){
			    if(current.text() > 1) {
				  var number  = Number(current.text())-1;
				  var thisImgBox = $("#lookMark .imgBox");
				  current.text(number);
				  thisImgBox.hide();
				  thisImgBox.eq(number-1).show();
			    }
           });
			rotate.click(function(){
			      var number = Number(current.text());
			      var ele = $("#lookMark .imgBox").eq(number-1);
			      var bl = ele.hasClass('role');
			      if(!bl){
			         ele.addClass('role');
			      }else{
			         ele.removeClass('role');              
                }
            })
        },
        initUi:function(){
          me.bar();
        },
        initData:function(data){
            me.lib = data.split(",");
            current.text(1);
            total.text(me.lib.length);
            if(me.lib.length === 1){
            	bars.hide();
            }else{
            	bars.show();
            }
            var html = "";
            $.each(me.lib, function(i, v) {
	           if(i === 0){
	              html += '<div style="background-image:url('+ v +');" class="imgBox"></div>'
	           }else{
	              html += '<div style="background-image:url('+ v +'); display:none;" class="imgBox"></div>'
	           }
	        });
            lookMark.find("#mainImg").html(html);
	       	layer.open({
              type:1,
              title:null,
              content:$('#lookMark'),
              area:["570px","570px"]
           }) 
        }
      };
     me.initUi();
 	 return  me;
 });


  
