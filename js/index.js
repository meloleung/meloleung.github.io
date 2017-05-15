//顶部广告
$('#top-banner-close').click(function () {
    $('#top-banner').fadeOut(500);
});

$('.shortcut .fl').mouseenter(function () {
    $('.shortc-dz').show();
    $('.shortc-bq').css({'backgroundColor':'white'});
    $('.shortc-bq i').addClass('sc-bg')
});
$('.shortcut .fl').mouseleave(function () {
    $('.shortc-dz').hide();
    $('.shortc-bq').css({'backgroundColor':'#E3E4E5'});
    $('.shortc-bq i').removeClass('sc-bg');
});

$('.shortc-dz .item').click(function () {
    $(this).find('a').addClass('selected').parent().siblings('div').find('a').removeClass('selected');
    $('.shortc-bq span').text($(this).find('a').text());
});

$("#j_mobile").mouseenter(function () {
    $("#j_mobile_pop").show();
});
$("#j_mobile").mouseleave(function () {
    $("#j_mobile_pop").hide();
});
$('.mobile_static_qrcode').mouseenter(function () {
    $("#j_mobile_pop").show();
});
$('.mobile_static_qrcode').mouseleave(function () {
    $("#j_mobile_pop").hide();
});


$('#settleup').mouseenter(function () {
    $('#settleup .settleup-layer').show();
});
$('#settleup').mouseleave(function () {
    $('#settleup .settleup-layer').hide();
});


$('#search-inp').focus(function () {
    if(this.value==="数码相机"){
        this.value="";
    };
});
$('#search-inp').blur(function () {
    if(this.value===""){
        this.value="数码相机";
    };
});


$(window).scroll(function () {

    if($(document).scrollTop()>660){
        $('#search').addClass('search-fix');

        $('#search').animate({'top':'0'},1000);
        $('#search').find('.form').css({'top':'6px'})


    }else{

        $('#search').removeClass('search-fix');
        $('#search').find('.form').css({'top':'25px'});

        }




});


$('.upload-bg').mouseenter(function () {
    $(this).css({"background-position":"-30px 0px"});
});
$('.upload-bg').mouseleave(function () {
    $(this).css({"background-position":"0px 0px"});
});

$('.upload-bg').click(function () {
    $('#search-inp-2').trigger('click');
})
$('#search-inp-2').click(function () {

});


(function () {
    var activeRow;
    var activeMenu;
    var catePop =$('.cate_pop');
    var timer;

    var mouseInCp =false;


    catePop.on('mouseenter', function () {
        mouseInCp =true;
    }).on('mouseleave', function () {
        mouseInCp =false;
    });

    var mouseTrack =[];

    var moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        });
      
        if(mouseTrack.length >3){
            mouseTrack.shift()
        }
    };
    $('.cate_menu_item').bind('mouseenter',moveHandler);

    $('.cate').on('mouseenter','li',function (e) {


        if(!activeRow){
            activeRow = $(e.target);
            activeRow.addClass('active-3');
            activeMenu =$('.cate-pop-'+activeRow.data('id'));
            activeMenu.addClass('show');
            return;
        }

        //去除抖动
        if(timer){
            clearTimeout(timer)
        }

        var currMousePos = mouseTrack[mouseTrack.length-1];

        var leftCorner =mouseTrack[mouseTrack.length-2];

        //判断需不需要延迟
        var delay =needDelay(catePop,leftCorner,currMousePos);
        if(delay){

            //二级页面延迟
                timer =setTimeout(function () {
                    if(mouseInCp){
                        return;
                    }
                    if(activeRow){
                    activeRow.removeClass('active-3');
                    activeMenu.removeClass('show');

                    activeRow =$(e.target);
                    activeRow.addClass('active-3');
                    activeMenu =$('.cate-pop-'+activeRow.data('id'));
                    activeMenu.addClass('show');
                    timer =null;
                    }
                },300);
            } else {
                var preActiveRow =activeRow;
                var preActiveMenu =activeMenu;

                preActiveRow.removeClass('active-3');
                preActiveMenu.removeClass('show');

                activeRow =$(e.target);
                activeMenu =$('.cate-pop-'+activeRow.data('id'));


                activeRow.addClass('active-3');
                activeMenu.addClass('show');
            }

     
    });
    $('.cate').mouseleave(function () {

        if(activeRow){
            activeRow.removeClass('active-3');

            activeRow =null;

        }
        if(activeMenu){
            activeMenu.removeClass('show');
            activeMenu =null;
        }

    });
})();



//异或判断是否同向
function sameSign(a,b) {
    return (a ^ b) >=0
}
//向量坐标
function vector(a,b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}
//向量叉乘
function vectorProduct(v1,v2) {
    return v1.x *v2.y - v1.y *v2.x
}
//获取向量值
function isPointInTrangle(p,a,b,c) {
    var pa =vector(p,a);
    var pb =vector(p,b);
    var pc =vector(p,c);

    var t1 =vectorProduct(pa,pb);
    var t2 =vectorProduct(pb,pc);
    var t3 =vectorProduct(pc,pa);

    return sameSign(t1,t2) && sameSign(t2,t3)
}

function needDelay(elem,leftCorner,currMousePos) {
    var offset =elem.offset();
    var ele =$('#main').offset();

    var topLeft ={
        x: 548,
        y: ele.top
    };

    var bottomLeft ={
        x: 548,
        y: ele.top +elem.height()
    };

    return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft)
}


(function (){
    var left =$('.slider_control_prev');
    var right =$('.slider_control_next');
    var pic =$('.slider_item');
    var num =$('.slider_indicator_btn');
    var slider =$('.slider_main');
    var timer =null;
    var index =0;
    var flag =true;

    left.click(function () {

        if(flag===true){

            index--;
            if(index<0) {index =num.length-1};
            changePic(index,flag);
            flag =false;
        }
    });

    right.click(function () {
        index++;
        if(index>=num.length) {index =0};
        changePic(index,flag);
        flag =false;
    });

    
    timer =setInterval(run,2500);

    function run() {
        index++;
        if(index>=num.length) {index =0};
        changePic(index,true);
    }

    //停止定时器
        slider.mouseenter(function () {
            clearInterval(timer);
        });

        //鼠标移开，开启定时器
        slider.mouseleave(function () {

            timer =setInterval(run,2000);
        });

    //鼠标划上圆点
    for (var i = 0; i < num.length; i++) {
        num[i].id =i;
        num[i].onmouseover =function () {

            changePic(this.id,true);
        }

    }


    //封装函数changePic
    function changePic(curindex,flag){
        if(flag){
            pic.stop().animate({opacity: '0',zIndex:'0'});
            num.removeClass('active');
        $(pic[curindex]).stop().animate({opacity: '1',zIndex:'1'},1000, function () {
            flag =true;
        });
        $(num[curindex]).addClass('active');
        index =curindex;}
    }


})();

$('.slider_main').mouseenter(function () {
    $('.slider_control_item').css('display','block');
});

$('.slider_main').mouseleave(function () {
    $('.slider_control_item').css('display','none');
});


$('.tab_head_2').mouseenter(function () {
    $('.news_tab_active').css({'-webkit-transform': 'translateX(52px)',
        '-moz-transform': 'translateX(52px)',
        '-ms-transform': 'translateX(52px)',
        '-o-transform': 'translateX(52px)',
        'transform': 'translateX(52px)'});

    $('.tab_content_item_2').show();
    $('.tab_content_item_1').hide();
});
$('.tab_head_1').mouseenter(function () {
    $('.news_tab_active').css({
        '-webkit-transform': 'translateX(0px)',
        '-moz-transform': 'translateX(0px)',
        '-ms-transform': 'translateX(0px)',
        '-o-transform': 'translateX(0px)',
        'transform': 'translateX(0px)'});

    $('.tab_content_item_2').hide();
    $('.tab_content_item_1').show();
});


$('.service_item:lt(4)').mouseenter(function () {
    $('.service_1k:lt(4)').css({
        '-webkit-transform': 'translateY(-38px)',
        '-moz-transform': 'translateY(-38px)',
        '-ms-transform': 'translateY(-38px)',
        '-o-transform': 'translateY(-38px)',
        'transform': 'translateY(-38px)'});

    $('.service_item:lt(4)').find('span').css({
        'border-top-color': '',
        'color' :''
    });

    $(this).find('span').css({
        'border-top-color': '#e01121',
        'color' :'#e01121'
    });

    $('.service_2').css({
        'transform': 'translate3d(0,-100%,0)',
        'top': '210px'});

});


$('.service_2_close').click(function () {
    $('.service_2').css({'transform': 'translate3d(0,0,0)'});
    $('.service_1k:lt(4)').css({
        '-webkit-transform': 'translateY(0px)',
        '-moz-transform': 'translateY(0px)',
        '-ms-transform': 'translateY(0px)',
        '-o-transform': 'translateY(0px)',
        'transform': 'translateY(0px)'});

    $('.service_item:eq(3)').unbind();

    $('.service_item:lt(4)').find('span').css({
        'border-top-color': '',
        'color' :''
    });

    $('.service_item:eq(3)').mouseleave(function () {

        $('.service_item:eq(3)').mouseenter(function () {
            $('.service_1k:lt(4)').css({
                '-webkit-transform': 'translateY(-38px)',
                '-moz-transform': 'translateY(-38px)',
                '-ms-transform': 'translateY(-38px)',
                '-o-transform': 'translateY(-38px)',
                'transform': 'translateY(-38px)'});

            $('.service_item:lt(4)').find('span').css({
                'border-top-color': '',
                'color' :''
            });

            $(this).find('span').css({
                'border-top-color': '#e01121',
                'color' :'#e01121'
            });

            $('.service_2').css({
                'transform': 'translate3d(0,-100%,0)',
                'top': '210px'});

        });


    });

});


(function (){
    var index =0;
    var left =$('.sk-controls-prev');
    var right =$('.sk-controls-next');
    var pic =$('.sk-bt-list');
    var timer =null;


    left.click(function () {
        index++;

        if(index>0) {

            pic[0].style.left = -2*1000 + "px";
            index =-1;
        }


        changePic(index);
});

    right.click(function () {
        index--;

        if(index<-2) {

            pic[0].style.left = 0;
            index=-1;
        }

        changePic(index);


});

    function changePic(curindex){
        clearInterval(timer);
        var target =curindex*1000;
        timer =setInterval(function () {

            var step =(target-pic[0].offsetLeft)/10;

            step = step>0?Math.ceil(step):Math.floor(step);

            pic[0].style.left =pic[0].offsetLeft +step +  "px";

            if(Math.abs(target-pic[0].offsetLeft)<Math.abs(step)){
                pic[0].style.left = target +"px";
                clearInterval(timer);
            }
        },20);

    }

})();


(function countDown() {
    var tatolHour = 3;
    var tatolsec =3*60*60+1;


    var timer =setInterval(function () {

        if(tatolsec<=0){
            clearInterval(timer);
            console.log('秒杀活动已结束');
            return;
        }
        tatolsec--;
        var hour =Math.floor(tatolsec/60/60);

        var mins =Math.floor(tatolsec%3600/60);

        var sec =Math.floor(tatolsec%60);

        //个位
        var ghour = hour%10;
        //十位
        var shour =Math.floor(hour/10);

        var gmins =mins%10;

        var smins =Math.floor(mins/10);

        var gsec =sec%10;

        var ssec =Math.floor(sec/10);

        var gshour =''+shour+ghour;

        var licd= $('.cd-item');

        licd[0].innerHTML =gshour;
        licd[1].innerHTML =''+smins+gmins;
        licd[2].innerHTML =''+ssec+gsec;
    },1000)


})();



(function (){
    var left =$('.rank-m-prev');
    var right =$('.rank-m-next');
    var pic =$('.rm-bt-item');
    var num =$('.sup-ind-item');
    var slider =$('.rank-m-bt');
    var timer =null;
    var index =0;


    left.click(function () {
        index--;
        if(index<0) {index =num.length-1};
        changePic(index);
    });

    right.click(function () {
        index++;
        if(index>=num.length) {index =0};
        changePic(index);
    });


    timer =setInterval(run,2000);

    function run() {
        index++;
        if(index>=num.length) {index =0};
        changePic(index);
    }

    slider.mouseenter(function () {
        clearInterval(timer);
    });

    slider.mouseleave(function () {

        timer =setInterval(run,2000);
    });

    for (var i = 0; i < num.length; i++) {
        num[i].id =i;
        num[i].onmouseover =function () {

            changePic(this.id);
        }

    }


    function changePic(curindex){

            pic.removeClass('active-2').stop().animate({opacity: '0'});
            num.removeClass('active');

        $(pic[curindex]).addClass('active-2').stop().animate({
            opacity: '1'
        },500);
        $(num[curindex]).addClass('active');
        index =curindex;
    }


})();

$('.r-bt-head a').mouseenter(function () {
    var a =$(this).index();
    $('.hd-tab-active').css({'transform':'translateX('+$(this).index()*78+'px'});

    $('.r-bt-bt-item').eq(a).addClass('show').siblings('div').removeClass('show');

});



$(window).scroll(function () {
    var leftban =$('#left-banner');

    var oTop =$('.lq-banner-1')[0].offsetTop-30;

    var scTop =$(document).scrollTop();

    var leader =scTop;

    var timer =null;



    if(scTop>oTop){
        leftban.fadeIn(600);
    }
    if($(document).scrollTop()<oTop){
        leftban.stop(true,false).fadeOut(600);
    }

        var lnitem =document.getElementsByClassName('lnav-item');

    for (var i = 0; i < lnitem.length; i++) {
        lnitem[i].index =i;
        if($(document).scrollTop()>lnitem[i].offsetTop-150){

            $('.left-banner-item').eq(i).addClass('left-b-item-on').siblings('li').removeClass('left-b-item-on')
        }
    }

    var lbi =document.getElementsByClassName('left-banner-item');
    for (var j=0;j<lbi.length;j++){
        lbi[j].id =j;
        lbi[j].onclick = function () {
            target =lnitem[this.id].offsetTop-50;

            clearInterval(timer);

            timer =setInterval(function () {
                var step =(target - scTop)/10;

                step =step>0?Math.ceil(step):Math.floor(step);

                leader =leader +step;

                window.scrollTo(0,leader);

                if(Math.abs(target-leader)<=Math.abs(step)){
                    window.scrollTo(0,target);
                    clearInterval(timer);
                }

            },25)
        }
    }

    $('.left-banner-item1').click(function () {
        target =0;

        clearInterval(timer);

        timer =setInterval(function () {
            var step =(target - scTop)/10;

            step =step>0?Math.ceil(step):Math.floor(step);

            leader =leader +step;

            window.scrollTo(0,leader);

            if(Math.abs(target-leader)<=Math.abs(step)){
                window.scrollTo(0,target);
                clearInterval(timer);
            }
        },25)
    })

});


$('.jd-toolbar-tab')
    .mouseover(function () {
        $(this).find('em').addClass('tab-text-hover')
    }).mouseleave(function () {
    $(this).find('em').removeClass('tab-text-hover')
});


