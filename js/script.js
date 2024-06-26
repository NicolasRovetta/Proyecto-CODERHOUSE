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
  "aceite": new Producto("aceite", 1200, "img/aceite.webp"),
  "atun": new Producto("atun", 1700, "img/atun.webp"),
  "cafe": new Producto("cafe", 2200, "img/cafe.webp"),
  "fideos": new Producto("fideos", 800, "img/fideos.webp"),
  "galletitas": new Producto("galletitas", 1100, "img/galletitas.webp"),
  "gaseosa": new Producto("gaseosa", 1400, "img/gaseosa.webp"),
  "harina": new Producto("harina", 900, "img/harina.webp"),
  "manzana": new Producto("manzana", 400, "img/manzana.webp"),
  "queso": new Producto("queso", 2500, "img/queso.webp"),
  "sal": new Producto("sal", 850, "img/sal.webp"),
  "vino": new Producto("vino", 4500, "img/vino.webp")
};


const descontar = (item) => {
    const index = carrito.findIndex(carritoItem => carritoItem.nombre === item.nombre);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCantidadCarrito();
        guardarCarrito();
    } else {
        console.log("El producto no está en el carrito.");
    }
};

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

const campoTexto = document.getElementById('campodebusqueda');
campoTexto.addEventListener('input', function() {
    const valorFiltro = campoTexto.value.toLowerCase();
    const productosFiltrados = Object.values(productosDelMercado).filter(producto => producto.nombre.toLowerCase().includes(valorFiltro));
    console.table(productosFiltrados);
});



