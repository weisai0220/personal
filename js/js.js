/**
 * Created by Administrator on 2016/4/24.
 */
var main = document.querySelector('#main');
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1877;
if(winW/winH<desW/desH){
    main.style.webkitTransform = 'scale('+winH/desH+')';
}else{
    main.style.webkitTransform = 'scale('+winW/desW+')';
}