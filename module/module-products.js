export default (imgSrc,productsIn,price)=>{
    return `
                <div class = 'col-md-3'>
                    <div class = 'productsBox'>
                        <div class = 'productsImg'>
                            <img src = '${imgSrc}'>
                            <div class = 'mark'>
                                <p class = 'col-md-6 col-md-offset-3'>查看详情</p>
                            </div>
                        </div>
                        <div class = 'productsIn'>
                            <h4>${productsIn}</h4>
                            <b class = 'price'>${price}</b> 
                            <input type='button' class='btn btn-danger' value = '加入购物车'>
                        </div>
                    </div>
                </div>

            `
}