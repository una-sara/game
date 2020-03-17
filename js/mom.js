//js/mon.js
//功能分析:大鱼文件
//功能一:大鱼身体图片切换
//功能二:大鱼旋转面向鼠标
//1:创建大鱼构造函数monObj
var momObj=function(){
   //1.1:大鱼位置x,y
  this.x;
  this.y;
  //1.2:大鱼游动角度
  this.angle;
  //1.3:创建数组保存大鱼眼睛
  this.bigEye = [];
  //1.4:创建数组保存大鱼身体
  this.bigBody = [];
  //1.5:创建数组保存大鱼尾巴
  this.bigTail = [];
  //#由于每一张图片不相同必须全部保存
  //1.6:创建变量保存当前大鱼眼睛下标
  //再创建二个变量控制下标切换频率

  //1.7:完成大鱼眼睁切换
  this.bigEyeIndex = 0;
  this.bigEyeStart = 0; //计时开始
  this.bigEyeEnd = 3000;//计时结束

  //1.8:完成大鱼尾巴切换
  this.bigTailIndex = 0;//0~7 尾巴下标
  this.bigTailStart = 0;      //尾巴计时开始
  this.bigTailEnd = 200;      //尾巴计时结束 

  //1.9:完成大鱼身体切换
  this.bigBodyIndex = 0; //大鱼身体下标
  this.bigBodyStart = 0; //大鱼身体计时开始
  this.bigBodyEnd = 4000;//大鱼身体计时结束
}
//2:为大鱼构造函数添加方法init初始化
momObj.prototype.init=function(){
  //2.1:初始化x,y 画布中心
     this.x = canWidth*0.5;
     this.y = canHeight*0.5;
 
     //2.2:初如化游动角度 0
     this.angle = 0;
     //2.3:创建二个图片对象保存大鱼眼睛数组
     //    并且下载图片
     for(var i=0;i<2;i++){
       this.bigEye[i] = new Image();
       this.bigEye[i].src = "src/bigEye"+i+".png";
     } 
     //2.4:创建八个图片对象保存大鱼身体数组
     //    并且下载图片
     for(var i=0;i<8;i++){
       this.bigBody[i] = new Image();
       this.bigBody[i].src = "src/bigSwim"+i+".png";
     }
     //2.5:创建八个图片对象保存大鱼尾巴数组
     //    并且下载图片 
     for(var i=0;i<8;i++){
       this.bigTail[i] = new Image();
       this.bigTail[i].src = "src/bigTail"+i+".png";
     }   
}
//3:大鱼构造函数添加方法draw绘制
momObj.prototype.draw=function(){
      //3.01 累加大鱼眼睛计时到 3000切换下标
   this.bigEyeStart+=deltaTime;
   //计时结果
   if(this.bigEyeStart>this.bigEyeEnd){
   //切换下标
   this.bigEyeIndex = (this.bigEyeIndex+1)%2;
   //将计时开始清空
   this.bigEyeStart = 0;
   //如果当前下标0 睁眼睛结束时间3000
   if(this.bigEyeIndex==0){
     this.bigEyeEnd = 3000;
   }
   //如果当前下标1 闭眼睛结束时间300
   if(this.bigEyeIndex==1){
     this.bigEyeEnd = 300;
   }//if end
   }//if end
   
   //3.0.2 大鱼尾巴切换
   //#大鱼尾巴计时累加
   this.bigTailStart+=deltaTime;
   //#如果大鱼尾巴开始时间大于结束时间
   if(this.bigTailStart>this.bigTailEnd){
    //#切换大鱼尾巴下标
    this.bigTailIndex=(this.bigTailIndex+1)%8;
    //#将计时清零
    this.bigTailStart = 0;
   }

   //3.03 完成大鱼身体图片切换 
   //#累加大鱼身体计时开始 47
   this.bigBodyStart+=deltaTime;
   //#判断计时开始大开计时结束
   if(this.bigBodyStart>this.bigBodyEnd){
    //#切换图片
    this.bigBodyIndex=(this.bigBodyIndex+1)%8;
    //#清空计时开始
    this.bigBodyStart = 0;
   }

   //将鼠标位置赋值大鱼坐标
    this.x = lerpDistance(mx,this.x,0.97);
    this.y = lerpDistance(my,this.y,0.98);
    
    //3.04:修改大鱼游动角度 mom.js
    //(1)计算大鱼与鼠标之间坐标
   var deltaY = my - this.y;
   var deltaX = mx - this.x;
   //(2)计算大鱼与鼠标之间角度
   var beta = Math.atan2(deltaY,deltaX)+Math.PI;
   //(3)计算大鱼向鼠标角度慢慢调整
   this.angle = lerpAngle(beta,this.angle,0.9);

   
   //3.1:保存画笔1状态
   ctx1.save();
   //3.2:将画布原点移动大鱼身上中心
   ctx1.translate(this.x,this.y);
   //3.2:设置大鱼旋转角度
   ctx1.rotate(this.angle);
   //3.3:绘制 身体 尾巴 眼睛
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],-this.bigBody[this.bigBodyIndex].width*0.5,
    -this.bigBody[this.bigBodyIndex].height*0.5);
    //尾巴 眼睛
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
    -this.bigTail[this.bigTailIndex].width*0.5+30,
    -this.bigTail[this.bigTailIndex].height*0.5);

    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
    -this.bigEye[this.bigEyeIndex].width*0.5,
    -this.bigEye[this.bigEyeIndex].height*0.5);
    //3.7:恢复画笔1状态
    ctx1.restore();
    //1:大鱼眼睛睁时间长;闭着时间短
    //2:大鱼身体与尾巴图片切换
}
//4:将mom.js添加index.html文件中
//5:并且在main.js创建爱你大鱼对象并且调用相关方法
