$(function() {
    // console.log(111);
    //初始化表单函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return '获取失败'
                }
                // $('#uname').val(res.data.username);
                // $("#uname").prop("disabled", true);
                // $('#nicheng').val(res.data/.nickname);
                // $('#youxiang').val(res.data.email);
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo();


    //设置表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6位之间';
            }
        }
    })

    //  重置表单数据
    $('#rebtn').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // console.log(111);
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功');
                window.parent.getUserInfo();
            }
        })

    })
})