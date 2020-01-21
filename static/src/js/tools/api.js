define(["layui","path"], function(layui,path) {
	var layer = layui.layer;
	var loading;
	var $  = layui.jquery;
	return {
		ajaxJSONP:function(url, data, callback) {
			$.ajax({
				type: "get",
				// async: false,
				url: url,
				data: data,
				dataType: "jsonp",
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				success: function(json) {
					callback(json);
				},
				error: function(e) {
					console.log("ajaxJSONP error");
				}
			});
		},

		ajaxPost:function(requestUrl,requestData,SuccessCallback,successPar){
			  // loading = layer.load(5);
			$.ajax({
				type: "POST",
				url: requestUrl,
				data: requestData,
				contentType: "application/x-www-form-urlencoded",
				dataType: "text",
				sync: false,
				success: function(data) {
					var obj = null;
					try {
						obj = eval('(' + data + ')');
					} catch (ex) {
						obj = data;
					}
					layer.close(loading);
					if (obj.errcode === 0){
		                  SuccessCallback(obj,successPar);
		             }else{
		                  layer.msg(obj.msg,{icon:5});
		            }
					
				},
				error: function(err) {
					console.log(err);
				},
				complete: function(XHR, TS) {
					XHR = null
				}
			});
		},

       ajaxGet:function(url,data,SuccessCallback,successPar){
       	    $.ajax({
            type: "get",
            url: url,
            data: data,
            cache: false,
            // async: false,
            dataType: "json",
            success: function (res)
            {
                if (res.errcode == 0){
                	 SuccessCallback(res,successPar);
                }else{
                	 
                     layer.msg(res.msg,{icon:5});
                }
                
            },
            error: function (res) {
            	var obj = { 
                    type:"ajax返回错误",
                    data:res
            	 }
                //console.log(obj);
                layer.msg("网络错误，请联系管理员",{time:800});
            }
        });
       },

       smsg:function(str){
            if(str){
              layer.msg(str);
            }else{
               layer.msg("操作成功！");  
            }
            setTimeout(function(){
                  window.location.reload();
            },400)
        },

	   getTr:function(obj){
	             var data = {}
	             var tr = $(obj).parents("tr");
	             var tds = tr.find("td");
	             tds.each(function(index,item){
	                 var k = $(item).attr("data-k");
	                 var v = $(item).attr("value");
	                 if(k){
	                     if(v){
	                        data[k] = v;
	                     }else{
	                        data[k] = $(item).text();
	                     }
	                 }
	             })
	             return data;
	       },

        err:function(str){
              layer.msg(str,{icon:5});
        },
        
        GetUrl:function (){
        var sHref = window.location.href;
        var args = sHref.split('?');
        return args[0];
      }        
       
	}
})
