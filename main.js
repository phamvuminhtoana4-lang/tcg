let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let player, currentUser;
let enemies = [];
let keys = {};

let inventory = new Inventory();
let inventoryDiv = document.getElementById("inventory");
let skillsDiv = document.getElementById("skills");

let lastDir = {x:1,y:0};

// ===== NPC =====
let npcs = [
  new NPC(400,400,"quest"),
  new NPC(600,300,"shop")
];

// ===== START GAME =====
function startGame(){
  auth.style.display = "none";
  ui.style.display = "block";

  // spawn quái
  for(let i=0;i<20;i++){
    enemies.push(new Enemy());
  }

  // spawn boss
  enemies.push(new Enemy(true));

  loadSkillsUI();
  loop();
}

// ===== INPUT =====
document.addEventListener("keydown", e=>{
  keys[e.key] = true;

  // hướng đánh
  if(e.key==="w") lastDir={x:0,y:-1};
  if(e.key==="s") lastDir={x:0,y:1};
  if(e.key==="a") lastDir={x:-1,y:0};
  if(e.key==="d") lastDir={x:1,y:0};

  // tương tác NPC
  if(e.key==="e"){
    npcs.forEach(n=>{
      let d = Math.hypot(player.x-n.x, player.y-n.y);
      if(d < 50){
        n.interact(player);
      }
    });
  }

  // thú cưỡi
  if(e.key==="m"){
    player.toggleMount();
  }
});

document.addEventListener("keyup", e=>{
  keys[e.key] = false;
});

// ===== UPDATE =====
function update(){
  player.move(keys);
  updateCamera();

  enemies.forEach(e=>e.update(player));

  // update projectile
  updateProjectiles();

  // NPC AI
  npcs.forEach(n=>n.update());
}

// ===== DRAW =====
function draw(){
  ctx.clearRect(0,0,1000,600);

  player.draw(ctx,camera);

  enemies.forEach(e=>e.draw(ctx,camera));

  // vẽ projectile
  projectiles.forEach(p=>{
    ctx.fillStyle = p.from==="enemy" ? "orange":"white";
    ctx.fillRect(p.x-camera.x, p.y-camera.y, 5, 5);
  });

  // NPC
  npcs.forEach(n=>n.draw(ctx,camera));
}

// ===== UI =====
function uiUpdate(){
  info.innerText = `Lv:${player.level} Gold:${player.gold}`;

  if(player.quest){
    info.innerText += ` | Quest: ${player.quest.progress}/5`;
  }

  document.querySelector("#hp div").style.width = player.hp + "%";
  document.querySelector("#mana div").style.width = player.mana + "%";
}

// ===== SAVE =====
function saveGame(){
  db[currentUser] = player;
  localStorage.setItem("db", JSON.stringify(db));
}
setInterval(saveGame, 3000);

// ===== EVENT RANDOM =====
setInterval(()=>{
  let r = Math.random();

  if(r < 0.3){
    enemies.push(new Enemy(true));
    alert("🔥 Boss xuất hiện!");
  }

  if(r < 0.6){
    inventory.add("Item hiếm");
    alert("💎 Nhặt được item hiếm!");
  }

},15000);

// ===== LOOP =====
function loop(){
  update();
  draw();
  uiUpdate();
  requestAnimationFrame(loop);
}
