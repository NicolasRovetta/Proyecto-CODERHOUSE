document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartSelection = document.querySelector('.cartSelection');
    const totalInput = document.getElementById('total');

    let total = 0;

    if (!carrito.length) {
        cartSelection.innerHTML = "<h2>No hay productos en el carrito.</h2>";"<br>"
        totalInput.value = total.toFixed(2); // Mostrar total como 0.00 si no hay productos
        return;
    }

    carrito.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <img src="img/${producto.nombre}.webp" alt="${producto.nombre}" />`;
        cartSelection.appendChild(productDiv);

        total += parseFloat(producto.precio);
    });

    totalInput.value = total.toFixed(2); // Mostrar el total con dos decimales
});

// FORMULARIO

document.getElementById('miFormulario').addEventListener('submit', guardarDatos);

function guardarDatos(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value.toLowerCase();
    let apellido = document.getElementById('apellido').value.toLowerCase();
    let email = document.getElementById('email').value.toLowerCase();
    let telefono = document.getElementById('telefono').value.toLowerCase();

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('email', email);
    localStorage.setItem('telefono', telefono);
}


