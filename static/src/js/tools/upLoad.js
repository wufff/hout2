define(["jquery","plupload","moxie","path"],function($,plupload,moxie,path){
   var my =  {
         img:function(button,fun){
			var uploader = new plupload.Uploader({
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: button,
				// container: document.getElementById('upImgWrap'),
				multi_selection: false, //是否多选
				url: path.upLoad,
				flash_swf_url: path.static+'/static/src/js/lib/plupload/js/Moxie.swf',
				silverlight_xap_url: path.static+'/static/src/js/lib/plupload/js/Moxie.xap',
				max_file_size: '30mb', // 文件上传最大限制。
				unique_names: true, // 上传的文件名是否唯一
				chunk_size: '5mb', // 分片大小
				filters: {
					mime_types: [{
						title: "Image files",
						extensions: "jpeg,jpg,png"
					}, ]
				},
				init: {
					PostInit: function() {
						// document.getElementById('imglist').innerHTML = '';
					},
					FilesAdded: function(up, files) {
						plupload.each(files, function(file) {
							// document.getElementById('imglist').innerHTML = "";
							// document.getElementById('img_file_size').value = file.size;
						    $("#"+button).removeClass('border-danger')
							var id = button + '_info';
							var imgSrc = button + '_img';
							var list = button + "_list";
							if($("#"+id).length>0){
								document.getElementById(id).innerHTML = '<div id="' + file.id + '"><span class="uploadLfilename">' + file.name + '(' + plupload.formatSize(file.size) + ') '+ '</span><b></b></div>';
							}
							previewImage(file,function(url) {
								// console.log(url);
								if($("#"+imgSrc).length > 0){
									$("#"+imgSrc).attr("src",url);
									if($("#"+imgSrc).parents("a").length>0){
										 $("#"+imgSrc).parents("a").attr("href",url);
									}
								}else{
								   var img = '<a href="'+url+'"><img src="'+ url +'" alt=""></a>'
                                   $("#"+list).append(img)
								}
								
							});
						});
						uploader.start();
					},
					UploadProgress: function(up, file) {
						if($("#"+file.id).length>0){
							 document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
						}
					},
					Error: function(up, err) {
						// document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
						alert(err.message);
					},
					OptionChanged: function(up, option_name, new_value, old_value) {

					}
				}
			});


			uploader.bind('FileUploaded', function(uploader, file, responseObject) {
				 var msg = JSON.parse(responseObject.response);
				if (msg.errcode == 0) {
					var valueId = "#"+button +"_value";
					if($(valueId).length > 0){
                        $(valueId).val(msg.data.file_path);
					}
					if(fun){
						fun(msg.data.file_path);
					}
					// console.log(msg.data.file_path);
					// $(id).find('.vlueInput').val(msg.data.file_path);
				}
			});
			uploader.init();
			function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
				if (!file || !/image\//.test(file.type)) return; //确保文件是图片
				if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
					var fr = new moxie.image.Image();
					fr.onload = function() {
						callback(fr.result);
						fr.destroy();
						fr = null;
					}
					fr.readAsDataURL(file.getSource());
				} else {
					var preloader = new moxie.image.Image();
					preloader.onload = function() {
						var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
						callback && callback(imgsrc); //callback传入的参数为预览图片的url
						preloader.destroy();
						preloader = null;
					};
					preloader.load(file.getSource());
				}

			}
		},

         //注意预览包裹层为
		 imgMost:function(button,num,name){
			var uploader = new plupload.Uploader({
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: button,
				// container: document.getElementById('upImgWrap'),
				multi_selection: true, //是否多选
			    url: path.upLoad,
				flash_swf_url: path.static+'/static/src/js/lib/plupload/js/Moxie.swf',
				silverlight_xap_url: path.static+'/static/src/js/lib/plupload/js/Moxie.xap',
				max_file_size: '30mb', // 文件上传最大限制。
				unique_names: true, // 上传的文件名是否唯一
				chunk_size: '5mb', // 分片大小
				filters: {
					mime_types: [{
						title: "Image files",
						extensions: "jpeg,jpg,png"
					}, ]
				},
				init: {
					PostInit: function() {
						// document.getElementById('imglist').innerHTML = '';
					},

					FilesAdded: function(up, files) {
                        plupload.each(files, function(file) {
                        	            var imgNow = $("#"+ button +"_list" ).find(".img_item");
			                    	    if(!imgNow || imgNow.length < num) {
                                         var html = '<div id="' + file.id + '" class="item img_item" style="margin-bottom:0px;max-width:200px;">'
									         html +=   '<div class="info" style="margin-bottom:10px;">' + file.name + '('+plupload.formatSize(file.size)+')<b></b></div>'
									         html +=        '<div class="inner" style="margin-bottom:10px;">'
									         html +=            '<a href="" class="a"><img src="" style="max-width:200px;max-height:127px;"></a>'
									         html +=        '</div>'
									         html +=         '<a href="javascript:void(0)" class="del_upImg" style="width:30px;margin:0 auto;display:block;color:#1E9FFF">删除</a>'
									         html += '</div>' 
			                               $("#"+ button +"_list" ).append(html);  
			                               $("#"+ button +"_list" ).find(".defaul").remove(); 
			                                uploader.start();
			                    	    }
			            });
                        plupload.each(files, function(file) {
							    previewImage(file, function(url) {
							    $("#"+file.id).find("img").attr("src", url);
                                $("#"+file.id).find(".a").attr("href", url);
							});
						}); 
                       	
					},

					UploadProgress: function(up, file) {
						if(document.getElementById(file.id)){
							document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
						}
					},

					Error: function(up, err) {
						// document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
						console.log(err.message);
					},

					OptionChanged: function(up, option_name, new_value, old_value) {

					}
				}
			});


			uploader.bind('FileUploaded', function(uploader, file, responseObject) {
				 var msg = JSON.parse(responseObject.response);
			     if (msg.errcode == 0) {
			     	var html = '<input type="hidden" class="img_path" value="'+msg.data.file_path +'" name="'+name+'">'
			       $("#"+file.id).append(html);
			    }
			});
			uploader.init();


			function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
				if (!file || !/image\//.test(file.type)) return; //确保文件是图片
				if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
					var fr = new moxie.image.Image();
					fr.onload = function() {
						callback(fr.result);
						fr.destroy();
						fr = null;
					}
					fr.readAsDataURL(file.getSource());
				} else {
					var preloader = new moxie.image.Image();
					preloader.onload = function() {
						//preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
						var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
						callback && callback(imgsrc); //callback传入的参数为预览图片的url
						preloader.destroy();
						preloader = null;
					};
					preloader.load(file.getSource());
				}

			}
			return uploader;
		},

		videos:function(button,num){
               var uploader_mp4 = new plupload.Uploader({
			    runtimes : 'html5,flash,silverlight,html4',
			    browse_button : button,
			    // container: document.getElementById('container'),
			    url: path.upLoad,
			    flash_swf_url :  path.static+'/static/src/js/lib/plupload/js/Moxie.swf',
			    silverlight_xap_url : path.static+'/static/src/js/lib/plupload/js/Moxie.xap',
			    max_file_size : '1024mb',  // 文件上传最大限制。
			    unique_names:true, // 上传的文件名是否唯一
			    chunk_size: '5mb', // 分片大小
			    filters : {
			        mime_types: [
			            {title : "video files", extensions : "mp4"},
			        ]
			    },
			    init: {
			            PostInit: function() {
			                    // document.getElementById('mp4list').innerHTML = '';
								$("body").on("click","#mp4list .del",function(){
							        var id = $(this).parent().attr("id");
							        var file =  uploader_mp4.getFile(id)
							         uploader_mp4.stop();
							         uploader_mp4.removeFile(file)
							        $(this).parent().remove();
							     })
			            },
			            FilesAdded: function(up, files) {
			                    plupload.each(files, function(file) {
			                    	    if(!$(".vidoe_item") || $(".vidoe_item").length < num) {
			                    	    	var html = '<div id="' + file.id + '" class="vidoe_item uplist">' + '<span class="mp4Name">'+file.name + '</span>'+' (' + plupload.formatSize(file.size) + ') <b></b> <a href="javascript:void(0)" class="del">删除</a>'
			                                 $("#mp4list").append(html);
			                    	    }
			                            uploader_mp4.start();
			                    });
			                  
			            },
			            UploadProgress: function(up, file) {
			            	if(document.getElementById(file.id)){
			            		document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			            	}
			                
			            },
			            // Error: function(up, err) {
			            //     document.getElementById('mp4_console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			            // },

			            OptionChanged: function(up, option_name, new_value, old_value) {
			                  
			            }
			    }
			});

			uploader_mp4.bind('FileUploaded',function(uploader,file,responseObject){
			    var msg = JSON.parse(responseObject.response);
			    if (msg.code == 1000) {
			       // $("#"+file.id).find(".vidoePath").val(msg.data.file_path);
			       var html = '<input type="hidden" class="vidoePath" value="'+ msg.data.file_path +'"></div>'
			       $("#"+file.id).append(html);
			    }
			});
			uploader_mp4.init();
			return uploader_mp4;
		},

		doc: function(button,doc) {
			var uploader_doc = new plupload.Uploader({
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: button,
				// container: document.getElementById('container'),
				url: path.upLoad,
				flash_swf_url:  path.static+'/static/src/js/lib/plupload/js/Moxie.swf',
				silverlight_xap_url: path.static+'/static/src/js/lib/plupload/js/Moxie.xap',
				max_file_size: '100mb', // 文件上传最大限制。
				unique_names: true, // 上传的文件名是否唯一
				chunk_size: '5mb', // 分片大小
				filters: {
					mime_types: [{
						title: "doc files",
						extensions: "zip,rar"
					}, ]
				},

				init: {
					PostInit: function() {
						// document.getElementById('doclist').innerHTML = '';
						
					},

					FilesAdded: function(up, files) {
                         plupload.each(files, function(file) {
							// document.getElementById('imglist').innerHTML = "";
							// document.getElementById('img_file_size').value = file.size;
							var id = doc;
							document.getElementById(id).innerHTML = '<div id="' + file.id + '"> 附件. (' + plupload.formatSize(file.size) + ') <b></b></div>';
						});						  
                        uploader_doc.start();
					},
					UploadProgress: function(up, file) {
						if(document.getElementById(file.id)){
			            	 document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			            }
					},
					Error: function(up, err) {
						// document.getElementById('doc_console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
						console.log(err.message);
					},
					OptionChanged: function(up, option_name, new_value, old_value) {

					}
				}
			});

			uploader_doc.bind('FileUploaded', function(uploader, file, responseObject) {
                   var msg = JSON.parse(responseObject.response);
				if (msg.errcode == 0) {
					var id = "#"+button +"_list";
					console.log(id);
					// console.log(msg.data.file_path);
					$(id).find('.vlueInput').val(msg.data.file_path);
					// doument.getElementById('img_str').value = document.getElementById('img_str').value + msg.data.file_path + ",";

				}				
			});
			uploader_doc.init();
			return uploader_doc;
		}
	}

    $("body").on("click",".deldoc",function(){
		  $(this).parent().remove();
	 })
    
   $("body").on("click",".del_upImg",function(){
		  $(this).parent().remove();
	 })     

     return my;
})
