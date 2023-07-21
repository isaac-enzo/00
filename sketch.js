//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,gameoversound;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
 gameOversound = loadSound("gameover.mp3");
  //carregue o som aqui



}



function setup() {
  createCanvas(600, 600);
  
  //criar espada
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7

  //definir colisor para espada
  knife.setCollider("rectangle",0,0,100,40);

  // Variáveis de pontuação e grupos
  score=0;
  fruitGroup=createGroup(5);
  monsterGroup=createGroup(-10);
  
}

function draw() {
  background("lightgreen");
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e monstros
   fruits(fruitGroup);
    Monster(monsterGroup);
    
    // Mova a espada com o mouse
    knife.y=mousepad.mouseY;
    knife.x=mousepad.mouseX;
  
    // Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
     score = 5 ;
      fruitGroup.destroyEach();
    }
    else
    {
      // Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        monster.isTouching(knife);
        knife=loadsound(gameovr.mp3);
      }
        //adicione o som do gameover (fim de jogo) aqui
        
        fruitGroup.destroyEach("knifeswoosh.mp3");
        monsterGroup.destroyEach("gameover.mp3");
        fruitGroup.setVelocityXEach(2);
        monsterGroup.setVelocityXEach(2);
        
        // Mude a animação da espada para gameover (fim de jogo) e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      
      }
    }
  
  
  drawSprites();
  //Exibir pontuação
  textSize(25);
  text("Score : "+ score,250,50);
  }


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //atualize o código abaixo para aumentar a velocidade do monsterGroup (grupo de monstros) em 10
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //usar uma variável aleatória para mudar a posição da fruta e tornar mais desafiador
    
    if(position==1)
    {
    fruit.x=600;
    //atualize o código abaixo para aumentar a velocidade do fruitGroup (grupo de frutas) em 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //atualize o código abaixo para aumentar a velocidade do fruitGroup (grupo de frutas) em 4
      fruit.velocityX=- 7;
      }
    }
    
    fruit.scale=0.2;
     fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1.png);
    } else if (r == 2) {
      fruit.addImage(fruit2.png);
    } else if (r == 3) {
      fruit.addImage(fruit3.png);
    } else {
      fruit.addImage(fruit4.png);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}