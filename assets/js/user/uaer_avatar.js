// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('#layui-btn').on('click', function() {
    // console.log(111);
    $('#file').click();
})
$('#file').on('change', function(e) {
    // console.log(11);
    var file = e.target.files[0];
    // console.log(file);
    var newUrl = URL.createObjectURL(file);
    $('#image').cropper('destroy').attr('src', newUrl).cropper(options);
})
$('#rebtn').on('click', function() {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL,
        },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('设置头像失败！');
            }
            layui.layer.msg('设置头像成功');
            window.parent.getUserInfo();
        }
    })
})