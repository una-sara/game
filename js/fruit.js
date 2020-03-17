//js/fruit.js 
//功能一:创建食物功能
//1:创建食物构造函数 fruitObj
var fruitObj = function(){
   //1.1:添加食物状态属性alive true显示 false隐藏
   this.alive = [];
   //1.2:创建二个图片对象 
   this.blue = new Image();
   this.orange = new Image();
   //1.3:创建位置数组 x,y 保存食物位置
   this.x = [];
   this.y = [];
   //1.4:创建数组保存 l   图片宽度和高度
   this.l = [];
   //1.5:创建数组保存速度 spd 生长向上漂浮
   this.spd = [];
   //1.6:创建数组保存食物类型 "blue" "orange"
   this.fruitType = [];
   //1.7:创建数组保存第几个海葵
   this.aneNO = [];
}
//2:为食物构造函数添加属性 num = 30
fruitObj.prototype.num = 30;
//3:为食物构造函数添加方法 init
fruitObj.prototype.init = function(){
   //3.1:创建循环遍历数组所有食物
   for(var i=0;i<this.num;i++){
    //3.2:给食物状态位置海葵编号速度类型
    this.alive[i] = false;//初始每个海葵活动的...
    this.x[i]=0;
    this.y[i]=0;
    this.l[i]=0;
    this.aneNO[i]=0;
    this.fruitType[i]="";
    //速度..变大的速度,向上的速度
    this.spd[i] =Math.random()*0.017+0.003;//[0.005-0.015]
    this.fruitType[i]="";
   }
   //3.3:循环外部下载二张图片
   this.blue.src = "src/blue.png";
   this.orange.src = "src/blue.png";
}
//4:为食物构造函数添加方法 draw 
fruitObj.prototype.draw = function(){
   //4.1:创建循环遍每个食物
   for(var i=0;i<this.num;i++){
    //4.2:判断当前食物是否活动
    if(this.alive[i]){
      //4.3:判断当前食物类型
      if(this.fruitType[i]=="blue"){
       var pic = this.blue;
      }else{
       var pic = this.orange;
      }
      //4.4:判断当前食物宽度<=14
      //4.5:修改l
      //4.6:修改y
      if(this.l[i]<=14){
         var NO=this.aneNO[i];
         this.x[i] =ane.headx[NO];
         this.y[i] =ane.heady[NO];
         this.l[i]+=this.spd[i]*deltaTime; 
         ctx2.drawImage(pic,
         this.x[i] -this.l[i]*0.5,//出生在画布的中间
         this.y[i]-this.l[i]*0.5,
         this.l[i],
         this.l[i]);
      }else{
         //变大后向上漂
        this.y[i]-=this.spd[i]*deltaTime*3;
        //4.7:绘制食物
        ctx2.drawImage(pic,
         this.x[i]-this.l[i]*0.5, //出生画在中间
         this.y[i]-this.l[i]*0.5,
         this.l[i],
         this.l[i]);
      }
      //4.8:如果当前食物漂浮屏幕
      //4.9:将当前食物状态修改隐藏!!!!
         if(this.y[i]<10){
         this.alive[i] = false;
         }
        }//end for
    }
}
//5:将fruit.js 添加index.html
//6:在main.js 创建食物对象并且调用相关方法
//功能二:监听画布上活动(显示)食物是否有15个
//       不足 15个
//（挑一个食物：按下标第一个）
//（出生:true;类型;海葵;x,y;spd;）
//6.1:创建全局函数监听画布上食物数量
//    不足15个:挑  计算数组alive多少true
function fruitMonitor(){
  //(1)累加状态为true几个元素
  var num = 0;
  //(2)如果当前食物状态显示 ++
  for(var i=0;i<fruit.num;i++){
     if(fruit.alive[i])num++;
  }
  //console.log(num); 16:50
  if(num<15){//如果食物小鱼15个就
    sendFruit(); //挑一个食物
    return;      //一次挑一个
  }
}
//6.2:创建全局函数：挑,按下标取第一个
function sendFruit(){
   for(var i=0;i<fruit.num;i++){
      //找到第一个食物出生
      if(!fruit.alive[i]){
          fruit.born(i);//出生！！下标[i]
          return;       //一次生一个
      }
   }
}
//6.3:为构造函数添加初生食物方法 
//小心参数 i 表示第几个食物出生
fruitObj.prototype.born=function(i){
     this.aneNO[i] =Math.floor(Math.random()*ane.num);
     this.l[i] =0;//初始化时大小均为0
     this.alive[i]=true;
     this.fruitType[i]=Math.random()<0.9?"orange":"blue";




   // //(1)获取几个海葵下标
   // var idx = Math.floor(ane.num*Math.random());
   // //(2)获取当前海葵终点坐标 x,y
   // var x = ane.headx[idx];
   // var y = ane.heady[idx];
   // //(3)依据终点坐标 赋值当前食物 17:23
   // this.x[i] = x;
   // this.y[i] = y;
   // //(4)修改当前食物状态 true
   // this.alive[i] = true;
   // //(5)修改当前食物宽度高度 0
   // this.l[i] = 0;
   // //(6)修改当前食物类型
   // this.fruitType[i]=Math.random()<0.9?"blue":"orange";
   // //(7)修改当前食物速度
   // this.spd[i]=Math.random()*0.017;
}
//6.4:在main.js gameloop调用监听画布全局函数
//6.5:为构造函数添加方法:食物隐藏

//fruit.js
//程序原则:自己数据自己修改
//7:为食物构造函数添加食物消失方法
fruitObj.prototype.dead = function(i){
   this.alive[i] = false;
}