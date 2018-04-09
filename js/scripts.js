var nextStep=0;
var bug=0;
var testPrompt="<html>";

//add listener to get textbox input when a user presses enter
function runScript(e){
  if (e.keyCode==13){
    var userInput=$('#inputBox').val();
    console.log(userInput);
    $('#inputBox').val("");
    testUserInput(userInput); //test input on enter press
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
  var pointTimer = setInterval(function(){
  timeleft--;
  document.getElementById("pointTimer").textContent = timeleft;
  if(timeleft <= 0)
      clearInterval(downloadTimer);
  },1000);
}


$(document).ready(function() {
  $("#terminal-form").submit(function(event) {

    alert("you submitted inputted");

  });
});
