/**
 * Created by Administrator on 2016/4/7.
 */
//解决浏览器事件兼容性问题的方案
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if(!ele["aEvent"+type]){
        ele["aEvent"+type]=[];
        ele.attachEvent("on"+type,function(){run.call(ele)});
    }
    var a = ele["aEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn)return;
    }
    a.push(fn);
}
function run(){
    var e = window.event;//chrome也支持window.event;firefox只支持形参
    var type = e.type; //只为IE用
    if(!e.target){
        e.target = e.srcElement;
        e.stopPropagation = function(){
            e.cancelBubble = true;
        }
        e.pageX = e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY = e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault = function(){
            e.returnValue = false;
        }
    }
    var a=this["aEvent"+type];
    if(!a)return;//这句一定要有：判断a是否存在,如果不存在则退出此方法
    for(var i=0;i< a.length;i++){
        if(typeof a[i]=="function"){
            a[i].call(this,e);
        }else{
            a.splice(i,1);
            i--;
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a = ele["aEvent"+type];
    if(a&& a.length){
        for(var i=0;i< a.length;i++){
            if(a[i]==fn){
                a[i]=null;//为什么要赋值为null,而不是直接splice(i,1)
                return;
            }
        }
    }
}

//Function.prototype.bind
function processThis(fn,obj){
    return function(e){fn.call(obj,e);}
}