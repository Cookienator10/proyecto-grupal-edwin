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
    //creacion elementios modal
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

    // Construccion modal
    modalContent.appendChild(closeSpan);
    modalContent.appendChild(imgModal);
    modalContent.appendChild(titleModal);
    modalContent.appendChild(descriptionModal);
    modalContent.appendChild(priceModal); 
    modal.appendChild(modalContent);

    // añade la modal al body
    document.body.appendChild(modal);

    //se muestra modal
    modal.style.display = 'block';

    //para cerrar modal
    closeSpan.onclick = function() {
        modal.style.display = 'none';
        document.body.removeChild(modal); // eliminar modal
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal); // eliminar del DOM
        }
    }
}
