/**
 * Created by Administrator on 2016/3/13.
 */
/**
 * Created by Administrator on 2016/3/13.
 */
//-->想要操作谁就先获取谁
var oTab = document.getElementById("tab");
var oHead = oTab.tHead;
var oThs = oHead.rows[0].cells; //获取所有的列
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

var data = null;
//-->1、首先获取后台(data.txt)中的数据"JSON格式的字符串"-->Ajax(async javascript and xml)
//----->1.首先创建一个Ajax对象
var xhr = new XMLHttpRequest;
//----->2.打开我们需要请求数据的那个文件地址
xhr.open("get","json/data.txt",false);
//----->3.监听请求的状态
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
};
//----->4.发送请求
xhr.send(null);

//-->2、实现我们的数据绑定
function bind(){
    var frg = document.createDocumentFragment();
    for(var i = 0;i < data.length; i++){
        var cur = data[i];

        var oTr = document.createElement("tr");//每一次循环创建一个TR
        //每一个TR中还要创建四个TD，因为每一个对象中都有四组键值对
        for(var key in cur){
            var oTd = document.createElement("td");
            if(key == "sex"){
                oTd.innerHTML = cur[key] ===0 ? "男" : "女";
            }else{
                oTd.innerHTML = cur[key];
            }
           // oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
}
bind();

//--->3、实现隔行变色
function changeBg(){
    for(var i=0;i<oRows.length;i++){
        oRows[i].className = i%2 ===1?"bg":null;
    }
}
changeBg();

//---->4、编写表格排序的方法：按照年龄这一列进行排序
function sort(n){//-->n是当前点击这一列的索引
    var _this = this;
    //-->把存储所有行的类数组转换为数组
    var ary = utils.listToArray(oRows);
    //-->点击当前列，需要让其他的列的flag存储的值回归到初始值-1，这样再返回头点其他列才是按照升序排列
    for(var k=0;k<oThs.length;k++){
        if(oThs[k]!==this){
            oThs[k].flag=-1;
        }
    }

    //-->给数组排序
    _this.flag *= -1;//每一次执行sort，进来的第一步就是先让flag的值*=-1
    ary.sort(function(a,b){
        var curInn = a.cells[n].innerHTML;
        var nexInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(a.cells[n].innerHTML);
        var nexInnNum = parseFloat(b.cells[n].innerHTML);
        if(isNaN(curInnNum)||isNaN(nexInnNum)){
            return (curInn.localeCompare(nexInn))*_this.flag;
        }
        return (curInn-nexInn)*_this.flag;

    });

    //-->按照ary中的最新顺序，把每一行重新的添加到tBody中
    var frg = document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;

    //--->按照最新的顺序实现隔行变色
    changeBg();
}
//5、点击第二列实现排序--->所有具有class="cursor"这个样式的列都可以实现点击排序
for(var i=0;i<oThs.length;i++){
    var curTh = oThs[i];

    if(curTh.className === "cursor"){
        curTh.index = i;
        curTh.flag=-1;
        curTh.onclick = function(){
            sort.call(this,this.index);
        }
    }
}
/*
oThs[1].flag = 1;//-->给当前点击这一列增加一个自定义属性flag ,默认值是-1
oThs[1].onclick = function(){

   // sort(); //--->sort中的this是window
    sort.call(this);

};*/