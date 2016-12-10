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

    addToStorage("task", $task);
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
    addCategory();
  });

  $("#category-dialog").dialog({
    autoOpen: false,
    modal: true
  });

  $("#category-dialog button").on("click", function()
  {
    var $category = createCategory($(this).parent().children("input").val());
    addToStorage("category", $category);

    $(this).parent().dialog("close");
  });

  $("ul#tasks").on("click", ".category div button", function()
  {
    var $category = $(this).parent().parent();

    if($category.attr("data-num") != undefined)
    {
      localStorage.removeItem("category-" + $category.attr("data-num"));
    }

    $category.remove();
  });

  $(window).scroll(function()
  {
    if($(this).scrollTop() > 50)
    {
      $("#sort").hide();
    }
    else
    {
      $("#sort").fadeIn();
    }
  });
}); // End Main
