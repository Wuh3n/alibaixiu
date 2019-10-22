// 1.0 找到 id="image" 给它添加 change事件
$("#image").on("change", function() {
    // 用户选择到的文件
    let file = this.files[0];
    // 创建forData对象实现二进制文件上传
    let forData = new FormData()
    // 将管理员选择到的文件添加到forData对象中
    forData.append("image", file);
    // 向服务器端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: forData,
        processData: false,
        contentType: false,
        success: function(res) {
            // 添加到隐藏域
            $("#flie").val(res[0].image);
            // 将其预览出来
            $("#prev").show().attr("src", res[0].image)
        }
    });
});


// 创建一个空数组 
let arr = [];
$("#pAdd").on("click", function() {
    $.ajax({
        url: '/slides',
        type: 'post',
        data: $("form").serialize(),
        success: function(res) {
            // 将数据追加到数组中
            arr.push(res);
            // 调用render函数
            render(arr);
            $('#flie, #text, #link').val("");
            $("#prev").attr("src", "").hide();
        }
    });
});

// 获取所有的轮播图片
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        // 将res赋值给arr
        arr = res; 
        render(arr);      
    }
});

// 封装一个函数 用于渲染模板
function render(data) {
    let str = template("sTpl", { res: data });
    $("tbody").html(str);
};

// 给每一个删除按钮注册点击事件 需要使用事件委托
$("tbody").on("click", ".delete", function() {
    if (confirm("您确认要删除这个图片吗？")) {
        let id = $(this).attr("data-id");
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(res) {
                // 根据res._id  对应的数组元素的索引值给我们
                let index = arr.findIndex(item => 
                    item._id == res._id
                );
                // 想实现无刷新删除 手动将数组里面的这个元素给删除 然后重新调用 render
                arr.splice(index, 1);
                render(arr);
            }
        });
    };
});