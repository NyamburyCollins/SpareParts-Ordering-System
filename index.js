//const menu = document.querySelector('#mobile-menu')
//const menuLinks = document.querySelector('menu')

//menu.addEventListener('click', function(){
    //menu.classList.toggle('is-active')
   //menuLinks.classList.toggle('active')
//});
function ABOUT() {

    window.location.href = 'ABOUT.html'; // 
    console.log(ABOUT)

}
document.getElementById('ABOUT').addEventListener('click', function() {
    const textElement = document.getElementById('text');
    textElement.textContent = 'You have changed the text!'; // Change the text when the button is clicked
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/spare-parts', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Product model
//const Product = mongoose.model('Product', new mongoose.Schema({
    //name: Product;})
    // models/Product.js

const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // URL to the product image
    stock: { type: Number, required: true, default: 0 },
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User ', userSchema);
module.exports = User;
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

//const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/spare-parts', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Route to register a new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User  registered successfully');
});

// Route to login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Route to get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Route to add a new product (admin only)
app.post('/api/products', authenticateJWT, async (req, res) => {
    const { name, description, price, image, stock } = req.body;
    const product = new Product({ name, description, price, image, stock });
    await product.save();
    res.status(201).send('Product added successfully');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// script.js
async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const productList = document.getElementById('product-list');
}

    //products.forEach(product) => {}
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price</p> 
// script.js (continued)
async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            