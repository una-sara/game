//功能:分数
// 1:创建分数构造函数dataObj
var dataObj=function(){
   //1.1:属性分数
   this.score = 0;
   //1.2:小鱼和大鱼碰到的食物数量
   this.fruitNum = 0;
   //1.3:吃到了双倍分数的,橙色果实
   this.double = 1;
   //1.4:游戏结果
     this.gameOver = false; 
   //1.5:正弦函数的角度
   this.alpha=0;
}
//小鱼和mom碰到一起mom分值,恢复
dataObj.prototype.rest=function(){
    this.fruitNum = 0;
    this.double = 1;
}
// 2:为构造函数添加绘制方法draw
dataObj.prototype.draw=function(){
    var w=can1.width;
    var h=can1.height;

    //2.1保存画笔1状态
    ctx1.save();
    //2.2修改画笔1填充样式
    ctx1.fillStyle="#fff";
    //2.3修改画笔1文字大小
    ctx1.font="35px Verdana";
    //2.4修改画笔1文字居中
    ctx1.textAlign="center";
    //2.5绘制文件
    ctx1.fillText("SCORE:"+this.score,w*0.5,h-80);
    
    if(this.gameOver){
       this.alpha +=deltaTime * 0.0003;
       this.alpha=this.alpha>1 ? 1:this.alpha;
       ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
       ctx1.font="55px Verdana";
       ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
    }
    //2.6恢复画笔1的状态
    ctx1.restore();
}
// 3:将data.js 添加index.html 
// 4:在main.js创建分数并且调用相关方法
// 5:为构造函数添加方法add
//type 大鱼吃食物类型
//2 表示吃橙色食物
//1 表示吃蓝色食物
dataObj.prototype.addScore=function(){
   this.score += this.fruitNum * 100 * this.double;
   this.fruitNum = 0;
   this.double = 1;
  // console.log(this.score);
} 