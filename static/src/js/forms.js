require(["headerLogin","layui","upLoad","verify","downList3","input","inputWord"], function(headerLogin,layui,upload,verify) {
    var form = layui.form;
    var $ = layui.jquery;

    if($("#upIco1").length > 0){
       upload.img("upIco1");
    }
   if($("#upIco2").length > 0){
       upload.img("upIco2");
    }

   if($("#upIco3").length > 0){
       upload.img("upIco2");

    }

   form.on('submit(form)',function(){
      return false;
   })
});
