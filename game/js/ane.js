//功能:完成海葵类
// 1:创建海葵构造函数 aneObj
var aneObj=function(){
    // console.log(1);
    //1.1:创建变量保存起点坐标x  [y=600不用]
    this.rootx =[];
    //1.2:创建变量保存终点坐标x
    this.headx=[];
    //1.3:创建变量保存终点坐标y
    this.heady=[];
    //1.4:创建变量保存摆动幅度amp 20~50
    this.amp=[];
    //1.5创建变量保存-1~1 之间值
    this.alpha=0;
}
// 2:为海葵构造函数添加属性 num=50
aneObj.prototype.num=50;
// 3:为海葵构造函数添加方法 init 
aneObj.prototype.init=function(){
    // console.log(2);
    for(var i=0;i<this.num;i++){
        //3.1:初始化海葵起点x坐标 y固定值 600
        this.rootx[i]=i*16+Math.random()*20;
        //3.2:初始化海葵终点x坐标[初始值直线]
        this.headx[i]=this.rootx[i];
        //3.3:初始化海葵终点y坐标
        this.heady[i]=canHeight-250+Math.random()*50;
        //3.5:初始化海葵摆动幅度
        this.amp[i]=Math.random()*30+20;
    }//for end 
}
// 4:为海葵构造函数添加方法 draw
aneObj.prototype.draw=function(){
    // console.log(3);
    //4.1:计算非常小的小数
    this.alpha +=deltaTime * 0.0008;
    //4.2:依据小数通过正弦函数获取-1 ~ 1
    var l=Math.sin(this.alpha);
    //console.log(l);//4~5s周期
    //4.3保存画笔2状态 #原因不希望其他元素影响海葵
    ctx2.save();
    //4.4设置样式与外观
    ctx2.strokeStyle="#3b154e";//描边样式
    ctx2.globalAlpha=0.6;//透明度
    ctx2.linecap="round";//顶端圆角
    ctx2.lineWidth=20;//描边宽度
    //4.5创建循环遍历每个海葵
    for(var i=0;i<this.num;i++){
    //4.6创建新路径
    ctx2.beginPath();
    //4.7移动到起点坐标
    ctx2.moveTo(this.rootx[i],canHeight);
    //4.8重新计算终点坐标x
    this.headx[i] =this.rootx[i]+l*this.amp[i];
    //4.9绘制贝塞尔曲线 控制点x,y 终点x,y
    ctx2.quadraticCurveTo(
        this.rootx[i],canHeight-100,
        this.headx[i],this.heady[i]
    );
    //4.10描边
    ctx2.stroke();
    }//for end
    //4.11:恢复画笔状态
    ctx2.restore();
}
// 5:将ane.js添加index.html文件中
// 6:在main.js创建海葵对象
// 并且调用方法