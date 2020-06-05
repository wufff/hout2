define(["layui"],function(layui){
  var $ = jQuery = layui.jquery;
  var form = layui.form;
  var me = {
  	  select:function(){
  	  	 form.on('select(tag)', function(data){
           if(data.value){
             var text = $(data.elem).find('option:selected').text();        
             var html = '<span class="tag" data-value='+ data.value +'>'+text +'<span class="del_tag">×</span></span>';
             var tags_g =  $(data.elem).parents(".tags-g");
             $(data.elem).parent().find(".tagsBox").append(html);
             $(data.elem).find('option:selected').attr("disabled",true);
             form.render();                
		         me.reshData(tags_g);
              }
  	  	 });
  	  },
  	  del:function(){
  	  	 $("body").on("click",".del_tag",function(){
              var value = $(this).parents().attr("value");
              var tags_g = $(this).parents(".tags-g");
              var options =  tagsWrap.find("option");
              options.each(function(i,ele){
                   console.log($(ele).attr("value"));
                 if($(ele).attr("value") === value){
                    $(ele).attr("disabled",false);
                    form.render();  
                 }
              });
  	  	 	    $(this).parent().remove(); 
              me.reshData(tags_g);
  	  	 })
  	  },
  	  reshData:function(tags_g){
  	  	var data = "";
    		if($(".tag").length > 0){
                 var arry = [];
                 $(".tag").each(function(index, el) {
                      arry.push($(el).attr("value"))
                 });
                  data = arry.join(",")
             } 
         tags_g.find(".tag_value").val(data);
  	  },
  	  initUi:function(data){
  	  	 me.select();
         me.del();
  	  },
      initData:function(tags_g,value,data){
          const tagWrap = tags_g.find(".tagsBox");
          var select =  tags_g.find("select");
          var input =  tags_g.find(".tag_value");
          if(data){
             var html = "";
             $.each(data,function(i,el) {
                html += '<option value="'+el.value +'">'+ el.name +'</option>';
             });  
             tags_g.find('select').html(html);
             form.render();         
          }
        if(value){
           var options =  tags_g.find("option");
           var value_arry = value.split(",");   
           var html = "";
            $.each(value_arry,function(i,l) {
               options.each(function(index,ele){
                  if($(ele).attr("value") == l) {
                     $(ele).attr("disabled",true);
                     var name =  $(ele).text();
                     html += '<span class="tag" value='+ l +'>'+ name +'<span class="del_tag">×</span></span>';
                  }
               })
           });   
           tagWrap.html(html);
           input.val(value);
           form.render();
          }else{
             tagWrap.html("");
             input.val("");
             tags_g.find("option").attr("disabled",false);
             form.render();
        } 
      }   
  };
  me.initUi(); 
  return  me;
});