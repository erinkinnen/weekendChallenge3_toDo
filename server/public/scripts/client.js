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

                        // function displayBooks(response) {
                        //   console.log("client.js line 2 displayBooks");
                        //   console.log(response);
                        //   $('#books').empty();
                        //   for(var i = 0; i < response.length; i++) {
                        //     var book = response[i];
                        //     $('#books').append('<tr></tr>');
                        //     var $el = $('#books').children().last();
                        //     $el.append('<td>' + book.id + '</td>');
                        //     $el.append('<td>' + book.author + '</td>');
                        //     $el.append('<td>' + book.title + '</td>');
                        //     if(book.year !== null){
                        //       $el.append('<td>' + book.year + '</td>');
                        //     }
                        //     if(book.publisher !== null){
                        //       $el.append('<td>' + book.publisher + '</td>');
                        //     }
                        //       // $el.append('<button class = delete>'Delete'</button>');
                        // }//end for loop
                        // }//end displayBooks

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
        $el.append('<td>' + task.completed + '</td>');
  }
}
