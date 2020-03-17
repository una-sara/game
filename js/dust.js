//漂浮物
var dustObj=function(){
    this.x=[];
    this.y=[];
    this.amp=[];
    this.pics=[];
    this.NO=[];
    this.alpha=[];
}
dustObj.prototype.num=30;
dustObj.prototype.init=function(){
  for(var i=0;i<this.num;i++){
      this.x[i] =Math.random()*canWidth;
      this.y[i] =Math.random()*canHeight;
      this.amp[i]=20+Math.random()*50;
    this.NO[i] = Math.floor(Math.random()*7);//归一（0，7）
  }
  this.alpha=0;
  for(var i=0;i<7;i++){
      this.pics[i] =new Image();
      this.pics[i].src="./src/dust"+i+".png";
  }
}
dustObj.prototype.draw = function(){
    //console.log(this.pics);
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
        var no = this.NO[i];
        ctx1.drawImage(this.pics[no],this.x[i]+this.amp[i]*l,this.y[i]);
    }
}
