$(function () {
    init();
    //初始化canvas，添加背景图片
    let myCanvas = $('canvas')[0];
    let ctx = myCanvas.getContext('2d');
    function init() {
        let oImg = new Image();
        oImg.src = '../../images/canvasBg.jpg';
        oImg.onload = function () {
            ctx.drawImage(oImg, 0, 0, myCanvas.width, myCanvas.height);
            ascii();
        }
    }
    /**
     * 实现随机验证码
     */
    function ascii() {
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var canvasStr = '';
        var value = '';
        //用ASCII表转换成52个大小写英文字母
        for (var i = 65; i < 122; i++) {
            if (i > 90 && i < 97) {
                continue;
            }
            //String.fromCharCode()由数字变成字母
            arr.push(String.fromCharCode(i));
        }
        for (var i = 0; i < 6; i++) {
            var str = arr[Math.floor(Math.random() * arr.length)];
            canvasStr += str + ' '; //str后面加上' '为了每个字符用空格隔开
            value += str;
        }
        ctx.fillStyle = '#ccc';
        ctx.font = '33px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(canvasStr, myCanvas.width / 2, myCanvas.height / 2 + 16);
        sure(value);
    }
    //最终校验
    function sure(value) {
        let regUser = /^\S{2,6}$/;//用户名匹配
        let regPassword = /^\w{3,10}$/;//密码匹配
        /**
         *点击事件
         */
        $($('#registerBtn')).on('click', () => {
            let user = $('#user').val();
            let password = $('#password').val();
            let canvasVal = $('#canvasVal').val();
            //每次点击先清除错误提示
            $('b').remove();
            /**
             * 正则判断用户名和密码是否符合标准
             * 符合：向后端传送数据
             * 不符合：错误提示
             * 用toLowerCase()不区分大小写
             * */
            if (regUser.test(user) && regPassword.test(password) && canvasVal.toString().toLowerCase() == value.toString().toLowerCase()) {
                $.ajax({
                    type: "get",
                    url: "http://localhost:6868/userLogin",
                    data: {
                        user: user,
                        password: password
                    },
                    success: function (response) {
                        if(response == '登录成功'){
                            alert(response); 
                            location.href = 'http://localhost:6868/index.html'
                        }else{
                            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);  
                            init();
                            alert(response);  
                        }
 
                    }
                });
            } else {
                if (!regUser.test(user)) {
                    $('#userGroup').after(`<b>请输入2到6个非空字符</b>`)
                }
                if (!regPassword.test(password)) {
                    $('#passwordGroup').after(`<b>请输入3到10个英文和数字</b>`)
                }
                if(canvasVal.toString().toLowerCase() != value.toString().toLowerCase()){
                    $('#canvasGroup').after(`<b>验证码错误</b>`)
                }
            }

        })
    }
    /**
     * 点击canvas刷新
     */
    $($('canvas')).on('click',()=>{
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);  
        init();
    })
})