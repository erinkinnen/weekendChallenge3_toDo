$(document).ready(function(){
  console.log("jQuery sourced");

getTasksFromDB();
displayTasks();

});//end document ready

function displayTasks(response){
  console.log("displayTasks working");
  console.log(response);
}

function getTasksFromDB(){
  $.ajax ({
    type: "GET",
    url: "/tasklist",
    success: function(response){
      console.log("tasklist GET success: ", response);
    }
  });//end of ajax
}//end of getTasksFromDB

function displayTasks(response){
  console.log("displayTasks working");
  console.log(response);
}
