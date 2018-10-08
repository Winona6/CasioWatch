const express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
    var output={
        count:0,
        pageSize:12,
        pageCount:0,
        pno:req.query.pno,
        data:[]
    };
    var kw=req.query.kw;
    var kws=kw.split(" ");
    //这里不能用for in 因为str会发生按值传递
    kws.forEach((elem,i,arr)=>{
        arr[i]=`title like '%${elem}%'`;
    })
    var where=kws.join(" and ");
    var sql=`select *,(select md from cs_watch_pic where cs_watch.pid=cs_watch_pic.pid limit 1) as md from cs_watch where ${where}`;
    query(sql,[]).then(result=>{
        output.count=result.length;
        output.pageCount=
          Math.ceil(output.count/output.pageSize);
        sql+=` limit ?,?`;
        return query(sql,[output.pageSize*output.pno,output.pageSize]);
      })
      .then(result=>{
        output.data=result;
        res.send(output);     
    })
})
module.exports=router;