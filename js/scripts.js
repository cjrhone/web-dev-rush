// BUSINESS LOGIC

var nextStep=0;
var bug=0;
var score=0;
var bonusPoints=0;
var timeleft=20;
var prompt =

["<html>","</html>","<head>","</head>","<title>","</title>","Animal Shelter","<body>","</body>","<h1>","</h1>","Animal Shelter","<div class='column'>","</div>","<img src='img/dog1.jpg'>","<h2>","</h2>","Ben the Dog","<p>","</p>","Happy even though nobody loves him.","<div class='column'>","</div>","<img src='img/dog2.jpg'>","<h2>","</h2>","Loretta the Dog","<p>","</p>","Always looks sad.","<div class='column'>","</div>","<img src='img/dog3.jpg'>","<h2>","</h2>","Billy the Dog","<p>","</p>","Loves the beach!","<br>","<div class='column'>","</div>","<img src='img/cat2.jpg'>","<h2>","</h2>","Greg the Cat","<p>","</p>","Never lost a staring contest","<div class='column'>","</div>","<img src='img/cat1.jpg'>","<h2>","</h2>","Tanya the Cat","<p>","</p>","Eats a lot, including her last owner.","<div class='column'>","</div>","<img src='img/cat3.jpg'>","<h2>","</h2>","Harry the Cat","<p>","</p>","Harry is a wild man!"];

var instruction =

["Create html tag", "Close html tag","Create head tag","Close head tag","Create title tag","Close title tag","Title your webpage","Create body tag","Close body tag","Create header 1 tag","Close header 1 tag","Type header title","Create div with a 'column' class","Close div tag","Link 'dog1.jpg' image from 'img' folder", "Create header 2 tag","Close header 2 tag","Type dog1 header","Create paragraph tag","Close paragraph tag","Type short dog1 description","Create div with 'column' class","Close div tag","Link 'dog2.jpg' image from 'img' folder","Create header 2 tag","Close header 2 tag","Type dog2 header","Create paragraph tag","Close paragraph tag","Type short dog2 description","Create div with 'column' class","Close div tag","Link 'dog3' image from 'img' folder","Create header 2 tag","Close header 2 tag","Type dog3 header","Create paragraph tag","Close paragraph tag","Type short dog3 description","Create space between divs","Create div with 'column' class","Close div tag","Link 'cat2.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type cat2 header","Create paragraph tag","Close paragraph tag","Type short cat2 description","Create div with 'column' class","Close div tag","Link 'cat1.jpg' image from img folder","Create header 2 tag","Close header 2 tag","Type cat1 header","Create paragraph tag","Close paragraph tag","Type short cat1 description","Create div with 'column' class","Close div tag","Link 'cat3.jpg' image in img folder","Create header 2 tag","Close header 2 tag","Type cat3 header","Create paragraph tag","Close paragraph tag","Type short cat3 description"];

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
    score=score+bonusPoints;
    timeleft=timeleft+10;
  } else{
    bug++;
    nextStep++;
    timeleft=timeleft-5;
    checkLoss();
  }
  $('#testPrompt').text(prompt[nextStep]);
  $('#testHeader').text("Score: "+score+" Bugs: "+bug);
}

function startTimer(){
  pointTimer = setInterval(function(){
    timeleft--;
    document.getElementById("pointTimer").textContent = timeleft;
    bonusPoints=timeleft;
    if(timeleft <= 0)
      clearInterval(pointTimer);
      timeOver(); //function just to check if we can put some notification after time is over
  },1000);

}

function timeOver() {
    if (timeleft==0) {
      alert("Time is over!!!")
    } else {}
}

function checkLoss(){
  if (bug==3){
    alert("Game Over");
  } else{}
}

// USER INTERFACE LOGIC

$(document).ready(function() {
  startTimer();
  $('#testPrompt').text(prompt[nextStep]);
  $("#startGame").submit(function(event){
    event.preventDefault();
    $(".game").show();
    $(".closeGame").hide();
  });
});
