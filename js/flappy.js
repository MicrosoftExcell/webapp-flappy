// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var width = 790;
var height = 400;
var gameSpeed = 140;
var gameGravity = 100;
var jumpPower = 80;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 10;
var splashDisplay;
var rotation = 0;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var player;
var player2;
var score = 0;
var score2=-2;
var labelScore;
var labelScore2;
var gapStart = game.rnd.integerInRange(1, 5);
var towers = [];
var wp = [];
var sp = [];
var bd = [];
var dh = [];
var size = [];
var rp = [];
var el = [];

/*
 * Loads all resources for the game and gives them names.
 */
jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#fullName").val();
    var face = " ;) Your account is now being monitored by the Ministry of Magic";
    //var image= game.load.image("MOM","../assets/MOM.png");
    var greeting_message = greeting + name +face +". Your current score is: " +score;
    $("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + "</p>");
    //event_details.preventDefault();

});

function start() {
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE)
    player.body.gravity.y = gameGravity;
    pipeInterval = 1.8;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generate);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
    splashDisplay.destroy();
}

function preload() {
    game.load.image("snitch2", "../assets/snitch2.jpg");
    game.load.image("hogwarts", "../assets/hogwarts.jpg");
  //  game.load.image("quidditchballs", "../assets/quidditchballs.png")
   // game.load.audio("score", "../assets/point.ogg");
    game.load.image("tower","../assets/tower.jpg");
   // game.load.image ("potter2","../assets/potter2.png");
    game.load.image("MOM","../assets/MOM.png");
    game.load.image("broom2", "../assets/broom2.jpg");
    game.load.image("wp1", "../assets/wp1.png");
    game.load.image("sp", "../assets/sp.png");
    game.load.image("bd1", "../assets/bd1.png");
    game.load.image("dh", "../assets/dh.png");
    game.load.image("size", "../assets/size.png");
    game.load.image("rp", "../assets/rp.png");
    game.load.image("id", "../assets/id.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

   // game.stage.setBackgroundColor("#4DB8FF");
    var background = game.add.image(0, 0, "hogwarts");
    background.width = width;
    background.height = height;
    //game.add.text(350, 25, "Welcome to Hogwarts",
        //{font: "30px Arial", fill: "#4D4D4D"});
    player = game.add.sprite(50, 270, "snitch2");
    player.scale.x = 0.05;
    player.scale.y = 0.05;

    player.anchor.setTo(0.5, 0.5);
    //player = game.add.sprite(0, 270, "potter2");
    game.input
        .onDown
        .add(clickHandler);
  //  game.input
    //    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      //  .onDown.add(spaceHandler);
    //alert(score);
    labelScore = game.add.text(20, 20, "0");
   // labelScore2 = game.add.text(40, 20, "0");
    player.x = 80;
    player.y = 200;
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    //game.input.keyboard
       // .addKey(Phaser.Keyboard.SPACEBAR)
        //.onDown.add(playerJump);
   // generatePipe();
   // game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);
    //player.body.velocity.x = 20;
    //player.body.velocity.y = -20;
   // player.body.gravity.y = gameGravity;

   /* pipeInterval = 1.8;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generate);

*/ game.input.keyboard.addKey( Phaser.Keyboard.ENTER)
        .onDown.add(start);
    splashDisplay = game.add.text(100,30, "Press ENTER to start, SPACEBAR to jump");


}

function clickHandler(event){
   alert("The position is: " + event.x + "," + event.y);
  //  game.add.sprite(event.x, event.y,"quidditchballs" );

}

function moveRight() {
    player.x = player.x + 50;
}

function moveLeft() {
    player.x = player.x - 50;
}

function moveDown() {
    player.y = player.y + 50;
}

function moveUp() {
    player.y = player.y - 50;
}
function playerJump() {
    player.body.velocity.y = -jumpPower;
}


function spaceHandler() {
    game.sound.play("score");

}
function generate() {
    var diceRoll = game.rnd.integerInRange(1,25);
    if(diceRoll==1) {
      generateWp();
}
     else if(diceRoll==2) {
        generateSp();
    }
    else if(diceRoll==3) {
        generateBd();
    }
    else if(diceRoll==4) {
        generateSize();
    }
    else if(diceRoll==5 || diceRoll==6) {
        generateRp();
    }
    else if(diceRoll==7) {
        generateEl();
    }

    else {
        generatePipe();
    }
}
function generateWp(){
    var bonus1 = game.add.sprite(width,height,"wp1");
    wp.push(bonus1);
    game.physics.arcade.enable(bonus1);
    bonus1.body.velocity.x = - 200;
    bonus1.body.velocity.y = - game.rnd.integerInRange(60,100);
    bonus1.scale.x = 0.5;
    bonus1.scale.y = 0.5;
}
function generateSize(){
    var bonus4 = game.add.sprite(width,height,"size");
    size.push(bonus4);
    game.physics.arcade.enable(bonus4);
    bonus4.body.velocity.x = - 200;
    bonus4.body.velocity.y = - game.rnd.integerInRange(60,100);
   // bonus4.scale.x = 0.5;
  //  bonus4.scale.y = 0.5;
}
function generateEl(){
    var bonus6 = game.add.sprite(width,height,"id");
    el.push(bonus6);
    game.physics.arcade.enable(bonus6);
    bonus6.body.velocity.x = - 200;
    bonus6.body.velocity.y = - game.rnd.integerInRange(60,100);
    bonus6.scale.x = 0.5;
    bonus6.scale.y = 0.5;
}
function generateBd(){
    var bonus3 = game.add.sprite(width,height,"bd1");
    bd.push(bonus3);
    game.physics.arcade.enable(bonus3);
    bonus3.body.velocity.x = - 200;
    bonus3.body.velocity.y = - game.rnd.integerInRange(60,100);
    bonus3.scale.x = 0.2;
   bonus3.scale.y = 0.2;
}
function generateSp(){
    var bonus2 = game.add.sprite(width,height,"sp");
    sp.push(bonus2);
    game.physics.arcade.enable(bonus2);
    bonus2.body.velocity.x = - 200;
    bonus2.body.velocity.y = - game.rnd.integerInRange(60,100);

}
function generateRp(){
    var bonus5 = game.add.sprite(width,height,"rp");
    rp.push(bonus5);
    game.physics.arcade.enable(bonus5);
    bonus5.body.velocity.x = - 200;
    bonus5.body.velocity.y = - game.rnd.integerInRange(60,100);
    bonus5.scale.x = 0.1;
    bonus5.scale.y = 0.1;
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function generatePipe() {
    /*var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin)
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart-pipeEndHeight);
    for(var y=gapStart; y > 0 ; y -= blockHeight){
        addPipeBlock(width,y - blockHeight);
    }
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart+gapSize);
    for(var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y); 5
    }
    */
  //for (var i = 1; i < 5; i++) {
       var gap = game.rnd.integerInRange(1, 5);
    console.log(gap);
        for (var count = 0; count < 8; count++) {
            if (count != gap && count != gap + 1) {
               // game.add.sprite(150 * i, count * 50, "tower");
                addPipeBlock(600, count*50);
            }

        }
    addDh(583,gap*50);
   // }
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"tower");
    towers.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;
}

/*function addPipeEnd(x, y) {
    var pipeBlock = game.add.sprite(x,y,"broom2");
    towers.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;
}
*/

function addDh(x,y){
    var deathly = game.add.sprite(x,y,"dh");
    deathly.alpha = 0;
    dh.push(deathly);
    game.physics.arcade.enable(deathly);
    deathly.body.velocity.x = -gameSpeed;
    deathly.scale.x = 0.3;
    deathly.scale.y = 0.3;
}

function update() {
    for(var index=0; index<towers.length; index++){
        game.physics.arcade
            .overlap(player,
       towers[index],
        gameOver);
    }

    for(var index=0; index<wp.length; index++){
        game.physics.arcade
            .overlap(player,
            wp[index],
            changeGravity);
        //wp.splice(i,1);
    }
    for(var index=0; index<sp.length; index++){
        game.physics.arcade
            .overlap(player,
            sp[index],
            dGravity);
    }
    for(var index=0; index<rp.length; index++){
        game.physics.arcade
            .overlap(player,
            rp[index],
            restore);
    }
    for(var index=0; index<el.length; index++){
        game.physics.arcade
            .overlap(player,
            el[index],
            add5);
    }
   if(player.body.y < 0) {
        gameOver();
    }
    if(player.body.y > height){
        gameOver();
    }
    if(player.body.x > width){
        gameOver();
    }
    if (rotation == 0) {
        player.rotation = Math.atan(player.body.velocity.y / 200);
    }
    else {player.rotation += 5;}
    for(var index=0; index<bd.length; index++){
        game.physics.arcade
            .overlap(player,
            bd[index],
            rotate);
    }

    for(var index=0; index<dh.length; index++) {
        game.physics.arcade
            .overlap(player,
            dh[index],
            changeScore);
    }
        for(var index=0; index<size.length; index++){
            game.physics.arcade
                .overlap(player,
                size[index],
                changeSize);
}
    for(var i=dh.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,dh[i], function(){

            dh[i].destroy();
            dh.splice(i,1);

        });
    }
    for(var i=el.length - 1; i>=0; i--) {
        game.physics.arcade.overlap(player, el[i], function () {

            el[i].destroy();
            el.splice(i, 1);

        });
    }
    for(var i=wp.length - 1; i>=0; i--){
            game.physics.arcade.overlap(player,wp[i], function(){

                wp[i].destroy();
                wp.splice(i,1);

            });
        }
    for(var i=sp.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,sp[i], function(){

            sp[i].destroy();
            sp.splice(i,1);

        });
    }
    for(var i=rp.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,rp[i], function(){

            rp[i].destroy();
            rp.splice(i,1);

        });
    }
   // for(var i=bd.length - 1; i>=0; i--){
       // game.physics.arcade.overlap(player,bd[i], function(){

         //   bd[i].destroy();
        //    bd.splice(i,1);

       // });
    //}
    for(var i=size.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,size[i], function(){

            size[i].destroy();
            size.splice(i,1);

        });
    }

}

function restore() {
    player.scale.x = 0.05;
    player.scale.y = 0.05;
    gameGravity = 100;
    rotation =0;
}

function changeGravity() {
    gameGravity += 100;
    player.body.gravity.y = gameGravity;
}
function changeSize() {
    player.scale.x = 0.02;
    player.scale.y = 0.02;
}
function dGravity() {
    gameGravity -= 60;
    player.body.gravity.y = gameGravity;
}
function rotate() {
    //player.rotation += 5;
    rotation = 1;
}
function add5() {
   score = score+5;
    labelScore.setText(score.toString());
}

function gameOver() {
    // location.reload();
    $("#score").val(score.toString());
    $("#greeting").show();
    gameGravity = 100;
    player.rotation = Math.atan(player.body.velocity.y / gameSpeed);
    dh = [];
    game.destroy();


}



//function isEmpty(str) {
   // return (!str || 0 === str.length);
   // if (isEmpty(fullName)) {
    //    response.send("Please make sure you enter your name.");
   // }
//}

$.get("/score", function(scores){
    //console.log("Data: ",scores);
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });

    for (var i = 0; i < 10; i++) {
        $("#scoreBoard").append(
            "<li>" +
            scores[i].name + ": " + scores[i].score +
            "</li>");
    }
});