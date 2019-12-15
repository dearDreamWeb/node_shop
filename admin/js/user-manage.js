$(function () {
    class Allusers {
        constructor() {
            this.init();
        }
        init() {
            this.loadUsers()
            this.deletClick()
        }

        module(userName, password) {
            return `
                <ul class="allUsers-ul row">
                    <li class = 'col-md-5'>${userName}</li>
                    <li class = 'col-md-5'>${password}</li>
                    <li class = 'col-md-2 deletData'>
                        <a class = 'deletBtn'>删除</a>
                    </li>
                </ul>
                `
        }
        loadUsers() {
            let self = this;
            $.ajax({
                type: "get",
                url: "http://localhost:6868/admin/allUsers",
                success: function (data) {          
                    // 遍历数据模块
                    for (let i = 0; i < data.length; i++) {
                        $($('#allUsers')).append(self.module(data[i].user, data[i].password))
                    }
                }
            });
        };
             /**
         * 删除用户
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
                                url: "http://localhost:6868/admin/deletUsers",
                                data: {
                                    user: $(this).parent().find('li').eq(0).text()
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
    new Allusers();
})