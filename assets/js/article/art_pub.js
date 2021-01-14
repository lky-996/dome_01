$(function() {
    var layer = layui.layer
    var form = layui.form

    //文章类别区域
    function getArtlist() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章类别获取失败!')
                }
                layer.msg('文章类别获取成功!')
                    // console.log(res);
                var htmlStr = template('art_list', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    initEditor()
    getArtlist();
    // 定义加载文章分类的方法

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
        // var files = 
    })
    $('#file').on('change', function(e) {
        var file = e.target.files[0]
        var imgUrl = URL.createObjectURL(file);
        // $('#image').attr('url', imgUrl)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        // var 

        // var text = $('[name=content]').val();
        // var data = $('#form-pub').serialize();
        // console.log(data);
        var dt = new FormData($(this)[0])
            // var dt = new FormData(data[0])

        dt.append('state', art_state)
        var blob = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                dt.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                    // publishArticle(fd)
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: dt,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('发布失败！')
                        }
                        layer.msg('发布成功！')
                        location.href = '/article/art_list.html'
                    }
                })
            })




    })

})