class Enemy{
  constructor(boss=false){
    this.x=Math.random()*2000;
    this.y=Math.random()*2000;
    this.hp=boss?200:50;
    this.boss=boss;
  }

  update(player){
    let dx=player.x-this.x;
    let dy=player.y-this.y;
    let d=Math.hypot(dx,dy);

    if(d<200){
      this.x+=Math.sign(dx);
      this.y+=Math.sign(dy);
    }

    if(d<30){
      player.hp-=this.boss?1:0.3;
    }

    if(this.hp<=0){
      this.hp=this.boss?200:50;
      this.x=Math.random()*2000;
      this.y=Math.random()*2000;

      player.gold+=this.boss?200:50;
      player.level++;

      if(player.quest) player.quest.progress++;

      if(Math.random()<0.3){
        inventory.add("Kiếm");
      }
    }
  }

  draw(ctx,cam){
    ctx.fillStyle=this.boss?"purple":"red";
    ctx.fillRect(this.x-cam.x,this.y-cam.y,20,20);
  }
}
