/**
 * Created by Administrator on 2016/4/22.
 */
$(function(){
    var $li = $('#list').find('>li');
    var viewHeight = $(window).height();
    var viewWidth = $(window).width();
    var desW = 640;
    var desH = 960;
    if(viewWidth/viewHeight<desW/desH){
        $('#main').css('height',viewHeight*viewHeight/desH);
    }else{
        $('#main').css('height',viewHeight*viewWidth/desW);
    }
    //$('#main').css('height',viewHeight);
    slidePage();
    function slidePage(){
        var nowPage = 0;
        var prevnextPage = 0;
        var step = 1/4;
        var bBtn = true;
        $li.on('touchstart',function(ev){
            if(!bBtn) return;
            bBtn = false;
            var touch = ev.originalEvent.changedTouches[0];
            var downY = touch.pageY;
            nowPage = $(this).index();
            $li.on('touchmove.move',function(ev){
                var touch = ev.originalEvent.changedTouches[0];
                $(this).siblings().hide();
                if(touch.pageY<downY){
                    prevnextPage = nowPage ==$li.length-1?0:nowPage+1;
                    $li.eq(prevnextPage).css('transform','translate(0,'+(viewHeight+touch.pageY-downY)+'px)');
                }else if(touch.pageY>downY){
                    prevnextPage = nowPage ==0?$li.length-1:nowPage-1;
                    $li.eq(prevnextPage).css('transform','translate(0,'+(-viewHeight+touch.pageY-downY)+'px)');
                }else{
                    bBtn = true;
                }
                $(this).css('transform','translate(0,'+(touch.pageY-downY)+'px) scale('+(1-Math.abs(touch.pageY-downY)/viewHeight*step)+')');
                $li.eq(prevnextPage).show().addClass('zIndex');
               ev.preventDefault();
            });
            $li.on('touchend.move',function(ev){
                var touch = ev.originalEvent.changedTouches[0];
                if(touch.pageY<downY){
                    $(this).css('transform','translate(0,'+(-viewHeight*step)+'px) scale('+(1-step)+')');
                }else if(touch.pageY>downY){
                    $(this).css('transform','translate(0,'+(viewHeight*step)+'px) scale('+(1-step)+')');
                }
                $(this).css('transition','0.3s');
                $li.eq(prevnextPage).css('transform','translate(0,0)');
                $li.eq(prevnextPage).css('transition','0.3s');
                $li.off('.move');
            })
        })

        $li.on('transitionEnd webkitTransitionEnd',function(ev){
            if(!$li.is(ev.target)) return;
            resetFn();
        });
        function resetFn(){
            $li.eq(prevnextPage).removeClass('zIndex').siblings().hide();
            $li.css('transition','');
            bBtn = true;
        }
    }
})