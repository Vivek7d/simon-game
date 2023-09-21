var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var started=false
var level=0;

function nextSequence(){

    userClickedPattern = [];
    // "randomNumber" To Generate a Random Number
    var randomNumber= Math.floor(Math.random()*4);

    // "randomChosenColor To select the random color from the buttonColors array "
    var randomChosenColor= buttonColours[randomNumber];

    // "gamePattern is used to add the selected color on the empty arrays called gamePattern "
    gamePattern.push(randomChosenColor);

    // "check" to add the selected color a "flash in the button "
    var check =$("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    // "sound" To Add the Audio on selected color and also play the audio
    var sound= new Audio("./sounds/"+randomChosenColor+".mp3");
    sound.play();

    level++;
    $("#level-title").text("Level " + level);

    

}

// "click" when i click on btn then it add the id into the array
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

  
    playSound(userChosenColor)
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
   
});

// Add sound when i "click"
function playSound(name){
    var audio= new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// Add pressed when i "Click"
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
      
}


$(document).keydown(function() {
    
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    
}
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    // when we get the wrong answer 
    else {

        var wrongaudio= new Audio("./sounds/wrong.mp3");
        wrongaudio.play();
         
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();

    }

}


// Reset the level 
function startOver(){
    level=0;
    $("#level-title").text("Level " + level);
}