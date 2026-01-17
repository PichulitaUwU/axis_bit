/* =========================
   PRODUCTO INDIVIDUAL
========================= */

// Obtener parámetros de la URL
function obtenerParametro(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

// Productos disponibles (puede crecer sin problema)
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
        nombre: "Black Panter",
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
        nombre: "Capitan América",
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

const contenedor = document.getElementById("productos");
const coleccionURL = obtenerParametro("coleccion");

// =========================
// MOSTRAR COLECCIONES
// =========================
if (contenedor && !coleccionURL) {
    const coleccionesUnicas = [...new Set(productos.map(p => p.coleccion))];

    coleccionesUnicas.forEach(c => {
        contenedor.innerHTML += `
            <div class="card">
                <h3 style="letter-spacing:0.15em; text-transform:uppercase;">
                    ${c.replace("-", " ")}
                </h3>
                <a href="productos.html?coleccion=${c}" class="btn" style="margin-top:20px; display:inline-block;">
                    Ver colección
                </a>
            </div>
        `;
    });
}

// =========================
// MOSTRAR PRODUCTOS POR COLECCIÓN
// =========================
if (contenedor && coleccionURL) {
    productos
        .filter(p => p.coleccion === coleccionURL)
        .forEach(p => {
            contenedor.innerHTML += `
                <div class="card">
                    <img src="${p.imagen}" alt="${p.nombre}" style="width:100%; margin-bottom:20px;">
                    <h3 style="letter-spacing:0.12em; text-transform:uppercase;">
                        ${p.nombre}
                    </h3>
                    <p style="color:#D1D1D1; font-size:14px;">
                        ${p.descripcion}
                    </p>
                    <p style="margin-top:10px;">
                        $${p.precio}
                    </p>
                    <a href="producto.html?id=${p.id}" class="btn" style="margin-top:20px; display:inline-block;">
                        Ver detalle
                    </a>
                </div>
            `;
        });
}

// =========================
// DETALLE DE PRODUCTO
// =========================
function mostrarProducto() {
    const id = parseInt(obtenerParametro("id"));
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    const detalle = document.getElementById("detalle-producto");
    if (!detalle) return;

    detalle.innerHTML = `
        <div class="producto-detalle">
            <img src="${producto.imagen}">
            <div class="info">
                <h1>${producto.nombre}</h1>
                <p class="precio">$${producto.precio}</p>
                <p>${producto.descripcion}</p>
                <button class="btn" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;
}

// Ejecutar
mostrarProducto();
