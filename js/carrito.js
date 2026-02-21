// ===== CONFIGURACIÓN WHATSAPP =====
const WHATSAPP_NUMERO = "593963177550"; 
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
    alert(`¡${producto.nombre} agregado al carrito! 🛒`);
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
    if(confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        mostrarCarrito();
        actualizarContador();
    }
}

// Mostrar carrito (Optimizado)
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

    let htmlContenido = "";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        htmlContenido += `
            <div class="item-carrito" style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 15px;">
                <img src="${item.imagen}" style="width: 80px; border-radius: 5px;">
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0; font-size: 1.1rem; text-transform: uppercase;">${item.nombre}</h3>
                    <p style="color: #aaa; margin: 5px 0;">$${item.precio.toFixed(2)} x ${item.cantidad}</p>
                    <p style="font-weight: bold;">Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar" style="background: none; border: 1px solid #ff4d4d; color: #ff4d4d; cursor: pointer; padding: 5px 10px; border-radius: 3px;">Eliminar</button>
            </div>
        `;
    });

    // Añadir resumen y controles
    htmlContenido += `
        <div class="resumen-final" style="margin-top: 30px; text-align: right;">
            <h2 style="font-size: 2rem;">Total: $${total.toFixed(2)}</h2>
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                <button onclick="vaciarCarrito()" class="btn-secundario">Vaciar Carrito</button>
                <button class="btn" onclick="mostrarFormulario()">Confirmar Pedido</button>
            </div>
        </div>
        <div id="formulario-envio" style="margin-top: 40px; border-top: 2px solid #222; padding-top: 30px;"></div>
    `;

    contenedor.innerHTML = htmlContenido;
}

// Mostrar formulario de envío
function mostrarFormulario() {
    const contenedor = document.getElementById("formulario-envio");
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="card-formulario" style="background: #111; padding: 25px; border-radius: 10px;">
            <h3 style="margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">DATOS DE ENVÍO</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <input type="text" id="nombre" placeholder="Nombre completo" style="padding: 12px; background: #222; border: 1px solid #444; color: white; border-radius: 5px;">
                <input type="tel" id="telefono" placeholder="Teléfono de contacto" style="padding: 12px; background: #222; border: 1px solid #444; color: white; border-radius: 5px;">
                <textarea id="direccion" placeholder="Dirección exacta de entrega" rows="3" style="padding: 12px; background: #222; border: 1px solid #444; color: white; border-radius: 5px; resize: none;"></textarea>
                <textarea id="referencia" placeholder="Referencia de la vivienda (ej: frente al parque)" rows="2" style="padding: 12px; background: #222; border: 1px solid #444; color: white; border-radius: 5px; resize: none;"></textarea>
                
                <button class="btn" onclick="enviarPedidoWhatsApp()" style="width: 100%; margin-top: 10px;">
                    🚀 FINALIZAR Y ENVIAR POR WHATSAPP
                </button>
            </div>
        </div>
    `;
    
    // Scroll suave hasta el formulario
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

// Contador carrito
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const totalItems = obtenerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
}

// Enviar pedido a WhatsApp
function enviarPedidoWhatsApp() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const referencia = document.getElementById("referencia").value.trim();

    if (!nombre || !telefono || !direccion) {
        alert("Por favor, completa los campos obligatorios para el envío.");
        return;
    }

    let mensaje = `🛍️ *NUEVO PEDIDO - AXIS BIT*\n`;
    mensaje += `--------------------------\n`;
    
    let total = 0;
    carrito.forEach(item => {
        const sub = item.precio * item.cantidad;
        total += sub;
        mensaje += `✅ *${item.nombre}*\n   ${item.cantidad} x $${item.precio.toFixed(2)} = *$${sub.toFixed(2)}*\n`;
    });

    mensaje += `--------------------------\n`;
    mensaje += `💰 *TOTAL A PAGAR: $${total.toFixed(2)}*\n\n`;
    mensaje += `👤 *CLIENTE:* ${nombre}\n`;
    mensaje += `📞 *TELÉFONO:* ${telefono}\n`;
    mensaje += `📍 *DIRECCIÓN:* ${direccion}\n`;

    if (referencia) {
        mensaje += `🏠 *REF:* ${referencia}\n`;
    }

    mensaje += `\n_Enviado desde el sitio web de Axis Bit_`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    mostrarCarrito();
});
