require(["headerLogin", "layui","api"], function(headerLogin,layui,api) {
    var layer = layui.layer;
    var table = layui.table;
    var $ = layui.jquery;

    var url = "/hout2/static/src/js/mock/table.json";
    var params = {
        filter:"all"
    };

    table.render({
        elem: '#table'
        , url: url
        , request: {
             pageName: 'curr' //页码的参数名称，默认：page
            ,limitName: 'nums' //每页数据量的参数名，默认：limit
        }
        // , headers: {"x-apitoken": token}
        , where: params
        , method: "get"
        , page: {
           theme: '#01AAED',
           prev:"上一页",
           next:"下一页",
           first:"首页",
           last:"尾页",
           limit:10,
           limits:[10,15],
           layout:['prev','page','next','skip','count']
        }
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.result, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.totalcount, //解析数据长度
                "data": res.data.user_list //解析数据列表
            };
        }
        , cols: [[//表头
            {field: 'wu_id', title: 'ID', width: 60}
            , {field: 'wu_username', title: '用户名'}
            , {field: 'wu_fullname', title: '用户名称'}
            , {field: 'wu_sysrole', title: '系统角色'}
            , {field: 'wu_id', title: '角色'}
            , {field: 'wu_flag_des', title: '状态'}
            , {field: 'wu_synctime', title: '同步时间'}
            , {field: '',
                align: "center",
                title: '操作',
                width: 160,
                templet: '<div><a href="javascript:void(0);"  wu_id = "{{d.wu_id}}" id="user_edit" class="layui-table-link user_edit">编辑</a></div>'
            }
        ]]
    });
});
