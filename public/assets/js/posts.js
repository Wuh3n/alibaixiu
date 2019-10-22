// 1.0 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        let str = template("postsTpl", res);
        $("#postsBox").html(str);
        let strPage = template("pageTpl", res);
        $("#page").html(strPage);
    }
});

// // 1.1 处理日期时间格式
// function formateDate(date) {
//     // 将日期时间字符串转换成日期对象
//     date = new Date(date);
//     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// };

// 2.0 分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page
        },
        success: function(res) {
            let str = template("postsTpl", res);
            $("#postsBox").html(str);
            let strPage = template("pageTpl", res);
            $("#page").html(strPage);
        }
    });
}

// 3.0 向服务器端发送请求 索要分类数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (res) {
		let str = template('categoryTpl', res);
		$('#categoryBox').html(str);
	}
})

// 4.0 当用户进行文章列表筛选的时候
$("#filterForm").on('submit', function() {
    // 获取到管理员选择的过滤条件
	let formData = $(this).serialize();
	// 向服务器端发送请求 根据条件索要文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function (res) {
			let str = template("postsTpl", res);
            $("#postsBox").html(str);
            let strPage = template("pageTpl", res);
            $("#page").html(strPage);
		}
	});
    // 阻止表单默认提交行为
    return false;
});

// 5.0 通过事件委托给删除按钮绑定点击事件
$("#postsBox").on("click", ".delete", function() {
    // 弹出删除确认框 与管理员确认是否进行删除操作
    if (confirm("您确认要删除该文章吗？")) {
        // 获取管理员要删除的文章的id
        let id = $(this).attr("data-id");
        // 向服务器发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        });
    };
});
