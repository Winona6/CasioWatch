//使用express构建web服务器
const express=require('express');

//引入session模块
const session = require("express-session");
const bodyParser = require('body-parser');
//引入路由模块???
var users=require("./routes/users");
var index=require("./routes/index");
var details=require("./routes/details");
var products=require("./routes/products");
var cartItems=require("./routes/cartItem");

var app=express();
app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
//配置session
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间30min
  resave:false,
  saveUninitialized:true
}));
//使用路由器管理路由???
app.use("/users",users);
app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use("/cartItems",cartItems);