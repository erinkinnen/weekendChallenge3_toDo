
var taskId = 0;

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
        $el.append('<td><button class="delete" data-task='+
                  list_item.id + '>Delete</button></td>');
  }//end of for loop
    }//end of displayTasks



$(document).ready(function(){
  console.log("jQuery sourced");
  getTasksFromDB();
  addEventListeners();
  // displayTasks();

});//end document ready

function addEventListeners() {
  $('.todo').on('submit', function(event){
    event.preventDefault();
    console.log('we are here');
    console.log($('#newTask').val());

    //new task object to send to db
    var taskToSend = {
      newTask: $(newTask).val(),
      completeStatus: $(completeStatus).val()
    };
    //ajax post to send to db
    $.ajax({
      type: "POST",
      url: "tasks/addTask",
      data: taskToSend,
      success: function(response) {
        console.log("on submit response");
        console.log(response);// Refresh our data
        displayTasks(response);
      }//end success function
    });//end ajax POST
    // this.reset();
  });//end .on Submit

  // ANY OTHER EVENT LISTENERS
} // end addEventListeners()

function getTasksFromDB(){
  $.ajax ({
    type: "GET",
    url: "/tasks",
    success: function(response){
      console.log("/tasks GET success: ", response);
      displayTasks(response);
    }

  });//end of ajax

}//end of getTasksFromDB
