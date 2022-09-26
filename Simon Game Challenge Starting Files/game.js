
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = true;
$(document).keypress(function(){
    if(started){
       $("#level-title").text("Level " + level);
       nextSequence();       
    }
        
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    //console.log(userChosenColour);  
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length=== gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        
        startOver();
    } 
     
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}