// 1.0 当修改密码表单发生提交行为的时候
$("#modifyForm").on('submit', function() {
    // 获取用户在表单中输入的内容
    let formData = $(this).serialize();
    // 调用接口 实现密码修改功能
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = '/admin/login.html'
        }
    });

    // 阻止表单默认提交行为
    return false;
});