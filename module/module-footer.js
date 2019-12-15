export default (img1,img2,img3,img4)=>{
    return`
    <!-- 商家承诺 -->
    <div id="summary" class="row" style="background:#fafafa; margin-left: 0; margin-right: 0;">
        <div class="container" style="padding: 40px;">
            <div class="col-md-3">
                <div class="col-md-3 icon" style="background: url(${img1});background-size:100% 100%;height: 5rem;">
                </div>
                <div class="col-md-9" style="text-align: center;color: #f40; margin-top: 1rem;">
                    <h4>一周七天准时送货</h4>
                </div>
            </div>
            <div class="col-md-3">
                <div class="col-md-3 icon"
                    style="background: url(${img2});background-size:100% 100%; height: 5rem;">
                </div>
                <div class="col-md-9" style="text-align: center;color: #f40; margin-top: 1rem;">
                    <h4>优惠多多</h4>
                </div>
            </div>
            <div class="col-md-3">
                <div class="col-md-3 icon"
                    style="background: url(${img3});background-size:100% 100%; height: 5rem;">
                </div>
                <div class="col-md-9" style="text-align: center;color: #f40; margin-top: 1rem;">
                    <h4>优质正品</h4>
                </div>
            </div>
            <div class="col-md-3">
                <div class="col-md-3 icon"
                    style="background: url(${img4});background-size:100% 100%; height: 5rem;">
                </div>
                <div class="col-md-9" style="text-align: center;color: #f40; margin-top: 1rem;">
                    <h4>多家连锁店铺</h4>
                </div>
            </div>
        </div>
    </div>
    <!-- 版权声明 -->
    <div id="copyright">
        <div class="container">
            <div class="row" style=" text-align: center;margin-top: 2rem;">
                <p>关于我们 | 常见问题 | 安全交易 | 购买流程 | 如何付款 | 联系我们 | 合作提案</p>
                <p>Powered by babyShop </p>
                <p>Copyright © 2019-2300 豫ICP备********号</p>
            </div>
        </div>
    </div>`
}