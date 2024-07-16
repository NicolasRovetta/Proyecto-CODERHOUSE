// Verificar si ya se mostró el mensaje de bienvenida en esta sesión
if (!sessionStorage.getItem("bienvenidaMostrada")) {
  swal("¡Bienvenido al carrito de compra!") // Mensaje de bienvenida
  sessionStorage.setItem("bienvenidaMostrada", "true") // cualquier ejecucion dentro de la sesion no resetea el swall de bienvenida
}

// Obtener el carrito desde localStorage o inicializarlo como un array vacío
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Seleccionar el contenedor del carrito en el DOM
const cartSelection = document.querySelector(".cartSelection")

// Seleccionar el elemento de entrada para el total en el DOM
const totalInput = document.getElementById("total");

// Llamar a la función que gestiona el carrito pasándole los parámetros necesarios
gestionarCarrito(carrito, cartSelection, totalInput)


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

  // Iterar sobre cada producto en el carrito
  carrito.forEach((producto, index) => {
    // Crear un nuevo div para el producto
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");

    // Agregar contenido HTML al div del producto
    productDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <button class="remove-btn" data-index="${index}">-</button>`; // Botón para eliminar producto

    // Agregar el div del producto al contenedor del carrito
    cartSelection.appendChild(productDiv);

    // Sumar el precio del producto al total
    total += parseFloat(producto.precio)
  });

  // Mostrar el total con dos decimales
  if (totalInput) {
    totalInput.value = `$${total.toFixed(2)}`
  }

  // Agregar evento click a cada botón de eliminar
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Obtener el índice del producto a eliminar
      const index = event.target.dataset.index

      // Eliminar el producto del array
      carrito.splice(index, 1)

      // Actualizar el carrito en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito))

      // Recargar la página para actualizar el carrito
      location.reload()
    })
  })
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

  localStorage.setItem("nombre :", nombre);
  localStorage.setItem("apellido :", apellido);
  localStorage.setItem("e-mail :", email);
  localStorage.setItem("telefono :", telefono);

  // Mostrar SweetAlert después de guardar los datos en localStorage + fecha local con luxon,creando variable primero
  const DateTime = luxon.DateTime
  const horaDeCompra = DateTime.now().toJSDate()
  localStorage.setItem("hora de compra :", horaDeCompra)  // Almaceno hora de compra para tener registro de ese pedido en particular
  swal({
    title: "¡Gracias por tu compra!",
    text: `Te enviaremos un e-mail con el ticket de compra. Fecha: ${horaDeCompra}`,
    icon: "success",
    button: "Aceptar",
  });

  // Resetear el formulario después de guardar los datos
  formulario.reset();
}
