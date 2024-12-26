
$(document).ready(function () {
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
  
    const productId = parseInt(getQueryParam('id'));
    const popup = $('#added-to-cart-popup');
  
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
      success: function (data) {
        const products = data.slice(0, 12).map((item, index) => {
          const priceValue = (Math.random() * 150 + 20).toFixed(2);
          return {
            id: item.id,
            name: `Perfume ${index + 1}`,
            description: item.body,
            price: parseFloat(priceValue),
            image: `images/p${(index % 12) + 1}.jpg`,
            rating: Math.floor(Math.random() * 5) + 1
          };
        });
  
        const product = products.find(p => p.id === productId);
        if (product) {
          $('#product-image').attr('src', product.image).attr('alt', product.name);
          $('#product-name').text(product.name);
          $('#product-description').text(product.description);
          $('#product-price').text(`$${product.price.toFixed(2)}`);
          $('#product-rating').html(
            '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)
          );
        } else {
          $('.product-details').html('<p>Product not found.</p>');
        }
      },
      error: function () {
        $('.product-details').html('<p>Failed to load product details.</p>');
      }
    });
  
  
    $('#add-to-cart-btn').on('click', function () {
      const quantity = parseInt($('#quantity-input').val()) || 1;
      const productName = $('#product-name').text();
      const productPrice = parseFloat($('#product-price').text().replace('$', ''));
      const productImage = $('#product-image').attr('src');
      const mlSize = $('#ml-size').val();
  
      const cartItem = {
        id: productId,
        name: `${productName} - ${mlSize}ml`,
        price: productPrice,
        image: productImage,
        quantity: quantity
      };
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === productId && item.name === cartItem.name);
  
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push(cartItem);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
  
      
      popup.css('top', '100px');
      popup.fadeIn(300).delay(1000).fadeOut(300);
    });
  });
  