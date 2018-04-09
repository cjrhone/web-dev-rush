// BUSINESS LOGIC

var nextStep=0;
var bug=0;
var testPrompt="<html>";
var prompt =

["<html>","</html>","<head>","</head>","<title>","</title>","Animal Shelter","<body>","</body>","<h1>","</h1>","Animal Shelter","<div class='column'>","</div>","<img src='img/dog1.jpg'>","<h2>","</h2>","Ben the Dog","<p>","</p>","Happy even though nobody loves him.","<div class='column'>","<img src='img/dog2.jpg'>","<h2>","</h2>","Loretta the Dog","<p>","</p>","Always looks sad.","<div class='column'>","</div>","<img src='img/dog3.jpg'>","<h2>","</h2>","Billy the Dog","<p>","</p>","Loves the beach!","<br>","<div class='column'>","</div>","<img src='img/cat1.jpg'>","<h2>","</h2>","Greg the Cat","<p>","</p>","<div class='column'>","</div>","<img src='img/cat2.jpg'>","<h2>","</h2>","Tanya the Cat","<p>","</p>","Eats a lot, including her last owner.","<div class='column'>","</div>","<img src='img/cat3.jpg'>","<h2>","</h2>","<p>","</p>","Harry is a wild man!"];

//add listener to get textbox input when a user presses enter
function runScript(e){
  if (e.keyCode==13){
    var userInput=$('#inputBox').val();
    console.log(userInput);
    $('#inputBox').val("");
    testUserInput(userInput); //test input on enter press
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

// USER INTERFACE LOGIC


$(document).ready(function() {

})
