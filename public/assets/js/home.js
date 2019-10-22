// 向服务器端发送请求 索要轮播图数据
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		let html = template('slidesTpl', {data: response});
		$('#slidesBox').html(html)
		//
		let swiper = Swipe(document.querySelector('.swipe'), {
			auto: 3000,
			transitionEnd: function (index) {
		    // index++;

			$('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
			}
		});

		// 上/下一张
		$('.swipe .arrow').on('click', function () {
			let _this = $(this);

			if(_this.is('.prev')) {
			swiper.prev();
			} else if (_this.is('.next')) {
			swiper.next();
			}
		});
	}
});

// 向服务器端发送请求 索要最新发布数据
$.ajax({
	type: 'get',
	url: '/posts/lasted',
	success: function (response) {
		let html = template('lastedTpl', {data: response});
		$('#lastedBox').html(html);
	}
});