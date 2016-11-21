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
      var idNum = JSON.stringify($task).hashCode();

      $task.attr("data-num", idNum);
      localStorage.setItem("task-" + idNum,
        "<li class=\"" + $task.attr("class") + "\" data-num=\"" + idNum
        + "\">" + $task.html() + "</li>");
    }
    else
    {
      localStorage.setItem("task-" + $task.attr("data-num"),
        "<li class=\"" + $task.attr("class") + "\" data-num=\""
          + $task.attr("data-num")
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
      localStorage.removeItem("task-" + $task.attr("data-num"));
    }

    $task.remove();
  });

  $("ul#tasks").on({
    mouseenter: function()
    {
      if(   $(this).parent().parent().hasClass("category")
         || $(this).parent().children(".sub-btn").is(":hidden"))
      {
        $(this).parent().children(".edit-btn").show();
      }
    },
    mouseleave: function()
    {
      $(this).parent().children(".edit-btn").hide();
    }
  }, ".task .display, .task button.edit-btn, \
     .category div span, .category div .edit-btn");

  $("ul#tasks").on("click", ".task", function(evt)
  {
    if(evt.offsetX < 1 && $(this).children(".display").is(":visible"))
    {
      toggleState($(this));
      updateStorage($(this));
    }
  });

  $("button#add-task").click(function()
  {
    createTask();
  });

  $("#sort").click(function()
  {
    sort();
  });

  $("button#add-category").click(function()
  {
    createCategory();
  });

  $("#category-dialog").dialog({
    autoOpen: false,
    modal: true
  });

  $("#category-dialog button").on("click", function()
  {
    var $dialog = $(this).parent();

    var category = $($.parseHTML(
                    "<li class=\"category\">" +
                     "<div>" +
                      "<span>" + $dialog.children("input").val() + "</span>" +
                      "<button class=\"edit-btn\">Remove</button>" +
                     "</div>" +
                    "</li>"));
    $("ul#tasks").append(category);

    //TODO add to local storage

    $dialog.dialog("close");
  });

  $("ul#tasks").on("click", ".category div button", function()
  {
    //TODO remove from local storage

    $(this).parent().parent().remove();
  });

  $(window).scroll(function()
  {
    if( $(this).scrollTop() > 50 )
    {
      $("#sort").hide();
    }
    else
    {
      $("#sort").fadeIn();
    }
  });
}); // End Main
