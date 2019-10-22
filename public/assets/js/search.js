// 获取到浏览器地址栏中的搜索关键字
let key = getUrlParams('key');
// 根据搜索关键字调用搜索接口 获取搜索结果
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (res) {
        let str = template('searchTpl', { data: res });
        $('.new').html(str)
    }
});