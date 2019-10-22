$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function (res) {        
        let str = template('newTpl', { data: res });
        $('.new').html(str)
    }
});