# node_shop
   - 在线奶茶点心配送系统
   - 用了server端语言选择的是node，框架使用的是express
   - 前端框架用了 bootstrap3 jquery
# 启动方式和细节
   1. 先打开cmd 输入cd server（因为node的文件在server文件夹）  
   2. 再在cmd中输入node index.js 或者 nodemon index.js（推荐使用后者nodemon，因为nodemon是热更新，nodemon需要全局安装即可。）
   3. 在浏览器地址栏输入 localhost:6868就能打开了。
   4. 有个管理员系统，需要在浏览器地址栏输入localhost:6868/admin就能进入管理员登录界面了，
   管理员的账号是admin密码也是admin，在管理员模式下可以对用户进行删除，商品进行添加和删除。
   5. 记得把根目录的shop.sql导入数据库中，否则没法使用。