
$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const cartItems = $('#cart-items');
    const totalPrice = $('#total-price');
    const checkoutBtn = $('#checkout-btn');
    const checkoutConfirmation = $('#checkout-confirmation');
    const cartPopup = $('#cart-popup');
    const cartPopupMessage = $('#cart-popup-message');
    const paymentTypeSelect = $('#payment-type');
  
    function displayCart() {
      cartItems.empty();
      let total = 0;
  
      if (cart.length === 0) {
        cartItems.html('<p>Your cart is empty.</p>');
        checkoutBtn.hide();
        checkoutConfirmation.hide();
        totalPrice.text('0.00');
        return;
      }
  
      checkoutBtn.show();
      checkoutConfirmation.hide();
  
      cart.forEach(item => {
        const itemTotal = parseFloat(item.price) * (item.quantity || 1);
        total += itemTotal;
        const itemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="100"/>
            <div class="item-details">
              <h3>${item.name}</h3>
              <p>Price: $${item.price} x ${item.quantity || 1} = $${itemTotal.toFixed(2)}</p>
              <div class="quantity-update">
                <label>Qty:</label>
                <input type="number" class="qty-input" data-id="${item.id}" min="1" value="${item.quantity || 1}"/>
              </div>
              <button class="remove-btn" data-id="${item.id}" data-name="${item.name}">Remove</button>
            </div>
          </div>
        `;
        cartItems.append(itemHTML);
      });
  
      totalPrice.text(total.toFixed(2));
    }
  
    
    $(document).on('click', '.remove-btn', function () {
      const id = $(this).data('id');
      const name = $(this).data('name');
      cart = cart.filter(item => !(item.id === id && item.name === name));
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
      cartPopupMessage.text('Item removed from cart.');
      cartPopup.fadeIn(300).delay(1500).fadeOut(300);
    });
  

    $(document).on('change', '.qty-input', function () {
      const newQty = parseInt($(this).val());
      const id = $(this).data('id');
      const item = cart.find(i => i.id === id && i.name === $(this).closest('.cart-item').find('h3').text());
      if (item) {
        item.quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
      }
    });
  
   
    checkoutBtn.on('click', function () {
      checkoutConfirmation.show();
    });
  
  
    $('#checkout-yes').on('click', function () {
      const paymentType = paymentTypeSelect.val();
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
      checkoutConfirmation.hide();
      cartPopupMessage.text(`You paid with ${paymentType}. Thank you!`);
      cartPopup.fadeIn(300).delay(1500).fadeOut(300);
    });
  
    
    $('#checkout-no').on('click', function () {
      checkoutConfirmation.hide();
    });
  
    displayCart();
  });
  