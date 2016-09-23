$(function()
{
  $("ul#tasks").on("click", "button.sub-btn", function()
  {
    var $displays = $(this).parent().children(".display");
    $displays.each(function()
    {
      $(this).text($(this).prev("input").val());
    });

    $(this).parent().addClass("edit");
  });

  $("button#add-task").click(function()
  {
    var task = "<li class=\"task\">" +
                "<input value=\"Task Description\"></input>" +
                "<span class=\"display\"></span>" +
                "<input type=\"date\"></input>" +
                "<span class=\"display\"></span>" +
                "<button class=\"sub-btn\">Submit</button>" +
               "</li>"

    $("ul#tasks").append(task);
  });

}); // End Main
