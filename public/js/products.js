$(function(){
    if(location.search.indexOf("kw=")!=-1){
        var kw=decodeURI(
          location.search.split("=")[1]
        );
    //定义函数loadPage封装$.ajax,定义参数pno，默认=0
    function loadPage(pno=0){
     $.ajax({
         url:"http://localhost:3000/products",
         type:"get",
         data:{kw,pno},
         dataType:"json",
         success:function(output){
             var {data,pageCount,pno}=output;
             var html="";
             for (var p of data){
                 var {pid,md,title,price}=p;
                 html+=`<div class="product-module">       
                 <a href="product_detail.html?pid=${pid}">
                 <img src="${md}">
                 <div class="details">
                    <p class="title">${title}</p> 
                    <h3>¥${price.toFixed(2)}</h3>
                 </div> 
                 </a> 
                <div class="but-cart">
                    <button> - </button>
                    <input type="text" value="1">
                    <button> + </button>
                    <div class="addcart" data-pid="${pid}">加入购物车</div>
                </div>
            </div>`
            }
            $("#plist").html(html);
            //分页功能
            var html=`<li><a href="#">&lt;上一页</a></li>`;
            for(var i=0;i<pageCount;i++){
                html+=`<li class="${i==pno?'active':''}"><a href="#" >${i+1}</a></li>`
            }
            html+=`<li><a href="#">下一页&gt;</a></li>`;
            var $ul=$("#pagelist>ul.page");
            $ul.html(html);
            //上一页、下一页禁用
            if(pno==0)
                $ul.children(":first-child").addClass("disabled");
            if(pno==pageCount-1)
                $ul.children(":last-child").addClass("disabled");   
         }
       })
     } 
     //页面首次加载时调用
     loadPage();
     $("#pagelist>ul.page").on("click","li>a",function(e){
       e.preventDefault();
       var $a=$(this);
       if($a.parent().is(":not(.active,.disabled)")){
        //i表示当前位置
         var i=$("#pagelist>ul.page>li.active>a").html()-1;
         if($a.parent().is(":first-child")){
           loadPage(i-1);
         }else if($a.parent().is(":last-child")){
           loadPage(i+1);
         }else
           loadPage($a.html()-1);
       }
     });
     //按钮+-，加入购物车
     $("#plist").on("click",".but-cart>button,.but-cart>.addcart",function(e){
         e.preventDefault();
         var $btn=$(this);
         //如果点击的是按钮
         if($btn.is("button")){
            var n=parseInt($btn.siblings("input").val());
            if($btn.html()==" + ")
               n++;
            else if(n>1)
              n--;

            $btn.siblings("input").val(n);   

            }else{
                var pid=$btn.attr("data-pid");
                var count=$btn.siblings("input").val();
                //验证是否登录
                $.ajax({
                    url:"http://localhost:3000/users/islogin",
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        if(data.ok==0){
                            alert("请先登录");
                            location.href="http://localhost:3000/login.html?back="+location.href;
                        }else{
                            $.ajax({
                                url:"http://localhost:3000/cartItems/add",
                                type:"get",
                                data:{pid,count},
                                success:function(){
                                    $btn.siblings("input").val(1);
                                    alert("添加到购物车成功！");
                                   
                                }
                            })
                        } //里层else结束
                    }
                })
            }//外层else结束
     });

    }
})