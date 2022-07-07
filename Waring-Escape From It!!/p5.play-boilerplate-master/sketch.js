var gameState = "play"
var josh ,joshImage, dinosaur1,dinosaur2,dinosaur3,dinosaur4,bombImage;
var diamond,cave,bombGroup,creatureGroup,arrowImage;
var score;
var villan;
var invisibleGround;
var resetImage,reset;

function preload() {
  cave = loadImage("cave.jpg");
  joshImage = loadImage("josh.png");
  dinosaur1 = loadImage("creature1.png");
  dinosaur2 = loadImage("creature2.png");
  dinosaur3 = loadImage("creature3.png");
  dinosaur4 = loadImage("creature4.png");
  bombImage = loadImage("bomb.png");
  arrowImage = loadImage("arrow.png");
  resetImage = loadImage("reset.png");
  gameover = loadImage("gameover.png")
}

function setup() {
  createCanvas(1400,600);
  invisibleGround = createSprite(50,550,2500,50)
  invisibleGround.visible = false
  josh = createSprite(300,450,80,80);
  josh.addImage("Josh",joshImage);
  josh.scale = 1.3;
  reset = 
  score = 0;
  bombGroup = new Group()
  creatureGroup = new Group()
  arrowGroup = new Group()
}

function draw() {
  background(cave);
  textSize(30)
  fill("white")
  text("score:"+score,1200,50)
  text("Warning-Escape From It!!",400,50)
  if(gameState == "play"){
  if(bombGroup.isTouching(creatureGroup)){
    creatureGroup.destroyEach();
    bombGroup.destroyEach();
    score+=10;
  }
  if(creatureGroup.isTouching(josh)){
    josh.destroy();
    gameState = 'end'
  }
  
  if(score>=50){
    var villan= createSprite(1000,400,80,80)
    villan.addImage("dinosaur4",dinosaur4)
    villan.scale = 1.8
    createArrow()
  }
  if(score == 0||score<50){
    spawnCreature();
  }
  if(keyIsDown(UP_ARROW)){
    josh.velocityY =-10
  }
  josh.velocityY = josh.velocityY+0.8
  josh.collide(invisibleGround)
  if(arrowGroup.isTouching(josh)){
    josh.destroy()
    arrowGroup.destroyEach()
    gameState = "end"
  }
  }
  else if(gameState =="end"){
    arrowGroup.setvelocityXEach(0)
    bombGroup.setvelocityXEach(0)
    arrowGroup.setLifetimeEach(-1)
    bombGroup.setLifetimeEach(-1)
  }
   drawSprites();

}

function spawnCreature(){
  if(frameCount%200 ==0){
    var dinosaur = createSprite(1400,450,70,70)
    dinosaur.velocityX = -3

    var rand = Math.round(random(1,3))
    switch(rand){
      case 1 : dinosaur.addImage("dinosaur",dinosaur1)
      break;
      case 2 : dinosaur.addImage("dinosaur",dinosaur2)
      break;
      case 3 : dinosaur.addImage("dinosaur",dinosaur3)
      break;
      default :dinosaur.addImage("dinosaur",dinosaur1)
    }
    dinosaur.scale = 1;
    dinosaur.lifetime = 400;
    dinosaur.setCollider("rectangle",0,0,150,200);
    //dinosaur.debug = true
    creatureGroup.add(dinosaur)
  }
}

function createBomb(){
  var bomb = createSprite(300,450,50,50);
  bomb.x = josh.x
  bomb.velocityX = 4
  bomb.lifetime = 300
  bomb.addImage(bombImage)
  bomb.scale = 0.5
  bomb.setCollider("circle",0,0,50);
 // bomb.debug = true;
  bombGroup.add(bomb);
}

function keyPressed(){
  if(keyCode ==32){
    createBomb()
  }
  if(keyCode ==RIGHT_ARROW){
    josh.x = josh.x+3
  }
}

function createArrow(){
  if(frameCount%150 == 0){
  var arrow = createSprite(1000,400,50,50)
  arrow.velocityX =-3
  arrow.lifetime = 300
  arrow.addImage(arrowImage)
  arrow.scale = 0.5
  arrow.setCollider("rectangle",0,0,50,30)
  arrowGroup.add(arrow)
  }
}