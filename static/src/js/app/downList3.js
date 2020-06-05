define(["layui","nicescroll","api","tools"],function(layui,niceScroll,api,tool){
    var GETLIST = '/adminApi/getClassifyData';
    var goods_id = tool.request('goods_id') ? tool.request('goods_id') : "";
   $(".cu-seclect").find('.layui-select-title').click(function(){
         $(".cu-seclect").find('.layui-select-title').removeClass('layui-form-selected');
         $(".cu-seclect").find('.select-main').removeClass('layui-anim-upbit');
         $(".cu-seclect").find('.select-main').css("visibility","hidden");         
         $(this).parent().find('.layui-select-title').addClass('layui-form-selected');
         $(this).parent().find('.select-main').addClass('layui-anim-upbit');
         $(this).parent().find('.select-main').css("visibility","visible");      
          return false;
    })   
   $(document).click(function() {
          hideUi();
   });   
  
  $(".cu-seclect").find('.select-main').click(function(){
         return false;
   })   

   $("#list-scroll").niceScroll({cursorcolor:"#d8d8d8",autohidemode:false}); 
   $("#list-scroll1").niceScroll({cursorcolor:"#ceeaff",autohidemode:false});
   $("#list-scroll2").niceScroll({cursorcolor:"#ceeaff",autohidemode:false}); 

  //渲染第一栏\
		   var levelObject1  = {
		   	   level:1,
		   	   goods_id:goods_id
		   }
      api.ajaxGet(GETLIST,levelObject1,function(res){
   	   var html = "";
   	   var data = res.data;
       $.each(data, function(i, v) {
				html += '<div class="scroll-item" value="' + v.c_id + '">' + v.c_name + '</div>'
	  })   	
	  $("#list-scroll").append(html); 
	  $("#list-scroll").getNiceScroll().onResize(); 
   })
   

    $("#list-scroll").on("click",".scroll-item",function(res){
         var value = $(this).attr("value");
		if(!value){
			 $("#classify_id").val("");
			 $("#classify_name").val("");
			  hideUi();
			 return;
		}
        $(this).addClass('active');
		$(this).siblings().removeClass('active');
        var value = $(this).attr("value");
		var name = $(this).text();		
		$("#classify_id").val(value);
		$("#classify_name").val(name);   		
		var aData = {
			level: 2,
			pid: value,
			goods_id:goods_id
		}
		var url = "/adminApi/getClassifyData";
		api.ajaxGet(url, aData, function(res) {
			var data = res.data;
			var html = "";
			$("#list-scroll2").html("");
	        if(data.length == 0){
				 $("#list-scroll1").html('<div class="scroll-item" style="color:#777777">无数据</div>');
				 return;
			}			
			$.each(data, function(i, v) {
				html += '<div class="scroll-item" value="' + v.c_id + '">' + v.c_name + '</div>'
			})
			$("#list-scroll1").html(html);
			$("#list-scroll1").getNiceScroll().onResize();
			
		})    	
    })
  


	$("#list-scroll1").on("click", ".scroll-item", function() {
		var value = $(this).attr("value");
		if(!value){
			 return;
		}
        var value = $(this).attr("value");
		var name = $(this).text();		
		$("#classify_id").val(value);
		$("#classify_name").val(name); 		
        $(this).addClass('active');
		$(this).siblings().removeClass('active')		
		var aData = {
			level: 3,
			pid: value,
			goods_id:goods_id
		}
		var url = "/adminApi/getClassifyData";
		api.ajaxGet(url, aData, function(res) {
			var data = res.data;
			if(data.length == 0){
				 $("#list-scroll2").html('<div class="scroll-item" style="color:#777777">无数据</div>');
				 return;
			}
			var html = "";
			$.each(data, function(i, v) {
				html += '<div class="scroll-item" value="' + v.c_id + '">' + v.c_name + '</div>'
			})
			$("#list-scroll2").html(html);
            $("#list-scroll2").getNiceScroll().onResize();

		})
	})

  $("#list-scroll2").on("click", ".scroll-item", function() {
		var value = $(this).attr("value");
		var name = $(this).text();
	    if(value){
             $(this).addClass('active');
		      $(this).siblings().removeClass('active') 	    	 
	    	 $("#classify_name").val(name);
	    	 $("#classify_id").val(value);
	    	 hideUi();
	    }
		
	})	

    
	 function hideUi() {
	         $(".cu-seclect").find('.layui-select-title').removeClass('layui-form-selected');
	         $(".cu-seclect").find('.select-main').removeClass('layui-anim-upbit');
	         $(".cu-seclect").find('.select-main').css("visibility","hidden");  	  
	  }   
  var my = {
  	  refresh:function(){
  	  	  $("#list-scroll").getNiceScroll().onResize();
  	  	  $("#list-scroll1").getNiceScroll().onResize();
  	  	  $("#list-scroll2").getNiceScroll().onResize();
  	  }
  }
 
  return my;
})