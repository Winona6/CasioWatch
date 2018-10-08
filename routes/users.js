var express=require("express");
var router=express.Router();
var pool=require("../pool");
//用户注册
router.post("/register",(req,res)=>{
    var{uname,upwd,email,phone}=req.body;
    var sql=`INSERT INTO cs_user VALUES(NULL,?,?,?,?,NULL,NULL)`;
	pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
		if(err){
            throw error;
        }else{
            res.send({ok:1,msg:"注册成功!"});
            return;
        }
	});
})

//判断是否存在该用户(注册验证)
router.get("/isExist",(req,res)=>{
    var uname=req.query.uname;
    var sql=`SELECT uid,uname,upwd,email,phone FROM cs_user WHERE uname=?`;
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw error;
        if(result.length>0){
            res.send({code:1,msg:result});
        }else{
            res.send({code:0});
        }
    })
})

//用户登录
router.post("/signin",(req,res)=>{
    var{uname,upwd}=req.body;
    var sql="select * from cs_user where uname=? and upwd=?";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(result.length>0){
            //将用户id存在session中
            req.session.uid=result[0].uid;
            res.send({ok:1})
        }else{
            res.send({ok:0,msg:"用户名或密码错误!"})
        }
    })
})
router.get("/islogin",(req,res)=>{
    if(req.session.uid==null)
        res.send({ok:0});
    else{
        var sql="select * from cs_user where uid=?";
        pool.query(sql,[req.session.uid],(err,result)=>{
            res.send({ok:1,uname:result[0].uname});
        })
    }
})
//注销
router.get("/signout",(req,res)=>{
    delete  req.session.uid;
    res.send();
})
module.exports=router;