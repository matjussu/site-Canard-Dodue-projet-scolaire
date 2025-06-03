// Base de données des produits
const products = [
    {
        id: 1,
        name: "Canard Entier Premium",
        price: 28.50,
        image: "🦆",
        description: "Canard entier de qualité premium, élevé en liberté. Parfait pour un repas de famille exceptionnel. Poids moyen: 2.5kg. Notre canard phare, tendre et savoureux.",
        category: "entier"
    },
    {
        id: 2,
        name: "Magret de Canard",
        price: 15.90,
        image: "🥩",
        description: "Magret de canard tendre et juteux, idéal pour un repas gastronomique. Poids moyen: 400g. Parfait pour une cuisson à la poêle ou au barbecue.",
        category: "decoupé"
    },
    {
        id: 3,
        name: "Cuisses de Canard Confites",
        price: 12.80,
        image: "🍗",
        description: "Cuisses de canard confites traditionnelles, cuites lentement dans leur graisse. Lot de 2 cuisses. Prêtes à réchauffer pour un repas authentique.",
        category: "confit"
    },
    {
        id: 4,
        name: "Foie Gras de Canard",
        price: 45.00,
        image: "🧈",
        description: "Foie gras de canard artisanal, mi-cuit. 200g de pur délice pour vos occasions spéciales. Texture fondante et goût raffiné.",
        category: "foie-gras"
    },
    {
        id: 5,
        name: "Rillettes de Canard",
        price: 8.50,
        image: "🥫",
        description: "Rillettes de canard maison, préparées selon une recette traditionnelle. Pot de 180g. Parfait pour l'apéritif ou un en-cas gourmand.",
        category: "conserve"
    },
    {
        id: 6,
        name: "Aiguillettes de Canard",
        price: 18.90,
        image: "🥓",
        description: "Aiguillettes de canard marinées aux herbes de Provence. 500g de découpe fine et tendre. Cuisson rapide à la poêle recommandée.",
        category: "decoupé"
    },
    {
        id: 7,
        name: "Canard Laqué Entier",
        price: 35.00,
        image: "🍖",
        description: "Canard entier laqué selon la tradition asiatique. Peau croustillante et chair moelleuse. Poids: 2.8kg. Idéal pour impressionner vos invités.",
        category: "entier"
    },
    {
        id: 8,
        name: "Gésiers de Canard",
        price: 6.90,
        image: "🫘",
        description: "Gésiers de canard frais, parfaits pour une salade landaise authentique. 300g de produit de qualité. Riche en protéines et saveur unique.",
        category: "abats"
    }
];

// Panier
let cart = [];

// État de l'application
let currentProduct = null;
let orderNumber = null;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    updateCartCount();
    showPage('home');
});

// Affichage des pages
function showPage(pageName) {
    // Cacher toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Afficher les produits phares sur l'accueil
function displayFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    const featuredProducts = products.slice(0, 4); // Les 4 premiers produits
    
    featuredGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Afficher tous les produits
function displayAllProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Créer une carte produit
function createProductCard(product) {
    return `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-price">${product.price.toFixed(2)} €</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `;
}

// Afficher le détail d'un produit
function showProductDetail(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <div>
            <button class="back-btn" onclick="goBack()">← Retour</button>
            <div class="product-detail-image">${currentProduct.image}</div>
        </div>
        <div class="product-detail-info">
            <h2>${currentProduct.name}</h2>
            <div class="product-detail-price">${currentProduct.price.toFixed(2)} €</div>
            <div class="product-detail-description">
                <p>${currentProduct.description}</p>
            </div>
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <span id="quantity">1</span>
                <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            <button class="detail-add-to-cart" onclick="addToCartFromDetail()">
                Ajouter au panier
            </button>
        </div>
    `;
    
    showPage('product-detail');
}

// Changer la quantité sur la page détail
function changeQuantity(change) {
    const quantitySpan = document.getElementById('quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
}

// Ajouter au panier depuis la page détail
function addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('quantity').textContent);
    addToCart(currentProduct.id, null, quantity);
}

// Retour à la page précédente
function goBack() {
    showPage('products');
}

// Ajouter un produit au panier
function addToCart(productId, event, quantity = 1) {
    if (event) {
        event.stopPropagation();
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} ajouté au panier !`);
}

// Afficher une notification
function showNotification(message) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Afficher le panier
function showCart() {
    displayCartItems();
    showPage('cart');
}

// Afficher les items du panier
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Votre panier est vide</h3>
                <p>Découvrez nos délicieux produits !</p>
                <button onclick="showPage('products')" class="cta-btn">Voir nos produits</button>
            </div>
        `;
        cartTotal.textContent = '0,00 €';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Prix unitaire: ${item.price.toFixed(2)} €</p>
                <p>Sous-total: ${(item.price * item.quantity).toFixed(2)} €</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2) + ' €';
}

// Mettre à jour la quantité d'un item du panier
function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity = Math.max(1, item.quantity + change);
    displayCartItems();
    updateCartCount();
}

// Supprimer un item du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCartItems();
    updateCartCount();
    showNotification('Produit supprimé du panier');
}

// Afficher la page de commande
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !');
        return;
    }
    
    displayOrderSummary();
    showPage('checkout');
}

// Afficher le récapitulatif de commande
function displayOrderSummary() {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const finalTotal = document.getElementById('final-total');
    
    orderSummaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    finalTotal.textContent = total.toFixed(2) + ' €';
}

// Traiter la commande
function processOrder(event) {
    event.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value,
        paymentMethod: document.getElementById('paymentMethod').value
    };
    
    // Valider les données
    if (!validateForm(formData)) {
        return;
    }
    
    // Générer un numéro de commande
    orderNumber = 'CD' + Date.now().toString().slice(-8);
    
    // Afficher la confirmation
    displayOrderConfirmation(formData);
    
    // Vider le panier
    cart = [];
    updateCartCount();
    
    // Afficher la page de confirmation
    showPage('confirmation');
}

// Valider le formulaire
function validateForm(formData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode', 'paymentMethod'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showNotification(`Veuillez remplir le champ ${getFieldLabel(field)}`);
            return false;
        }
    }
    
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Veuillez saisir une adresse email valide');
        return false;
    }
    
    // Valider le code postal
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(formData.zipCode)) {
        showNotification('Veuillez saisir un code postal valide (5 chiffres)');
        return false;
    }
    
    return true;
}

// Obtenir le label d'un champ
function getFieldLabel(field) {
    const labels = {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse',
        city: 'Ville',
        zipCode: 'Code postal',
        paymentMethod: 'Mode de paiement'
    };
    return labels[field] || field;
}

// Afficher la confirmation de commande
function displayOrderConfirmation(formData) {
    const orderConfirmation = document.getElementById('order-confirmation');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Livraison dans 3 jours
    
    orderConfirmation.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3>Détails de votre commande</h3>
            <p><strong>Numéro de commande:</strong> ${orderNumber}</p>
            <p><strong>Date de commande:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
            <p><strong>Livraison estimée:</strong> ${deliveryDate.toLocaleDateString('fr-FR')}</p>
            
            <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Produits commandés:</h4>
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)} €</span>
                </div>
            `).join('')}
            
            <div style="display: flex; justify-content: space-between; padding: 1rem 0; font-weight: bold; font-size: 1.2rem; border-top: 2px solid #ff6b35; margin-top: 1rem;">
                <span>Total:</span>
                <span>${total.toFixed(2)} €</span>
            </div>
            
            <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Informations de livraison:</h4>
            <p><strong>${formData.firstName} ${formData.lastName}</strong></p>
            <p>${formData.address}</p>
            <p>${formData.zipCode} ${formData.city}</p>
            <p>${formData.country}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Téléphone:</strong> ${formData.phone}</p>
            
            <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Mode de paiement:</h4>
            <p>${getPaymentMethodLabel(formData.paymentMethod)}</p>
            
            <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 2rem;">
                <strong>Un email de confirmation vous a été envoyé à ${formData.email}</strong>
            </div>
        </div>
    `;
}

// Obtenir le label du mode de paiement
function getPaymentMethodLabel(method) {
    const methods = {
        card: 'Carte bancaire',
        paypal: 'PayPal',
        transfer: 'Virement bancaire'
    };
    return methods[method] || method;
}

// Réinitialiser pour une nouvelle commande
function resetForNewOrder() {
    currentProduct = null;
    orderNumber = null;
    document.getElementById('checkout-form').reset();
}



