window.onload = function(){
    function $(id){
        return document.getElementById(id);
    }

    // 获取元素
        var js_slider = $("js_slider");
        var slider_main_block = $("slider_main_block");
        var imgs = slider_main_block.children;//获取所有的图片
        var slider_ctrl = $("slider_ctrl");//获取 span的父盒子

    //操作元素
    for(var i=0;i<imgs.length;i++){
        var span = document.createElement("span");
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length-i;
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }
    var spans = slider_ctrl.children;
    spans[1].className = "slider-ctrl-con current";

    //得到大盒子的宽度
    var scrollWidth = js_slider.offsetWidth;
    //刚进入时，留下第一张图片，其他的图都移动到右侧
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.left = scrollWidth+"px";
    }
    var iNow = 0;//当前播放的是那一张
    //遍历三个按钮的点击事件
    for(var k in spans){
        spans[k].onclick = function(){

            if(this.className == "slider-ctrl-prev"){
                    animate(imgs[iNow],{left:scrollWidth});
                    --iNow<0?iNow = imgs.length-1:iNow;
                    imgs[iNow].style.left = -scrollWidth+"px";
                    animate(imgs[iNow],{left:0});
                    setSquare();
            }else if(this.className == "slider-ctrl-next"){
                    autoplay();
            }else{
                var that = this.innerHTML-1;
                console.log(that);
                if(that>iNow){
                    animate(imgs[iNow],{left:-scrollWidth});
                    imgs[that].style.left = scrollWidth+"px";

                }else if(that<iNow){
                    animate(imgs[iNow],{left:scrollWidth});
                    imgs[that].style.left = -scrollWidth+"px";
                }
                iNow = that;
                animate(imgs[iNow],{left:0});
                setSquare();

            }
        }
    }

    //设置小方块颜色
    function setSquare(){
        for(var i=1;i<spans.length-1;i++){
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";
    }

    var timer = null;
    timer = setInterval(autoplay,2000);//开启定时器

    //定时器相当于右侧按钮
    function autoplay(){
        animate(imgs[iNow],{left:-scrollWidth});
        //先自加，后判断
        ++iNow>imgs.length-1?iNow= 0:iNow;
        imgs[iNow].style.left = scrollWidth+"px";
        animate(imgs[iNow],{left:0});
        setSquare();
    }

    js_slider.onmouseover = function(){
        console.log("清除定时器");
        clearInterval(timer);
    }

    js_slider.onmouseout = function(){
        clearInterval(timer);
        timer = setInterval(autoplay,2000);
    }
}