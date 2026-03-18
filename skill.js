const skills = {
"Thiếu Lâm":[
 {name:"La Hán Quyền", dmg:8, mana:5, cd:500},
 {name:"Kim Cang Chưởng", dmg:15, mana:10, cd:1200}
],

"Võ Đang":[
 {name:"Thái Cực Kiếm", dmg:10, mana:6, cd:600},
 {name:"Kiếm Khí", dmg:18, mana:12, cd:1200}
],

"Nga My":[
 {name:"Phật Quang", dmg:6, mana:5, cd:500},
 {name:"Hồi Phục", heal:20, mana:10, cd:1500}
],

"Cái Bang":[
 {name:"Đả Cẩu Bổng", dmg:12, mana:6, cd:700},
 {name:"Loạn Đả", dmg:20, mana:12, cd:1200}
],

"Thiên Nhẫn":[
 {name:"Ám Sát", dmg:15, mana:8, cd:800},
 {name:"Tàng Hình", buff:"speed", mana:10, cd:2000}
],

"Đường Môn":[
 {name:"Phi Tiêu", dmg:12, mana:7, cd:600},
 {name:"Mưa Phi Tiêu", dmg:18, mana:12, cd:1200}
],

"Ngũ Độc":[
 {name:"Độc Công", dmg:10, mana:7, cd:600},
 {name:"Trúng Độc", dot:3, mana:10, cd:1200}
],

"Côn Lôn":[
 {name:"Hàn Băng", dmg:12, mana:8, cd:700},
 {name:"Đóng Băng", slow:true, mana:12, cd:1500}
],

"Minh Giáo":[
 {name:"Hỏa Diệm", dmg:14, mana:9, cd:800},
 {name:"Bùng Cháy", dmg:25, mana:15, cd:2000}
]
};

let projectiles = [];
let lastSkill = 0;

function loadSkillsUI(){
  skillsDiv.innerHTML="";
  skills[player.class].forEach((s,i)=>{
    let b=document.createElement("button");
    b.innerText=s.name;
    b.onclick=()=>useSkill(i);
    skillsDiv.appendChild(b);
  });
}

function useSkill(i){
  let now = Date.now();
  let s = skills[player.class][i];

  if(now - lastSkill < (s.cd||500)) return;
  if(player.mana < (s.mana||0)) return;

  player.mana -= s.mana;
  lastSkill = now;

  // heal
  if(s.heal){
    player.hp = Math.min(100, player.hp + s.heal);
    return;
  }

  // buff speed
  if(s.buff==="speed"){
    player.speed = 8;
    setTimeout(()=>player.speed=4,3000);
    return;
  }

  // tạo projectile theo hướng
  projectiles.push({
    x:player.x,
    y:player.y,
    dx:lastDir.x * 6,
    dy:lastDir.y * 6,
    dmg:s.dmg || 5,
    dot:s.dot,
    slow:s.slow
  });
}

function updateProjectiles(){
  projectiles.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;

    enemies.forEach(e=>{
      let d = Math.hypot(p.x-e.x,p.y-e.y);
      if(d<20){

        e.hp -= (p.dmg + (player.dmgBonus||0));

        // DOT
        if(p.dot){
          let interval = setInterval(()=>{
            e.hp -= p.dot;
          },500);
          setTimeout(()=>clearInterval(interval),3000);
        }

        // slow
        if(p.slow){
          e.speed = 0.5;
          setTimeout(()=>e.speed=1,2000);
        }
      }
    });
  });
}
