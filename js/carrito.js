// Verificar si ya se mostró el mensaje de bienvenida en esta sesión
if (!sessionStorage.getItem("bienvenidaMostrada")) {
  swal("¡Bienvenido al carrito de compra!") // Mensaje de bienvenida
  sessionStorage.setItem("bienvenidaMostrada", "true"); // Se marca como mostrado
}

// Obtener el carrito desde localStorage o inicializarlo como un array vacío
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Seleccionar el contenedor del carrito en el DOM
const cartSelection = document.querySelector(".cartSelection");

// Seleccionar el elemento de entrada para el total en el DOM
const totalInput = document.getElementById("total");

// Llamar a la función que gestiona el carrito pasándole los parámetros necesarios
gestionarCarrito(carrito, cartSelection, totalInput);

function gestionarCarrito(carrito, cartSelection, totalInput) {
  let total = 0; // Inicializar el total a 0

  // Verificar si el carrito está vacío
  if (!carrito.length) {
    cartSelection.innerHTML = "<h2>No hay productos en el carrito.</h2><br>";

    // Mostrar el total como 0.00 si no hay productos en el carrito
    if (totalInput) {
      totalInput.value = `$0.00`;
    }
    return; // Terminar la ejecución de la función
  }

  // Agrupar productos por nombre y contar la cantidad
  const productosAgrupados = carrito.reduce((acc, producto) => {
    const found = acc.find(item => item.nombre === producto.nombre);
    if (found) {
      found.cantidad++;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  // Mostrar los productos en el carrito
  productosAgrupados.forEach((producto, index) => {
    // Crear un nuevo div para el producto
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");

    // Agregar contenido HTML al div del producto
    productDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <div class="cantidad-controles">
        <button class="decrement-btn" data-index="${index}">−</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button class="increment-btn" data-index="${index}">+</button>
      </div>
      <p>Total: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button class="remove-btn" data-index="${index}">Eliminar</button>`; // Botón para eliminar producto

    // Agregar el div del producto al contenedor del carrito
    cartSelection.appendChild(productDiv);

    // Sumar el precio total del producto al total
    total += parseFloat(producto.precio) * producto.cantidad;
  });

  // Mostrar el total con dos decimales
  if (totalInput) {
    totalInput.value = `$${total.toFixed(2)}`;
  }

  // Agregar eventos a los botones de incremento, decremento y eliminación
  document.querySelectorAll(".increment-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      productosAgrupados[index].cantidad++;
      actualizarCarrito(productosAgrupados);
    });
  });

  document.querySelectorAll(".decrement-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      if (productosAgrupados[index].cantidad > 1) {
        productosAgrupados[index].cantidad--;
        actualizarCarrito(productosAgrupados);
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      productosAgrupados.splice(index, 1);
      actualizarCarrito(productosAgrupados);
    });
  });
}

// Actualizar el carrito y guardar en localStorage
function actualizarCarrito(productosAgrupados) {
  const nuevoCarrito = productosAgrupados.flatMap(producto => 
    Array(producto.cantidad).fill({
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio
    })
  );
  
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  location.reload(); // Recargar la página para actualizar la visualización del carrito
}

// FORMULARIO
const formulario = document.getElementById("miFormulario");

formulario.addEventListener("submit", guardarDatos);

function guardarDatos(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value.toLowerCase();
  let apellido = document.getElementById("apellido").value.toLowerCase();
  let email = document.getElementById("email").value.toLowerCase();
  let telefono = document.getElementById("telefono").value.toLowerCase();

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);

  // Mostrar SweetAlert después de guardar los datos en localStorage + fecha local con luxon, creando variable primero
  const DateTime = luxon.DateTime;
  const horaDeCompra = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  localStorage.setItem("hora de compra", horaDeCompra);  // Almaceno hora de compra para tener registro de ese pedido en particular

  swal({
    title: "¡Gracias por tu compra!",
    text: `Te enviaremos un e-mail con el ticket de compra. Fecha: ${horaDeCompra}`,
    icon: "success",
    button: "Aceptar",
  });

  // Resetear el formulario después de guardar los datos
  formulario.reset();
}

