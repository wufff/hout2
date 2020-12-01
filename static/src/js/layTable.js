require(["headerLogin","layui","api"], function(headerLogin,layui,api) {
    var layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var $ = layui.jquery;

    var url = "/hout2/static/src/js/mock/table.json";
    var params = {
        filter:"all"
    };

    var option = {
        elem: '#table'
        , url: url
        , request: {
            pageName: 'curr' //页码的参数名称，默认：page
            ,limitName: 'nums' //每页数据量的参数名，默认：limit
        }
        ,toolbar:true,
        defaultToolbar: ['filter', 'print', 'exports', {
            title: '提示' //标题
            ,layEvent: 'LAYTABLE_TIPS' //事件名，用于 toolbar 事件中使用
            ,icon: 'layui-icon-tips' //图标类名
        }]
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
            {type:"checkbox",width: 50}
            ,{field: 'wu_id', title: 'ID', width: 60}
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
                templet: '#barDemo'
            }
        ]],
    };

    $(".user_edit").click(function () {
       alert(123);
       var wu_id = $(this).attr("wu_id");
       console.log(wu_id);
    });

    var tableIns =  table.render(option);

    form.on('submit(filter)', function (data) {
        option.where = data.field;
        tableIns.reload(option);
        return false;
    });

    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        console.log(obj);
        if(layEvent === 'detail'){ //查看
            //do somehing
            console.log('查看')
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something

            //同步更新缓存对应的值
            obj.update({
                wu_fullname: '新名字'
                ,wu_sysrole: 'student'
            });
        } else if(layEvent === 'LAYTABLE_TIPS'){
            layer.alert('Hi，头部工具栏扩展的右侧图标。');
        }
    });




});

