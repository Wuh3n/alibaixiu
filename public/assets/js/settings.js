$('#logo').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
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

    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (res) {
            location.reload();
        }
    });
});

$.ajax({
    type: "get",
    url: "/settings",
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
    }
});