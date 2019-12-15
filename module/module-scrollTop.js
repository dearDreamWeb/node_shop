export default () => {
    let flag = true;//控制div只出现一次
    $(document).on('scroll', () => {
        if (scrollY > 0 && flag) {
            flag = false;
            /**
             * 创建一个新的返回顶部div，并插入页面中去，设置该div样式
             * 通过链式反应绑定 鼠标移入mouseenter和鼠标移出mouseleave事件
             * 在mouseenter里面添加点击事件回到顶部
             */
            let oDiv = `<div class='scrollTop'></div>`;
            $('body').append(oDiv)
            $($('.scrollTop')).css({
                width: '4rem',
                height: '4rem',
                position: 'fixed',
                right: '4rem',
                top: '85%',
                margin: '1rem',
                border: '.1rem solid #ccc',
                boxShadow: '0 0 .5rem 0 #bf3b1d',
                borderRadius: '.5rem',
                background: `url('../images/icons/scroll-top.png') 100%/100%`
            }).on('mouseenter', function () {
                $(this).css({
                    cursor: 'pointer',
                    padding: '2rem'
                }).on('click', function (e) {
                    e.stopPropagation()
                    let distance = $(window).scrollTop();
                    let s = distance / 600 * 25;  //路程/时间=s *25每隔25ms秒 动的路程
                    let st = setInterval(function () {
                        distance -= s;
                        if (distance <= 0) {
                            distance = 0; //当distance<=0时，设置distance=0
                            clearInterval(st);
                        }
                        $(window).scrollTop(distance) ;
                    }, 25)
                })

            }).on('mouseleave', function () {
                $(this).css({
                    padding: '0'
                })
            })

        } else if (scrollY <= 0) {
            // 没有滚动时，清除div
            flag = true;
            $('.scrollTop').remove();
        }

    })

}