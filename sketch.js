//Global Variables
var player_running,bananaImg,obstacleImg,BananGroup,ObstaclesGroup,backImg,backGd,monkey,g,count,banan,obstacle,gs,play,end,collided;
var gameOver,gImg;

function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImg = loadImage("jungle.jpg");
  bananaImg = loadImage("Banana.png");
  obstacleImg = loadImage("stone.png");
  collided = loadImage("Monkey_01.png");
  gImg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600,300);
  
  backGd = createSprite(200,200);
  backGd.addImage("background",backImg);
  backGd.velocityX = -6;
  backGd.x = backGd.width/2
  backGd.scale = 1;
 
  monkey = createSprite(50,270);
  monkey.addAnimation("running",player_running);
  monkey.scale = 0.1;
  
  gameOver = createSprite(300,50);
  gameOver.addImage("gameOver",gImg);
  gameOver.visible = false;
  
  g = createSprite(300,299,600,2);
  g.visible = false;
  
  count = 0;
  score = 0;
  
  BananGroup = new Group();
  ObstaclesGroup = new Group();
  
  end = 0;
  play = 1;
  gs = play;
  
  fill("black");
  textSize(20);
}


function draw(){
  background(255);
  
  if(gs===play) {
    count+=1
  
    if(backGd.x<120) {
      backGd.x = backGd.width/2
    }
  
    monkey.velocityY+=1;
    monkey.collide(g);
  
    if(keyDown("space") && monkey.y>260) {
      monkey.velocityY = -16;
    }
  
    spawnObstacles();
    spawnClouds();
  
    if(BananGroup.isTouching(monkey)) {
      score+=1
      BananGroup.destroyEach();
    }
  
    if(ObstaclesGroup.isTouching(monkey)) {
      gs = end
    }
  }else if(gs===end) {
    count = count
    score = score
    
    backGd.x = backGd.width/2
    monkey.velocityY = 0;
    
    BananGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
  }
  
  if(keyDown("r")) {
    backGd.velocityX = -6;
    backGd.x = backGd.width/2
    backGd.scale = 1;
    
    gameOver.visible = false;
    
    BananGroup.destroyEach();
    ObstaclesGroup.destroyEach();
    
    count = 0;
    score = 0;
  
    end = 0;
    play = 1;
    gs = play;
  }
  
  drawSprites();
  
  text("score : "+ score,500,50);
  if(gs===end) {
    text("press r to restart",250,150);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,280,10,40);
    obstacle.velocityX = - (6 + count/100);
    obstacle.scale = 0.1;
    
    //generate obstacles
    obstacle.addImage(obstacleImg);
    
    //assign scale and lifetime to the obstacle
    obstacle.lifetime = 134;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    banan = createSprite(600,220,40,10);
    banan.y = Math.round(random(280,200));
    banan.addImage(bananaImg);
    banan.scale = 0.05;
    banan.velocityX = - (6 + count/100);
    
     //assign lifetime to the variable
    banan.lifetime = 134;
    
    //add each cloud to the group
    BananGroup.add(banan);
    
  }   
}