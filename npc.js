class NPC{
  constructor(x,y,type="quest"){
    this.x=x;
    this.y=y;
    this.type=type;
    this.dir=1;
    this.timer=0;
  }

  update(){
    // đi qua lại
    this.timer++;
    if(this.timer % 60 === 0) this.dir *= -1;
    this.x += this.dir * 0.5;
  }

  draw(ctx,cam){
    ctx.fillStyle = this.type==="shop" ? "green":"yellow";
    ctx.fillRect(this.x-cam.x,this.y-cam.y,20,20);
  }

  interact(player){
    if(this.type==="quest"){
      if(!player.quest){
        player.quest={kill:5,progress:0,reward:200};
        alert("Nhiệm vụ: Diệt 5 quái");
      }else if(player.quest.progress>=5){
        player.gold += player.quest.reward;
        player.quest = null;
        alert("Hoàn thành nhiệm vụ!");
      }
    }

    if(this.type==="shop"){
      let choice = prompt("Shop:\n1. Kiếm (100 vàng)\n2. Giáp (150 vàng)");
      if(choice=="1" && player.gold>=100){
        player.gold-=100;
        inventory.add("Kiếm");
      }
      if(choice=="2" && player.gold>=150){
        player.gold-=150;
        inventory.add("Giáp");
      }
    }
  }
}
