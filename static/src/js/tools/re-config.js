require.config({
	baseUrl: "/hout2/static/src/js",
	// urlArgs: "v=" + new Date().getTime(),
	paths: {
			"jquery": "./lib/jquery/jquery1.21",
			"lay":"./lib/layer/layer",
			"expression": "./ui/expression",
			"album": "./ui/album",
			"path":"./tools/path",
			"page": "./tools/page",
			"layui":"./lib/layui/layui.all",
			"api":"./tools/api",
			"tools":"./tools/tools",
			"viewPhoto":"./ui/viewPhoto",
			"headerLogin":"./app/headerLogin",
			"nicescroll":"./lib/jquery.nicescroll",
			"upLoad":"./tools/upLoad",
			"model":"./app/model",
			"ui":"./ui/change",
			"jui":"./lib/jquery/jqueryui.1.10.4",
			"downList3":"./app/downList3",
			"plupload":"./lib/plupload/js/plupload.full.min",
			"moxie":"./lib/plupload/js/moxie.min",
			"tags":"./ui/tags",
			"slide":"./lib/superslide",
			"swiper":"./lib/swiper.min",
			"goodsdownList":"./app/goodsdownList",
			"ZeroClipboard":"http://wufff.question.dev.dodoedu.com/static/ueditor/third-party/zeroclipboard/ZeroClipboard.min",
			"indexLogin":"./app/indexLogin",
			"verify":"./tools/verify",
			"input":"./ui/add",
			"lookMark":"./ui/lookMark"
	},
	shim: {
		"moxie":{
			 exports:"moxie"
			},
			"plupload":{
				  exports:"plupload"
			},
          "swiper":{
         	exports:"Swiper"
          },		  
		  "ZeroClipboard":{
         	exports:"ZeroClipboard"
          },
         "slide":{
         	deps:['jquery']
         },           
         "nicescroll":{
         	deps:['jquery']
         },    
          "jui":{
         	deps:['jquery']
         },               
          "layui":{
          	exports:"layui"
        }
	}
});


