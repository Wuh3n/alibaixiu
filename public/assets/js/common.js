$("#logoutBtn").on("click", function() {
    let isConfirm = confirm("您确定要退出吗？");
    if (!isConfirm) return;
    $.ajax({
        type: 'post',
        url: '/logout',
        success: function(res) {
            location.href = 'login.html';
        },
        error: function(res) {
            console.log('退出失败');
        }
    });
});

// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 展示用户的相关信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(res) {
        $(".avatar").attr("src", res.avatar);
        $(".profile .name").text(res.nackName);
    }
});

