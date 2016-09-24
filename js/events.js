$(function()
{
  $("ul#tasks").on("click", "button.sub-btn", function()
  {
    var $task = $(this).parent();
    $task.children(".display").each(function()
    {
      $(this).text($(this).prev().val());
    }).show();

    $task.children("input, .sub-btn, .rmv-btn").hide();

    if($task.attr("data-num") == undefined)
    {
      do
      {
        var idNum = Math.floor(Math.random() * TASK_LIMIT) + 1;
      }
      while(localStorage.getItem("task-" + idNum) != undefined);

      $task.attr("data-num", idNum);
      localStorage.setItem("task-" + idNum,
        "<li class=\"task\" data-num=\"" + idNum
        + "\">" + $task.html() + "</li>");
    }
    else
    {
      localStorage.setItem("task-" + $task.attr("data-num"),
        "<li class=\"task\" data-num=\"" + $task.attr("data-num")
          + "\">" + $task.html() + "</li>");
    }
  });

  $("ul#tasks").on("click", "button.edit-btn", function()
  {
    var $task = $(this).parent();
    $task.children("input").each(function()
    {
      $(this).val($(this).next().text());
    });

    $task.children(".display").hide();
    $task.children("input, .sub-btn, .rmv-btn").show();
    $(this).hide();
  });

  $("ul#tasks").on("click", "button.rmv-btn", function()
  {
    var $task = $(this).parent();

    if($task.attr("data-num") != undefined)
    {
      alert("item removed");
      localStorage.removeItem("task-" + $task.attr("data-num"));
    }

    $task.remove();
  });

  $("ul#tasks").on({
    mouseenter: function()
    {
      if($(this).parent().children(".sub-btn").is(":hidden"))
      {
        $(this).parent().children(".edit-btn").show();
      }
    },
    mouseleave: function()
    {
      $(this).parent().children(".edit-btn").hide();
    }
  }, ".task .display, .task button.edit-btn");

  $("button#add-task").click(function()
  {
    createTask();
  });
}); // End Main
