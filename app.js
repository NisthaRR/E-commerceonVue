const products = [
    { name: 'Luffy in his element', 
        description: 'Luffy ready for action.', 
        price: 5000,
         imageUrl: "Luffy.webp" },
    { name: 'Mikasa on the beach', 
        description: 'Mikasa enjoying the beach.', 
        price: 5500, 
        imageUrl: "Mikasa.avif" },
    { name: 'Naruto Uzumaki', 
        description: 'Naruto happy.', 
        price: 6000, 
        imageUrl: "Naruto.webp" },
    { name: 'Erza Scarlet', 
        description: 'Erza Scarlet.', 
        price: 6500, 
        imageUrl: "Erza.webp" },
    { name: 'Goku Super Saiyan', 
        description: 'Goku in his Super Saiyan form.', 
        price: 7000, 
        imageUrl: "goku.jpg" },
    { name: 'Zoro Ready to Fight', 
        description: 'Zoro with his swords.', 
        price: 7500, 
        imageUrl: "Zoro.jpg" },
    { name: 'Toji', 
        description: 'Toji with Megumi.', 
        price: 8000, 
        imageUrl: "toji.webp" },
    { name: 'Nezuko', 
        description: 'Nezuko with pudding.', 
        price: 8500, 
        imageUrl: "nezuko.webp" },
    { name: 'Dazai', 
        description: 'Dazai Osamu.', 
        price: 9000, 
        imageUrl: "Dazai.webp" },
    { name: 'Sagiri', 
        description: 'Sagiri.', 
        price: 9500, 
        imageUrl: "Sagiri.jpeg" },
    { name: 'Happy', 
        description: 'Happy the cat.', 
        price: 5000, 
        imageUrl: "Happy.webp" },
    { name: 'Senku', 
        description: 'Dr. Stone.', 
        price: 9900, 
        imageUrl: "senku.avif" },
    { name: 'Gojo', 
        description: 'Gojo ready to fight.', 
        price: 9000, 
        imageUrl: "Gojo.avif" },
    { name: 'Chopper', 
        description: 'Tony tony chopper.', 
        price: 500, 
        imageUrl: "Chopper.jpeg" },
    { name: 'Gon and Killua', 
        description: 'Gon and Killua being a menace.', 
        price: 19000, 
        imageUrl: "Gon n killua.jpg" },
    { name: 'Shuna', 
        description: 'Shuna chilling.', 
        price: 3500, 
        imageUrl: "shuna.jpg" },
    { name: 'Levi', 
        description: 'Levi Ackerman.',
         price: 40000, 
         imageUrl: "Levi.avif" },
    { name: 'Yor', 
        description: 'Yor chilling.', 
        price: 9500, 
        imageUrl: "Yor.webp" }
];

let cartItems = [];

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItemsDiv = document.getElementById('cart-items');

    cartCount.textContent = cartItems.length;
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = total;

    cartItemsDiv.innerHTML = cartItems.length === 0 ? 'Your cart is empty.' :
        cartItems.map(item => `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>Rs. ${item.price * item.quantity}</span>
            </div>
        `).join('');
}


function addToCart(product) {
    console.log("Adding to cart:", product);
    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    updateCart();
}


function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.style.display = cartOverlay.style.display === 'flex' ? 'none' : 'flex';
}


document.getElementById('cart-button').addEventListener('click', toggleCart);
document.getElementById('close-cart').addEventListener('click', toggleCart);


function renderProducts() {
    const productList = document.getElementById('product-list');
    const productPairs = [];
    for (let i = 0; i < products.length; i += 2) {
        productPairs.push(products.slice(i, i + 2));
    }

    productList.innerHTML = productPairs.map(pair => `
        <div class="product-row">
            ${pair.map(product => `
                <div class="product">
                    <h2>${product.name}</h2>
                    <div class="product-image-wrapper">
                        <img class="lazy-load product-image" data-src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <p>${product.description}</p>
                    <p>Price: Rs. ${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
                </div>
            `).join('')}
        </div>
    `).join('');

    lazyLoadImages();
}

function lazyLoadImages() {
    const rows = document.querySelectorAll('.product-row');

    rows.forEach((row, index) => {
        const images = row.querySelectorAll('.lazy-load');

        const config = {
            rootMargin: index === 0 ? '0px' : '100px',
            threshold: 0.1
        };

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });
    });
}


document.addEventListener('DOMContentLoaded', renderProducts);
