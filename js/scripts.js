
//add listener to get textbox input when a user presses enter
function runScript(e){
  if (e.keyCode==13){
    var userInput=$('#inputBox').val();
    console.log(userInput);
  } else{}
}


$(document).ready(function() {
  $("#terminal-form").submit(function(event) {

    alert("you submitted inputted");

  })
})
