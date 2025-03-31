// DOM Elements

const productList = document.getElementById('product-list');
const categoryList = document.getElementById('category-list');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSection = document.getElementById('cart-section');
const viewCartBtn = document.getElementById('view-cart-btn');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');

// Fetch products from the API
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
        productList.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}


// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Product with ID ${productId} added to cart!`); // Fixed template literal
    } else {
        alert(`Product with ID ${productId} is already in the cart!`); // Fixed template literal
    }
}

// Handle user login
async function handleLogin(event) {
    event.preventDefault();
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
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        fetchProducts(); // Fetch products after login
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch products when the page loads
    document.getElementById('login-btn').addEventListener('click', handleLogin); // Handle login button click
});
// server.js (Server-side)
const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use(bodyParser.json());
app.use(middlewares);
app.use(router);

// Example route for user registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    // Logic to save the user to the database
    res.status(201).send('User  registered successfully');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Fixed template literal
});

// Sample product data

const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20.00 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30.00 },
];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;
        productItem.addEventListener('click', () => showProductDetails(product));
        productList.appendChild(productItem);
    });
}

// Function to show product details
function showProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
    `;
    productDetails.style.display = 'block'; // Show the product details section
}
// Initialize the product list when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayProducts);
const productDetailsUrl = 'http://localhost:3000/products'; // Adjust this as necessary

// Function to fetch products
async function fetchProducts() {
   const response = await fetch(productDetailsUrl);
   const products = await response.json();
   return products;
}
// Call function to fetch products and render them
fetchProducts().then(products => {
   renderProducts(products);
});
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
       const productDiv = document.createElement('div');
       productDiv.classList.add('product');
       productDiv.setAttribute('data-id', product.id);
       productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: ${product.price}</p>
       `;
       productList.appendChild(productDiv);
       
       // Add click event for each product
       productDiv.addEventListener('click', () => {
          displayProductDetails(product.id);
       });
    });
 }