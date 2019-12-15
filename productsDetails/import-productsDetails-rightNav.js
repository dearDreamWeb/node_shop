import rightNav from '../../module/module-rightNav.js'
$('body').append(rightNav)


 /**
 * 判断浏览器  Firefox，opera，chrome三个浏览器
 */
if (navigator.userAgent.indexOf('Firefox') >= 0 ||navigator.userAgent.indexOf('OPR') >= 0) {
    setTimeout(() => {
        init()
    }, 100)

} else if (navigator.userAgent.indexOf('Chrome') >= 0) {
    $(window).load(() => {
        init()
   })
}


function init() {
    ajaxNum()
    let flag = true;


    $($('.btn')).on('click', function (e) {
        e.stopPropagation()
        //获取图片
        let img = $('#main-img img');
        //克隆图片
        let imgClone = $(img).clone().css({ "opacity": ".6" });
        //获取cookie判断用户是否登录，没有登录不能加入购物车
        if (document.cookie.indexOf('user=') != -1) {
            if (flag) {
                flag = false;
                //插入克隆图片
                $('#main-img').append(imgClone);

                /**
                 * 设置克隆图片样式，让克隆图片在原图片上面覆盖
                 * 先进行第一次animate动画，变小
                 * 再进行第二次animate动画，移动到购物车
                 */
                $(imgClone).css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    "border": "3px solid #fff"
                }).animate({
                    width: '10%',
                    height: '10%',
                    borderRadius: '50%'
                }, function () {
                    //获取要移动到的left值和top值
                    let moveTop = $('#shoppingCar').offset().top - $(imgClone).offset().top;
                    let moveLeft = $('#shoppingCar').offset().left - $(imgClone).offset().left - $(imgClone).width();
                    $(imgClone).animate({
                        width: '10px',
                        height: '10px',
                        left: moveLeft,
                        top: moveTop
                    }, 2000, function () {
                        // 通过ajax把图片hash值发给后端
                        productsData($(img).attr('src'));
                        $(imgClone).remove()
                        flag = true;
                    })
                })
            }

        } else {
            //没有登录，跳转登录页面
            alert('请先登录')
            location.href = 'http://localhost:6868/login-register/login'
        }

    })


    //每次刷新向后端获取购物数量
    function ajaxNum() {

        $.ajax({
            type: "get",
            url: "http://localhost:6868/admin-productsNum",
            success: function (response) {
                //设置要显示购物车上方的数量
                $('.countNum').text(response.productsNum)
            }
        });
    }
    //往后端把图片hash值发过去
    function productsData(src) {
        $.ajax({
            type: "get",
            url: 'http://localhost:6868/admin-shoppingCar',
            data: {
                imgSrc: src
            },
            success: function (response) {
                //设置要显示购物车上方的数量
                $('.countNum').text(response.productsNum)
            }
        });
    }
}
