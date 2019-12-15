export default ()=>{
    return `  
    <!-- header -->      
<div id="header" class="row">
    <div id="logo" class="col-md-4">
        <a href="http://localhost:6868">
            <img src="../images/logo.png" alt="首页">
        </a>
    </div>
    <div id="header-text" class="col-md-5 col-md-offset-3">
        <div class="col-md-3" id="helloAdmin">
            <h4>欢迎管理员</h4>
        </div>
        <div id="admin-login-time" class="col-md-6"></div>
        <div class="col-md-3" id="adminCancel">
            <a href="javascript:;" id="cancelClick">注销</a>
        </div>
        <!-- <div class="col-md-2"></div> -->
    </div>
</div>


    <!-- 侧边选项栏 -->
<div id="nav" class="col-md-2 ">
        <div class="row">
            <ul class="nav nav-pills nav-stacked">
                <li>
                    <h3><a href="http://localhost:6868/admin/main.html">全部商品</a></h3>
                </li>
                <li>
                    <h3><a href="http://localhost:6868/admin/addProducts.html">添加商品</a></h3>
                </li>
                <li>
                    <h3><a href="http://localhost:6868/admin/user-manage.html">用户管理</a></h3>
                </li>
            </ul>
        </div>
</div>
`
}