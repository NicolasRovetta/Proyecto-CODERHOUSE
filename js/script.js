let carrito = [];
// CREACION DE CLASES PARA LOS PRODUCTOS

class Producto {
  static id = 0;

  constructor(nombre, precio) {
    (this.id = ++Producto.id), (this.nombre = nombre), (this.precio = precio);
  }
}

// Instanciado de objetos

const aceite = new Producto("aceite", 1200);
const atun = new Producto("atun", 1700);
const cafe = new Producto("cafe", 2200);
const fideos = new Producto("fideos", 800);
const galletitas = new Producto("galletitas", 1100);
const gaseosa = new Producto("gaseosa", 1400);
const harina = new Producto("harina", 900);
const manzana = new Producto("manzana", 400);
const queso = new Producto("queso", 2500);
const sal = new Producto("sal", 850);
const vino = new Producto("vino", 4500);
const yerbaMate = new Producto("yerba mate", 3200);

// Array con productos del mercado
const productosDelMercado = [
  aceite,
  atun,
  cafe,
  fideos,
  galletitas,
  gaseosa,
  harina,
  manzana,
  queso,
  sal,
  vino,
  yerbaMate
];

// funciones para agregar y descontar productos en el carrito con las flechas

const descontar = (item) => {
  const index = carrito.lastIndexOf(item); // .lastIndexOf() rastrea de atrás hacia adelante el último índice del item seleccionado
  if (index !== -1) {
    carrito.splice(index, 1)
    console.log(carrito)
    actualizarCantidadCarrito();
  }
};

const agregar = (item) => {
  carrito.push(item)
  console.log(carrito)
  actualizarCantidadCarrito();
};

function actualizarCantidadCarrito() {
  const cantidadCarrito = carrito.length;
  const elementoCantidad = document.getElementById("carrito-cantidad")
  elementoCantidad.textContent = cantidadCarrito;
}

const finalizarCompra = (event) => {
  const confirmacion = confirm("¿Desea confirmar la compra?");
  if (confirmacion) {
    let nombre, apellido, email, phone;

    nombre = prompt("Indique su nombre: ").trim().toLowerCase(); // trim() vacia espacios vacios,cargados pre y post palabra
    apellido = prompt("Indique su apellido: ").trim().toLowerCase();
    email = prompt("Indique su e-mail: ").trim().toLowerCase();
    phone = parseInt(prompt("Indique su número de teléfono: "));

    if (nombre === "" || apellido === "" || email === "" || phone === "")
      return alert(
        "!datos incompletos!,por favor reingrese los datos solicitados"
      ); // se utiliza '===' igualdad estricta para comparar valor y tipo,y asi null es null si el usuario no completa el campo.
    console.table(carrito);

    let datosComprador = [
      "Nombre: " + nombre,
      "Apellido: " + apellido,
      "e-mail: " + email,
      "teléfono: " + phone,
    ];
    datosComprador = datosComprador.join(" , ");
    console.log("Datos del comprador: " + datosComprador);
    alert("¡Su compra ha sido exitosa!.Recibirá un email para finalizarla!");
    alert("Su total es : $" + calcularSubtotalCarrito())
  } else {
    alert("La compra ha sido cancelada.");
  }

  // Función para calcular el subtotal de todos los productos en el carrito
  function calcularSubtotalCarrito() {
    let subtotal = 0;
    for (const item of carrito) {
      subtotal += item.precio;
    }
    return subtotal;
  }

  // Almacenamiento de el carrito , convirtiendolo previamente en Json
  const compraCarrito = { carrito };
  const enJson = JSON.stringify(compraCarrito);  // convierto a cadena tipo JSON utilizando JSON.stringify
  localStorage.setItem("compraCarrito", enJson); // guardo localmente el "carrito" que instancia dos lineas mas arriba
};


//   Búsqueda (filtrado)

const campoTexto = document.getElementById('campodebusqueda');
campoTexto.addEventListener('input', function() {
  const valorFiltro = campoTexto.value.toLowerCase(); // Convertir a minúsculas lo que se escribe para comparar
  const productosFiltrados = productosDelMercado.filter(producto => producto.nombre.toLowerCase().includes(valorFiltro));
  console.table(productosFiltrados)
});
   


