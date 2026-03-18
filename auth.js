let db = JSON.parse(localStorage.getItem("db")) || {};

function save(){
  localStorage.setItem("db", JSON.stringify(db));
}

function register(){
  let u=user.value, p=pass.value;
  if(db[u]) return alert("Tồn tại");

  let cls = prompt("Chọn phái (Thiếu Lâm, Võ Đang...)");

  db[u]={
    pass:p,hp:100,mana:100,
    x:200,y:200,level:1,gold:100,
    class:cls,inv:[]
  };
  save();
}

function login(){
  let u=user.value, p=pass.value;
  if(!db[u]||db[u].pass!==p) return alert("Sai");
  currentUser=u;
  player=new Player(db[u]);
  startGame();
}
