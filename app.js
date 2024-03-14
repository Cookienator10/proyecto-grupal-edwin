window.addEventListener("DOMContentLoaded", function() {
    api();
});

function api() {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then(data => {
            data.slice(0, 5).forEach(product => {
                createProduct(product);
            });
        })
        .catch(error => console.error('error fetching API:', error));
}

function createProduct(product) {
    // Crea el contenedor de la tarjeta
    const containerCard = document.createElement('div');
    containerCard.classList.add('card');

    // Crea y configura la imagen
    const imgCard = document.createElement('img');
    imgCard.src = product.image;
    imgCard.alt = product.title;

    // Crea y configura el título
    const titleCard = document.createElement('h3');
    titleCard.textContent = product.title;

    // Añade la imagen y el título al contenedor de la tarjeta
    containerCard.appendChild(imgCard);
    containerCard.appendChild(titleCard);

    // Añade la tarjeta al contenedor padre '.container-products'
    document.querySelector('.container-products').appendChild(containerCard);
}

