export default (imgName,imgDetails,price,imgSrc)=>{
    return`
        <ul class='allProducts-ul' style='text-align:center; border:.1rem solid #ccc;padding-left:0'>
            <li class='col-md-8'>
                <div class= 'col-md-1'>
                    <input type="checkbox" class='checkOrders' name="" id="" style='width:1.5rem;height:1.5rem'>
                </div>
                <div class = 'col-md-3'>
                    <img src='../images/${imgSrc}' style='width:60%;height:60%'>
                </div>
                <div class='col-md-5' style="margin-top:1rem">${imgDetails}</div>
                <div class = 'col-md-3' style="margin-top:1rem">商品名：${imgName}</div>
            </li>
            <li class='col-md-2 price' style="margin-top:1rem;color:red">${price}</li>
            <li class='col-md-2'>
                <input type='button' value='删除订单' class='deleteOrder btn btn-danger'>
            </li>
        </ul>
    `
}