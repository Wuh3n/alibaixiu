// 1.0 当添加分类表单发生提交行为的时候
$("#addCategory").on('submit', function() {
    // 获取用户在表单中输入的内容
    let formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(res) {
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
});

// 2.0 发送ajax请求 向服务端请求所有分类列表的数据
render();
function render() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            // 将服务器端返回的数据和HTML模板进行拼接
            let str = template("categoryListTpl", res);
            // 将拼接好的内容放到页面中
            $('#categoryBox').html(str);
        }
    });
};

// 3.0 利用事件委托的方式为编辑按钮添加点击事件
$("#categoryBox").on('click', '.edit', function() {
    // 获取要修改的分类数据的id
    let id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            let str = template('modifyCategoryTpl', res);
			$('#formBox').html(str);
        }
    });
})

// 4.0 当修改分类数据表单发生提交行为的时候
$("#formBox").on('submit', '#modifyCategory', function() {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    // 获取要修改的分类id
    let id = $(this).attr('data-id');
    // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(res) {
            location.reload();
        }
    });

    // 阻止表单的默认提交行为
    return false
});

// 5.0 使用事件委托给删除按钮绑定点击事件
$("#categoryBox").on('click', '.delete', function() {
    if (confirm("您确定要删除该文章吗？")) {
        // 获取要删除分类数据的id
        let id = $(this).attr("data-id");
        // 向服务器发送请求 删除数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(res) {
                location.reload();
            }
        });
    };
});