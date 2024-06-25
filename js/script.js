let carrito = [];
// CREACION DE CLASES PARA LOS PRODUCTOS

class Producto {
  static id = 0;

  constructor(nombre, precio) {
    (this.id = ++Producto.id), (this.nombre = nombre), (this.precio = precio);
  }
}

// Instanciado de objetos + Array con productos del mercado
const productosDelMercado = {
  "aceite": new Producto("aceite", 1200),
  "atun": new Producto("atun", 1700),
  "cafe": new Producto("cafe", 2200),
  "fideos": new Producto("fideos", 800),
  "galletitas": new Producto("galletitas", 1100),
  "gaseosa": new Producto("gaseosa", 1400),
  "harina": new Producto("harina", 900),
  "manzana": new Producto("manzana", 400),
  "queso": new Producto("queso", 2500),
  "sal": new Producto("sal", 850),
  "vino": new Producto("vino", 4500),
  "yerba mate": new Producto("yerba mate", 3200)
};

// funciones para agregar y descontar productos en el carrito con las flechas

const descontar = (item) => {
  const index = carrito.findIndex(carritoItem => carritoItem.nombre === item.nombre);
  if (index !== -1) {
      carrito.splice(index, 1);
      console.log(carrito);
      actualizarCantidadCarrito();
  } else {
      console.log("El producto no está en el carrito.");
  }
};

const agregar = (item) => {
  carrito.push(item);
  console.log(carrito);
  actualizarCantidadCarrito();
};

const actualizarCantidadCarrito = () => {
  const cantidadCarrito = carrito.length;
  const elementoCantidad = document.getElementById("carrito-cantidad");
  elementoCantidad.textContent = cantidadCarrito;
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


// const finalizarCompra = (event) => {
//   const confirmacion = confirm("¿Desea confirmar la compra?");
//   if (confirmacion) {
//     let nombre, apellido, email, phone;

//     nombre = prompt("Indique su nombre: ").trim().toLowerCase(); // trim() vacia espacios vacios,cargados pre y post palabra
//     apellido = prompt("Indique su apellido: ").trim().toLowerCase();
//     email = prompt("Indique su e-mail: ").trim().toLowerCase();
//     phone = parseInt(prompt("Indique su número de teléfono: "));

//     if (nombre === "" || apellido === "" || email === "" || phone === "")
//       return alert(
//         "!datos incompletos!,por favor reingrese los datos solicitados"
//       ); // se utiliza '===' igualdad estricta para comparar valor y tipo,y asi null es null si el usuario no completa el campo.
//     console.table(carrito);

//     let datosComprador = [
//       "Nombre: " + nombre,
//       "Apellido: " + apellido,
//       "e-mail: " + email,
//       "teléfono: " + phone,
//     ];

//     datosComprador = datosComprador.join(" , ")
//     const datosCompradorJson = JSON.stringify(datosComprador)
//     localStorage.setItem("Datos almacenados del comprador", datosCompradorJson) // datos del comprador almacenados en Localstorage

//     console.log("Datos del comprador: " + datosComprador)
//     alert("¡Su compra ha sido exitosa!.Recibirá un email para finalizarla!")
//     alert("Su total es : $" + calcularSubtotalCarrito())
//   } else {
//     alert("La compra ha sido cancelada.");
//   }

//   // Función para calcular el subtotal de todos los productos en el carrito
//   function calcularSubtotalCarrito() {
//     let subtotal = 0;
//     for (const item of carrito) {
//       subtotal += item.precio;
//     }
//     return subtotal;
//   }

//   // Almacenamiento de el carrito , convirtiendolo previamente en Json
//   const compraCarrito = { carrito };
//   const enJson = JSON.stringify(compraCarrito);  // convierto a cadena tipo JSON utilizando JSON.stringify
//   localStorage.setItem("Lista de compras del carrito", enJson); // guardo localmente el "carrito" que instancia dos lineas mas arriba
// };


//   Búsqueda (filtrado)

const campoTexto = document.getElementById('campodebusqueda');
campoTexto.addEventListener('input', function() {
  const valorFiltro = campoTexto.value.toLowerCase(); // Convertir a minúsculas lo que se escribe para comparar
  const productosFiltrados = productosDelMercado.filter(producto => producto.nombre.toLowerCase().includes(valorFiltro));
  console.table(productosFiltrados)
});
   


