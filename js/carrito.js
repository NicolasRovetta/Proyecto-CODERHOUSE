document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartSelection = document.querySelector('.cartSelection');
    const totalInput = document.getElementById('total');

    let total = 0;

    if (!carrito.length) {
        cartSelection.innerHTML = "<h2>No hay productos en el carrito.</h2><br>"; 
        if (totalInput) {
            totalInput.value = `$0.00`; // Mostrar total como 0.00 si no hay productos
        }
        return;
    }



    
    carrito.forEach((producto, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="remove-btn" data-index="${index}">-</button>`;  //agrego boton para eliminar producto en la cart
        cartSelection.appendChild(productDiv);

        total += parseFloat(producto.precio);
    });

    if (totalInput) {
        totalInput.value = `$${total.toFixed(2)}`; // Mostrar el total con dos decimales
    }

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            carrito.splice(index, 1); // Eliminar producto del array
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
            location.reload(); // Recargar la página para actualizar el carrito
        });
    });
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


