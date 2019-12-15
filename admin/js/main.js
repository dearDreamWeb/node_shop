$(function () {
    class LoadProducts {
        constructor() {
            this.init();
        };
        init() {
            this.ajaxAll();
            this.deletClick();
        }
        //数据模块
        module(productsName, productsType, productsPrice, productsDetails, productsSrc) {
            return `
            <ul class="allProducts-ul row">
                <li class = 'col-md-1'>${productsName}</li>
                <li class = 'col-md-1'>${productsType}</li>
                <li class = 'col-md-1'>${productsPrice}</li>
                <li class = 'col-md-4'>${productsDetails}</li>
                <li class = 'col-md-4'>${productsSrc}</li>
                <li class = 'col-md-1 deletData'>
                    <a class = 'deletBtn'>删除</a>
                </li>
            </ul>
            `
        }
        //从后台加载到前端
        ajaxAll() {
            let self = this;
            $.ajax({
                type: "get",
                url: "http://localhost:6868/admin/allProducts",
                success: function (data) {
                    // 遍历数据模块
                    for (let i = 0; i < data.length; i++) {
                        $($('#allProducts')).append(self.module(data[i].imgName, data[i].type, data[i].price, data[i].imgDetails, data[i].imgSrc))
                    }
                }
            });
        };
        /**
         * 删除商品
         */
        deletClick() {
            //用$(window).load(function(){})来获取按钮
            $(window).load(() => {
                $('.deletData').on('mouseenter', function () {
                    //鼠标移入整行li添加class类：active
                    $(this).siblings().addClass('active');
                    $(this).off('click').on('click', function () {
                        let self = this;        
                        if (confirm("是否确定删除")) {
                            //ajax把图片的路径发到后端，因为图片路径是hash值，是唯一的
                            $.ajax({
                                type: "get",
                                url: "http://localhost:6868/admin/deletProducts",
                                data: {
                                    imgSrc: $(this).prev().text()
                                },
                                success: function (response) {
                                    if(response == '删除成功!'){
                                        //删除整行
                                        $(self).parent().remove();
                                        alert(response)
                                    }else{

                                    }
                                    
                                }
                            });
                        }

                    })
                }).on('mouseleave', function () {
                    $(this).siblings().removeClass('active')
                })
            })

        }
    }
    new LoadProducts();
})