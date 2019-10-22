 // 向服务器发送请求 请求轮播图数据
$.ajax({
   type: 'get',
   url: '/slides',
   success: function(res) {
     let str = template("slidesTpl", res);
     $("#slidesBox").html(str);
     var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
      });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if(_this.is('.prev')) {
          swiper.prev();
        } else if(_this.is('.next')) {
          swiper.next();
        }
      });
  
   }
 });