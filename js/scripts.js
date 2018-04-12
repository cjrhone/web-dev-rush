// BUSINESS LOGIC
var misspelledWords = [];
var nextStep=0;
var bug=0;
var score=0;
var bonusPoints=0;
var timeleft=15;
var highestScores=[];
var player1;
var loadedScores;
var prompt =


["<!DOCTYPE html>","<html>","</html>","<head>","</head>","<title>","</title>","My Website","<body>","</body>","<h1>","</h1>","Animal Shelter","<div class='column'>","</div>","<img src='img/dog1.jpg'>","<h2>","</h2>","Ben the Dog","<p>","</p>","Happy even though nobody loves him.","<div class='column'>","</div>","<img src='img/dog2.jpg'>","<h2>","</h2>","Loretta the Dog","<p>","</p>","Always looks sad.","<div class='column'>","</div>","<img src='img/dog3.jpg'>","<h2>","</h2>","Billy the Dog","<p>","</p>","Loves the beach!","<br>","<div class='column'>","</div>","<img src='img/cat2.jpg'>","<h2>","</h2>","Greg the Cat","<p>","</p>","Never lost a staring contest","<div class='column'>","</div>","<img src='img/cat1.jpg'>","<h2>","</h2>","Tanya the Cat","<p>","</p>","Eats a lot, including her last owner.","<div class='column'>","</div>","<img src='img/cat3.jpg'>","<h2>","</h2>","Harry the Cat","<p>","</p>","Harry is a wild cat!"];

var instruction =

["Create HTML5 Document Type","Create html tag", "Close html tag","Create head tag","Close head tag","Create title tag","Close title tag","Title your webpage","Create body tag","Close body tag","Create header 1 tag","Close header 1 tag","Type heading text ","Create div with a 'column' class","Close div tag","Link 'dog1.jpg' image from 'img' folder", "Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create div with 'column' class","Close div tag","Link 'dog2.jpg' picture from 'img' folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short dog2 description","Create div with 'column' class","Close div tag","Link 'dog3' picture from 'img' folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create space between divs","Create div with 'column' class","Close div tag","Link 'cat2.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short cat2 description","Create div with 'column' class","Close div tag","Link 'cat1.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short description","Create div with 'column' class","Close div tag","Link 'cat3.jpg' picture in img folder","Create header 2 tag","Close header 2 tag","Type header text","Create paragraph tag","Close paragraph tag","Type short cat3 description"];

//Sounds and SFX
var correctSound = new Howl({
  src: ['Assets/SFX/laser2.mp3']
});

var wrongSound = new Howl({
  src: ['Assets/SFX/bug.wav']
});

var music = new Howl({
  src: ['Assets/SFX/Cosmic_Love.mp3']
});

var type = new Howl({
  src:['Assets/SFX/keyboard_key.mp3']
});

var lose = new Howl({
  src:['Assets/SFX/website-change.wav']

});

var select = new Howl({
  src:['Assets/SFX/select.mp3']
});

//add listener to get textbox input when a user presses enter
function runScript(e){
  type.play();
  if (e.keyCode==13){
    var userInput=$('#inputBox').val();
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
    timeleft=timeleft+5;
    $('#correctTimeBonus').show();
    $('#correctTimeBonus').text("+5 seconds");
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

function Player(name){
  this.name=name;
  this.score=0;
}

function clearHighScores(){
  loadedScores=[];
  localStorage.setItem("highestScores", JSON.stringify(loadedScores));
  for(var x=0; x<loadedScores.length; x++){
    console.log(x+1+". " + loadedScores[x].name + " score: "+ loadedScores[x].score);
  }
}

function getMax(){
  let output=[];
  var added=false;
//var nextItem=0;
  if (player1.score>loadedScores[0].score){
    loadedScores.splice(0, 0, player1);
    console.log ("added top score");
    added=true;
  }
  if (added===false){
    for(let i=0; i<loadedScores.length&&added===false; i++){
      console.log("for loop i: "+i);
      let nextItem;
      if (loadedScores[i+1]===undefined){
        nextItem=undefined;
      } else{
        nextItem=loadedScores[i+1].score;
      }

      if (player1.score<loadedScores[0].score&&player1.score>nextItem){
        loadedScores.splice(i+1,0, player1);
        console.log("max found and splice happens");
        added=true;
        console.log("next item:" +nextItem);
      } else if (player1.score<loadedScores[loadedScores.length-1].score){
        loadedScores.push(player1);
        console.log("max found and splice happens condition 2");
        added=true;
      } else{}
    }
    if (added===false){
      console.log("added to the end");
      loadedScores.push(player1);
      added=true;
    } else{}
  }
}

function leaderBoard(){
  if (loadedScores.length<1){
    loadedScores.push(player1);
    console.log("added first value");
    console.log(1+"."+loadedScores[0].name+ " score: "+loadedScores[0].score);
  } else{
    getMax();
    for(x=0; x<loadedScores.length; x++){
      console.log(x+ 1+"."+loadedScores[x].name+ " score: "+loadedScores[x].score);
    }
  }
  localStorage.setItem("highestScores", JSON.stringify(loadedScores));
  console.log(loadedScores);
}

function timeOver() {
    if (timeleft<=0&&bug!=3) {
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
  lose.play();
  player1.score=score;
  $(".game-over").show();
  $(".playGame").hide();
  $("#finalScore").text(score);
  $("#retryButton").addClass('animated bounceInDown');
  showMisspelledWords();
  leaderBoard();
  showHighScores();
}

function resetGame(){
  player1=new Player(playerName);
  clearInterval(pointTimer);
  timeleft=15;
  $("timeLimitText").text("15");
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

function progressBar() {
    var elem = document.getElementById("myBar");
    var height = (nextStep/69)*100;
    elem.style.height = height + '%';
}

function showNextStep(){
  select.play();
  document.getElementById("step"+nextStep).textContent=prompt[nextStep-1];
  progressBar();
}
function stepClass(){
  textContent.addClass('animated fadeIn');
}

function showHighScores(){
  document.getElementById("highScoreList").textContent="";
  loadedScores.forEach(function(loadedScore){
    console.log("display loop runs");
    $("#highScoreList").append("<li class='noFloat'>" +loadedScore.name+" "+loadedScore.score);
  });
  $("#highScoreList").append("</li>");
}


function showMisspelledWords(){
  document.getElementById("misspelledList").textContent=misspelledWords;
}
// USER INTERFACE LOGIC

$(document).ready(function() {
  if (typeof(Storage) !== "undefined") {
    console.log("Code for localStorage/sessionStorage.");
    loadedScores= JSON.parse(localStorage.getItem("highestScores"));
    if (loadedScores===null){
      loadedScores=[];
    }
  } else {
    console.log("Sorry! No Web Storage support..");
  }


  $('#promptText').text(prompt[nextStep]);
  $('#instructionText').text(instruction[nextStep]);

  $("#startGame").submit(function(event){
    select.play();
    playerName=$("#usernameInput").val();
    player1=new Player(playerName);
    console.log(player1);
    event.preventDefault();
    $(".instructions").show();
    $(".closeGame").hide();


  });

  $("#continue").click(function() {
    select.play();
    $(".instructions").hide();
    startTimer();
    $('#bugBox').addClass('animated rollIn');
    $('#displayBox').addClass('animated rollIn');
    $("#timeLimit").addClass('animated rollIn');
    $("#scoreBox").addClass('animated rollIn');
    $('#instructions').addClass('animated rollIn');
    $('#inputBox').addClass('animated rollIn');
    $("#progress-box").addClass('animated rollIn');
    $("#prompts").addClass('animated rollIn');
    $("#timeLimitText").addClass('animated rollIn');
    $("#PreviewBox").addClass('animated rollIn');
    // music.play();

    $(".game").show();
    $(".closeGame").hide();
    $(".playGame").show();
  });


  $("#retryButton").click(function(){
    select.play();
    resetGame();
    $(".game-over").hide();
    $(".playGame").show();
    startTimer();
  });

  $("#mainMenu").click(function() {
    select.play();
    window.location.href = "index.html";
  });

  // it will toggle the page, once user click the action button
  $("#action").click(function() {
    select.play();
    $("#personals").slideToggle();
    $("#personals").css({display: "flex"});
  });

});
