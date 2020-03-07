const express = require('express');
const mysql = require('mysql');
const multer = require('multer'); //接收文件
const bodyParser = require('body-parser'); //解析post数据
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();


app.listen(6868);
app.use(multer({ dest: './images' }).any());  //接收文件
app.use(bodyParser.urlencoded({ extended: false })); //解析post数据
app.use(bodyParser.json());
app.use(cookieParser());
let vip = {
    user: 'admin',
    password: 'admin'
} 
let vipFlag = false;  //管理员是否登录
let vipLoginTime;    //管理员登录时间
let userFlag = false; //用户是否登录
let productsOrderArr = [];//购物车
let productsNum = 0; //商品数量
//创建mysql连接池
let pool = mysql.createPool({
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "shop"
})

//用户注册
app.use('/userRegister', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            // 查找注册的用户是否已存在数据库里
            connection.query('SELECT * FROM `shopUsers` WHERE user = "' + req.query.user + '"', (err, data) => {
                if (err) {
                    console.log(`错误:${err}`)
                } else {
                    // 如果data的length等于0说明数据注册该用户名，所以可以添加信息
                    if (data.length < 1) {
                        connection.query('INSERT INTO `shopUsers`(`user`,`password`) VALUES("' + req.query.user + '","' + req.query.password + '")', (err, data) => {
                            if (err) {
                                console.log(`添加失败:${err}`)
                            } else {
                                connection.release();
                                res.send('恭喜你，注册成功！')
                            }
                        })
                    } else {
                        connection.release();
                        res.send('用户名已存在,不能注册！');
                    }
                }
            })
        }
    })
})

//用户登录
app.use('/userLogin', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            // 查找注册的用户是否已存在数据库里
            connection.query('SELECT * FROM `shopUsers` WHERE user = "' + req.query.user + '" AND password = "' + req.query.password + '"', (err, data) => {
                if (err) {
                    console.log(`错误:${err}`)
                } else {
                    // 如果data的length等于0说明数据注册该用户名，所以可以添加信息
                    if (data.length > 0) {
                        connection.release();
                        userFlag = true; //用户已登录
                        res.cookie('user', req.query.user);
                        res.send('登录成功')
                    } else {
                        connection.release();
                        res.send('用户名或密码错误！');
                    }
                }
            })
        }
    })
})

/**
 * 管理员登录
 */
app.use('/adminLogin', (req, res) => {
    if (req.query.user == vip.user && req.query.password == vip.password) {
        vipFlag = true;// 管理员已经登录
        vipLoginTime = req.query.loginTime;
        res.send('登录成功');
    } else {
        res.send('用户名或密码错误！');
    }
})

/**
 * 管理员界面
 */
app.use('/admin/loadDatas', (req, res) => {
    //判断管理员是否登录，登录成功把登录成功的时间返回
    if (vipFlag) {
        res.send(vipLoginTime);
    } else {
        res.send('请登录')
    }
})

/**
 * 注销管理员
 */
app.use('/admin/adminCancel', (req, res) => {
    vipFlag = false;//设置成false，管理员没有登录
    res.send('注销成功')
})

/**
 * 管理员添加商品
 */
app.use('/admin/add', (req, res) => {
    let reg = /^\s*$/;
    //获取要改成的文件名字
    let src = req.files[0].path + path.parse(req.files[0].originalname).ext;

    /**
     * 判断传过来的值是否为空，为空返回错误提示
     * 不为空修改文件名
     */

    if (!reg.test(req.body.productsName) && !reg.test(req.body.productsIntroduce) && !reg.test(req.body.productsPrice)) {
        //文件重命名
        fs.rename(req.files[0].path, src, (err) => {
            if (err) {
                console.log(err)
            } else {
                //去掉文件名前面的路径，得到真正的文件名
                let newSrc = path.parse(src).name + path.parse(req.files[0].originalname).ext;
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.log(`连接失败:${err}`)
                    } else {
                        //添加商品
                        connection.query('INSERT INTO `products-images` (`imgName`,`type`,`imgDetails`,`price`,`imgSrc`) VALUES ("' + req.body.productsName + '","' + req.body.type + '","' + req.body.productsIntroduce + '","' + req.body.productsPrice + '","' + newSrc + '") ', (err, data) => {
                            if (err) {
                                console.log(`错误:${err}`)
                            } else {
                                res.send('添加商品成功')
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.send('内容不能为空！！')
    }

})

/**
 * 把所有商品查询出来，放到前端
 */
app.use('/admin/allProducts', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,type,price,imgDetails,imgSrc  FROM `products-images`', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 删除商品
 */
app.use('/admin/deletProducts', (req, res) => {
    //删除文件
    fs.unlink('./images/' + req.query.imgSrc, (err) => {
        console.log(err);
    })
    //删除数据库相应数据
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('DELETE FROM `products-images` WHERE imgSrc = "' + req.query.imgSrc + '"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send('删除成功!');
                }
            })
        }
    })
})

/**
 * 所有用户名和密码查询出来
 */
app.use('/admin/allUsers', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT user,password  FROM `shopusers`', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 删除用户
 */
app.use('/admin/deletUsers', (req, res) => {
    //删除数据库相应数据
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('DELETE FROM `shopusers` WHERE user = "' + req.query.user + '"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send('删除成功!');
                }
            })
        }
    })
})

/**
 * 将所有商品信息遍历出来发到首页
 */
app.use('/indexLoadProducts', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgSrc  FROM `products-images`', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 对应商品的图片名称给前端，让前端进入展示也面
 */
app.use('/products-details', (req, res) => {
    res.send(path.parse(req.query.src).base)
})

/**
 * 商品展示页面，接收到
 */
app.use('/productsDatas', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgDetails,imgSrc  FROM `products-images` WHERE imgSrc = "' + req.query.src + '"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 精品奶茶界面加载
 */
app.use('/indexLoadProducts-tea', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgSrc,type  FROM `products-images` WHERE type="tea"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 精品蛋糕界面加载
 */
app.use('/indexLoadProducts-cake', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgSrc,type  FROM `products-images` WHERE type="cake"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 精品套餐界面加载
 */
app.use('/indexLoadProducts-mix', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgSrc,type  FROM `products-images` WHERE type="mix"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    res.send(data);
                }
            })
        }
    })
})

/**
 * 注销登录
 */
app.use('/admin-userCancel', (req, res) => {
    userFlag = false;//用户未登录
    res.clearCookie('user');//清除user cookie
    productsOrderArr.length = 0;//购物车清空
    productsNum = 0;//购物车数量清零
    res.send('0')
})

/**
 * 每次页面一刷新获取购买商品数量
 */
app.use('/admin-productsNum', (req, res) => {
    res.send({
        productsNum
    })
})

/**
 * 加入购物车时，把商品信息先传入productsOrderArr=[]中
*/
app.use('/admin-shoppingCar', (req, res) => {
    // console.log(path.parse(req.query.imgSrc).base, req.cookies.user)
    let src = path.parse(req.query.imgSrc).base;//图片hash值
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(`连接失败:${err}`)
        } else {
            connection.query('SELECT imgName,price,imgDetails,imgSrc  FROM `products-images` WHERE imgSrc = "' + src + '"', (err, data) => {
                if (err) {
                    console.log(`错误：${err}`)
                } else {
                    connection.release();
                    productsOrderArr.push(data[0]);//订单数组里传入订单
                    productsNum++;  //订单数量+1
                    res.send({
                        productsNum
                    })
                }
            })
        }
    })
})

/**
 *把 productsOrderArr里面的数据给前端
 */
app.use('/node-allOrders', (req, res) => {
    res.send(productsOrderArr)
})

/**
 * 结算
 * 删除结算的商品
 */
app.use('/checkOut', (req, res) => {
    let nowArrLength = req.query.arr.length;
    for (let i = 0; i < req.query.arr.length; i++) {
        //去掉删除的对应的下标值index
            productsOrderArr.splice(req.query.arr[nowArrLength - 1], 1);
            nowArrLength--;
            productsNum--;
    }
})

/**
 * 删除订单
 */
app.use('/deleteOrder',(req,res)=>{
    productsOrderArr.splice(req.query.index, 1);
    productsNum--;
})

app.use(express.static('../'))
app.use(express.static('../js'))
app.use(express.static('../login-register'))