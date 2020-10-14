define(["layui"],function(){
    var $ = layui.jquery;
    var texts = $("textarea");
    if(texts.length > 0){
        texts.map(function (i,ele) {
            var maxlength = $(this).attr("maxlength");
            if(maxlength){
                var parent =  $(this).parent();
                var initial = $.trim($(this).val()).length ? $.trim($(this).val()).length : 0;
                parent.css("position","relative");
                var html = "<span style='position:absolute;bottom:12px;right:16px;color:#999'><span class='texts-num'>"+ initial +"</span> / <span class='max-length'>"+ maxlength +"</span></span>";
                parent.append(html);
                $(this).unbind("keyup").bind('keyup', function(event) {
                    event.stopPropagation();
                    var texLength = $.trim($(this).val()).length;
                    var max = + parent.find(".max-length").html();
                    if( texLength < max){
                        parent.find(".texts-num").html(texLength);
                    }else {
                        parent.find(".texts-num").html($(this).val().slice(0,maxlength));
                        parent.find(".texts-num").html(max);
                    }
                }).unbind("blur").bind("blur",function(event){
                    event.stopPropagation();
                });
            }
        })
    }




});
