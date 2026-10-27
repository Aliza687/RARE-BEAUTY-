document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const products = await response.json();
        
        // Render on Homepage (Featured Grid)
        const featuredGrid = document.getElementById('featured-grid');
        if (featuredGrid) {
            // Display first 3 products as featured on Home page
            const featuredProducts = products.slice(0, 3);
            featuredGrid.innerHTML = renderProductCards(featuredProducts);
        }

        // Render on Shop Page (Shop Grid)
        const shopGrid = document.getElementById('shop-grid');
        if (shopGrid) {
            // Display all products on Shop page
            shopGrid.innerHTML = renderProductCards(products);
        }

    } catch (error) {
        console.error('Error loading Rare Beauty products:', error);
    }
}

// Function to generate Product Card HTML
function renderProductCards(productsList) {
    return productsList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='assets/logo.png'">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
        </div>
    `).join('');
}

// Cart notification function
function addToCart(productName) {
    alert(`"${productName}" has been added to your Rare Beauty bag! ✨`);
    
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        let currentCount = parseInt(badge.textContent) || 0;
        badge.textContent = currentCount + 1;
    }
}