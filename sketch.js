var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,ghostImg;
var soul,soulImg,soulGroup;
var invisibleBlockGroup;
var gameState = "START";
var score;
var vida = 0;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
  soulImg = loadImage("soul.png");

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  soulGroup = new Group();

  score = 0;
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  spookySound.loop();
  
  tower = createSprite (displayWidth/2 ,displayHeight/2);
  tower.addImage ("tower",towerImg);
  tower.scale = 2;
  tower.velocityY = 1;
  
  ghost = createSprite (displayWidth/2,displayHeight/2, 100,100);
  ghost.addImage ("ghost", ghostImg);
  
  ghost.scale = 0.5;
}

function draw() {
  background('black');
  stroke("red");
  fill("red");
  textSize(35);
  text ("Souls: "+ score,100,ghost.y);
  text ("Vidas: "+ vida,100,ghost.y + 35);

  if(tower.y > displayHeight*8/10){
    tower.y = displayHeight*2/10;
  }
  
if (gameState === "START" && vida === 0){
  stroke ("yellow");
  fill ("yellow");
  textSize (30);
  text ("BIENVENIDO AMIGO CAZA-FANTASMAS!", displayWidth/2 -150, displayHeight/2 - 120);
  stroke ("white");
  fill ("white");
  textSize (25);
  text("SIMPLE - 5 MONEDAS",displayWidth/2 - 20, displayHeight/2 - 50);
  text("LEGENDARIO - 50 MONEDAS",displayWidth/2 - 30, displayHeight/2 - 20);
  text("MITICO - 100 MONEDAS",displayWidth/2 - 30, displayHeight/2 + 10);
  stroke ("yellow");
  fill("yellow");
  textSize (35);
  text ("CAPTURA A MUCHOS FANTASMAS :D!",displayWidth/2 - 110, displayHeight/2 + 60);
  stroke ("white");
  fill ("white");
  textSize (25);
  text (" Inicia presionando SPACE", displayWidth/2 - 50, displayHeight/2 + 120);

  if( keyDown ("SPACE")){
    gameState = "PLAY";
    vida = 1;
  }

}

  if (gameState === "PLAY" && vida < 4){
    if( ghost.isTouching(soulGroup)) {
      soulGroup.destroyEach();
      score = score + 5;
    }
  if (keyDown ("SPACE")) {
    ghost.velocityY = -3;
    camera.position.x = displayWidth/2;
    camera.position.y = ghost.y;
  }
 
  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x -3;
  }
  
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }

  console.log(ghost.Y);
  if (invisibleBlockGroup.isTouching(ghost) || (ghost.Y)) {
    ghost.destroy();
    vida = vida + 1;

        if (vida > 3){
        gameState = "END";
        }
  }
  
  ghost.velocityY = ghost.velocityY + 0.3;

  if (gameState === "END") {
    stroke ("yellow");
    fill ("yellow");
    textSize (70);
    text ("GAME OVER",displayWidth/2 - 30 ,displayHeight/2);
    stroke("white");
    fill ("white");
    textSize (30);
    text("PRESIONA FLECHA ABAJO PARA VOLVER A JUGAR",displayWidth/2 - 150 ,displayHeight/2 + 15 );
    if (keyDown("down_arrow")){
      gameState = "START";
      vida = 0;
      score = 0;
    }
  }

  spawnSoul();
  spawnDoors();
  drawSprites();
  }
  
  
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    var door = createSprite (200,-50);
    var climber = createSprite (200,10);
    var invisibleBlock = createSprite(200,20);
  
    climber.addImage(climberImg);
    door.addImage(doorImg);
    
    door.x = Math.round (random(displayWidth/4, displayWidth*3/4));
    climber.x = door.x;
    climber.y = 22;
    
    door.velocityY =1;
    climber.velocityY =1;
    
    invisibleBlock.wieght = climber.wight;
    invisibleBlock.height = 1;
    
//asignar ciclo de vida
    door.lifeTime = 800;   
    climber.lifeTime = 800;
    
//agregar cada puerta al grupo 
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY =1;
    
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    
    ghost.depth = door.depth
    ghost.depth +=1;
  }
}

function spawnSoul() {
  if (frameCount % 200 === 0) {
    var soul = createSprite (200,-50);
    soul.addImage(soulImg);
    soul.x = Math.round (random(displayWidth/4,displayWidth*3/4));
    soul.velocityY =1;

    soul.scale = 0.1;
    
    ghost.depth = soul.depth;
    ghost.depth +=1;
    soul.lifeTime = 800;
    soulGroup.add(soul);
  }
}