TASK_LIMIT = 100000;

function createTask()
{
  var task = $($.parseHTML(
             "<li class=\"task not-started\">" +
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

function createCategory()
{
  $("#category-dialog").dialog("open");
}

function initializeList()
{
  $("#tasks").sortable();
  initializeTasks();
  sort();
}

function initializeTasks()
{
  for(var i in localStorage)
  {
    $("ul#tasks").append(localStorage.getItem(i));
  }
}

function toggleState($object)
{
  if($object.hasClass("not-started"))
  {
    $object.toggleClass("not-started");
    $object.toggleClass("in-progress");
  }
  else if($object.hasClass("in-progress"))
  {
    $object.toggleClass("in-progress");
    $object.toggleClass("almost-completed");
  }
  else if($object.hasClass("almost-completed"))
  {
    $object.toggleClass("almost-completed");
    $object.toggleClass("completed");
  }
  else if($object.hasClass("completed"))
  {
    $object.toggleClass("completed");
    $object.toggleClass("not-started");
  }
}

String.prototype.hashCode = function()
{
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;

  for (i = 0, len = this.length; i < len; i++)
  {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function addToStorage(type, $pointer)
{
  // TODO addToStorage helper function
}

function updateStorage($task)
{
  var idNum = $task.attr("data-num");

  localStorage.setItem("task-" + idNum,
    "<li class=\"" + $task.attr("class") + "\" data-num=\"" + idNum
    + "\">" + $task.html() + "</li>");
}

function sort()
{
  var $taskArr = $("#tasks").children();
  for(var i = 1; i < $taskArr.length; i++)
  {
    var j = i;
    while(j > 0 && compare($taskArr[j], $taskArr[j - 1]) > 0)
    {
      $($taskArr[j]).insertBefore($($taskArr[j - 1]));
      $taskArr = $("#tasks").children();
      j--;
    }
  }
}

function compare(obj1, obj2)
{
  var status1 = $(obj1).attr("class").split(" ")[1];
  var status2 = $(obj2).attr("class").split(" ")[1];

  status1 = statusVal(status1);
  status2 = statusVal(status2);

  if(status1 > status2)
  {
    return 1;
  }
  else
  {
    return -1;
  }
}

function statusVal(status)
{
  switch(status)
  {
    case "not-started":
      return 4;
    case "in-progress":
      return 3;
    case "almost-completed":
      return 2;
    case "completed":
      return 1;
  }
}
