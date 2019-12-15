import userLogin from '../../module/module-userLogin.js';
userLogin()
//阻止右边账户、联系qq客服栏事件冒泡
$($('#rightNav')).on('click', (e) => {
    e.stopPropagation();
})
/**
 * 实现鼠标点击出现文字漂浮上去并消失
 */
let arr = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
let num = 0;
$(document).off('click').on('click', (e) => {
    e.stopPropagation();
    let div = `<b class='float'>${arr[num]}</b>`
    if (num < arr.length) {
        $(div).css({
            position: 'absolute',
            left: e.pageX - 8,
            top: e.pageY - 20,
            color: '#f40'
        }).appendTo($('body')).animate({
            top: e.pageY - 150,
            opacity: 0
        }, 1000, function () {
            $(this).remove()
        })
        num++;
    } else {
        num = 0;
    }
})