// 1。0  向服务端发送请求 索要评论列表数据 渲染到页面上
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        let str =  template("commentsTpl", res);
        $("#commentsBox").html(str);
        let strPage = template("pageTpl", res);
        $("#pageBox").html(strPage);        
    }
});   
// 2.0 实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page
        },
        success: function(res) {
            let str =  template("commentsTpl", res);
            $("#commentsBox").html(str);
            let strPage = template("pageTpl", res);
            $("#pageBox").html(strPage);              
        }
    });
};

// 3.0 当审核按钮被点击的时候
$("#commentsBox").on('click', '.status', function() {
    // 获取当前评论的状态
    let status = $(this).attr("data-status");
    // 获取当前要修改的评论id
    let id = $(this).attr("data-id");
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function(res) {
            location.reload();           
        }
    });
});

// 4.0 当删除按钮被点击时
$("#commentsBox").on("click", ".delete", function() {
    if ( confirm("您确定要删除该评论吗？")) {
        // 获取管理员要删除的评论的id
        let id = $(this).attr("data-id");
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function(res) {
                location.reload();               
            }
        });
    };
});
