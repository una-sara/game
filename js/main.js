//#main.js
//功能1:创建很多全局变量保证游戏中不同角色
//可以相互调用
//功能2:创建游戏中所有角色对象
//功能3:调用所有角色绘制方法
//1.1创建2个全局变量保存2个画布
var can1;
var can2;
//1.2创建2个全局变量保存2只画笔
var ctx1;
var ctx2;
//1.3创建2个全局变量保存画布宽度和高度
var canWidth;
var canHeight;
//1.4创建2个全局变量保存2帧画面之间的时间差
var lastTime;//上一帧被执行的时间
var deltaTime;//时间差(绘制游戏中内容所花的时间)
//1.5创建全局变量保存背景图片对象
var bgPic;
//1.6创建全局变量保存海葵对象
var ane;
//1.7创建全局变量食物对象
var fruit;
//1.8创建全局变量保存大鱼对象
var mom;
//1.9:创建全局变量保存鼠标位置
var mx=0;
var my=0;
//1.10:创建全局变量保存分数
var data;
//1.11:创建全局变量保存光环
var wave;
//1.12:创建全局变量保存小鱼
var baby;
//1.12:创建全局变量保存大鱼喂小鱼食物
var halo;
//1.13:创建全局变量漂浮物
var dust;
//1.14:
const DEBUG=true;


//2:创建函数 game
function game(){
    // console.log(1);
    init();
    gameloop();
}
//3:创建函数init
function init(){
  //3.1:初始化两个画布对象
  can1 = document.getElementById("canvas1");
  can2 = document.getElementById("canvas2");
  //3.2:初始化两个画笔对象
  ctx1 = can1.getContext("2d");
  ctx2 = can2.getContext("2d");
  //3.3:初始化画布宽度和高度9:37
  canWidth = can1.width;
  canHeight = can1.height;
  //3.4:初始化时间差
  //3.5:记录没有绘图开始时间
  lastTime = Date.now();
  //3.6:时间差初始为0
  deltaTime = 0;
  //3.7:创建背景图片对象并且下载指定图片
  bgPic = new Image();
  bgPic.src = "src/background.jpg";
  //3.8:创建海葵对象并且调用初始化方法
  ane = new aneObj();
  ane.init();
  //3.9:创建食物对象并且调用初始化方法
  fruit = new fruitObj();
  fruit.init();
  //3.10:创建大鱼对象并且调用初始化方法
  mom = new momObj();
  mom.init();
  mx =canWidth * 0.5;
  my =canHeight * 0.5;
  //3.11:为画布一绑定鼠标移动事件
  can1.addEventListener("mousemove",onMouseMove,false);
  //3.12:创建分数对象
  this.data=new dataObj();
  //3.13:创建光环对象并且调用初始化方法
  wave=new waveObj();
  wave.init();
  //3.14:创建小鱼对象并且调用初始化方法
  baby =new babyObj();
  baby.init();
  //3.15:创建大鱼喂小鱼食物对象并且调用初始化方法
  halo=new haloObj();
  halo.init();
  //3.16:创建漂浮物对象并且调用初始化方法
  dust=new dustObj();
  dust.init();
}
//4:创建函数gameloop
function gameloop(){
    // console.log(3);
    //4.1创建定时器执行gameloop 多次调用结果
    requestAnimationFrame(gameloop);
    //4.2获取刚才绘制完成时间点
    var now=Date.now();
    //4.3将完成时间点减去没绘制图形时间开始点
    deltaTime=now-lastTime;
    //4.4将上一个时间点修改  now 
    lastTime=now;
   // console.log(deltaTime);//12-100ms
   if(deltaTime>40) deltaTime =40;
   
   //4.5直接绘制背景图片
    ctx2.drawImage(bgPic,0,0);
    //4.5.1:调用大鱼碰撞食物方法
    momFruitCollison();
    //4.6绘制海葵
    ane.draw();
    //4.6.1:调用监听画布函数
    fruitMonitor();
    //4.7绘制食物
    fruit.draw();
    momFruitCollison();
    momBabyCollision();
    //4.7.1清除画布一所有元素
    ctx1.clearRect(0,0,canWidth,canHeight);
    //4.8绘制大鱼
    mom.draw();
    //4.9绘制分数
    data.draw();
    //4.10绘制光环
    wave.draw();
    //4.11绘制小鱼
    baby.draw();
    //4.12绘制大鱼喂小鱼食物
    halo.draw();
    //4.13绘制漂浮物
    dust.draw();
}



//5:当网页加载成功后调用 game
document.body.onload=game;
//6:创建函数处理鼠标移动事件
function onMouseMove(event){
  //获取鼠标坐标赋值  
  // mx=event.offsetX;
  // my=event.offsetY;
  //游戏结束,鼠标不能控制大鱼
  if(data.gameOver){return;}
  if(event.offsetX || event.layerX){
    mx=event.offsetX == undefined ? event.layerX :event.offsetX;
  }
  if(event.offsetY || event.layerY){
    my=event.offsetY == undefined ? event.layerY : event.offsetY;
  }
}