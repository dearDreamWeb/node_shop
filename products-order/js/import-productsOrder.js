import productsOrder from '../../module/module-productsOrder.js'
if (document.cookie.indexOf('user=') != -1) {
    class ProductsOrder {
        constructor() {
            this.init();
        }
        init() {
            this.curDisplay()
/**
* 判断浏览器  Firefox，opera，chrome三个浏览器
*/
            if (navigator.userAgent.indexOf('Firefox') >= 0 || navigator.userAgent.indexOf('OPR') >= 0) {
                setTimeout(() => {
                    this.countMoney();
                    this.deleteOrder()
                }, 100)

            } else if (navigator.userAgent.indexOf('Chrome') >= 0) {
                $(window).load(() => {
                    this.countMoney();
                    this.deleteOrder()
                })
            }

     
           


}
//通过ajax来把订单遍历出来
curDisplay() {
    $.ajax({
        type: "get",
        url: "http://localhost:6868/node-allOrders",
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                //第一个参数：商品名 第二个参数：商品详情 第三个参数：商品价格  第四个参数：图片地址
                $('#allProducts').append(productsOrder(res[i].imgName, res[i].imgDetails, '￥' + res[i].price, res[i].imgSrc))
            }

        }
    });
}
//选择商品结算金额
countMoney() {
    let allMoney = 0;//总金额
    let preMoney;
    /**
     * 设置全选功能
     *
     */
    $($('#allCheck')).on('click', (e) => {
        e.stopPropagation()
        //当全选被选中时，所有商品框都被选中，一开始，金额清为零
        if ($('#allCheck').prop('checked')) {
            $('.checkOrders').prop('checked', true)
            allMoney = 0;
            //循环每个商品价格加一起
            for (let i = 0; i < $('.checkOrders').length; i++) {
                preMoney = Number($('.checkOrders').eq(i).parents('.allProducts-ul').find('.price').text().slice(1));
                allMoney += preMoney;
                $('#money').text('￥' + allMoney)
            }
        } else {
            $('.checkOrders').prop('checked', false);
            for (let i = 0; i < $('.checkOrders').length; i++) {
                preMoney = Number($('.checkOrders').eq(i).parents('.allProducts-ul').find('.price').text().slice(1));
                allMoney -= preMoney;
                $('#money').text('￥' + allMoney)
            }
        }

    })
    $.each($('.checkOrders'), function (index, value) {
        $(this).on('click', function (e) {
            e.stopPropagation()
            /**
             * 判断复选框是否选择，有的话加，没的话减
             */
            if ($(this).prop('checked')) {
                //获取选择的价格
                preMoney = Number($(this).parents('.allProducts-ul').find('.price').text().slice(1));
                allMoney += preMoney;
                $('#money').text('￥' + allMoney)
            } else {
                //当有商品复选框没有选中，全选框不被选中
                $('#allCheck').prop('checked', false)
                preMoney = Number($(this).parents('.allProducts-ul').find('.price').text().slice(1));
                allMoney -= preMoney;
                $('#money').text('￥' + allMoney)
            }
        })
    });
    // 结算商品
    $('#checkOut').on('click', function (e) {
        e.stopPropagation()
        let arr = []
        $(this).css({ outline: 'none' });
        if (confirm(`是否确定支付，支付金额为${allMoney}`)) {
            // 结算弹窗
            alert('正在支付中...')
            setTimeout(() => {
                alert('支付完成')
                allMoney = 0;//金额变成0
                $('#money').text('￥' + allMoney);
                // 删除要结算的商品
                $.each($('.checkOrders'), function (index, value) {
                    if ($(this).prop('checked')) {
                        // 把结算商品的下标值传进arr
                        arr.push(index)
                        $(this).parents('.allProducts-ul').remove();
                    }
                });
            }, 800)
            //ajax 往后端传，各个数据index值
            setTimeout(() => {
                $.ajax({
                    type: "get",
                    url: "http://localhost:6868/checkOut",
                    data: {
                        arr
                    },
                    success: function (response) {
                        console.log(response)
                    }
                });
            }, 1000)

        }

    })

}
//删除订单
deleteOrder() {
    $.each($('.deleteOrder'), function (index, value) {
        $(this).on('click', function (e) {
            e.stopPropagation()
            if (confirm('是否删除订单')) {
                $(this).parents('.allProducts-ul').remove();
                $.ajax({
                    type: "get",
                    url: "http://localhost:6868/deleteOrder",
                    data: {
                        index
                    },
                    success: function (res) {

                    }
                });
                alert('删除成功')
            }

        })
    });
}
    }
new ProductsOrder();
} else {
    //未登录清空页面
    $('#wrapper').html('');
    setTimeout(() => {
        alert('请登录');
        location.href = 'http://localhost:6868/login-register/login'
    }, 200)
}
