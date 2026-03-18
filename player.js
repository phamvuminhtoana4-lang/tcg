class Player{
  constructor(data){
    Object.assign(this,data);
    this.speed=4;
    this.mount=false;
    this.dmgBonus=0;
  }

  toggleMount(){
    this.mount=!this.mount;
    this.speed=this.mount?7:4;
  }

  move(keys){
    if(keys['w'])this.y-=this.speed;
    if(keys['s'])this.y+=this.speed;
    if(keys['a'])this.x-=this.speed;
    if(keys['d'])this.x+=this.speed;
  }

  draw(ctx,cam){
    ctx.fillStyle=this.mount?"orange":"cyan";
    ctx.fillRect(this.x-cam.x,this.y-cam.y,20,20);
  }
}
