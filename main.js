$(document).ready(function () {
    
    $('.hamburger').on('click', function () {
      $('nav ul').toggleClass('open-nav');
    });
  
   
    $('nav ul li a').on('click', function (e) {
      const target = $(this).attr('href');
      if (target.startsWith('#')) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top - 60
          },
          1000
        );
      }
    });
  });
  