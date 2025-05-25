$(document).on('click', '.menu_bar a', function(event){
  event.preventDefault();
  $('nav').toggleClass('visible');
});