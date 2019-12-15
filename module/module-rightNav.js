export default  ()=>{
    return`
        <div style = 'position:fixed;z-index:1; right : 0; top:0; width:3.5rem;height:100%;background:#1890ff'>
            <div id='rightNav' style='position:relative; height:100%'>
                <div id = 'icons' style = 'position:absolute;top:50%;transform:translateY(-50%) ;'>
                  
                    <p class = 'countNum' style = '
                            width:2rem;
                            height:2rem;
                            margin:0 auto;
                            line-height:2rem;
                            text-align:center;
                            border-radius:50%;
                            background:red;
                            color:#fff;
                        '></p>
                    <a href='http://localhost:6868/products-order' >
                        <i id='shoppingCar' style = '
                        margin-bottom:1rem;
                        width:3.5rem;
                        height:3.5rem;
                        display:inline-block;
                        background:url("../images/icons/shopping-car.png") 80%/80% no-repeat;
                        '></i>
                    </a>
                    <a href='http://localhost:6868/products-order' >
                        <i id='account' style = '
                        margin-bottom:1rem;
                        width:3.5rem;
                        height:3.5rem;
                        display:inline-block;
                        background:url("../images/icons/account.png") 80%/80% no-repeat;
                        '></i>
                    </a>
                    <a href='https://wpa.qq.com/msgrd?v=3&uin=417328881&site=qq&menu=yes' target="_blank">
                        <i id='qq' style = '
                        margin-bottom:1rem;
                        width:3.5rem;
                        height:3.5rem;
                        display:inline-block;
                        background:url("../images/icons/QQ.png") 80%/80% no-repeat;
                        '></i>
                    </a>
                </div>
            </div>
        </div>
        
    `
}