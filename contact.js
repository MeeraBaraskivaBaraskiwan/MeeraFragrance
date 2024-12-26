
$(document).ready(function () {
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
      let isValid = true;
      $(this).find('input, textarea, select').each(function () {
        if ($(this).val().trim() === '') {
          isValid = false;
          $(this).css('border', '2px solid red');
        } else {
          $(this).css('border', '2px solid var(--primary-color)');
        }
      });
      if (isValid) {
        $('#submission-message').fadeIn(500).delay(3000).fadeOut(500);
        $('#contact-form')[0].reset();
      } else {
        alert('Please fill out all fields correctly.');
      }
    });
  
    $('input, textarea, select').on('input change', function () {
      if ($(this).val().trim() !== '') {
        $(this).css('border', '2px solid var(--primary-color)');
      }
    });
  });
  