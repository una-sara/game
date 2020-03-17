//body.js  小鱼文件
//功能一:绘制小鱼尾巴眼睛身体
//功能二:小鱼跟着大鱼游动
//1:创建小鱼的构造函数babyObj
var babyObj=function(){ 
    //1.1:小鱼位置坐标
    this.x;
    this.y;
    //1.2:小鱼游动角度
    this.angle;
    //1.3:小鱼眼睛身体尾巴图片
    this.babyEye=[];
    this.babyBody=[];
    this.babyTail=[];
    //1.4:创建九个变量完成图片切换
    this.babyEyeIdx=0;//眼睛下标
    this.babyEyeEndtime = 2000;//眼睛计时开始
    this.babyEyeStart = 1; ;//眼睛计时结束


    this.babyBodyIdx = 0;
	this.babyBodyEndtime = 3000;
    this.badyBodyStart = 1;

    this.babyTailIdx = 0;
	this.babyTailEndTime = 1000;
	this.babyTailStart = 1;
    // this.babyBodyIndex=0;//身体下标
    // this.babyBodyStart=1;//身体计时开始
    // this.babyBodyEnd=3000;//身体计时结束

    // this.babyTailIndex=0;//尾巴下标
    // this.babyTailStart=1;//为尾巴计时开始
    // this.babyTailEnd=1000;//为尾巴计时结束

}
//2:为构造函数添加方法init
babyObj.prototype.init=function(){
    //2.1:初始化小鱼位置和角度
    this.x=canWidth * 0.5;
    this.y =canHeight * 0.5;
    this.angle =0 ;
    //2.2:初始图片 眼睛2张 身体20 尾巴8
    for(var i=0;i<2;i++){
        this.babyEye[i] =new Image();
        this.babyEye[i].src="src/babyEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        this.babyBody[i]=new Image()
        this.babyBody[i].src="src/babyFade"+i+".png";
    }
   for(var i=0;i<8;i++){
       this.babyTail[i] =new Image();
       this.babyTail[i].src="src/babyTail"+i+".png";
   }
    // console.log(this);
}
//3:为构造函数添加方法draw
babyObj.prototype.draw=function(){
    //3.1:调整小鱼位置x,y
    this.x =lerpDistance(mom.x,this.x,0.99);
    this.y=lerpDistance(mom.y,this.y,0.98);
    //3.2:调整小鱼角度
    //-计算坐标差
    var deltaX =mom.x - this.x;
    var deltaY =mom.y - this.y;
    //-计算角度差
    var beta =Math.atan2(deltaY,deltaX)+Math.PI;
    //-函数修改小鱼角度
    this.angle =lerpAngle(beta,this.angle,0.6);

   //判断尾巴 身体 与 眼睛 
	this.badyBodyStart += deltaTime;
	if(this.badyBodyStart > this.babyBodyEndtime){
		this.babyBodyIdx = (this.babyBodyIdx+1);
		this.badyBodyStart = 1;
		if(this.babyBodyIdx>18){
			this.babyBodyIdx = 18;
			data.gameOver = true;///游戏结束了。。。。。
		}
	} 
    //console.log(this.babyBodyIdx);	

    this.babyTailStart += deltaTime;
	if(this.babyTailStart > this.babyTailEndTime){
		this.babyTailIdx = (this.babyTailIdx+1)%8;
        this.babyTailStart = 1;
	} 


	this.babyEyeStart += deltaTime;
	if(this.babyEyeStart>this.babyEyeEndtime){
		this.babyEyeIdx = (this.babyEyeIdx+1)%2;
		this.babyEyeStart = 1;          //计时开始 
	}  //显示图片下标 
    if(this.babyEyeIdx==0){
		this.babyEyeEndtime = 3000;
	}
	if(this.babyEyeIdx==1){
		this.babyEyeEndtime = 300;
	}

    var eye = this.babyEye[this.babyEyeIdx];
	var body = this.babyBody[this.babyBodyIdx];
	var tail = this.babyTail[this.babyTailIdx];

    //3.3:保存画笔状态
    ctx1.save();
    //3.4:设置画笔原点到小鱼中心
    ctx1.translate(this.x,this.y);
    //3.5:设置画笔旋转角度
    ctx1.rotate(this.angle);
    //3.6:绘制小鱼身体
    ctx1.drawImage(body,-body.width*0.5,-body.height*0.5);
    //3.7:绘制小鱼尾巴
	ctx1.drawImage(tail,-tail.width*0.5+23,-tail.height*0.5);
    //3.8:绘制小鱼眼睛
    ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);	
    //3.10:恢复画笔状态
    ctx1.restore();
}
//4:将baby.js添加到index.html
//5:在main.js创建小鱼对象并且调用方法
