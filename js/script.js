
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage(); // Carga el carrito desde localStorage
    updateCart(); // Actualiza la interfaz del carrito
});
        // Simulación de productos para prueba
        const products = [
            { id: 1, title: "Camisa de Manga Larga", category: "Camisas", image: "images/camisa_manga_larga.jpg", description: "Camisa casual para hombre", price: "$20", sizes: ["S", "M", "L"] },
            { id: 2, title: "Pantalones Jeans", category: "Pantalones", image: "images/jeans.jpg", description: "Jeans de corte moderno", price: "$35", sizes: ["30", "32", "36"] },
            { id: 3, title: "Chaqueta de Cuero", category: "Chaquetas", image: "images/ChaquetaCuero.jpg", description: "Chaqueta de cuero genuino", price: "$80", sizes: ["S", "M", "L"] },
            { id: 4, title: "Suéter de Lana", category: "Suéteres", image: "images/SuéterdeLana.jpg", description: "Suéter de lana para invierno", price: "$50", sizes: ["M", "L"] },
            { id: 5, title: "Gorro de Punto", category: "Accesorios", image: "images/GorrodePunto.jpg", description: "Gorro de punto para frío", price: "$15", sizes: ["Único"] },
            { id: 6, title: "Zapatillas Deportivas", category: "Calzado", image: "images/ZapatillasDeportivas.jpg", description: "Zapatillas deportivas para correr", price: "$60", sizes: ["40", "42", "44"] },
            { id: 7, title: "Vestido de Noche", category: "Vestidos", image: "images/VestidodeNoche.jpg", description: "Vestido elegante para eventos formales", price: "$100", sizes: ["S", "M"] },
            { id: 8, title: "Blusa de Seda", category: "Blusas", image: "images/BlusadeSeda.jpg", description: "Blusa elegante de seda", price: "$45", sizes: ["M", "L"] },
            { id: 9, title: "Chaqueta de Plumas", category: "Chaquetas", image: "images/ChaquetadePlumas.jpg", description: "Chaqueta abrigada de plumas", price: "$120", sizes: ["M", "L", "XL"] },
            { id: 10, title: "Camiseta de Algodón", category: "Camisetas", image: "images/CamisetadeAlgodón.jpg", description: "Camiseta suave de algodón", price: "$20", sizes: ["S", "M", "L"] },
            { id: 11, title: "Bufanda de Lana", category: "Accesorios", image: "images/BufandadeLana.jpg", description: "Bufanda para el frío", price: "$25", sizes: ["Único"] },
            { id: 12, title: "Zapatos de Cuero", category: "Calzado", image: "images/ZapatosdeCuero.jpg", description: "Zapatos de cuero para hombre", price: "$80", sizes: ["40", "42"] },
            { id: 13, title: "Cartera de Cuero", category: "Accesorios", image: "images/CarteradeCuero.jpg", description: "Cartera elegante", price: "$40", sizes: ["Único"] },
            { id: 14, title: "Guantes de Piel", category: "Accesorios", image: "images/GuantesdePiel.jpg", description: "Guantes de piel para invierno", price: "$30", sizes: ["Único"] },
            { id: 15, title: "Pantalón de Pana", category: "Pantalones", image: "images/PantalóndePana.jpg", description: "Pantalón de pana para hombre", price: "$55", sizes: ["30", "32", "34"] },
            { id: 16, title: "Abrigo de Invierno", category: "Abrigos", image: "images/AbrigodeInvierno.jpg", description: "Abrigo abrigado para el invierno", price: "$150", sizes: ["L", "XL"] },
            { id: 17, title: "Camiseta de Manga Corta", category: "Camisetas", image: "images/CamisetadeMangaCorta.jpg", description: "Camiseta de manga corta", price: "$15", sizes: ["S", "M", "L"] },
            { id: 18, title: "Falda de Cuero", category: "Faldas", image: "images/FaldadeCuero.jpg", description: "Falda de cuero para mujeres", price: "$60", sizes: ["M", "L"] },
            { id: 19, title: "Chaqueta de Denim", category: "Chaquetas", image: "images/ChaquetadeDenim.jpg", description: "Chaqueta de mezclilla", price: "$75", sizes: ["M", "L"] },
            { id: 20, title: "Botines de Cuero", category: "Calzado", image: "images/BotinesdeCuero.jpg", description: "Botines de cuero para invierno", price: "$90", sizes: ["40", "42"] },
            { id: 21, title: "Mochila de Cuero", category: "Accesorios", image: "images/MochiladeCuero.jpg", description: "Mochila de cuero elegante", price: "$70", sizes: ["Único"] },
            { id: 22, title: "Sudadera con Capucha", category: "Sudaderas", image: "images/SudaderaconCapucha.jpg", description: "Sudadera cómoda", price: "$40", sizes: ["M", "L", "XL"] },
            { id: 23, title: "Bermuda de Algodón", category: "Bermudas", image: "images/BermudadeAlgodón.jpg", description: "Bermuda de algodón para verano", price: "$25", sizes: ["M", "L"] },
            { id: 24, title: "Polo de Algodón", category: "Polos", image: "images/PolodeAlgodón.jpg", description: "Polo cómodo", price: "$20", sizes: ["S", "M", "L"] }
        ];
    // Función para obtener categorías únicas y tallas por categoría
function getCategoriesAndSizes() {
    const categorySet = new Set();
    const sizeMap = {};
    // Iterar sobre los productos para obtener categorías y tallas
    products.forEach(product => {
        // Agregar la categoría al set
        categorySet.add(product.category);

        // Si la categoría aún no tiene una lista de tallas, la inicializamos
        if (!sizeMap[product.category]) {
            sizeMap[product.category] = new Set();
        }

        // Agregar las tallas del producto a la lista de tallas de su categoría
        product.sizes.forEach(size => sizeMap[product.category].add(size));
    });

    return { categories: Array.from(categorySet), sizes: sizeMap };
}

// Obtener las categorías y tallas dinámicamente
const { categories, sizes } = getCategoriesAndSizes();

// Obtener los elementos select de categorías y tallas
const categorySelect = document.getElementById('categoryFilter');
const sizeSelect = document.getElementById('sizeFilter');

// Rellenar las categorías en el filtro
categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
});

       
    let currentPage = 1;
    let itemsPerPage = 6;
    let visibleItems = 6;
    let filtered = false;

    function displayProducts(productsToDisplay = products.slice(0, visibleItems)) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = "";
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <div class="card product-card h-100" data-aos="fade-up" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openProductModal(${product.id})">
                    <div class="overflow-hidden p-2" style="height: 200px;"> <!-- Contenedor para recorte consistente -->
                        <img src="${product.image}" class="card-img-top" alt="${product.title}" loading="lazy"> <!-- Lazy loading para mejor performance -->
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fs-6">${product.title}</h5>
                        <p class="card-text small text-muted flex-grow-1">${product.description}</p>
                        <p class="card-text fw-bold text-primary mb-0 fs-4">${product.price}</p>
                    </div>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
        AOS.refresh(); // Refrescar las animaciones de AOS
    }

    function displayPagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        let paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('li');
            pageButton.classList.add('page-item');
            if (i === currentPage) {
                pageButton.classList.add('active');
                pageButton.innerHTML = `
                    <span class="page-link">${i}</span>
                `;
            } else {
                pageButton.innerHTML = `
                    <a class="page-link hover-animate" href="#" onclick="changePage(event, ${i})">${i}</a>
                `;
            }
            paginationContainer.appendChild(pageButton);
        }
        AOS.refresh(); // Refrescar las animaciones de AOS
    }

    function changePage(event, page) {
        event.preventDefault();
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        displayProducts(products.slice(start, end));
        displayPagination();
    }

    function loadMoreProducts() {
        visibleItems = products.length;
        displayProducts(products.slice(0, itemsPerPage));
        document.getElementById('loadMoreBtn').style.display = 'none';
        document.getElementById('showLessBtn').style.display = 'block';
        document.getElementById('paginar').style.display = 'block';
        displayPagination();
    }

    function showLessProducts() {
        visibleItems = itemsPerPage;
        displayProducts(products.slice(0, itemsPerPage));
        document.getElementById('loadMoreBtn').style.display = 'block';
        document.getElementById('showLessBtn').style.display = 'none';
        document.getElementById('paginar').style.display = 'none';
    }

    function clearSearch() {
        document.getElementById('search').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('sizeFilter').value = '';
        document.getElementById('noResultsMessage').style.display = 'none';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        displayProducts(products.slice(start, end)); // Mostrar productos de la página actual
        displayPagination();
        document.getElementById('paginar').style.display = 'block'; // Mostrar el paginador
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más
        document.getElementById('showLessBtn').style.display = 'none'; // Ocultar el botón de mostrar menos
        filtered = false; // Resetear el estado de filtro
}


function filterProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const categoryValue = document.getElementById('categoryFilter').value;
    const sizeValue = document.getElementById('sizeFilter').value;

    const filteredProducts = products.filter(product => {
        const matchCategory = categoryValue === "" || product.category === categoryValue;
        const matchSize = sizeValue === "" || product.sizes.includes(sizeValue);
        const matchSearch = query === "" || product.title.toLowerCase().includes(query);
        return matchCategory && matchSize && matchSearch;
    });

    if (filteredProducts.length > 0) {
        displayProducts(filteredProducts);
        document.getElementById('noResultsMessage').style.display = 'none';
        document.getElementById('paginar').style.display = 'none'; // Ocultar el paginador durante la búsqueda
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más durante la búsqueda
        document.getElementById('showLessBtn').style.display = 'none'; // Ocultar el botón de mostrar menos durante la búsqueda
        filtered = true; // Marcar que se ha filtrado
    } else {
        document.getElementById('products').innerHTML = '';
        document.getElementById('noResultsMessage').style.display = 'block';
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más durante la búsqueda
    }
}


    // Inicializar el mapa de Google
    function initMap() {
            const location = { lat: -34.397, lng: 150.644 }; // Coordenadas de ejemplo
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: location,
            });
            const marker = new google.maps.Marker({
                position: location,
                map: map,
            });
        }


        const sizesByCategory = {
    "Camisas": ["S", "M", "L", "XL"],
    "Pantalones": ["28", "30", "32", "34", "36"],
    "Chaquetas": ["S", "M", "L", "XL"],
    "Suéteres": ["S", "M", "L", "XL"],
    "Accesorios": ["Único"],
    "Calzado": ["40", "42", "44"],
    "Vestidos": ["S", "M"],
    "Blusas": ["M", "L"],
    "Abrigos": ["L", "XL"],
    "Camisetas": ["S", "M", "L"],
    "Faldas": ["M", "L"],
    "Sudaderas": ["M", "L", "XL"],
    "Bermudas": ["M", "L"],
    "Polos": ["S", "M", "L"]
};

// Función para actualizar las opciones de talla según la categoría seleccionada
function updateSizeFilter() {
    const selectedCategory = categorySelect.value;

    // Limpiar las opciones de tallas
    sizeSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccionar Talla';
    sizeSelect.appendChild(defaultOption);

    // Si hay tallas disponibles para la categoría seleccionada, agregarlas
    if (selectedCategory && sizes[selectedCategory]) {
        sizes[selectedCategory].forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
    }
}

            document.addEventListener("DOMContentLoaded", () => {
                const start = (currentPage - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                displayProducts(products.slice(start, end)); // Mostrar productos de la página actual
                // Espera a que todas las imágenes y elementos estén cargados
        // Espera a que todas las imágenes y elementos estén cargados
        window.onload = function () {
            // Ocultar el preloader
            document.body.classList.add("loaded");

            // Inicializar AOS.js después de que la página esté lista
            AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true
            });
        };
            // Cargar el mapa de Google
            initMap();
            loadCartFromLocalStorage(); // Carga el carrito desde localStorage
            updateCart(); // Actualiza la interfaz del carrito
            // Llamada para actualizar filtro de tallas y productos al cambiar la categoría
    document.getElementById('categoryFilter').addEventListener('change', () => {
        updateSizeFilter();
        filterProducts();
    });
    // Ocultar el carrito al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const cartContainer = document.getElementById('cartContainer');
        const viewCartBtn = document.getElementById('viewCartBtn');
        if (!cartContainer.contains(event.target) && !viewCartBtn.contains(event.target)) {
            hideCart();
        }
    });
    });


    // Variables globales
let cart = [];
let currentProduct = {};

// Función para abrir el modal con detalles del producto
function openProductModal(productId) {
  currentProduct = products.find((p) => p.id === productId);
  document.getElementById('modalProductImg').src = currentProduct.image;
  document.getElementById('modalProductDescription').innerText =
    currentProduct.description;
  const sizesContainer = document.getElementById('modalProductSizes');
  sizesContainer.innerHTML = '';
  currentProduct.sizes.forEach((size) => {
    const sizeOption = document.createElement('span');
    sizeOption.classList.add('size-option');
    sizeOption.innerText = size;
    sizeOption.onclick = () => sizeOption.classList.toggle('selected');
    sizesContainer.appendChild(sizeOption);
  });
}

// Función para agregar el producto al carrito
// Función para agregar un producto al carrito
function addToCart() {
    const selectedSize = document.querySelector('.size-option.selected');
    if (!selectedSize) {
        alert('Por favor, selecciona una talla.');
        return;
    }

    const product = { ...currentProduct, size: selectedSize.innerText, quantity: 1 };
    const cartIndex = cart.findIndex((item) => item.id === product.id && item.size === product.size);

    if (cartIndex > -1) {
        cart[cartIndex].quantity++;
    } else {
        cart.push(product);
    }

    updateCart();
    saveCartToLocalStorage(); // Guarda el carrito en localStorage
    showCart(); // Abre el carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(productId, size) {
    cart = cart.filter((item) => !(item.id === productId && item.size === size));
    updateCart();
    saveCartToLocalStorage(); // Guarda el carrito en localStorage

    if (cart.length === 0) {
        hideCart();
        document.getElementById('viewCartBtn').style.display = 'none';
    }
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productId, size, newQuantity) {
    const product = cart.find((item) => item.id === productId && item.size === size);
    if (product) {
        product.quantity = newQuantity;
        updateCart();
        saveCartToLocalStorage(); // Guarda el carrito en localStorage
    }
}


// Función actualizada para mostrar los productos
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartItems.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        checkoutBtn.disabled = true;
    } else {
        cartItems.style.display = 'block';
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;

        // Generar items del carrito
        cart.forEach((item, index) => {
            totalQuantity += item.quantity;
            const itemPrice = parseFloat(item.price.replace('$', '')) * item.quantity;
            total += itemPrice;

            const listItem = document.createElement('li');
            listItem.className = 'cart-item';
            listItem.innerHTML = `
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-size">Talla: ${item.size}</div>
                    <div class="cart-item-price">$${itemPrice.toFixed(2)} (${item.quantity} x $${parseFloat(item.price.replace('$', '')).toFixed(2)})</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.title}" class="cart-item-img">
            `;
            cartItems.appendChild(listItem);
        });
    }

    // Actualizar totales
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    document.querySelectorAll('.cart-counter').forEach(el => {
        el.textContent = totalQuantity;
        el.style.visibility = totalQuantity > 0 ? 'visible' : 'hidden';
    });
    
    // Mostrar/ocultar botón flotante
    document.getElementById('viewCartBtn').style.display = totalQuantity > 0 ? 'flex' : 'none';
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

     // Actualizar TODOS los contadores
     const cartCounters = document.querySelectorAll('.cart-counter, .badge');
     cartCounters.forEach(counter => {
         counter.textContent = totalQuantity;
         counter.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
     });
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('cartContainer').classList.remove('active');
}


// Función para cambiar cantidad
function changeQuantity(index, change) {
    // Verificar si el índice es válido
    if (index < 0 || index >= cart.length) return;
    
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
    resetCartTimer(); // Reiniciar el temporizador de cierre
}

// Función para eliminar producto
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    
    cart.splice(index, 1);
    updateCart();
    resetCartTimer(); // Reiniciar el temporizador de cierre
}

// Función para mostrar el carrito
let closeCartTimeout;

// Función para mostrar el carrito
function showCart() {
    const cartContainer = document.getElementById('cartContainer');
    const floatingButtons = document.querySelector('.floating-buttons');

    if (cartContainer) {
        cartContainer.classList.add('active');
        floatingButtons.style.right = '340px'; // Mueve los botones a la izquierda

        // Programar el cierre del carrito después de 5 segundos
        if (closeCartTimeout) {
            clearTimeout(closeCartTimeout); // Limpiar cualquier timeout anterior
        }
        closeCartTimeout = setTimeout(() => {
            hideCart(); // Cierra el carrito y ajusta la posición de los botones
        }, 5000); // 5000 ms = 5 segundos
    } else {
        console.error('No se encontró el elemento con id "cartContainer"');
    }
}


// Función para ocultar el carrito
function hideCart() {
    const cartContainer = document.getElementById('cartContainer');
    const floatingButtons = document.querySelector('.floating-buttons');

    if (cartContainer.classList.contains('active')) {
        cartContainer.classList.remove('active');
        // Agrega transición suave para restaurar la posición de los botones
        floatingButtons.style.right = '20px'; // Restaura la posición de los botones
    }
}

// Función para alternar visibilidad del carrito
function toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    const floatingButtons = document.querySelector('.floating-buttons');

    if (cartContainer.classList.contains('active')) {
        cartContainer.classList.remove('active');
        // Transición suave para restaurar los botones
        floatingButtons.style.right = '20px'; // Restaura la posición de los botones
    } else {
        cartContainer.classList.add('active');
        // Transición suave para mover los botones
        floatingButtons.style.right = '400px'; // Mueve los botones a la izquierda
    }

    // Llama a la función de ajuste de posición de los botones para móviles
    if (window.innerWidth <= 768) {
        adjustButtonPositions(cartContainer.classList.contains('active') ? 'open' : 'close');
    }
}

// Ajusta las posiciones de los botones según el tamaño de la pantalla (solo en móvil)
function adjustButtonPositions(state) {
    const cartButton = document.getElementById('viewCartBtn');
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (!cartButton || !whatsappButton) {
        console.error('No se encontraron los botones con id "viewCartBtn" y clase "whatsapp-float"');
        return;
    }

    // Verifica si la pantalla es pequeña (menos de 768px)
    const isMobile = window.innerWidth <= 768;

    // Solo ajusta las posiciones si es móvil
    if (isMobile) {
        if (state === 'open') {
            console.log('Ajustando botones al abrir el carrito en móvil');
            // En móvil, los botones se posicionan ligeramente más a la izquierda
            cartButton.style.right = '95px'; // Ajuste de la posición a la izquierda
            whatsappButton.style.right = '95px'; // Ajuste de la posición a la izquierda
        } else if (state === 'close') {
            console.log('Ajustando botones al cerrar el carrito en móvil');
            // En móvil, los botones se colocan en su posición original
            cartButton.style.right = '20px'; // Posición original
            whatsappButton.style.right = '20px'; // Posición original
        } else {
            console.error('Estado no válido. Usa "open" o "close".');
        }
    }
}




// Función para realizar el checkout
function checkout() {
   // Abre el modal
   const previewModal = new bootstrap.Modal(document.getElementById('previewOrderModal'));
   previewModal.show();
}

// Event listener para inicializar las funciones
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categoryFilter').addEventListener('change', () => {
    updateSizeFilter();
    filterProducts();
  });
 

// Detener la propagación del evento de clic dentro del carrito y reiniciar el timeout
const cartContainer = document.getElementById('cartContainer');
cartContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Clic dentro del carrito detectado, reiniciando timeout');
    if (closeCartTimeout) {
        clearTimeout(closeCartTimeout); // Limpiar el timeout existente
    }
    // Programar el cierre del carrito después de 5 segundos desde el último clic
    closeCartTimeout = setTimeout(() => {
        hideCart();
        console.log("El carrito se cerró automáticamente después de 5 segundos");
    }, 5000);
});

// Evento para cerrar el carrito al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const cartContainer = document.getElementById('cartContainer');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const productModal = document.getElementById('productModal'); // Si tienes un modal para productos
    const navShow = document.getElementById('navShow'); 

    // Condición para evitar ocultar el carrito inmediatamente al abrirlo
    if (cartContainer.classList.contains('active')) {
        if (
            !cartContainer.contains(event.target) && // Clic fuera del carrito
            !viewCartBtn.contains(event.target) && // Clic fuera del botón de carrito
            (!productModal || !productModal.contains(event.target)) && // Clic fuera del modal de productos
            (!navShow || !navShow.contains(event.target)) // Clic fuera del menú de navegación
        ) {
            hideCart(); // Cierra el carrito y ajusta la posición de los botones
        }
    }
});


});


function updateWhatsAppLink() {
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (!whatsappButton || cart.length === 0) {
        console.error("No se encontraron productos en el carrito o el botón de WhatsApp.");
        return;
    }

    let orderDetails = "🛍️ *Resumen de mi pedido:*\n\n";
    let total = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        const subtotal = price * item.quantity;
        total += subtotal;

        orderDetails += `📌 *${item.title}*\n`;
        orderDetails += `   - Talla: ${item.size}\n`;
        orderDetails += `   - Cantidad: ${item.quantity}\n`;
        orderDetails += `   - Precio: $${price.toFixed(2)} c/u\n`;
        orderDetails += `   - Subtotal: $${subtotal.toFixed(2)}\n\n`;
    });

    orderDetails += `💰 *Total a pagar: $${total.toFixed(2)}*\n`;
    orderDetails += `🚚 *Método de entrega: A coordinar*`;

    // Muestra el resumen de la orden en el modal de vista previa
    document.getElementById('orderDetails').innerText = orderDetails;
    document.getElementById('orderTotal').innerText = `💰 Total: $${total.toFixed(2)}`;

    // Prepara el enlace de WhatsApp
    const phoneNumber = "584124160489"; // Número de WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(orderDetails)}`;
    
    // Guarda el enlace de WhatsApp en el botón
    whatsappButton.href = whatsappLink;
}

function checkout() {
    // Abre el modal de vista previa
    const previewModal = new bootstrap.Modal(document.getElementById('previewOrderModal'));
    previewModal.show();

    // Actualiza el enlace de WhatsApp con los detalles del pedido
    updateWhatsAppLink();
}

function confirmOrder() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton && whatsappButton.href) {
        window.location.href = whatsappButton.href; // Redirige a WhatsApp
        clearCart(); // Limpia el carrito después de confirmar el pedido
    } else {
        alert("No hay productos en el carrito.");
    }
}

// Guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convierte el carrito a JSON y lo guarda
}

// Cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart'); // Obtiene el carrito guardado
    if (savedCart) {
        cart = JSON.parse(savedCart); // Convierte el JSON a un array
        updateCart(); // Actualiza la interfaz del carrito
    }
}

// Función para limpiar el carrito
function clearCart() {
    cart = []; // Vacía el carrito
    localStorage.removeItem('cart'); // Elimina el carrito de localStorage
    updateCart(); // Actualiza la interfaz
    hideCart(); // Oculta el carrito
}

// Función para alternar entre tema claro y oscuro
function toggleTheme() {
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const nameLogo = document.getElementById('logoName');
    const themeToggleIcon = document.querySelector('#themeToggle i');

    if (body.classList.contains('bg-dark')) {
        // Cambiar a tema claro
        body.classList.remove('bg-dark');
        body.classList.add('bg-light');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
        logo.src = "images/logo-light.png"; // Logo para tema claro
        nameLogo.classList.remove('logoName-dark');
        nameLogo.classList.add('logoName-light');
        // Cambiar icono a sol
        // Cambiar a tema claro (sol outline)
        body.classList.replace('bg-dark', 'bg-light');
        themeToggleIcon.classList.remove('fa-moon', 'text-light');
        themeToggleIcon.classList.add('fa-sun', 'text-secondary');
    } else {
        // Cambiar a tema oscuro
        body.classList.remove('bg-light');
        body.classList.add('bg-dark');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
        nameLogo.classList.remove('logoName-light');
        nameLogo.classList.add('logoName-dark');
        logo.src = "images/logo-dark.png"; // Logo para tema oscuro
         // Cambiar a tema oscuro (luna sólida)
         body.classList.replace('bg-light', 'bg-dark');
         themeToggleIcon.classList.remove('fa-sun', 'text-secondary');
         themeToggleIcon.classList.add('fa-moon', 'text-light');
    }

    // Guardar la preferencia del tema en localStorage
    const isDarkMode = body.classList.contains('bg-dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}
// Aplicar el tema guardado al cargar la página
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');

    if (savedTheme === 'dark') {
        body.classList.remove('bg-light');
        body.classList.add('bg-dark');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
        logo.src = "images/logo-dark.png"; // Logo para tema oscuro
    } else {
        body.classList.remove('bg-dark');
        body.classList.add('bg-light');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
        logo.src = "images/logo-light.png"; // Logo para tema claro
    }
}

// Aplicar el tema guardado al cargar la página
window.addEventListener('load', applySavedTheme);