// resize the header section
$(document).ready(function(){
  $('.header').height($(window).height());
  })
  
  // close collapsed navbar when clicked outside 
  $(document).ready(function () {
    $(document).click(function (event) {
        var click = $(event.target);
        var _open = $(".navbar-collapse").hasClass("show");
        if (_open === true && !click.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});