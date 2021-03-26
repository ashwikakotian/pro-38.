var door, doorImage,doorGroup 
var climber,climberImage,climberGroup
var ghost,ghostImage
var tower ,towerImage
var invisibleGround,groundGroup
var gameState="PLAY"
function preload(){
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  towerImage=loadImage("tower.png")
}  

function setup(){
  createCanvas(displayWidth,displayHeight);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=5
  tower.y=tower.height/2
  
  ghost=createSprite(300,300)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
  
  doorGroup=createGroup()
  climberGroup=createGroup()
  groundGroup=createGroup()
}

function draw(){
  background(0);
  
  if(gameState==="PLAY"){
     
     
  if(tower.y>600){
    tower.y=300
     
     }
  
  if(keyDown("space")){
    ghost.velocityY=-10
    
     }
  ghost.velocityY=ghost.velocityY+1
  
  if(keyDown("right")){
     ghost.x=ghost.x+3
     }
  
  if(keyDown("left")){
     ghost.x=ghost.x-3
     }
    
  
  if(groundGroup.isTouching(ghost)||ghost.y>600){
   gameState="END"
     }
  ghost.collide(climberGroup)
  Spawndoor()
  
  drawSprites()
  }
  else if(gameState==="END"){
           doorGroup.destroyEach()
    groundGroup.destroyEach()
    tower.destroy()
    ghost.destroy()
    climberGroup.destroyEach()
    doorGroup.setVelocityYEach(0)
    groundGroup.setVelocityYEach(0)
    climberGroup.setVelocityYEach(0)
    textSize(40)
    fill("red")
    text("Game Over" ,150,300)
    
          }
          camera.position.x=ghost.position.x
          camera.position.y=ghost.position.y

}

function Spawndoor(){
  if(frameCount%60===0){
     door=createSprite(random(100,500),0)
    door.addImage(doorImage)
    door.velocityY=5
    door.lifetime=120
    doorGroup.add(door);
    
    climber=createSprite(door.x,door.y+50)
    climber.addImage(climberImage)
    climber.velocityY=5
    climber.lifetime=120
    climberGroup.add(climber)
    
    invisibleGround=createSprite(climber.x,climber.y+10,climber.width,5)
    invisibleGround.velocityY=5 
     invisibleGround.visible=false
    groundGroup.add( invisibleGround)
    
     }
}