$(function () {
    /**
     * 轮播图
     */
    class Branner {
        constructor(speedTime) {
            this.speedTime = speedTime;//轮播图滑档时间间隔
            this.branner = $('#branner')
            this.ul = $('#branner ul');
            this.lis = $('#branner ul li');
            this.num = 0;//判断图片的偏移量
            this.init();
        };
        init() {
            this.autoPlay();
            this.btnClick();
            this.events();
        };
        /**
         * 初始化ul 和li 的样式
         */
        currdisplay() {
            let self = this;
            //ul设置样式   ul的宽度 = 父级div宽度 * li总数
            this.ul.css({
                width: `${this.lis.length * 100}%`,
                padding: `0`
            })
            // console.log($('ul').width())
            // li 添加轮播图
            $.each(this.lis, function (index) {
                $(this).css({
                    background: `url('../images/banner${index + 1}.jpg') 100%/100% `,
                    width: `${$('#branner ul').width() / self.lis.length}px`,
                    height: `40rem`,
                    padding: `0`,
                    opacity: `${index == 0 ? 1 : 0}` //判断是否为第一个li，是的话opacity为1
                })
            });
            // 设置 选择的样式
            $('.btnClick').eq(this.num).addClass('active')
        };
        /**
         * 启动定时器
         */
        autoPlay() {
            this.currdisplay();
            this.autoTimer = setInterval(this.brannerInterval.bind(this), this.speedTime)
        }
        /**
         * 设置定时器
         * 一边移动ul ，一边让该显示li的opacity值为1，其余的li为0
         */
        brannerInterval() {
            this.btnActive();
            this.num++;
            this.liW = ($('#branner ul').width() / $('#branner li').length).toFixed(2); // 每个li的宽度
            //该显示的li的opacity为1 其余li的opacity为0
            $('#branner li').eq(this.num).animate({
                opacity: '1'
            }, 300);

            $('#branner li').eq(this.num).siblings().animate({
                opacity: '0',
            })
            // ul 移动
            if (this.num < $('#branner li').length) {
                $($('#branner ul')).css({
                    transform: `translateX(-${this.liW * this.num}px)`
                });
            } else {
                this.num = 0;
                $('#branner li').eq(this.num).animate({
                    opacity: '1'
                }, 300)
                $($('#branner ul')).css({
                    transform: `translateX(0px)`
                })
            }
        }
        /**
         * 点击按钮，出现对应的图片
         */
        btnClick() {
            let self = this;
            $.each($('.btnClick'), function (index) {
                $(this).on('mouseover', () => {
                    clearInterval(self.autoTimer);
                    self.num = (index + 2) % 3;
                    self.brannerInterval()
                })
            });
        }
        /**
         * 当前图标对应的按钮添加class
         */
        btnActive() {
            $('.btnClick').eq((this.num + 1) % 3).addClass('active').siblings().removeClass('active')
        }
        /**
         * 鼠标移入停止定时器，
         * 鼠标移出开始定时器
         */
        events() {
            $('#brannerAll').on('mouseover', () => {
                clearInterval(this.autoTimer);
            }).on('mouseout', () => {
                clearInterval(this.autoTimer);
                this.autoTimer = setInterval(this.brannerInterval.bind(this), this.speedTime);
            })
        }
    }

    /**
     * 公告
     */
    class Ad {
        constructor(str, speedTime) {
            this.str = str;
            this.speedTime = speedTime;
            this.num = 0;
            this.init()
        };
        init() {
            this.strStar();
        };
        strStar() {
            this.timer = setInterval(this.autoPlay.bind(this), this.speedTime)
        }
        autoPlay() {
            let nowStr = this.str;
            this.num++;
            if (this.str.length > this.num) {
                $('#content').text(nowStr.slice(0, this.num));
            } else {
                clearInterval(this.timer);
                setTimeout(() => {
                    this.num = 0;
                    this.timer = setInterval(this.autoPlay.bind(this), this.speedTime)
                }, 4000)
            }

        }
    }
    new Branner(3000);//参数是轮播图时间间隔
    //第一个参数：公告内容  第二个参数：增加字数的时间间隔
    new Ad(`本店诚信经营，不为大财只谋小利，不做无良卖家，只想广交天下好友！
    优惠活动仅限开业酬宾期间，望广大顾客多多光临，必有好礼相送！！！`, 100);
})