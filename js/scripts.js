$(document).ready(function() {
$("#startGame").submit(function(event){
  event.preventDefault();
  $(".game").show();
  $(".closeGame").hide();
})
})
