
$(document).ready(function(){
    $('.menu_bar a').click(function(){
      event.preventDefault(); // Evita que el "#" se agregue a la URL  (cuando esto pasa no funciona bien el js del menú.. no entiendo porqué)
      $('nav').toggleClass('visible');
    });
  });