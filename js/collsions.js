//collsions.js 完成游戏中碰撞检测----大鱼碰到食物
function momFruitCollison(){
    //如果游戏结束了,大鱼就不能吃食物
    if(data.gameOver){return;}

    // 1:创建循环遍历所有食物
    for(var i=0;i<fruit.num;i++){
        // 2:判断当前食物是否是显示
        if(fruit.alive[i]){
            // 3:计算当前食物与大鱼跑离
        var l=calLength2(fruit.x[i],fruit.y[i],
            mom.x,mom.y);
        // 4:如果两者之间距离小于900
        if(l<900){
         // 5:食物消失 
          fruit.dead(i);
          data.fruitNum++;//食物数量加一
          if(fruit.fruitType[i]=="blue"){
              data.double=2;
          }
      
         //5.2:显示奖励光环
         wave.born(fruit.x[i],fruit.y[i]);
        }
      }
    }
    //6.将文件collsion.js 添加index.html
    //7:将函数添加到main.js  gameloop中
}

//大鱼碰到小鱼
function momBabyCollision(){
      if(data.gameOver){return;} //游戏结束大鱼不能喂小鱼
      if(DEBUG){
          //console.log(data.fruitNum);
      }
      if(data.fruitNum>0){//大鱼必须吃到一定数量的食物后,才能喂小鱼
        // mom baby 距离
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
        //console.log(l);
        if(l<900){
            //baby reconver
            baby.babyBodyIndex=0;
            //data.rest();
            data.addScore();
            halo.born(baby.x,baby.y);//产生一个大鱼碰小鱼的特效元素
        }

      }
}