// BUSINESS LOGIC
var misspelledWords = [];
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

var type = new Howl({
  src:['Assets/SFX/keyboard_key.mp3']
})


//add listener to get textbox input when a user presses enter
function runScript(e){
  type.play();

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
    $('#correctTimeBonus').show();
    $('#correctTimeBonus').text("+10 seconds");
    $('#correctTimeBonus').fadeOut(800);
  } else{
    misspelledWords.push(prompt[nextStep]);
    bug++;
    wrongSound.play();
    nextStep++;
    timeleft=timeleft-5;
    $('#incorrectTimeBonus').show();
    $('#incorrectTimeBonus').text("-5 seconds");
    $('#incorrectTimeBonus').fadeOut(800);
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

  showNextStep();
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

function highscoreCheck() {
  if (score != 0) {
        highscore = localStorage.getItem("scoreText");
        if(highscore !== null){
            if (score > highscore) {
                localStorage.setItem("scoreText", score);
            }
        }
        else{
            localStorage.setItem("scoreText", score);
        }
  }
  $('#highscoreText').text("Highscore: "+highscore);
}

function timeOver() {
    if (timeleft==0) {
      gameOver();
    } else {}
}

function checkLoss(){
  if (bug==3){
    // alert("Game Over");
    gameOver();
  } else{}
    // window.location.href = "victory.html"
}

function clearLines(){
  document.getElementById("step1").textContent="work";
  for (var x=1; x<=prompt.length; x++){
    if (document.getElementById("step"+x)!=null){
      document.getElementById("step"+x).textContent="";
    } else{}
  }
}

function gameOver(){
  $(".game-over").show();
  $(".playGame").hide();
  $("#finalScore").text(score);
  showMisspelledWords();
}

function resetGame(){
  clearInterval(pointTimer);
  timeleft=20;
  $("timeLimitText").text("20");
  nextStep=0;
  bug=0;
  score=0;
  bonusPoints=0;
  clearLines();
  misspelledWords=[];
  $(".bugimg1").hide();
  $(".bugimg2").hide();
  $(".bugimg3").hide();
  $('#promptText').text(prompt[nextStep]);
  $('#instructionText').text(instruction[nextStep]);
  $('#bugBoxText').text("Bugs: "+bug);
  $('#scoreText').text("Score: "+score);
}

function showNextStep(){
  document.getElementById("step"+nextStep).textContent=prompt[nextStep-1];
}

function showMisspelledWords(){
  document.getElementById("misspelledList").textContent=misspelledWords;
}
// USER INTERFACE LOGIC

$(document).ready(function() {

  $('#promptText').text(prompt[nextStep]);
  $('#instructionText').text(instruction[nextStep]);
  $("#startGame").submit(function(event){
    startTimer();
    // music.play();
    event.preventDefault();
    $(".game").show();
    $(".closeGame").hide();
    $(".playGame").show();


  });


  $("#retryButton").click(function(){
    resetGame();
    $(".game-over").hide();
    $(".playGame").show();
    startTimer();
  });

  $("#mainMenu").click(function() {
    window.location.href = "index.html";
  });

  // it will toggle the page, once user click the action button
  $("#action").click(function() {
    $("#personals").slideToggle();
    $("#personals").css({display: "flex"});
  });

});
