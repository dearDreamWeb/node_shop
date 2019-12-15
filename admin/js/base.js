$(function(){
    /**
     * 进入管理员系统加载登录时间
     * 点击注销返回管理员登录页面
     */
    class LoginAjax{
        constructor(){
            this.init();
        }
        init(){
            this.loadDatas();
            this.adminCancel();
        }
        // 登录到管理员系统自动加载时登录时间
        loadDatas(){
            $.ajax({
                type: "get",
                url: "http://localhost:6868/admin/loadDatas",
                success: function (res) {
                    if(res == '请登录'){
                        $('body').html('')
                        setTimeout(()=>{
                            alert('请先登录管理员系统');
                            location.href = 'http://localhost:6868/admin'
                        },200)
                        
                        
                    }else{
                        $('#admin-login-time').text(`本次登录时间 : ${res}`)
                    }
                }
            });
        }
        // 管理员注销
        adminCancel(){
            $('#cancelClick').on('click',()=>{
                $.ajax({
                    type: "get",
                    url: "http://localhost:6868/admin/adminCancel",
                    success: function (res) {
                        if(res == '注销成功'){
                            location.href = 'http://localhost:6868/admin'
                        }
                    }
                });
            })
        }
    }
    new LoginAjax()
})