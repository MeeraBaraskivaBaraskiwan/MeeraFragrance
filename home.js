$(document).ready(function () {
   
    const videos = ['v3.mp4', 'v4.mp4', 'v1.mp4'];
    let currentVideo = 0;
    const heroVideo = document.getElementById('hero-video');
    const videoSource = $('#hero-video source');
  
    
    videoSource.attr('src', videos[currentVideo]);
    heroVideo.load();
    heroVideo.play();
  
  
    $('#hero-video').on('ended', function () {
      currentVideo = (currentVideo + 1) % videos.length;
      videoSource.attr('src', videos[currentVideo]);
      this.load();
      this.play();
    });
  
   
    heroVideo.playbackRate = 2;
  
    
    $('.hero').hide().fadeIn(600);
  
    $('.shop-now').hover(
      function () {
        $(this).css({
          backgroundColor: '#957dad',
          color: '#fff',
          transition: '0.3s'
        });
      },
      function () {
        $(this).css({
          backgroundColor: '#d291bc',
          color: '#fff',
          transition: '0.3s'
        });
      }
    );
  
    
    $('.shop-now').click(function () {
      window.location.href = 'products.html';
    });
  
    
    $('.instagram-icon').hover(
      function () {
        $(this).css({
          color: '#fff',
          transform: 'scale(1.2)',
          transition: 'transform 0.3s, color 0.3s'
        });
      },
      function () {
        $(this).css({
          color: '#fff',
          transform: 'scale(1)',
          transition: 'transform 0.3s, color 0.3s'
        });
      }
    );
  
    
    $('.view-more-btn').click(function () {
      const productId = $(this).data('id');
      window.location.href = `product-details.html?id=${productId}`;
    });
  });
  