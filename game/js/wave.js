//功能:吃食物后奖励光环  wave.js
//光环慢慢变大变淡最后消失
// 1:创建光环构造函数
var waveObj=function(){
    //1.1:添加属性圆心
    this.x=[];
    this.y=[];
    //1.2:添加属性半径
    this.r=[];
    //1.3:添加状态 显示隐藏
    this.alive=[];
}
// 2:为构造函数添加属性 num=10
waveObj.prototype.num=10;
// 3:为构造函数添加方法 init 
waveObj.prototype.init=function(){
    //3.1:创建循环遍历每一个光环
    for(var i=0;i<this.num;i++){
        //3.2:状态false
        this.alive[i]=false;
        //3.3:半径0 
        this.r[i]=0;
        //3.4:圆心0
        this.x[i]=0;
        this.y[i]=0;
    }
}
// 4:为构造函数添加绘制 draw
waveObj.prototype.draw=function(){
    //4.1:保存画笔1状态
    ctx1.save();
    ctx1.strokeStyle="#fff";
    //4.2:创建循环遍历所有光环
    for(var i=0;i<this.num;i++){
        //4.3判断当前光环是否显示
        if(this.alive[i]){
            //4.4:当前光环半径增加
            this.r[i] += deltaTime * 0.015;
            //4.5:如果光环半径大于50
            if(this.r[i]>50){
                //4.6:将当前光环状态 false
                this.alive[i] =false;
                return;       //一次隐藏一个光环
            }
            //4.7:开始一条新路径
            ctx1.beginPath();
            //4.8:画光环
            ctx1.arc(
             this.x[i],this.y[i],
             this.r[0],0,2*Math.PI);
            //4.9:描边
            ctx1.stroke();
        }
    }
    //4.10恢复画笔1状态
     ctx1.restore();
} 
// 5:将wave.js添加index.html 
// 6:在main.js 创建光环对象并且调用相应方法
// 7:为光环的构造函数添加出生的方法
waveObj.prototype.born=function(x,y){
    //7.1:遍历循环
    for(var i=0;i<this.num;i++){
        //7.2:查找第一个状态为false光环
        if(this.alive[i]==false){
            //7.2出生
            this.alive[i]=true;//状态
            this.x[i]=x;
            this.y[i]=y;
            this.r[i]=20;
            return;   //一次出生一个
        }
    }
}

