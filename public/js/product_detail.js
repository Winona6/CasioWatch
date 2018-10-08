(()=>{
	var pid=location.search.split("=")[1];
	ajax("http://localhost:3000/details",{pid}).then(res=>{
		res=JSON.parse(res);
		var {product,pics}=res;
		var {title,price,promise}=product;
		var html=`<h3 class="title">${title}</h3>
			<div class="price"><b>销售价：</b><span>￥${price}</span></div>
			<div class="promise">
				<b>服务承诺：</b><br>
				&nbsp;&nbsp;<span>*退货无运费</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>*30天无忧退货</span><br>
				&nbsp;&nbsp;<span>*48小时快速退款</span>
				&nbsp;<span>*72小时发货</span><br>
			</div>`;
		var divDetails=document.getElementById("details");
		divDetails.innerHTML=html+divDetails.innerHTML;

		var html="";
		for(var {sm,md,lg} of pics){
			html+=`<li><img src="${sm}" data-md="${md}" data-lg="${lg}"/></li>`;
			}
		var ulImgs=document.getElementById("pic_list");
		ulImgs.innerHTML=html;	
		var mImg=document.getElementById("defaultMd");
		mImg.src=pics[0].md;
		var divLg=document.getElementById("div-lg");
		divLg.style.backgroundImage=`url(${pics[0].lg})`;
		
		ulImgs.onmouseover=function(e){
			if(e.target.nodeName=="IMG"){
				var img=e.target;
				//自定义属性
				mImg.src=img.dataset.md;
				divLg.style.backgroundImage=`url(${img.dataset.lg})`;
			}
		}
		var mask=document.getElementById("mask");
		var sMask=document.getElementById("super-mask");
		sMask.onmouseover=function(){
			mask.className=mask.className.replace("d-none","");
			divLg.className=divLg.className.replace("d-none","");
		  }
		  sMask.onmousemove=function(e){
			var {offsetX,offsetY}=e;
			var top=offsetY-100; //减mask的一半
			var left=offsetX-100;
			top=top<0?0:top>250?250:top; //解决mask出界
			left=left<0?0:left>250?250:left;
			mask.style.top=`${top}px`;
			mask.style.left=`${left}px`;
			divLg.style.backgroundPosition=`${-2*left}px ${-2*top}px`;
		  }
		  sMask.onmouseout=function(){
			mask.className+=" d-none";
			divLg.className+=" d-none";
		  }	
	//小图左右按钮
	var btnLeft=document.querySelector("div.icon-all>img")
	var btnRight=btnLeft.nextElementSibling.nextElementSibling;
	if(pics.length<=4)
	  btnRight.className+=" disabled";
	  
	  var moved=0;
	  btnLeft.onclick=function(){
		var btn=this;
		if(btn.className.indexOf("disabled")==-1){
		  moved--;
		  ulImgs.style.marginLeft=`${-moved*80}px`;
		  if(moved==0) btn.className+=" disabled";
		  if(moved<pics.length-4)
			btnRight.className=btnRight.className.replace("disabled","");
		}
	  }
	  btnRight.onclick=function(){
		var btn=this;
		if(btn.className.indexOf("disabled")==-1){
		  moved++;
		  ulImgs.style.marginLeft=`${-moved*80}px`;
		  if(pics.length-moved==4)
          btn.className+=" disabled";
        if(moved>0){
		  btnLeft.className=btnLeft.className.replace("disabled","");
		  }
	   }
		}

		var {classify,w_model,is_shock,waterproof_grade,w_type,display_type,w_function,suit,pri_function,color,material }=product;
		var html=` <tr>
			<th>分类:</th>
			<td>${classify}</td>
	</tr>                       
	<tr>
		<th>型号:</th>
		<td>${w_model}</td>
	</tr>
	<tr>
		<th>是否防震:</th>
		<td>${is_shock}</td>
	</tr>                               
	<tr>
		<th>防水等级:</th>
		<td>${waterproof_grade}</td>
	</tr>
	<tr>
		<th>手表种类:</th>
		<td>${w_type}</td>
	</tr>                       
	<tr>
		<th>显示类型:</th>
		<td>${display_type}</td>
	</tr>
	<tr>
		<th>主要功能:</th>
		<td>${w_function}</td>
	</tr>
	<tr>
		<th>人群:</th>
		<td>${suit}</td>
	</tr>
	<tr>
		<th>功能关键词:</th>
		<td>${pri_function}</td>
	</tr>
	<tr>
		<th>颜色:</th>
		<td>${color}</td>                
	</tr>
	<tr>
		<th>表带材质:</th>
		<td>${material}</td>
	</tr>`;
	document.querySelector("table.table-striped").innerHTML=html;
	})

})();
//为你推荐
$(function(){
	var oul=$('.scroll ul');
	var oulHtml=oul.html();
	oul.html(oulHtml+oulHtml)
	var timeId=null;
	var ali=$('.scroll ul li');
	var aliWidth=ali.eq(0).width();
	var ulWidth=aliWidth*ali.length;
	oul.width(ulWidth);	//1600px	
	var speed = 2;
	function slider(){
		if(speed<0){
			if(oul.css('left')==-ulWidth/2+'px'){
	 		oul.css('left',0);
		 	}
		 	oul.css('left','+=-2px');
		}	 	
		if(speed>0){
			if(oul.css('left')=='0px'){
	 		oul.css('left',-ulWidth/2+'px');
		 	}
		 	oul.css('left','+='+speed+'px');
		} 	
	 }

	 timeId = setInterval(slider,30);
	$('.scroll').mouseover(function(){
		//清除定时器
		clearInterval(timeId);
	})
	$('.scroll').mouseout(function(){
		timeId = setInterval(slider,30);
	});

	$('.goLeft').click(function(){
		speed=-2;
	});
	$('.goRight').click(function(){
		speed=2;
	});
});

//选项卡
var tab_content = $(".tab_content");
    $(".tab_menu").click(function () {
        var index = $(this).data("index");
        $(this).siblings().removeClass("tab_menu_active");
        $(this).addClass("tab_menu_active");
        $(tab_content).removeClass("tab_content_active");
        $(tab_content[index]).addClass("tab_content_active");
	});
