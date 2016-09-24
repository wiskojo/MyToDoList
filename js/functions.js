TASK_LIMIT = 100000;

function createTask()
{
  var task = $($.parseHTML(
             "<li class=\"task\">" +
              "<input value=\"Task Description\"></input>" +
              "<span class=\"display des\"></span>" +
              "<input type=\"date\"></input>" +
              "<span class=\"display date\"></span>" +
              "<button class=\"edit-btn\">Edit</button>" +
              "<button class=\"sub-btn\">Submit</button>" +
              "<button class=\"rmv-btn\">Remove</button>" +
             "</li>"));

  $("ul#tasks").append(task);
}

function initializeTasks()
{
  for(var i in localStorage)
  {
    $("ul#tasks").append(localStorage.getItem(i));
  }
}
