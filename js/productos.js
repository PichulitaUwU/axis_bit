/* ==========================================================
   PRODUCTOS.JS - Lógica de Catálogo y Detalle de Producto
   ========================================================== */

// ================= BASE DE DATOS =================
const productos = [
    {
        id: 1,
        nombre: "Adam Warlock",
        descripcion: "Resultado de una evolución consciente, diseñado para brillar con luz propia y dominar su propio destino cósmico.",
        precio: 9.99,
        imagen: "img/productos/camisa1.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 2,
        nombre: "Angela",
        descripcion: "Existencia forjada fuera de todo linaje impuesto; una voluntad que no reconoce deudas y solo obedece a su propio código.",
        precio: 9.99,
        imagen: "img/productos/camisa2.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 3,
        nombre: "Black Panther",
        descripcion: "Autoridad silenciosa que nace de la raíz y se protege con blindaje; soberanía absoluta sobre el territorio personal.",
        precio: 9.99,
        imagen: "img/productos/camisa3.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 4,
        nombre: "Black Widow",
        descripcion: "Presencia que fluye sin dejar rastro, donde la máxima eficiencia reside en la capacidad de ser invisible hasta el momento del impacto.",
        precio: 9.99,
        imagen: "img/productos/camisa4.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 5,
        nombre: "Blade",
        descripcion: "Naturaleza híbrida que encuentra su equilibrio en el conflicto; la maestría de convertir la propia sombra en una herramienta de precisión.",
        precio: 9.99,
        imagen: "img/productos/camisa5.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 6,
        nombre: "Capitán América",
        descripcion: "El peso de una convicción que no cede; un centro de gravedad inamovible frente al colapso de cualquier sistema exterior.",
        precio: 9.99,
        imagen: "img/productos/camisa6.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    },
    {
        id: 7,
        nombre: "Cloak and Dagger",
        descripcion: "Convergencia de fuerzas opuestas; la comprensión de que el vacío y la luz son fragmentos de una misma unidad indivisible.",
        precio: 17.90,
        imagen: "img/productos/camisa7.png",
        categoria: "camiseta",
        coleccion: "marvel-rivals"
    }
];

// ================= UTILIDADES =================
function obtenerParametro(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

function formatearPrecio(valor) {
    return `$${valor.toFixed(2)}`;
}

function capitalizar(texto) {
    return texto
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}

// ================= CATÁLOGO =================
function renderizarCatalogo() {
    const contenedor = document.getElementById("productos");
    const tituloSeccion = document.getElementById("titulo-coleccion");
    const coleccionURL = obtenerParametro("coleccion");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (!coleccionURL) {
        const coleccionesUnicas = [...new Set(productos.map(p => p.coleccion))];
        if (tituloSeccion) tituloSeccion.innerText = "Nuestras Colecciones";

        coleccionesUnicas.forEach(col => {
            contenedor.innerHTML += `
                <div class="card">
                    <h3 style="text-transform:uppercase; letter-spacing:0.15em;">
                        ${capitalizar(col)}
                    </h3>
                    <a href="productos.html?coleccion=${col}" class="btn" style="margin-top:20px; display:inline-block;">
                        Explorar Colección
                    </a>
                </div>
            `;
        });

    } else {
        const filtrados = productos.filter(p => p.coleccion === coleccionURL);

        if (tituloSeccion) {
            tituloSeccion.innerText = capitalizar(coleccionURL).toUpperCase();
        }

        if (filtrados.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron productos en esta colección.</p>";
            return;
        }

        filtrados.forEach(p => {
            contenedor.innerHTML += `
                <div class="card">
                    <img src="${p.imagen}" alt="${p.nombre}">
                    <h3 style="margin-top:15px; text-transform:uppercase;">
                        ${p.nombre}
                    </h3>
                    <p style="color:#aaa; font-size:0.9rem; margin:10px 0;">
                        ${p.descripcion.substring(0, 80)}...
                    </p>
                    <p style="font-weight:bold; font-size:1.2rem;">
                        ${formatearPrecio(p.precio)}
                    </p>
                    <a href="producto.html?id=${p.id}" class="btn" style="margin-top:15px; display:inline-block;">
                        Ver Detalle
                    </a>
                </div>
            `;
        });
    }
}

// ================= DETALLE =================
function renderizarDetalle() {
    const contenedorDetalle = document.getElementById("detalle-producto");
    const idURL = obtenerParametro("id");

    if (!contenedorDetalle || !idURL) return;

    const producto = productos.find(p => p.id === parseInt(idURL));

    if (!producto) {
        contenedorDetalle.innerHTML = `
            <h2>Producto no encontrado</h2>
            <a href="productos.html" class="btn" style="margin-top:20px; display:inline-block;">
                Volver a la tienda
            </a>
        `;
        return;
    }

    contenedorDetalle.innerHTML = `
        <div class="producto-layout" style="display:flex; gap:40px; flex-wrap:wrap; align-items:center;">
            
            <div class="producto-imagen" style="flex:1; min-width:300px;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; border-radius:15px;">
            </div>

            <div class="producto-info" style="flex:1; min-width:300px;">
                <h1 style="font-size:2.5rem; text-transform:uppercase;">
                    ${producto.nombre}
                </h1>

                <p style="font-size:1.5rem; margin:20px 0;">
                    ${formatearPrecio(producto.precio)}
                </p>

                <p style="line-height:1.6; color:#d1d1d1;">
                    ${producto.descripcion}
                </p>
                
                <div class="compra-acciones" style="margin-top:30px;">
                    <button class="btn" onclick="agregarAlCarritoPorId(${producto.id})">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ================= PUENTE CON CARRITO =================
function agregarAlCarritoPorId(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    if (typeof agregarAlCarrito === "function") {
        agregarAlCarrito(producto);
    } else {
        console.error("No se encontró la lógica del carrito.");
    }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo();
    renderizarDetalle();
});
