$(function()
{
  $("ul#tasks").on("click", "button.sub-btn", function()
  {
    var $task = $(this).parent();
    $task.children(".display").each(function()
    {
      $(this).text($(this).prev().val());
    }).show();

    $task.children("input, .sub-btn").hide();
  });

  $("ul#tasks").on("click", "button.edit-btn", function()
  {
    var $task = $(this).parent();

    $task.children(".display").hide();
    $task.children("input, .sub-btn").show();
    $(this).hide();
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
    // TODO - Fix selectors so margins work without
    // not being able to press button
  }, ".task .display, .task button.edit-btn");

  $("button#add-task").click(function()
  {
    var task = "<li class=\"task\">" +
                "<input value=\"Task Description\"></input>" +
                "<span class=\"display\"></span>" +
                "<input type=\"date\"></input>" +
                "<span class=\"display\"></span>" +
                "<button class=\"edit-btn\">Edit</button>" +
                "<button class=\"sub-btn\">Submit</button>" +
               "</li>"

    $("ul#tasks").append(task);
  });

}); // End Main
