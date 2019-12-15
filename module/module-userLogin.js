export default () => {
    class Header {
        constructor() {
            this.init();
        }
        init() {
            this.headerLogin = $('#header-login');
            this.displayUser();
            this.btnClick();
            $(window).load(()=>{
                this.userLoginAjax();
            })  
        }

        //点击登录和注册跳转登录和注册的界面
        btnClick() {
            $($('#header-loginBtn')).on('click', () => {
                location.href = 'http://localhost:6868/login-register/login/index.html'
            });
            $($('#header-registerBtn')).on('click', () => {
                location.href = 'http://localhost:6868/login-register/register/index.html'
            });
        }
        /**
         * 通过获取值判断是否已经登录，
         * 已经登录：显示用户名
         * 没有登录：显示登录注册按钮
         */
        displayUser() {
            if (document.cookie.indexOf('user=') == -1) {
                $(this.headerLogin).html(`
                    <input type="button" value="登录" id="header-loginBtn" class="btn btn-default">
                    <input type="button" value="注册" id="header-registerBtn" class="btn btn-default">
                `)
            } else {
                let userName = document.cookie.slice(document.cookie.indexOf('user=') + 5);
                $(this.headerLogin).html(`
                    <span style = 'color:#2f2d2d;font-size:2rem'> ${userName} </span>
                    <a href = 'javascript:;'  id = 'userCancel'  style = 'color : #f40' >注销</a>
                `)
            }
        }

        //用户已登录点击a标签注销登录
        userLoginAjax() {
            let self = this;
            $('#userCancel').on('click', () => {
                $.ajax({
                    type: "get",
                    url: "http://localhost:6868/admin-userCancel",
                    success: function (response) {
                        if (response) {
                            self.displayUser();
                            self.btnClick();
                            $('.countNum').text(response)
                        }
                    }
                });
            })

        }

    }
    new Header();
};

