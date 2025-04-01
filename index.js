// DOM Elements
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const viewCartBtn = document.getElementById('view-cart-btn');
const loginBtn = document.getElementById('login-btn');

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products'); // Use json-server endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}

// Display products
function displayProducts(products) {
    productList.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Product with ID ${productId} added to cart!`);
    } else {
        alert(`Product with ID ${productId} is already in the cart!`);
    }
}

// Handle user login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users'); // Fetch users from json-server
        const users = await response.json();
        const user = users.find(u => u.username === email && u.password === password);

        if (user) {
            alert('Login successful!');
            fetchProducts(); // Fetch products after login
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again later.');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch products when the page loads
    loginBtn.addEventListener('click', handleLogin); // Handle login button click
});

document.addEventListener('DOMContentLoaded', () => {
    const partsContainer = document.querySelector('.parts-container');

    // JSON data for spare parts
    const jsonData = {
        "parts": [
            {
                "id": 1,
                "name": "Brake Pad",
                "category": "Braking System",
                "brand": "Brembo",
                "price": 4500,
                "stock": 120,
                "car_compatibility": ["Toyota Corolla", "Honda Civic"]
            },
            {
                "id": 2,
                "name": "Air Filter",
                "category": "Engine",
                "brand": "Bosch",
                "price": 1800,
                "stock": 200,
                "car_compatibility": ["Ford Focus", "Nissan Altima"]
            },
            {
                "id": 3,
                "name": "Spark Plug",
                "category": "Ignition System",
                "brand": "NGK",
                "price": 1200,
                "stock": 300,
                "car_compatibility": ["Toyota Camry", "Honda Accord"]
            },
            {
                "id": 4,
                "name": "Oil Filter",
                "category": "Engine",
                "brand": "Mann Filter",
                "price": 2200,
                "stock": 180,
                "car_compatibility": ["BMW 3 Series", "Mercedes C-Class"]
            },
            {
                "id": 5,
                "name": "Headlight Bulb",
                "category": "Lighting",
                "brand": "Philips",
                "price": 3500,
                "stock": 90,
                "car_compatibility": ["Audi A4", "Volkswagen Golf"]
            }
        ]
    };

    // Function to display parts
    function displayParts() {
        partsContainer.innerHTML = '';
        
        jsonData.parts.forEach(part => {
            const partCard = document.createElement('div');
            partCard.className = 'part-card';
            
            partCard.innerHTML = `
                <span class="category">${part.category}</span>
                <div class="part-name">${part.name}</div>
                <div><span class="part-brand">${part.brand}</span></div>
                <div class="part-price">Ksh ${part.price.toLocaleString('en-KE')}</div>
                <div class="part-stock ${part.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${part.stock > 0 ? `In Stock: ${part.stock}` : 'Out of Stock'}
                </div>
                <div class="compatibility">
                    <div class="compatibility-title">Compatible with:</div>
                    <ul class="compatibility-list">
                        ${part.car_compatibility.map(car => `<li>${car}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            partsContainer.appendChild(partCard);
        });
    }
    
    displayParts();
});