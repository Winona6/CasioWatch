var express=require("express");
var router=express.Router();
var pool=require("../pool");
var query=require("./query");
//cartItems获得当前用户的购物车项,按编号降序排列
router.get("/",(req,res)=>{
    var sql=`select * from cs_shopping_cart where uid=? order by pid desc`;
    var uid=req.session.uid;
    pool.query(sql,[uid],(err,result)=>{
        res.send(result);
    })
})
router.get("/add",(req,res)=>{
    //三个参数
    var {pid,count}=req.query;
    var uid=req.session.uid;
    var sql="select * from cs_shopping_cart where uid=? and pid=?";
    query(sql,[uid,pid]).then(result=>{
      if(result.length==0){
        var sql="insert into cs_shopping_cart values(null,?,?,?)";
        pool.query(sql,[uid,pid,count],(err,result)=>{
          res.send();
        })
      }else{
        var sql="update cs_shopping_cart set count=count+? where uid=? and pid=?";
        pool.query(sql,[count,uid,pid],(err,result)=>{
          res.send();
        })
      }
    })
  })
  
//修改数量
router.get("/update",(req,res)=>{
    var {cid,count}=req.query;
    if(count>0){
        var sql="update cs_shopping_cart set count=? where cid=?";
        pool.query(sql,[count,cid],(err,result)=>{
            res.send();
        })
    }else{
        var sql="delete from cs_shopping_cart where cid=?";
        pool.query(sql,[cid],(err,result)=>{
            res.send();
        })
    }
})
module.exports=router;