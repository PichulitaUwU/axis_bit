/* =========================
   CARRITO - TIENDA WEB
   ========================= */

// Obtener carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
    alert("Producto agregado al carrito 🛒");
}

// Eliminar producto
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContador();
}

// Vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContador();
}

// 👉 NUEVA FUNCIÓN: Confirmar compra por WhatsApp
function confirmarCompraWhatsApp() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let mensaje = "Hola, quiero realizar una compra en AXIS BIT:%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio}%0A`;
        total += item.precio * item.cantidad;
    });

    mensaje += `%0A*Total:* $${total}%0A%0A`;
    mensaje += "Quedo atento/a para coordinar el pago y entrega.";

    // 🔴 CAMBIA ESTE NÚMERO POR EL TUYO
    const telefono = "593XXXXXXXXX"; // Ecuador: 593 + tu número

    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    if (!contenedor) return;

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        contenedor.innerHTML += `
            <div class="item-carrito">
                <img src="${item.imagen}">
                <div>
                    <h3>${item.nombre}</h3>
                    <p>$${item.precio} x ${item.cantidad}</p>
                    <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML += `
        <h2>Total: $${total}</h2>

        <button onclick="confirmarCompraWhatsApp()" class="btn">
            Confirmar compra por WhatsApp
        </button>

        <br><br>

        <button onclick="vaciarCarrito()">
            Vaciar carrito
        </button>
    `;
}

// Contador del carrito (icono)
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
}

// Ejecutar al cargar la página
actualizarContador();
mostrarCarrito();
