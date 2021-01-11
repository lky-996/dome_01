initArtCateList();

function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            // console.log(res);
            var htmlStr = template('tpl-table', res);
            $('tbody').html(htmlStr);
        }
    })
}
var indexAdd = null;
$('#addlist').on('click', function() {

    indexAdd = layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        // layui-layer-dialog
    });
    var htmlTxt = template('dialog-add');
    $('.layui-layer-content').html(htmlTxt);

})
$('body').on('submit', '#form-add', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function(res) {
            // console.log(res);
            initArtCateList();
            if (res.status !== 0) {
                return layui.layer.msg('添加分类失败！')

            }
            layui.layer.msg('添加分类成功')
            layui.layer.close(indexAdd);
            // layer.close(indexAdd)

        }

    })
})
var indexEdit = null;
$('#td').on('click', '#edit', function() {
    // console.log(111);
    indexEdit = layui.layer.open({
        type: 1,
        area: ['500px', '250px'],

        // layui-layer-dialog
    });
    var htmlTxt = template('dialog-edit');
    $('.layui-layer-content').html(htmlTxt);
    var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
    $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                layui.form.val('form-edit', res.data)
            }
        })
        // var data = $('#form-edit').serialize();
        // layui.form.val('form-edit', data)
        // $('#listname').val($(this).attr('data-name'));
        // $('#aliasname').val($(this).attr('data-alias'));
})
$('body').on('submit', '#form-edit', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function(res) {
            console.log($('#form-edit').serialize());
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('更新分类数据失败！')
            }

            layui.layer.msg('更新分类数据成功！')
            layui.layer.close(indexEdit)
            initArtCateList()

        }
    })
})
var indexDel = null;
$('#td').on('click', '#del', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    // console.log(id);
    indexDel = layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(indexDel) {
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('删除失败！')
                }
                layui.layer.msg('删除成功！')
                layui.layer.close(indexDel)
                initArtCateList();
            }
        })
    });

})