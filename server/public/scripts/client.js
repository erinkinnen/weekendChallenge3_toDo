$(document).ready(function(){
  console.log("jQuery sourced");

getTasksFromDB();

});//end document ready

function getTasksFromDB(){
  $.ajax ({
    type: "GET",
    url: "/tasklist",
    success: function(response){
      console.log("tasklist GET success: ", response);
    }
  });//end of ajax
}//end of getTasksFromDB
