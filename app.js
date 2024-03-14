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
    // Crea r la card
    const containerCard = document.createElement('div');
    containerCard.classList.add('card');

    // Crear imagen
    const imgCard = document.createElement('img');
    imgCard.src = product.image;
    imgCard.alt = product.title;

    // Crear titulo
    const titleCard = document.createElement('h3');
    titleCard.textContent = product.title;

    // Añadir imagen
    containerCard.appendChild(imgCard);
    containerCard.appendChild(titleCard);

    // Añadir al padre
    document.querySelector('.container-products').appendChild(containerCard);
}

