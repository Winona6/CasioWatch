//注册表单验证
$(function(){
    var $uname=$("#uname");
    var $upwd=$("#upwd");
    var $cpwd=$("#cpwd");
    var $email=$("#email");
    var $phone=$("#phone"); 
    var $msg1=$("div.text .msg1");
    var $msg2=$("div.text .msg2");  
    var $msg3=$("div.text .msg3");
    var $msg4=$("div.text .msg4");  
    var $msg5=$("div.text .msg5");
    $uname.focus(function(){
        $msg1.html("用户名长度在3至10位! ");
        $msg1.css("background","#9e9e9e");
        $("#zcyz").attr("disabled", true);
    });
    $uname.blur(function(){
        var uname=$uname.val();
        if($.trim(uname).length<3||$.trim(uname).length>10){
            $msg1.html("用户名长度必须在3至10位! ");
            $msg1.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }else{
            $.ajax('http://localhost:3000/users/isExist?uname='+uname).then(res=>{
                if(res.code==1){
                    $msg1.html("用户名已存在,请重输! ");
                    $msg1.css("background","#b61800");
                    $("#zcyz").attr("disabled", true);
                }else{
                    $msg1.html("用户名可以使用! ");
                    $msg1.css("background","green");
                    $("#zcyz").attr("disabled", false);
                }
            })
        };
    });
    $upwd.focus(function(){
        $msg2.html("密码长度在6至18位之间! ");
        $msg2.css("background","#9e9e9e");
        $("#zcyz").attr("disabled", true);
    });    
    $upwd.blur(function(){
        var upwd=$upwd.val();
        if($.trim(upwd)==""){
            $msg2.html("密码不能为空! ");
            $msg2.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }else if($.trim(upwd).length<6||$.trim(upwd).length>18){
            $msg2.html("密码长度必须在6至18位之间! ");
            $msg2.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }else{
            $msg2.html("密码可以使用! ");
            $msg2.css("background","green");
            $("#zcyz").attr("disabled", false);
        }
    });
    $cpwd.focus(function(){
        $msg3.html("再次输入密码!");
        $msg3.css("background","#9e9e9e");
        $("#zcyz").attr("disabled", true);
    });
    $cpwd.blur(function(){
        var upwd=$upwd.val();
        var cpwd=$cpwd.val();
        if($.trim(cpwd)==""){
            $msg3.html("确认密码不能为空! ");
            $msg3.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }if(cpwd===upwd&&cpwd!=""){
            $msg3.html("两次密码一致,验证通过! ");
            $msg3.css("background","green");
            $("#zcyz").attr("disabled", false);
        }else{
            $msg3.html("两次密码不一致,请重输! ");
            $msg3.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }
    });
    $email.focus(function(){
        $msg4.html("请输入包含@符号的邮箱!");
        $msg4.css("background","#9e9e9e");
        $("#zcyz").attr("disabled", true);
    });
    $email.blur(function(){
        var email=$email.val();
        if($.trim(email).indexOf("@")!=-1){
            $msg4.html("邮箱可以使用! ");
            $msg4.css("background","green");
            $("#zcyz").attr("disabled", false);
        }else{
            $msg4.html("邮箱格式不正确,请重输! ");
            $msg4.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }
    });
    $phone.focus(function(){
        $msg5.html("手机号不能为空!");
        $msg5.css("background","#9e9e9e");
        $("#zcyz").attr("disabled", true);
    })
    $phone.blur(function(){
        var phone=$phone.val();
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            $msg5.html("格式不正确,请重输!");  
            $msg5.css("background","#b61800");
            $("#zcyz").attr("disabled", true);
        }else{
            $msg5.html("手机号可以使用! ");
            $msg5.css("background","green");
            $("#zcyz").attr("disabled", false);
        }
    });
//用户注册
    $(".bt-register").click(function(){
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        var cpwd=$("#cpwd").val();
        var email=$("#email").val();
        var phone=$("#phone").val();
        $.ajax({
            url:"http://localhost:3000/users/register",
            type:"post",
            data:{uname,upwd,email,phone},
            dataType:"json",
            success:function(data){
                if(data.ok==1)
                {
                    alert("注册成功,2s后跳转到登录页面!");
                    setInterval(function(){
                        location.href="http://localhost:3000/login.html";
                    },2000)
                        
                }
            }
        })
    })
})