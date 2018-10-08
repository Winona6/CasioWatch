//异步获取首页商品
$(function(){
    $.ajax({
        url:"http://localhost:3000/index",
        type:"get",
        dataType:"json"
    }).then(products=>{
        //运动男表
        var html="";
        for(var i=0;i<8;i++){
            var {details,pic,price,href}=products[i];
            html+=`<div class="col">
            <a href="${href}" target="_blank">
            <img src="${pic}">
        </a>
        <div class="title">${details}</div>
        <div class="caption">
            <a href="${href}">
            <button>￥<strong>${price}</strong> | 立即购买</button>
            </a>
        </div>
    </div>`
    };
    $("#style-one").html(html);
    //运动女表
    var html="";
        for(var i=8;i<16;i++){
            var {details,pic,price,href}=products[i];
            html+=`<div class="col">
            <a href="product_detail.html" target="_blank">
            <img src="${pic}">
        </a>
        <div class="title">${details}</div>
        <div class="caption">
            <a href="${href}">
            <button>￥<strong>${price}</strong> | 立即购买</button>
            </a>
        </div>
    </div>`
    };
    $("#style-two").html(html);
    //商务男表
    var html="";
        for(var i=16;i<24;i++){
            var {details,pic,price,href}=products[i];
            html+=`<div class="col">
            <a href="product_detail.html" target="_blank">
            <img src="${pic}">
        </a>
        <div class="title">${details}</div>
        <div class="caption">
            <a href="${href}">
            <button>￥<strong>${price}</strong> | 立即购买</button>
            </a>
        </div>
    </div>`
    };
    $("#style-three").html(html);
    //商务女表
    var html="";
        for(var i=24;i<32;i++){
            var {details,pic,price,href}=products[i];
            html+=`<div class="col">
            <a href="product_detail.html" target="_blank">
            <img src="${pic}">
        </a>
        <div class="title">${details}</div>
        <div class="caption">
            <a href="${href}">
            <button>￥<strong>${price}</strong> | 立即购买</button>
            </a>
        </div>
    </div>`
    };
    $("#style-four").html(html);
})
//轮播
var curIndex = 0;  //当前index
//定时器自动变换3秒每次
var autoChange = setInterval(function(){ 
if(curIndex<$(".imgList li").length-1){ 
   curIndex++; 
}else{ 
   curIndex=0;
}
//调用变换处理函数
changeTo(curIndex);  
},3000);

$(".indexList").find("li").each(function(item){ 
$(this).hover(function(){ 
   clearInterval(autoChange);
   changeTo(item);
   curIndex=item;
},function(){ 
   autoChange = setInterval(function(){ 
       if(curIndex<$(".imgList li").length-1){ 
           curIndex ++; 
       }else{ 
           curIndex = 0;
       }
       //调用变换处理函数
       changeTo(curIndex);  
   },3000);
});
});
function changeTo(num){ 
$(".imgList").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
$(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
$(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
}

//楼梯楼层点亮
//先滚动到一定位置出现
var $divLift=$("#main div.btn-group");
$(window).scroll(function(){
    var $fs=$("#main div.bg-products");
      var $f1=$fs.first();
      var scrollTop=$("html,body").scrollTop()
      var offsetTop=$f1.offset().top;
      if(innerHeight/2+scrollTop>offsetTop){
        $divLift.removeClass("btn-view");
      }else{
        $divLift.addClass("btn-view");
      } 
      $fs.each((i,f)=>{
        offsetTop=$(f).offset().top;
        if(innerHeight/2+scrollTop>offsetTop){
            $(".btn-group button").eq(i)
            .addClass("btn-background")
            .siblings()
            .removeClass("btn-background");
        }
      }); 
    }); 
//点击跳转
$divLift.on("click","button",function(){
//获得点击的第几个按钮
var i=$(this).index();
var offsetTop=$(`#main div.bg-products:eq(${i})`).offset().top;
//让页面滚动到和楼层距body顶部总距离相同的位置
$("html").animate({
    scrollTop:offsetTop
},500);
 })

});


      