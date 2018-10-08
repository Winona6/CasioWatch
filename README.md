## 卡西欧官方商城（个人项目）
##### △实现技术：
###### HTML5+CSS3+JavaScript+jQuery+Ajax+session+node.js+mysql
##### △整体描述：
###### 本项目为PC端电商网站，分为首页、用户登录、注册页、商品列表页、商品详情页、购物车6个页面。服务器端
##### △部分功能描述：
######  1.首页使用jQuery实现渐入渐出式轮播图、楼层特效(点击+滚动)。利用div布局、css定位和视觉差让页面滚动时看起来背景图片随之滚动。
######  2.将登录信息存放在session中。注册时运用jQuery和正则表达式进行表单验证。
######  3.模糊查询商品，实现商品分页功能，没有上一页或下一页时按钮会禁用。
######  4.商品详情页，实现了商品的放大镜功能。可通过滑动小图查看中图，点击箭头查看更多小图。实现了无缝滚动轮播，可控制轮播方向。选项卡切换功能。
######  5.所有页面的头部和尾部都是通过ajax异步引入的。增加了代码的复用率。当用户登录成功时，会变为“欢迎+用户名”的欢迎词。

##### ☆首页
![首页](https://github.com/Winona6/ProjectView/blob/master/index.png "首页")

##### 页面为什么会有位置出现空白呢？这是因为用chrome浏览器截的长图，会看不到页面滚动时的动态效果哦~
![首页](https://github.com/Winona6/ProjectView/blob/master/index1.png "首页")
##### ☆商品详情页
![商品详情页](https://github.com/Winona6/ProjectView/blob/master/product_detail.png "商品详情页")
##### ☆商品列表页
![商品列表页](https://github.com/Winona6/ProjectView/blob/master/projects.png "商品列表页")
##### ☆注册
![登录/注册](https://github.com/Winona6/ProjectView/blob/master/register.png "登录/注册")
##### ☆购物车页
![购物车页](https://github.com/Winona6/ProjectView/blob/master/shoppingcart.png "购物车页")

##### 项目收获：
通过对网站开发，让我对开发的整体流程有所了解。服务器端使用Mysql创建数据库，使用Node.js来实现前后端数据的交互。
前端每一个贴近用户的小功能都是通过html、css、JavaScript、jQuery实现的，这加深了我对于基础的掌握。
此外，在项目开发工程中，要规范自己的代码，编码之前多思考，编码期间进行修改。养成良好的编程习惯。
适当加一些注释，方便查看。 多反思，多思考，这样会有助于代码优化。
