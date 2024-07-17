let carrito = [];

try {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
} catch (error) {
  swal({
    title: "Error",
    text: "No se pudo cargar el carrito.",
    icon: "error",
    button: "Ok",
  });
  mostrarMensajeError("Error al cargar el carrito desde el localStorage.");
} finally {
  // Este bloque se ejecutará siempre, independientemente de si hubo un error o no
}


// Cargar productos desde un archivo JSON
let productosDelMercado = {};

const cargarProductos = async () => {
  try {
    const response = await fetch('./DB/basededatos.json');
    const data = await response.json();
    productosDelMercado = data.productosDelMercado;
    crearTarjetaDeProductos();
  } catch (error) {
    swal({
      title: "Error",
      text: "No se pudo conectar con la base de datos.",
      icon: "error",
      button: "Ok",
    });
  }
};

const descontar = (item) => {
  const index = carrito.findIndex(
    (carritoItem) => carritoItem.nombre === item.nombre
  );
  if (index !== -1) {
    carrito.splice(index, 1);
    actualizarCantidadCarrito();
    guardarCarrito();
    Toastify({
      text: "Producto eliminado del carrito",
      duration: 1000,
      close: false,
      gravity: "top", 
      position: "right", 
      stopOnFocus: true, // Previene que se cierre el toast al pasar el cursor
      style: {
        background: "#00b09b",
        color: "#fff",
        width: "auto",
        minWidth: "150px",
        borderRadius: "8px",
        padding: "10px 20px",
      },
    }).showToast();
  }
};

const agregar = (item) => {
  carrito.push(item);
  actualizarCantidadCarrito();
  guardarCarrito();
  Toastify({
    text: "Producto agregado al carrito",
    duration: 1000,
    close: false,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "#00b09b",
      color: "#fff",
      width: "auto",
      minWidth: "150px",
      borderRadius: "8px",
      padding: "10px 20px",
    },
  }).showToast();
};

const actualizarCantidadCarrito = () => {
  const cantidadCarrito = carrito.length;
  const elementoCantidad = document.getElementById("carrito-cantidad");
  elementoCantidad.textContent = cantidadCarrito;
};

const crearTarjetaDeProductos = (productos = productosDelMercado) => {
  const contenedor = document.getElementById("grid-container");
  contenedor.innerHTML = "";

  for (const key in productos) {
    if (productos.hasOwnProperty(key)) {
      const producto = productos[key];
      const div = document.createElement("div");
      div.className = "grid-item";

      const img = document.createElement("img");
      img.src = producto.imagen;

      const botonIzquierda = document.createElement("button");
      botonIzquierda.className = "izquierda";
      botonIzquierda.textContent = "−";
      botonIzquierda.setAttribute("data-product", producto.nombre);
      botonIzquierda.onclick = () => descontar(producto);

      const botonDerecha = document.createElement("button");
      botonDerecha.className = "derecha";
      botonDerecha.textContent = "+";
      botonDerecha.setAttribute("data-product", producto.nombre);
      botonDerecha.onclick = () => agregar(producto);

      const h3 = document.createElement("h3");
      h3.textContent =
        producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1);

      div.appendChild(img);
      div.appendChild(document.createElement("br"));
      div.appendChild(botonIzquierda);
      div.appendChild(botonDerecha);
      div.appendChild(h3);

      contenedor.appendChild(div);
    }
  }
}

window.onload = () => {
  cargarProductos();
  crearTarjetaDeProductos();
  // Evento para la búsqueda de productos
  document.getElementById('campodebusqueda').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const productosFiltrados = {};
    
    for (const key in productosDelMercado) {
      if (productosDelMercado.hasOwnProperty(key)) {
        const producto = productosDelMercado[key];
        if (producto.nombre.toLowerCase().includes(query)) {
          productosFiltrados[key] = producto;
        }
      }
    }    
    crearTarjetaDeProductos(productosFiltrados);
  });
};

// Guardado en LocalStorage del carrito
const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.querySelectorAll(".izquierda").forEach((button) => {
  button.addEventListener("click", () => {
    const product = productosDelMercado[button.dataset.product];
    descontar(product);
  })
})

document.querySelectorAll(".derecha").forEach((button) => {
  button.addEventListener("click", () => {
    const product = productosDelMercado[button.dataset.product]
    agregar(product)
  })
})
// Buscador
// Obtener el elemento div con la clase 'buscador'
const buscadorDiv = document.querySelector('.buscador');

// Crear el formulario
const form = document.createElement('form');

// Crear el input de texto
const input = document.createElement('input');
input.type = 'text';
input.id = 'campodebusqueda';
input.autocomplete = 'off';
input.placeholder = 'Buscar producto';
input.value = '';

// Añadir el input al formulario
form.appendChild(input);

// Añadir el formulario al div
buscadorDiv.appendChild(form);