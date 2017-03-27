
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
            // if(task.completed === false){
            $el.append('<td>' + task.list_item + '</td>');
            // $el.append('<input type="checkbox" name="completeCheckbox" />');
            // $el.append('<td>' + task.completed + '</td>');
            if(task.completed === false){
            $el.append('<td><button class="completed" data-task='+
                        task.id + '>Complete</button></td>');
                        console.log(task.id);
            } //else  {
            // $el.append('<button class = yesCompleted>Complete</button>');
            // }
            $el.append('<td><button class="delete" data-task='+
                      task.id + '>Delete</button></td>');
                      console.log(task.id);
            // }
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
//ON SUBMIT
  $('.todo').on('submit', function(event){
    event.preventDefault();
    console.log('we are here');
    console.log($('#newTask').val());

    //new task object to send to db
    var taskToSend = {
      newTask: $(newTask).val(),
      completeStatus: false
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

//ON CLICK DELETE
  $('#tasksTable').on('click','.delete',function() {
    console.log('Delete Task:', $(this).data('task'));
    var maybeDelete = confirm("Are you sure you want to delete?");
    console.log(maybeDelete);
    if(maybeDelete === true) {
      $.ajax({
        type: 'DELETE', //similar to SELECT
        url: '/tasks/delete/' + $(this).data('task'),
        success: function() {
          getTasksFromDB();
        }
      });
    }
  });
// , $this.data('task')
//ON CLICK COMPLETE
  $('#tasksTable').on("click",'.completed',function(){

    var taskId = $(this).data('task');
    console.log('Complete Task: ', taskId );
    $.ajax({
      type: "PUT",
      url: '/tasks/update/' + taskId,
      data: {
        id: taskId,
        completed: true,
      },
      success: function(){
        console.log("update click log");
        getTasksFromDB();
      }
    });
  });

  // ANY OTHER EVENT LISTENERS
} // end addEventListeners()
