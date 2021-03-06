//game variables
var gameData = {
  ore: 0, //how much ore the player has
  orePerSecond: 1, //how much ore recieved per second
  ingot: 0, //how much ingot the player has
  ingotPerSecond: 0, //how much ingot recieved per second
  orePerClick: 1, //ore recieved per button press
  orePerClickCost: 10, //cost to upgrade orePerClick
  drill: 0, //how many drills the player has
  drillEfficiency: 1, //how much a drill adds to the orePerSecond
  drillCost: 100, //how much it costs to purchase another drill
  furnace: 0, //how many furnaces the player has
  furnaceEfficiency: 50, //how much ore a smelt uses up
  furnaceCost: 1000, //how much it costs to purchase another furnace
  autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
  furnaceReward: 1, //how much ore a player receives per smelt
  //upgradeData
  upgradeCostMultiplier: 1.85, //determines the cost of the next upgrade
  upgradeDiscount: 1, //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
  lastTick: Date.now()
}

//loads save
var savegame = JSON.parse(localStorage.getItem("oreMinerSave"))
if (savegame !== null) {
  gameData = savegame
}

//initializatio

if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
document.getElementById("oreSmelt").style.display = "none" //sets smelt ore into ingots button to be invisible before the player has 50 ore

//resets all variables
function developerReset() { //developer reset button
  gameData = {
    ore: 0, //how much ore the player has
    orePerSecond: 1, //how much ore recieved per second
    ingot: 0, //how much ingot the player has
    ingotPerSecond: 0, //how much ingot recieved per second
    orePerClick: 1, //ore recieved per button press
    orePerClickCost: 10, //cost to upgrade orePerClick
    drill: 0, //how many drills the player has
    drillEfficiency: 1, //how much a drill adds to the orePerSecond
    drillCost: 100, //how much it costs to purchase another drill
    furnace: 0, //how many furnaces the player has
    furnaceCost: 1000, //how much it costs to purchase another furnace
    autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
    furnaceEfficiency: 50, //how much ore a smelt uses up
    furnaceReward: 1, //how much ore a player receives per smelt
    //upgradeData
    upgradeCostMultiplier: 1.85, //determines the cost of the next upgrade
    upgradeDiscount: 1 //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
  }
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
  document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
  document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
}

//ore miner
function mineOre() {
  gameData.ore += gameData.orePerClick
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
}

//click upgrade
function buyOrePerClick() {
  if (gameData.ore >= gameData.orePerClickCost) {
    gameData.ore -= gameData.orePerClickCost
    gameData.orePerClick++
    gameData.orePerClickCost = calcCost(gameData.orePerClickCost)
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
  }
}

//drill purchase
function buyDrill() {
  if (gameData.ore >= gameData.drillCost) {
    gameData.ore -= gameData.drillCost //subtracts cost from current balance
    gameData.drill++ //adds 1 drill
    gameData.orePerSecond += gameData.drillEfficiency //adds oreEfficiency to player's ore per second
    gameData.drillCost = calcCost(gameData.drillCost) //updates cost of next drill
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
  }
}

//furnace purchase
function buyFurnace() {
  if(gameData.ore >= gameData.furnaceCost) {
    gameData.ore -= gameData.furnaceCost
    gameData.furnace++
    gameData.ingotPerSecond += gameData.furnaceEfficiency
    gameData.furnaceCost = calcCost(gameData.furnaceCost)
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
  }
}

//smelt ores into ingots
function oreSmelt() {
  if(gameData.ore >= gameData.furnaceEfficiency) {
    gameData.ore -= gameData.furnaceEfficiency
    gameData.ingot += gameData.furnaceReward
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
    document.getElementById("oreSmelt").innerHTML = "Smelt " + gameData.furnaceEfficiency + " Ore into " + gameData.furnaceReward + " Gold Ingot"
  }
}

//starts the cooldown of smelt
function smeltCooldownA() {
  document.getElementsByClassName("button-enabled").classList.add('button-disabled');
  document.getElementsByClassName("button-disabled").classList.remove('button-enabled');
  setTimeout(smeltCooldownB, 4000);
}
//removes the cooldown
function smeltCooldownB() {
  document.getElementsByClassName("button-enabled").classList.add('button-enabled');
  document.getElementsByClassName("button-disabled").classList.remove('button-disabled');
}

function enableOreSmelt() {
  if(gameData.ore >= 50) { //enable ore smelter
    document.getElementById("oreSmelt").style.display = "inline-block"
  }
}

function developerOre() {
  gameData.ore += 16000
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
}

//calculate the cost of the next upgrade
function calcCost(cost) {
  return (cost * gameData.upgradeCostMultiplier * gameData.upgradeDiscount).toFixed(0)
}

//hide all your tabs, then show the one the user selected
function tab(tab) {
  document.getElementById("mineOreMenu").style.display = "none"
  document.getElementById("shopMenu").style.display = "none"
  document.getElementById("devMenu").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}

// go to a tab for the first time, so not all show
tab("mineOreMenu")

//second clock
var mainGameLoop = window.setInterval(function() {
  gameData.ore += gameData.orePerSecond //add orePerSecond to ore
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now() //updates lastTick
  gameData.ore += gameData.orePerClick * (diff / 1000) //divide diff by how often (ms) mainGameLoop is ran
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
  if(gameData.ore >= 50) { //enable ore smelter
    document.getElementById("oreSmelt").style.display = "inline-block"
  }
}, gameData.autoMine)

//autosave
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('oreMinerSave', JSON.stringify(gameData))
}, 1000)
