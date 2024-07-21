Proyecto Final: Simulador de Tienda E-Commerce

Este proyecto consiste en el desarrollo de un simulador de tienda de compras en línea. A continuación, se detallan las características y funcionalidades principales del simulador:

Importación de Productos:

Los productos se importan desde un archivo .json, creando un array de objetos que representan los productos disponibles en la tienda.
Presentación de Productos:

Utilizando el DOM, se generan cartas de presentación para cada producto, las cuales se conectan al HTML para su visualización en la página principal.
Funcionalidades de la Tienda:

Búsqueda y Filtrado: Los usuarios pueden buscar y filtrar los productos disponibles a través de un campo de búsqueda.
Gestión del Carrito de Compras: Los productos se pueden agregar y eliminar del carrito de compras directamente desde la página principal. Cada acción (agregar o eliminar productos) genera una notificación visual mediante la librería Toastify.
Visualización del Carrito: En la sección del carrito, se muestran los productos seleccionados junto con el total del carrito. Los usuarios pueden eliminar productos del carrito según deseen.
Almacenamiento Local:

Tanto los productos seleccionados en el carrito como los datos del comprador, la fecha y la hora de la compra se guardan en el localStorage, asegurando que la información persista entre sesiones.
Finalización de la Compra:

Formulario de Compra: Para finalizar la compra, el usuario debe completar un formulario. Los datos del formulario, junto con los del carrito, se almacenan localmente en el localStorage.
Confirmación de la Compra: Al hacer clic en "Finalizar Compra", aparece una alerta de confirmación mediante SweetAlert. Esta alerta confirma la compra y muestra la hora actual, la cual también se almacena localmente utilizando el framework Luxon.
Este proyecto integra diversas tecnologías y herramientas modernas para crear una experiencia de compra en línea intuitiva y funcional, enfatizando la interacción dinámica y la gestión eficiente de datos.
