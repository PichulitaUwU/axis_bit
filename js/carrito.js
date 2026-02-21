// ===== CONFIGURACIÓN WHATSAPP =====
const WHATSAPP_NUMERO = "593963177550";
// ==================================

// ================= UTILIDADES =================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function formatearPrecio(valor) {
    return `$${valor.toFixed(2)}`;
}

// ================= CARRITO =================
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
    mostrarNotificacion(`${producto.nombre} agregado al carrito 🛒`);
}

function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        mostrarCarrito();
        actualizarContador();
    }
}

function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === id);

    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContador();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio-msg">
                <p>Tu carrito está actualmente vacío.</p>
                <a href="productos.html" class="btn">Ir a la tienda</a>
            </div>
        `;
        return;
    }

    let total = 0;

    const itemsHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        return `
            <div class="item-carrito">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div style="flex-grow:1;">
                    <h3>${item.nombre}</h3>
                    <p>${formatearPrecio(item.precio)} x ${item.cantidad}</p>
                    <p style="font-weight:bold;">Subtotal: ${formatearPrecio(subtotal)}</p>

                    <div style="display:flex; gap:10px; align-items:center; margin-top:10px;">
                        <button onclick="cambiarCantidad(${item.id}, -1)" class="btn-secundario">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)" class="btn-secundario">+</button>
                    </div>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})" class="btn-secundario">Eliminar</button>
            </div>
        `;
    }).join("");

    contenedor.innerHTML = `
        ${itemsHTML}
        <div class="resumen-final" style="margin-top:30px; text-align:right;">
            <h2 style="font-size:2rem;">Total: ${formatearPrecio(total)}</h2>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
                <button onclick="vaciarCarrito()" class="btn-secundario">Vaciar Carrito</button>
                <button class="btn" onclick="mostrarFormulario()">Confirmar Pedido</button>
            </div>
        </div>
        <div id="formulario-envio" style="margin-top:40px; border-top:2px solid #222; padding-top:30px;"></div>
    `;
}

// ================= FORMULARIO =================
function mostrarFormulario() {
    const contenedor = document.getElementById("formulario-envio");
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="card-formulario">
            <h3 style="margin-bottom:20px;">DATOS DE ENVÍO</h3>
            <div style="display:flex; flex-direction:column; gap:15px;">
                <input type="text" id="nombre" placeholder="Nombre completo">
                <input type="tel" id="telefono" placeholder="Teléfono de contacto">
                <textarea id="direccion" placeholder="Dirección exacta de entrega" rows="3"></textarea>
                <textarea id="referencia" placeholder="Referencia de la vivienda (opcional)" rows="2"></textarea>
                <button class="btn" onclick="enviarPedidoWhatsApp()">🚀 FINALIZAR Y ENVIAR POR WHATSAPP</button>
            </div>
        </div>
    `;

    contenedor.scrollIntoView({ behavior: "smooth" });
}

// ================= CONTADOR =================
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const totalItems = obtenerCarrito()
        .reduce((acc, item) => acc + item.cantidad, 0);

    contador.textContent = totalItems;
}

// ================= WHATSAPP =================
function enviarPedidoWhatsApp() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const referencia = document.getElementById("referencia").value.trim();

    if (!nombre || !telefono || !direccion) {
        mostrarNotificacion("Completa los campos obligatorios.");
        return;
    }

    let mensaje = `*NUEVO PEDIDO - AXIS BIT*\n`;
    mensaje += `------------------------------\n`;

    let total = 0;

    carrito.forEach(item => {
        const sub = item.precio * item.cantidad;
        total += sub;

        mensaje += `○ *${item.nombre}*\n`;
        mensaje += `   ${item.cantidad} x ${formatearPrecio(item.precio)} = *${formatearPrecio(sub)}*\n`;
    });

    mensaje += `------------------------------\n`;
    mensaje += `*TOTAL A PAGAR: ${formatearPrecio(total)}*\n\n`;
    mensaje += `*CLIENTE:* ${nombre}\n`;
    mensaje += `*TELÉFONO:* ${telefono}\n`;
    mensaje += `*DIRECCIÓN:* ${direccion}\n`;

    if (referencia) {
        mensaje += `*REFERENCIA:* ${referencia}\n`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// ================= NOTIFICACIÓN =================
function mostrarNotificacion(texto) {
    const notif = document.createElement("div");
    notif.textContent = texto;
    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.background = "#111";
    notif.style.border = "1px solid #E67E22";
    notif.style.padding = "12px 20px";
    notif.style.color = "#fff";
    notif.style.zIndex = "9999";
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";

    document.body.appendChild(notif);

    setTimeout(() => notif.style.opacity = "1", 10);
    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    mostrarCarrito();
});
