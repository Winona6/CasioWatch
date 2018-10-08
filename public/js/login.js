$(function(){
    $("input.bt-login").click(function(){
        var uname=$("input.uname").val();
        var upwd=$("input.upwd").val();
        $.ajax({
            url:"http://localhost:3000/users/signin", 
            type:"post",
            data:{uname,upwd},
            dataType:"json",
            success:function(data){
                if(data.ok==0) alert(data.msg);
                else{
                    alert("登录成功,跳转页面!");
                    if(location.search.indexOf("back=")!=-1){
                    var back=location.search.slice(6);
                    location.href=back;}
                    else{
                        location.href="http://localhost:3000/index.html";
                    }
                }
            }
        })
    })
})