var person = [
    { name: '刘小华', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '陈军', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '陈学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '王美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' }
];
var listUl = document.getElementsByClassName("list")[0];
var put = document.getElementsByTagName("input")[0];
var sexUl = document.getElementsByClassName("choose")[0];
var str = {
    text: "",
    sex: "All"
}
function add(arr){
    var str = '';
    arr.forEach(function(ele,index){
        str += '<li>\
            <img src = "img/' + ele.src + '" alt = "img" >\
            <span class="name">' + ele.name + '</span>\
            <span class="des">' + ele.des + '</span>\
            </li>';
        listUl.innerHTML = str;
    })
}
add(person); 
// 姓名筛选已解决问题(变量名)
function deal(){
    str.text = this.value;
    add(mix(fun,person));
}
function filterText(text,arr){
    return arr.filter(function(ele,index){
        if(ele.name.indexOf(text) !== -1){
            return true;
        }
    })
}
// 防抖
put.oninput = debounce(deal, 600);
function debounce(handler, delay) {
    var timer = null;
    return function () {
        var self = this;
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handler.apply(self, arg);
        }, delay)
    }
}

// 性别筛选已解决问题(双等号！！)
sexUl.addEventListener("click",function(e){
    if(e.target.tagName = "LI"){
        str.sex = e.target.getAttribute("sex");
        document.getElementsByClassName("active")[0].className = "";
        e.target.className = "active";
        add(mix(fun,person));
    }
})
function filterSex(se,arr){
    if(se == "all"){
        return arr;
    }else{
        return arr.filter(function(ele,index){
            if(ele.sex == se){
                return true;
            }
        });
    }
}
// 组合筛选
var fun = {
    text:filterText,
    sex:filterSex
}
function mix(fn,arr){
    var lastArr = arr;
    for(var prop in fn){
        lastArr = fn[prop](str[prop],lastArr);
    }
    return lastArr;
}

