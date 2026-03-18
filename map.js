// ===== CONFIG =====
const TILE = 40;
const CHUNK_SIZE = 20;
const RENDER_DISTANCE = 3;

// ===== 9 MÔN PHÁI =====
const FACTIONS = [
  "Thiếu Lâm",
  "Võ Đang",
  "Nga My",
  "Cái Bang",
  "Đường Môn",
  "Thiên Nhẫn",
  "Minh Giáo",
  "Côn Lôn",
  "Tiêu Dao"
];

// ===== BIOME =====
function getBiome(x,y){
  let seed = Math.abs((x*99991 + y*88888) % 100);

  if(seed < 20) return "forest";
  if(seed < 40) return "desert";
  if(seed < 60) return "snow";
  if(seed < 80) return "mountain";
  return "plains";
}

// ===== MÔN PHÁI THEO VÙNG =====
function getFaction(x,y){
  let index = Math.abs((x*777 + y*333)) % FACTIONS.length;
  return FACTIONS[index];
}

// ===== TILE =====
function getTile(x,y){
  let biome = getBiome(x,y);

  if(biome==="water") return 2;

  let rand = Math.abs((x*12345 + y*54321)%100);

  if(rand < 10) return 1; // tường
  return 0;
}

// ===== CAMERA =====
let camera = {x:0,y:0};

function updateCamera(){
  camera.x = player.x - 500;
  camera.y = player.y - 300;
}

// ===== COLLISION =====
function isBlocked(x,y){
  let tx = Math.floor(x/TILE);
  let ty = Math.floor(y/TILE);
  return getTile(tx,ty) === 1;
}

// ===== DRAW MAP =====
function drawMap(ctx){

  let startX = Math.floor((camera.x)/TILE) - 2;
  let startY = Math.floor((camera.y)/TILE) - 2;

  let endX = startX + 30;
  let endY = startY + 20;

  for(let y=startY; y<endY; y++){
    for(let x=startX; x<endX; x++){

      let tile = getTile(x,y);
      let biome = getBiome(x,y);

      let screenX = x*TILE - camera.x;
      let screenY = y*TILE - camera.y;

      // ===== màu theo biome =====
      if(biome==="forest") ctx.fillStyle="#2e8b57";
      if(biome==="desert") ctx.fillStyle="#c2b280";
      if(biome==="snow") ctx.fillStyle="#ffffff";
      if(biome==="mountain") ctx.fillStyle="#777";
      if(biome==="plains") ctx.fillStyle="#7cfc00";

      if(tile===1) ctx.fillStyle="#333";

      ctx.fillRect(screenX, screenY, TILE, TILE);
    }
  }

  // ===== HIỆN MÔN PHÁI =====
  let tx = Math.floor(player.x/TILE);
  let ty = Math.floor(player.y/TILE);

  let faction = getFaction(tx,ty);

  ctx.fillStyle="white";
  ctx.font="20px Arial";
  ctx.fillText("Khu vực: "+faction, 20,30);
}// ===== CONFIG =====
const TILE = 40;

// ===== 9 MÔN PHÁI =====
const FACTIONS = [
  {name:"Thiếu Lâm", color:"#d4a017"},
  {name:"Võ Đang", color:"#87ceeb"},
  {name:"Nga My", color:"#ff69b4"},
  {name:"Cái Bang", color:"#8b4513"},
  {name:"Đường Môn", color:"#4b0082"},
  {name:"Thiên Nhẫn", color:"#8b0000"},
  {name:"Minh Giáo", color:"#ff4500"},
  {name:"Côn Lôn", color:"#00ced1"},
  {name:"Tiêu Dao", color:"#7fff00"}
];

// ===== BIOME =====
function getBiome(x,y){
  let seed = Math.abs((x*9999 + y*8888)%100);

  if(seed < 20) return "forest";
  if(seed < 40) return "desert";
  if(seed < 60) return "snow";
  if(seed < 80) return "mountain";
  return "plains";
}

// ===== FACTION THEO VÙNG =====
function getFaction(x,y){
  let index = Math.abs((x*777 + y*333)) % FACTIONS.length;
  return FACTIONS[index];
}

// ===== TILE =====
function getTile(x,y){
  let rand = Math.abs((x*12345 + y*54321)%100);

  if(rand < 10) return 1; // tường
  if(rand < 15) return 2; // nước
  return 0;
}

// ===== CAMERA =====
let camera = {x:0,y:0};

function updateCamera(){
  camera.x = player.x - 500;
  camera.y = player.y - 300;
}

// ===== COLLISION =====
function isBlocked(x,y){
  let tx = Math.floor(x/TILE);
  let ty = Math.floor(y/TILE);
  return getTile(tx,ty) === 1;
}

// ===== DRAW MAP =====
function drawMap(ctx){

  let startX = Math.floor(camera.x / TILE) - 2;
  let startY = Math.floor(camera.y / TILE) - 2;

  let endX = startX + 30;
  let endY = startY + 20;

  for(let y=startY; y<endY; y++){
    for(let x=startX; x<endX; x++){

      let biome = getBiome(x,y);
      let tile = getTile(x,y);

      let screenX = x*TILE - camera.x;
      let screenY = y*TILE - camera.y;

      // màu biome
      if(biome==="forest") ctx.fillStyle="#2e8b57";
      if(biome==="desert") ctx.fillStyle="#c2b280";
      if(biome==="snow") ctx.fillStyle="#ffffff";
      if(biome==="mountain") ctx.fillStyle="#777";
      if(biome==="plains") ctx.fillStyle="#7cfc00";

      if(tile===1) ctx.fillStyle="#333";
      if(tile===2) ctx.fillStyle="#1e90ff";

      ctx.fillRect(screenX,screenY,TILE,TILE);
    }
  }

  // ===== HIỂN THỊ VÙNG =====
  let tx = Math.floor(player.x/TILE);
  let ty = Math.floor(player.y/TILE);
  let faction = getFaction(tx,ty);

  ctx.fillStyle = faction.color;
  ctx.font = "20px Arial";
  ctx.fillText("Khu vực: "+faction.name,20,30);
}
