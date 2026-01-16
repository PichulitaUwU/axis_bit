// ===== CONFIGURACIÓN WHATSAPP =====
const WHATSAPP_NUMERO = "593963177550"; // +593 sin el 0
// ================================


// Obtener carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContador();
    alert("Producto agregado al carrito 🛒");
}

// Eliminar producto
function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
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

// Mostrar carrito
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
                <img src="${item.imagen}" style="width:80px;">
                <div>
                    <h3>${item.nombre}</h3>
                    <p>$${item.precio} x ${item.cantidad}</p>
                    <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML += `
        <h2>Total: $${total.toFixed(2)}</h2>

        <textarea id="direccion" placeholder="Dirección de envío" 
        style="width:100%; margin:15px 0; padding:10px;"></textarea>

        <button onclick="enviarPedidoWhatsApp()" class="btn">
            Confirmar pedido por WhatsApp
        </button>

        <button onclick="vaciarCarrito()" style="margin-top:10px;">
            Vaciar carrito
        </button>
    `;
}

// Contador carrito
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const total = obtenerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
}

// Enviar pedido a WhatsApp
function enviarPedidoWhatsApp() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const direccion = document.getElementById("direccion").value.trim();
    if (!direccion) {
        alert("Por favor ingresa la dirección de envío");
        return;
    }

    let mensaje = "🛍️ *Nuevo pedido - AXIS BIT*%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio}%0A`;
    });

    mensaje += `%0A📦 *Dirección:* ${direccion}`;
    mensaje += `%0A💰 *Total:* $${total.toFixed(2)}`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
    window.open(url, "_blank");
}

// Ejecutar al cargar
actualizarContador();
mostrarCarrito();

