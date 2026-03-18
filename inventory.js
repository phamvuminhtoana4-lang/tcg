class Inventory{
  constructor(){
    this.items=[];
  }

  add(item){
    this.items.push(item);
    renderInventory();
  }
}

function renderInventory(){
  inventoryDiv.innerHTML="";
  inventory.items.forEach(i=>{
    let d=document.createElement("div");
    d.innerText=i;
    inventoryDiv.appendChild(d);
  });
}

function equipItem(){
  if(inventory.items.includes("Kiếm")){
    player.dmgBonus=5;
  }
}
