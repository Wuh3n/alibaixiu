<<<<<<< HEAD
$('#logo').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
=======
// 当管理员选择logo图片时
$('#logo').on('change', function() {
    // 获取到管理员选择到的图片
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append('logo', file);
    // 向服务器端发送请求 实现文件上传
>>>>>>> 00bf385fb6be72647f14dbfa9f67f33d748aaa9f
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
<<<<<<< HEAD
        success: function (res) {
            $('#hiddenLogo').val(res[0].logo);
            $('#img').attr('src', res[0].logo);
        }
    });
});

$('#sAdd').on('click', function () {
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));
    let formData = $('#sAddForm').serialize();

=======
        success: function(response) {
            $('#hiddenLogo').val(response[0].logo);
            // 将logo图片显示在页面中
            $('#img').attr('src', response[0].logo);
        }
    });
})

// 当网站设置表单发生提交行为时
$('#sAdd').on('click', function() {
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));
    // 获取管理员在表单中输入的内容
    let formData = $('#sAddForm').serialize();
    // 向服务器端发送请求 实现网站设置数据添加功能
>>>>>>> 00bf385fb6be72647f14dbfa9f67f33d748aaa9f
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
<<<<<<< HEAD
        success: function (res) {
            location.reload();
        }
    });
});
=======
        success: function(response) {
            location.reload();
        }
    });
})
>>>>>>> 00bf385fb6be72647f14dbfa9f67f33d748aaa9f

$.ajax({
    type: "get",
    url: "/settings",
<<<<<<< HEAD
    success: function (res) {
        if (res) {
            // 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(res.logo)
            // 将logo显示在页面中 
            $('#img').attr('src', res.logo)
            // 将网站标题显示在页面中
            $('input[name="title"]').val(res.title);
            // 将是否开启评论功能显示在页面中
            // $('input[name="comment"]').prop('checked', res.comment)
            // 将评论是否经过人工审核显示在页面中
            // $('input[name="review"]').prop('checked', res.review)
            $('textarea[name="description"]').html(res.description);
            $('input[name="keywords"]').val(res.keywords);

            if (res.comment) {
                $('#comment_status').prop('checked',true);
            };
            if (res.review) {
                $('#comment_reviewed').prop('checked',true);
            };
        };
=======
    success: function(response) {
        if (response) {
            // 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo)
                // 将logo显示在页面中 
            $('#img').attr('src', response.logo)
                // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // 将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked', response.comment)
                // 将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', response.review)
            $('textarea[name="description"]').html(response.description);
            $('input[name="keywords"]').val(response.keywords);
            if (response.comment) {
                $('#comment_status').prop('checked');
            }
            if (response.review) {
                $('#comment_reviewed').prop('checked');
            }
        }
>>>>>>> 00bf385fb6be72647f14dbfa9f67f33d748aaa9f
    }
});