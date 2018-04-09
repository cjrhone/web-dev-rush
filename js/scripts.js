var nextStep=0;
var bug=0;
var testPrompt="<html>";
var endEarly=false;
var pointTimer;

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
  if (userInput===testPrompt){
    nextStep++;
  } else{
    bug++;
  }
}

function startTimer(){
  var timeleft = 100;
  pointTimer = setInterval(function(){
    timeleft--;
    document.getElementById("pointTimer").textContent = timeleft;
    if(timeleft <= 0)
      clearInterval(pointTimer);
  },1000);
}

$(document).ready(function() {

  $("#startGame").submit(function(event){
    event.preventDefault();
    $(".game").show();
    $(".closeGame").hide();
  });
});
