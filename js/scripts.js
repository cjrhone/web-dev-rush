// BUSINESS LOGIC

var nextStep=0;
var bug=0;
var score=0;
var bonusPoints=0;
var timeleft=20;
var prompt =

["<!DOCTYPE html>","<html>","</html>","<head>","</head>","<title>","</title>","My Website","<body>","</body>","<h1>","</h1>","Animal Shelter","<div class='column'>","</div>","<img src='img/dog1.jpg'>","<h2>","</h2>","Ben the Dog","<p>","</p>","Happy even though nobody loves him.","<div class='column'>","</div>","<img src='img/dog2.jpg'>","<h2>","</h2>","Loretta the Dog","<p>","</p>","Always looks sad.","<div class='column'>","</div>","<img src='img/dog3.jpg'>","<h2>","</h2>","Billy the Dog","<p>","</p>","Loves the beach!","<br>","<div class='column'>","</div>","<img src='img/cat2.jpg'>","<h2>","</h2>","Greg the Cat","<p>","</p>","Never lost a staring contest","<div class='column'>","</div>","<img src='img/cat1.jpg'>","<h2>","</h2>","Tanya the Cat","<p>","</p>","Eats a lot, including her last owner.","<div class='column'>","</div>","<img src='img/cat3.jpg'>","<h2>","</h2>","Harry the Cat","<p>","</p>","Harry is a wild cat!"];

var instruction =

["Create HTML5 Document Type","Create html tag", "Close html tag","Create head tag","Close head tag","Create title tag","Close title tag","Title your webpage","Create body tag","Close body tag","Create header 1 tag","Close header 1 tag","Type heading text ","Create div with a 'column' class","Close div tag","Link 'dog1.jpg' image from 'img' folder", "Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create div with 'column' class","Close div tag","Link 'dog2.jpg' picture from 'img' folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short dog2 description","Create div with 'column' class","Close div tag","Link 'dog3' picture from 'img' folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create space between divs","Create div with 'column' class","Close div tag","Link 'cat2.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short cat2 description","Create div with 'column' class","Close div tag","Link 'cat1.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create div with 'column' class","Close div tag","Link 'cat3.jpg' picture in img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short cat3 description"];

//Sounds and SFX
var correctSound = new Howl({
  src: ['Assets/SFX/correct1.mp3']
});

var wrongSound = new Howl({
  src: ['Assets/SFX/wrong1.mp3']
});

var music = new Howl({
  src: ['Assets/SFX/Cosmic_Love.mp3']
});


//add listener to get textbox input when a user presses enter
function runScript(e){
  if (e.keyCode==13){
    var userInput=$('#inputBox').val();
    console.log(userInput);
    $('#inputBox').val("");
    testUserInput(userInput); //test input on enter press
    clearInterval(pointTimer);
    startTimer();
  } else{}
}

//test if input matches prompt
function testUserInput(userInput){
  if (userInput===prompt[nextStep]){
    nextStep++;
    correctSound.play();
    score=score+bonusPoints;
    timeleft=timeleft+10;
  } else{
    bug++;
    wrongSound.play();
    nextStep++;
    timeleft=timeleft-5;
    checkLoss();
  }
  if(bug ===1){
    $(".bugimg1").show();
  }
  if(bug ===2){
    $(".bugimg2").show();
  }
  if(bug===3){
    $(".bugimg3").show();
  }
  $('#promptText').text(prompt[nextStep]);
  $('#instructionText').text(instruction[nextStep]);
  $('#bugBoxText').text("Bugs: "+bug);
  $('#scoreText').text("Score: "+score);
}

function startTimer(){
  pointTimer = setInterval(function(){
    timeleft--;
    document.getElementById("timeLimitText").textContent = timeleft;
    bonusPoints=timeleft;
    if(timeleft <= 0)
      clearInterval(pointTimer);
      timeOver(); //function just to check if we can put some notification after time is over
  },1000);

}

function timeOver() {
    if (timeleft==0) {
      // alert("Time is over!!!")
    } else {}
}

function checkLoss(){
  if (bug==3){
    // alert("Game Over");
    $(".game-over").show();
    $(".playGame").hide();

  } else{}
    window.location.href = "victory.html"
}

function resetGame(){
  var nextStep=0;
  var bug=0;
  var score=0;
  var bonusPoints=0;
  var timeleft=20;
}

// USER INTERFACE LOGIC

$(document).ready(function() {
  startTimer();
  music.play();
  $('#promptText').text(prompt[nextStep]);
  $('#instructionText').text(instruction[nextStep]);
  $("#startGame").submit(function(event){
    event.preventDefault();
    $(".game").show();
    $(".closeGame").hide();
    $(".playGame").show();
  });
});
