$(document).ready(function(){
  console.log("jQuery sourced");

getTasksFromDB();
// displayTasks();

});//end document ready



function getTasksFromDB(){
  $.ajax ({
    type: "GET",
    url: "/tasklist",
    success: function(response){
      console.log("tasklist GET success: ", response);
      displayTasks(response);
    }

  });//end of ajax

}//end of getTasksFromDB

$('#tasksTable').on('submit', function(event){
event.preventDefault();
console.log($('#newTask').val());
$.ajax({
type: "POST",
url: "tasklist/addTask",
data: {newTask: $('#newTask').val()},
success: function(response) {
console.log("what's tasklist response");
console.log(response);// Refresh our data
displayTasks(response);

}//end success function
});//end ajax POST
// this.reset();
});//end .on Submit

function displayTasks(response){
  console.log("displayTasks working");
  // console.log(response);
  $("#tasksTable").empty();
  for(var i = 0; i < response.length; i++){
    var task = response[i];
    console.log(response[i]);
    $('#tasksTable').append('<tr></tr>');
        var $el = $('#tasksTable').children().last();
        // $el.append('<td>' + task.id + '</td>');
        $el.append('<td>' + task.list_item + '</td>');
        // $el.append('<td>' + task.completed + '</td>');
        if(task.completed === false){
          $el.append('<button class = noCompleted>Not Complete</button>');
        } else  {
        $el.append('<button class = yesCompleted>Complete</button>');
        }
        $el.append('<button class = delete>Delete</button>');
  }//end of for loop
    }//end of displayTasks
