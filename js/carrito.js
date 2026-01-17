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
        <h2>Total: $${total.toFixed(2)}</h2>

        <button class="btn" onclick="mostrarFormulario()">
            Confirmar pedido
        </button>

        <div id="formulario-envio"></div>

        <button onclick="vaciarCarrito()" class="btn" style="margin-top:10px;">
            Vaciar carrito
        </button>
    `;
}

// Mostrar formulario de envío
function mostrarFormulario() {
    const contenedor = document.getElementById("formulario-envio");

    contenedor.innerHTML = `
        <h3>Datos de envío</h3>

        <input id="nombre" placeholder="Nombre completo">
        <input id="telefono" placeholder="Teléfono">
        <textarea id="direccion" placeholder="Dirección de envío"></textarea>
        <textarea id="referencia" placeholder="Referencia (opcional)"></textarea>

        <button class="btn" onclick="enviarPedidoWhatsApp()" style="margin-top:10px;">
            Enviar pedido por WhatsApp
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

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const referencia = document.getElementById("referencia").value.trim();

    if (!nombre || !telefono || !direccion) {
        alert("Completa todos los datos obligatorios");
        return;
    }

    let mensaje = `🛍️ Nuevo pedido - AXIS BIT\n\n`;
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio}\n`;
    });

    mensaje += `\nNombre: ${nombre}`;
    mensaje += `\nTeléfono: ${telefono}`;
    mensaje += `\nDirección: ${direccion}`;

    if (referencia) {
        mensaje += `\nReferencia: ${referencia}`;
    }

    mensaje += `\n\nTotal: $${total.toFixed(2)}`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeCodificado}`;

    window.open(url, "_blank");
}

// Ejecutar al cargar
actualizarContador();
mostrarCarrito();

