document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const productName = document.getElementById('product-name');
    const productQuantity = document.getElementById('product-quantity');
    const productPrice = document.getElementById('product-price');
    const productTableBody = document.querySelector('#product-table tbody');

    // Cargar productos desde localStorage
    loadProducts();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = productName.value;
        const quantity = productQuantity.value;
        const price = productPrice.value;

        if (name && quantity && price) {
            const product = {
                name: name,
                quantity: parseInt(quantity),
                price: parseFloat(price)
            };

            addProductToStorage(product);
            clearForm();
            loadProducts();
        }
    });

    // Función para agregar el producto al almacenamiento local
    function addProductToStorage(product) {
        const products = getProductsFromStorage();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Obtener productos desde el almacenamiento local
    function getProductsFromStorage() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    }

    // Cargar productos en la tabla
    function loadProducts() {
        const products = getProductsFromStorage();
        productTableBody.innerHTML = '';

        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td><button class="delete" onclick="deleteProduct(${index})">Eliminar</button></td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Función para eliminar un producto
    window.deleteProduct = function (index) {
        const products = getProductsFromStorage();
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    // Limpiar el formulario
    function clearForm() {
        productName.value = '';
        productQuantity.value = '';
        productPrice.value = '';
    }
});
