// Function to fetch products from the API

async function fetchProducts() {

    try {
        const response = await fetch('/api/products'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }

        const products = await response.json();
        displayProducts(products);

    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('product-list').innerHTML = '<p>Failed to load products. Please try again later.</p>';

    }

}

// Function to display products in the product list

function displayProducts(products) {

    const productList = document.getElementById('product-list');

    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>

        `;

        productList.appendChild(productItem);

    });

}

// Function to handle login

async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },

            body: JSON.stringify({ username: email, password: password }) 
        });


        if (!response.ok) {
            throw new Error('Login failed');

        }


        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the JWT token

        alert('Login successful!');
        // Optionally, redirect to another page or refresh the product list
        fetchProducts(); // Fetch products after login

    } catch (error) {

        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
    }
}

// Function to add a product to the cart (placeholder for now)

function addToCart(productId) {
    alert(`Product with ID ${productId} added to cart!`); // Placeholder action
}


// Event listeners

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch products when the page loads
    document.getElementById('login-btn').addEventListener('click', handleLogin); // Handle login button click

});
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Remove previous products

    products.forEach(product => {

        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Stock: ${product.stock} available</p>

            <button onclick="addToCart('${product._id}')">Add to Cart</button>
        `;

        productList.appendChild(productItem);

    });
}
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
