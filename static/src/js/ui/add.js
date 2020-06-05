define(["layui","tools","api","ZeroClipboard"],function(layui,tool,api,ZeroClipboard){
	window['ZeroClipboard'] = ZeroClipboard;
	var layer = layui.layer;
	var table = layui.table;
	var $ = layui.jquery;
	var loading;
	var dialog;
  

  if ($("#editor").length > 0) {
        var editor_input = UE.getEditor('editor');
        $('body').on("click", ".uediter", function() {
             loading = layer.load(5);
             var $dom = $(this).parent().find("input");
             $dom.removeClass('border-danger');
             var content = $dom.val() ? $dom.val() : "";
             var str = $(this).parents(".item").find('.dt').text();
             dialog = layer.open({
                type: 1,
                title: str,
                content:  $("#ueditoControl"),
                area: ["820px", "500px"],
                btn: ["确定", "取消"],
                success: function() {
                  setTimeout(function() {
                    editor_input.setContent(content);
                    layer.close(loading)
                  }, 800)
                },
                yes: function(index) {
                  var html = editor_input.getContent();
                  $dom.val(html);
                  layer.close(index);
                }
              });
          })
   }
// 输入框



  
    
})
