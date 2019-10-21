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
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            $('#img').attr('src', response[0].logo);
        }
    });
})

$('#sAdd').on('click', function () {
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));
    let formData = $('#sAddForm').serialize();

    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
})

$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
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
    }
});
