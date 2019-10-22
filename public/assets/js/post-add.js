// 1.0 向服务器端发送请求 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let str = template("categoryTpl", res)
        $('#category').html(str);
    }
});

// 2.0 当管理员选择文件的时候，触发该事件
$("#feature").on('change', function() {
    // 获取到管理员选择到的文件
    let file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    let formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function(res) {
            $("#thumbnail").val(res[0].cover)
        }
    });
});

// 3.0 当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function(res) {
                // 文章添加成功 跳转到文章列表页面
                location.href = '/admin/posts.html'
            }
        })
        // 阻止表单默认提交的行为
    return false;
});

// 4.1 获取浏览器地址栏中的id参数
let id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            // 方法一
            //当请求成功后，我们还需要去进行请求，获取分类列表，之前获取的分类列表是绑定在添加的页面
            // $.ajax({
            //     type: 'get',
            //     url: '/categories',
            //     success: function(categories) {
            //       //把分类列表信息封装到 详细信息的对象中，这样我们在模板引擎中就能获取到分类列表的信息
            //       res.categories = categories;
            //       let str = template("modifyTpl", res);
            //       $('#parentBox').html(str);
            //     }
            // });

            // // 方法二
            // 先将保存按钮隐藏 同时将修改按钮显示出来
            $("#pAdd").hide();
            $("#pEdit").show();
            // 将h1标签里面的“写文章修改为修改文章”
            $("h1").text("修改文章");
            $("#title").val(res.title);
            $("#content").val(res.content);
            // 显示图片
            $("#prev").attr('src', res.thumbnail).show();
            // 将地址写到隐藏域中
            $("#img").val(res.thumbnail);
            // 文章分类
            $("#category > option").each(function(value, item) {
                    // 形参 item 得到的是dom对象  将dom对象转换为jQuery对象 $(dom对象)             
                    if ($(item).val() == res.category) {
                        $(item).prop("selected", true)
                    }
                })
                // 显示修改状态
            $('#status > option').each((index, item) => {
                // 判断option里面的value属性的值与res.category的值是否相等 如果相等 就表示是这个分类 给其设置一个selected 
                if ($(item).attr('value') == res.state) {
                    $(item).prop('selected', true);
                }
            });
            $('#created').val(res.createAt && 　res.createAt.substr(0, 10));
            // 将保存按钮隐藏 将编辑按钮显示出来 
            $('#pAdd').hide();
            $('#pEdit').show();
        }
    });
};

// 4.0 从浏览器的地址栏中和获取查询参数
function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (let i = 0; i < paramsAry.length; i++) {
        let tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        };
    };
    return -1;
};

// 5.0 当修改文章信息表单发生提交行为的时候
$("#parentBox").on("submit", "#modifyForm", function() {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    // 获取管理员正在修改的文章的id值
    let id = $(this).attr("data-id");
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    });
    // 阻止表单的默认提交行为
    return false;
});