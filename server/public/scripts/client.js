
var taskId = 0;

function getTasksFromDB(){
  $.ajax ({
    type: "GET",
    url: "/tasks",
    success: function(response){
      console.log("/tasks GET success: ", response);
      // displayTasks(response);
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
                      newTask.id + '>Delete</button></td>');
      }//end of for loop
    }

  });//end of ajax

}//end of getTasksFromDB

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
    console.log(taskToSend);
    //ajax post to send to db
    $.ajax({
      type: "POST",
      url: "tasks/addTask",
      data: taskToSend,
      success: function(response) {
        console.log("on submit response");
        console.log(response);// Refresh our data
        getTasksFromDB();
        // $(newTask).val();
        // $(completeStatus).val();
      }//end success function
    });//end ajax POST
    this.reset();

  });//end .on Submit

  $('#tasksTable').on('click','.delete',function() {
    console.log('Delete Task:', $(this).data('task'));
    $.ajax({
      type: 'DELETE', //similar to SELECT
      url: '/tasks/delete/' + $(this).data('task'),
      success: function() {
        getTasksFromDB();
      }
    });
  });

  // ANY OTHER EVENT LISTENERS
} // end addEventListeners()
