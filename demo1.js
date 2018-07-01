var person = [
    {name: '刘小华',src: '1.jpg',sex: 'male',des: '漂亮的女孩子'},
    {name: '王花',src: '2.jpg',sex: 'male',des: '漂亮的程序猿'},
    {name: '陈军',src: '3.jpg',sex: 'female',des: '我是一个学霸'},
    {name: '王华',src: '4.jpg',sex: 'female',des: '我喜欢游泳'},
    {name: '陈思思',src: '5.jpg',sex: 'male',des: '我喜欢看电影'},
    {name: '陈学习',src: '6.jpg',sex: 'female',des: '我爸我妈爱学习'},
    {name: '王美丽',src: '7.jpg',sex: 'male',des: '我妈是美丽得妈妈'}
];
var listUl = document.getElementsByClassName("list")[0];
var oInp = document.getElementsByTagName("input")[0];
var chooseUl = document.getElementsByClassName("choose")[0];
// 综合筛选
var fun = {
    text: filterText,
    sex: filterSex
}
// 初始状态值
var state = {
    text: "",
    sex: "all"
}
function mix(fn, arr) {
    return function(){
        var lastArr = arr;
        for (var prop in fn) {
            lastArr = fn[prop](state[prop], lastArr);
        }
        return lastArr;
    }
} 
var endArr = mix(fun,person);
// 插入列表
function add(arr) {
    var str = "";
    arr.forEach(function (ele, index) {
        str += '<li>\
                <img src = "img/' + ele.src + '" alt = "img">\
                <span class="name">' + ele.name + '</span>\
                <span class="des">' + ele.des + '</span>\
            </li>';
    })
    listUl.innerHTML = str;
}
add(person);

// 姓名筛选
oInp.oninput = debounce(deal,800);
function deal() {
    state.text = this.value;
    add(endArr());

}
// 防抖
function debounce(handler, delay) {
    var timer = null;
    return function(){
        var self = this;
        clearTimeout(timer);
        var arg = arguments;
        var timer = setTimeout(function () {
            handler.apply(self, arg)
        }, delay)
    }
}

function filterText(txt, arr) {
    var name = arr.filter(function (ele, index) {
        if (ele.name.indexOf(txt) !== -1) {
            return true;
        }
    })
    return name;
}
// 性别筛选
chooseUl.addEventListener("click", function (e) {
    if (e.target.tagName = "LI") {
        document.getElementsByClassName("active")[0].className = "";
        e.target.className = "active";
        state.sex = e.target.getAttribute("sex");
        add(endArr());
    }
})
function filterSex(se, arr) {
    if (se == "all") {
        return arr;
    }
    var sxy = arr.filter(function (ele, index) {
        if (se == ele.sex) {
            return true;
        }
    })
    return sxy;
}
