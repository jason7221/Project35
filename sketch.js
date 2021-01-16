//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("Images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value" , readStock);
  foodStock.set(20);

  dog = createSprite(250, 300, 10, 60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background("green");

  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("NOTE: Press UP ARROW too feed DRAGO milk", 50, 50)
    text("Food Remaining:" +foodS, 150, 150);
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
  
  if(keyWentUp(UP_ARROW)){
    dog.addImage(happyDogImg);
    }
  if(foodS === 0){
  foodS = 20;
    }


   drawSprites();
  }
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}
function readStock(data){
  foodS = data.val();
}