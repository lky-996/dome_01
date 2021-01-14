$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    function initList() {

        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res);
                var htmlStr = template('table_list', res);
                $('#td').html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    initList();
    //分类
    function addCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取分类数据失败！')
                }
                // console.log(res);
                var htmlStr = template('table_cates', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }
    addCates();
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name = cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initList();
    })

    template.defaults.imports.dataFormat = function(data) {
            var time = new Date(data);
            var y = time.getFullYear();
            // var m = time.getMonth() + 1;
            // var d = time.getDate();
            // var h = time.getHours();
            // var i = time.getMinutes();
            // var s = time.getSeconds();
            var m = addZero(time.getMonth() + 1);
            var d = addZero(time.getDate());
            var h = addZero(time.getHours());
            var i = addZero(time.getMinutes());
            var s = addZero(time.getSeconds());
            return y + '-' + m + '-' + d + '-' + h + '-' + i + '-' + s;
        }
        //为事件加零
    function addZero(data) {
        if (data < 10) {
            return '0' + data;
        } else {
            return data;
        }
    }

    // 分页
    //定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        console.log(total);
        layui.laypage.render({
            elem: "pageBox", // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                // 点击得到页码值：
                console.log(obj.curr);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    initList();
                }
                // initList();
            }
        })
    }
    $('tbody').on('click', '#del', function() {
        //获取页面上删除按钮的个数
        var len = $('#del').length;
        console.log(len);
        var id = $(this).attr('data-id');
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败!');
                    }
                    layui.layer.msg('删除成功!');
                    initList();
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                }
            })

            layui.layer.close(index);
        });
        // if (len = 1) {

        // }
    })
})