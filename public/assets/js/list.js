function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');
    for (let i = 0; i < paramsAry.length; i++) {
        if (paramsAry[i].split('=')[0] == name) {
            return paramsAry[i].split('=')[1];
        }

    }
    return -1;
}

var id = getUrlParams('id');
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(res) {
        let str = template('newTpl', { data: res });
        $('.new').html(str)
    }
});