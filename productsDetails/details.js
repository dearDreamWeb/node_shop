$(function () {
    //用正则切割获取图片名称到后端获取信息
    let reg = /\?img=/
    let src = location.href.slice(location.href.search(reg) + 5);
    $.ajax({
        type: "get",
        url: "http://localhost:6868/productsDatas",
        data: {
            src: src
        },
        success: function (data) {
            /**
             * 第一个参数 图片名字
             * 第二个参数 价格
             * 第三个参数 商品描述
             * 第四个参数 图片地址
            */
            new Mirror(data[0].imgName, '￥' + data[0].price, data[0].imgDetails, data[0].imgSrc)
        }
    });
    /**
     * 第一个参数 图片名字
     * 第二个参数 价格
     * 第三个参数 商品描述
     * 第四个参数 图片地址
     */
    class Mirror {
        constructor(imgName, price, imgDetails, imgSrc) {
            this.imgName = imgName;
            this.price = price;
            this.imgDetails = imgDetails;
            this.imgSrc = imgSrc;
            this.img = $('#main-img img');//图片
            this.box = $('#main-img #box')//遮罩层
            this.oDiv = $(`<div class = 'bigImg'></div>`);//放大镜
            this.init()
        }
        init() {
            //添加商品描述
            $('#main-details-text').html(`<h3>${this.imgDetails}</h3>`)
            //添加图片路径
            $(this.img).attr('src', `../images/${this.imgSrc}`);
            $($('#main-details-right')).append(this.module(this.imgName, this.price))

            $('#main-details-right .line').css({
                marginTop: '2rem'
            })
            /**
             * 判断浏览器
             */
            if (navigator.userAgent.indexOf('Firefox') >= 0) {
                setTimeout(() => {
                    this.curDisplay()
                }, 1000)
    
            } else if (navigator.userAgent.indexOf('OPR') >= 0) {
                setTimeout(() => {
                    this.curDisplay()
                })
    
            }else{
                $(window).load(()=>{
                    this.curDisplay()
                })
            }
   
        }
        curDisplay() {

            //初始化遮罩层样式
            $(this.box).css({
                display: 'none',
                width: $(this.img).width() / 3,
                height: $(this.img).height() / 3
            })
            //初始化放大镜样式 
            $(this.oDiv).appendTo($('#main-details-content')).css({
                position: 'absolute',
                display: 'none',
                top: $(this.img).offset().top,
                left: $(this.img).offset().left + $(this.img).width() + 30,
                width: $(this.img).width() / 1.5,
                height: $(this.img).height() / 1.5,
                border: `.1rem solid #ccc`,
                background: `url('../images/${this.imgSrc}') 300%/300%`,
            })

            $($('#main-img')).on('mousemove', this.img, (e) => {

                $(this.box).css({ display: 'inline-block' })
                // 把鼠标移入出现放大镜div，并设置样式
                $(this.oDiv).css({
                    display: 'inline-block',
                    backgroundPosition: `${-this.moveLeft * 2}px  ${-this.moveTop * 2}px`
                })

                this.moveEvent(e)
            }).off('mouseleave').on('mouseleave', () => {
                $(this.box).css({ display: 'none' })
                $(this.oDiv).css({ display: 'none' })
            })


        }
        /**
         *鼠标在商品照片上移动时，遮罩层跟着移动
         *并且 设置放大镜该显示的位置
         *应为放大镜是3倍，所以
         * this.moveTop 放大镜背景top值移动的距离的1/2
         * this.moveLeft 放大镜的背景left值移动距离 的1/2
         */
        moveEvent(e) {
            let eTop = e.clientY - $(this.img).offset().top - $(this.box).height() / 2;
            let eLeft = e.clientX - $(this.img).offset().left - $(this.box).width() / 2;
            let maxTop = $(this.img).height() - $(this.box).height();//最大的高度
            let maxLeft = $(this.img).width() - $(this.box).width();
            let minTop = 0;
            let minLeft = 0;
            /**
             * 当移动的top值大于最大的top值时，遮罩层div的top值等于最大top值
             * 当移动的top值小于最小的top值时，遮罩层div的top值等于最小top值
             * 当移动的top值在最大值和最小值之间的时候，遮罩层div的top值等于要移动的top值
             */
            if (eTop > maxTop) {
                $(this.box).css({ top: maxTop })
                this.moveTop = maxTop;
            } else if (eTop < minTop) {
                $(this.box).css({ top: minTop })
                this.moveTop = minTop;
            } else {
                $(this.box).css({ top: eTop })
                this.moveTop = eTop;
            }
            /**
             * left的移动规则和top值的一样
             */
            if (eLeft > maxLeft) {
                $(this.box).css({ left: maxLeft })
                this.moveLeft = maxLeft;
            } else if (eLeft < minLeft) {
                $(this.box).css({ left: minLeft })
                this.moveLeft = minLeft;
            } else {
                $(this.box).css({ left: eLeft })
                this.moveLeft = eLeft;
            }
        }

        // 右侧  商品描述
        module(imgName, price) {
            return `
                <div class = 'col-md-12'>
                    <div class = 'line'>
                        <h4>${imgName}</h4>
                        <hr>
                    </div>
                    <div class = 'line'>
                        <span>价格:</span>
                        <span style = 'font-size:3rem;color:#e01d20'>${price}</span>
                    </div>
                    <div class = 'line'>
                        <span>销售:</span>
                        <span>0</span>
                    </div>
                    <div class = 'line'>
                        <span>商家推荐:</span>
                        <span>☆☆☆☆☆☆</span>
                    </div>
                    <div class = 'line'>
                        <span>顾客评价:</span>
                        <span>☆☆☆☆☆</span>
                    </div>
                    <div class = 'line'>
                        <div class = 'col-md-5' style = 'padding:0'>
                            <input type = 'button' class = 'btn btn-danger' value = '加入购物车' style = 'width:100%'>
                        </div>
                    </div>
                </div>

            `
        }
    }



})