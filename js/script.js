let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

class Producto {
    static id = 0;

    constructor(nombre, precio, imagen) {
        this.id = ++Producto.id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen
    }
}

const productosDelMercado = {
  aceite: new Producto("aceite", 1200, "img/aceite.webp"),
  atun: new Producto("atun", 1700, "img/atun.webp"),
  cafe: new Producto("cafe", 2200, "img/cafe.webp"),
  fideos: new Producto("fideos", 800, "img/fideos.webp"),
  galletitas: new Producto("galletitas", 1100, "img/galletitas.webp"),
  gaseosa: new Producto("gaseosa", 1400, "img/gaseosa.webp"),
  harina: new Producto("harina", 900, "img/harina.webp"),
  manzana: new Producto("manzana", 400, "img/manzana.webp"),
  queso: new Producto("queso", 2500, "img/queso.webp"),
  sal: new Producto("sal", 850, "img/sal.webp"),
  vino: new Producto("vino", 4500, "img/vino.webp")
};

const descontar = (item) => {
    const index = carrito.findIndex(carritoItem => carritoItem.nombre === item.nombre);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCantidadCarrito();
        guardarCarrito();
    }};

const agregar = (item) => {
    carrito.push(item);
    actualizarCantidadCarrito();
    guardarCarrito();
};

const actualizarCantidadCarrito = () => {
    const cantidadCarrito = carrito.length;
    const elementoCantidad = document.getElementById("carrito-cantidad");
    elementoCantidad.textContent = cantidadCarrito;
};

const crearTarjetaDeProductos = () => {
    const contenedor = document.getElementById('grid-container');
    contenedor.innerHTML = '';

    for (const key in productosDelMercado) {
        if (productosDelMercado.hasOwnProperty(key)) {
            const producto = productosDelMercado[key];
            const div = document.createElement('div');
            div.className = 'grid-item';

            const img = document.createElement('img');
            img.src = producto.imagen;

            const botonIzquierda = document.createElement('button');
            botonIzquierda.className = 'izquierda';
            botonIzquierda.textContent = '−';
            botonIzquierda.setAttribute('data-product', producto.nombre);
            botonIzquierda.onclick = () => descontar(producto);

            const botonDerecha = document.createElement('button');
            botonDerecha.className = 'derecha';
            botonDerecha.textContent = '+';
            botonDerecha.setAttribute('data-product', producto.nombre);  // atributo data-product lleva el nombre dle pto en particular
            botonDerecha.onclick = () => agregar(producto);

            const h3 = document.createElement('h3');
            h3.textContent = producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1);

            div.appendChild(img);
            div.appendChild(document.createElement('br'));
            div.appendChild(botonIzquierda);
            div.appendChild(botonDerecha);
            div.appendChild(h3);

            contenedor.appendChild(div);
        }
    }
};

window.onload = () => {
    crearTarjetaDeProductos();
};


// Guardado en LocalStorage del carrito
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

document.querySelectorAll('.izquierda').forEach(button => {
    button.addEventListener('click', () => {
        const product = productosDelMercado[button.dataset.product];
        descontar(product);
    });
});

document.querySelectorAll('.derecha').forEach(button => {
    button.addEventListener('click', () => {
        const product = productosDelMercado[button.dataset.product];
        agregar(product);
    });
});

// FUTURO CAMPO DE BUSQUEDA
// const campoTexto = document.getElementById('campodebusqueda');
// campoTexto.addEventListener('input', function() {
//     const valorFiltro = campoTexto.value.toLowerCase();
//     const productosFiltrados = Object.values(productosDelMercado).filter(producto => producto.nombre.toLowerCase().includes(valorFiltro));
//     console.table(productosFiltrados);
// });



