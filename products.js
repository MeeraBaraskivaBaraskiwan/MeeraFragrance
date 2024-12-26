
$(document).ready(function () {
    const productsGrid = $('#products-grid');
    let allProducts = [];
  
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
        allProducts = products;
        displayProducts(products);
      },
      error: function () {
        productsGrid.html('<p>Failed to load products. Please try again later.</p>');
      }
    });
  
    function displayProducts(products) {
      productsGrid.empty();
      products.forEach(product => {
        const productHTML = `
          <div class="product">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
            <button class="view-more-btn" data-id="${product.id}">View More</button>
          </div>
        `;
        productsGrid.append(productHTML);
      });
    }
  
    
    $('#search-bar').on('keyup', function () {
      const query = $(this).val().toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  
   
    $('#price-filter').on('change', function () {
      const val = $(this).val();
      let filtered = [];
      if (val === '') {
        filtered = allProducts;
      } else if (val === '50') {
        filtered = allProducts.filter(p => p.price < 50);
      } else if (val === '100') {
        filtered = allProducts.filter(p => p.price >= 50 && p.price <= 100);
      } else if (val === '101') {
        filtered = allProducts.filter(p => p.price > 100);
      }
      displayProducts(filtered);
    });
  
    
    $(document).on('click', '.view-more-btn', function () {
      const productId = $(this).data('id');
      window.location.href = `product-details.html?id=${productId}`;
    });
  });
  