// Variable para almacenar los productos en el carrito
let carrito = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then(data => {
            data.slice(0, 6).forEach(product => {
                createProduct(product);
            });
        })
        .catch(error => console.error('Error fetching API:', error));
});

function createProduct(product) {
    const containerCard = document.createElement('div');
    containerCard.classList.add('card');

    const imgCard = document.createElement('img');
    imgCard.src = product.image;
    imgCard.alt = product.title;

    const titleCard = document.createElement('h3');
    titleCard.textContent = product.title;

    containerCard.appendChild(imgCard);
    containerCard.appendChild(titleCard);

    containerCard.addEventListener('click', () => showModal(product));

    document.querySelector('.container-products').appendChild(containerCard);
}

function showModal(product) {
    // Creación elementos modal
    const modal = document.createElement('div');
    modal.setAttribute('id', 'productModal');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeSpan = document.createElement('span');
    closeSpan.classList.add('close');
    closeSpan.innerHTML = '&times;';

    const imgModal = document.createElement('img');
    imgModal.setAttribute('src', product.image);
    imgModal.classList.add('modal-img');

    const titleModal = document.createElement('h4');
    titleModal.textContent = product.title;

    const descriptionModal = document.createElement('p');
    descriptionModal.textContent = product.description;

    const priceModal = document.createElement('p');
    priceModal.textContent = `Price: $${product.price}`;

    // Botones para ajustar la cantidad y eliminar productos del carrito
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('min', '1');
    quantityInput.setAttribute('value', '1');
    quantityInput.classList.add('quantity-input');

    const addButton = document.createElement('button');
    addButton.textContent = 'Añadir al carrito';
    addButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            confirmButtonText: '¡Entendido!'
        });
    });

    // Función para añadir un producto al carrito
    function addToCart(product) {
        carrito.push(product); // Añadir el producto al carrito
    }

    // Construcción modal
    modalContent.appendChild(closeSpan);
    modalContent.appendChild(imgModal);
    modalContent.appendChild(titleModal);
    modalContent.appendChild(descriptionModal);
    modalContent.appendChild(priceModal);
    modalContent.appendChild(quantityInput);
    modalContent.appendChild(addButton);
    modal.appendChild(modalContent);

    // Añadir la modal al body
    document.body.appendChild(modal);

    // Mostrar modal
    modal.style.display = 'block';

    // Cerrar modal al hacer clic en la "X"
    closeSpan.onclick = function() {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Eliminar modal del DOM
    }

    // Cerrar modal al hacer clic fuera de ella
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal); // Eliminar del DOM
        }
    }
}

// Escucha el evento clic en el botón de carrito
document.getElementById('cartButton').addEventListener('click', showCartModal);

// Función para mostrar la ventana emergente del carrito
function showCartModal() {
    // Eliminar el modal anterior si existe
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    // Crear el contenedor del modal
    const cartModal = document.createElement('div');
    cartModal.setAttribute('id', 'cartModal');
    cartModal.classList.add('modal');

    // Crear el contenido del modal
    const cartContent = document.createElement('div');
    cartContent.classList.add('modal-content');

    // Título del modal
    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Carrito de Compras';

    // Lista de productos
    const productList = document.createElement('ul');
    if (carrito.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Tu carrito está vacío';
        productList.appendChild(emptyCartMessage);
    } else {
        carrito.forEach((product, index) => {
            const listItem = document.createElement('li');
            const productTitle = document.createElement('span');
            productTitle.textContent = `${product.title} - $${product.price}`;

            // Botón de eliminar producto
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                // Eliminar el producto del carrito
                carrito.splice(index, 1);
                // Volver a mostrar la modal con los productos actualizados
                showCartModal();
            });

            listItem.appendChild(productTitle);
            listItem.appendChild(removeButton);
            productList.appendChild(listItem);
        });
    }

    // Botón para cerrar el modal
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.addEventListener('click', () => {
        // Cerrar el modal al hacer clic en el botón
        cartModal.style.display = 'none';
    });

    // Añadir elementos al contenido del modal
    cartContent.appendChild(cartTitle);
    cartContent.appendChild(productList);
    cartContent.appendChild(closeButton);

    // Añadir contenido al modal
    cartModal.appendChild(cartContent);

    // Añadir el modal al cuerpo del documento
    document.body.appendChild(cartModal);

    // Mostrar el modal
    cartModal.style.display = 'block';
}
