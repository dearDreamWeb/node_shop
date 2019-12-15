import productsAll from '../../module/module-products.js'
$(function () {
    class Products {
        constructor(num) {
            this.num = num;
            this.init();
        }
        init() {
            this.currdisplay();
 /**
 * 判断浏览器  Firefox，opera，chrome三个浏览器
 */
            if (navigator.userAgent.indexOf('Firefox') >= 0 ||navigator.userAgent.indexOf('OPR') >= 0) {
                setTimeout(() => {
                     this.lookContent()
                }, 100)

            } else if (navigator.userAgent.indexOf('Chrome') >= 0) {
                $(window).load(() => {
                    this.lookContent()
               })

            }
        }
        //从数据库中接收商品数据
        currdisplay() {
            $.ajax({
                type: "get",
                url: "http://localhost:6868/indexLoadProducts",
                success: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        $('#products').append(productsAll('../../images/' + data[i].imgSrc, data[i].imgName, '￥' + data[i].price));
                    }
                }
            });
        }
        /**
         * 鼠标移入出现遮罩层效果
         */
        lookContent() {
            let self = this;
            //当鼠标移入图片部位时出现遮罩层
            $('#products .productsImg').off('mouseleave').on('mouseenter', function () {
                //遮罩层显示
                $(this).find('.mark').show()
                //遮罩层中的p的高度
                let pH = $(this).find('.mark p').height();
                $(this).find('.mark p').css({
                    marginTop: ($(this).height() - pH) / 2 + 'px',// 文字垂直居中
                    fontSize: '2rem',
                })
                /**
                 * 设置点击事件
                 * 
                 */
                $(this).off('click').on('click', (e) => {
                    e.stopPropagation();
                    self.linkProductsDetails($(this))
                })

            }).on('mouseleave', function () {
                $(this).find('.mark').hide()
            })
        }
        /**
         * 实现点击该图片实现跳转到产品详情界面
         */
        linkProductsDetails(nowEl) {
            this.el = nowEl;
            let src = $(this.el).children('img').attr('src');
            $.ajax({
                type: "get",
                url: "http://localhost:6868/products-details",
                data: {
                    src: src
                },
                success: function (response) {
                    location.href = `http://localhost:6868/productsDetails?img=${response} `
                }
            });
        }
    }
    new Products(8);//表示商品总数
})