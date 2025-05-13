document.addEventListener("DOMContentLoaded", () => {
    showCartCount();
    displayProductDetails();
    displayCart();
});

// Product Data
const products = [
    { name: "Phone", price: 19.99, image: "https://www.shutterstock.com/shutterstock/photos/1892056675/display_1500/stock-photo-nature-and-landscape-photography-gallery-shown-on-mobile-phone-1892056675.jpg" },
    { name: "Shoes", price: 29.99, image: "https://www.shutterstock.com/shutterstock/photos/2473467591/display_1500/stock-photo-white-sneakers-with-colored-accents-on-bright-background-pair-of-fashionable-sport-shoes-with-2473467591.jpg" },
    { name: "Laptop", price: 999.99, image: "https://img.freepik.com/free-photo/laptop-nature-concept_23-2150246074.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Headphones", price: 49.99, image: "https://img.freepik.com/free-photo/still-life-wireless-cyberpunk-headphones_23-2151072179.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Tablet", price: 199.99, image: "https://img.freepik.com/free-photo/tablet-with-blank-screen-chair_15879-293.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Smartwatch", price: 149.99, image: "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Camera", price: 499.99, image: "https://img.freepik.com/free-vector/realistic-digital-photo-camera-tripod_1284-13126.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Gaming Console", price: 399.99, image: "https://img.freepik.com/free-photo/ai-powered-device-concept_23-2151924132.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Keyboard", price: 29.99, image: "https://img.freepik.com/free-photo/keyboard-button_1203-9150.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Mouse", price: 19.99, image: "https://img.freepik.com/free-photo/modern-computer-equipment-dark-office-generated-by-ai_188544-22215.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Monitor", price: 199.99, image: "https://img.freepik.com/free-psd/modern-tv-screen-isolated_23-2151430366.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Printer", price: 129.99, image: "https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287458.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Desk Lamp", price: 39.99, image: "https://img.freepik.com/free-photo/messy-office-desk-still-life_23-2150155615.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" },
    { name: "Backpack", price: 59.99, image: "https://img.freepik.com/premium-photo/backpack-camera_253658-605.jpg?ga=GA1.1.365301885.1747166435&semt=ais_hybrid&w=740" }
];

// Load Product List
const productList = document.getElementById("product-list");
if (productList) {
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="product.html?name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.image)}" class="view-btn">View Details</a>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        productElement.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCart(product.name, product.price);
        });

        productList.appendChild(productElement);
    });
}

// Retrieve URL Params
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Display Single Product Details
function displayProductDetails() {
    const name = getQueryParam("name");
    const price = getQueryParam("price");
    const img = getQueryParam("img");

    if (name && price && img) {
        document.getElementById("product-name").textContent = name;
        document.getElementById("product-img").src = img;
        document.getElementById("product-price").textContent = `Price: $${parseFloat(price).toFixed(2)}`;

        document.getElementById("add-to-cart-btn").onclick = function () {
            addToCart(name, parseFloat(price));
        };
    }
}

// Add to Cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartCount();
    alert(`${name} has been added to your cart.`);
}

// Show Cart Count
function showCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Display Cart Items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");

    if (!cartItems) return;
    cartItems.innerHTML = "";
    
    cart.forEach((item, index) => {
    cartItems.innerHTML += `
        <div>${item.name} - $${item.price} 
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>`;
});

    showCartCount();
}

// Remove from Cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}