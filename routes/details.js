const express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/",(req,res)=>{
  var pid=req.query.pid;
  var output={};
  var sql="SELECT * FROM `cs_watch` where pid=?";
  pool.query(sql,[pid],(err,result)=>{
    output.product=result[0];
    var sql="SELECT * FROM `cs_watch_pic` where pid=?";
    pool.query(sql,[pid],(err,result)=>{
      output.pics=result; 
      res.send(output);
    })   
  })
})
module.exports=router;