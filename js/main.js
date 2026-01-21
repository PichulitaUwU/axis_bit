const hero = document.getElementById("hero");

if (hero) {
    const backgrounds = [
        "img/fondos/hero1.png",
        "img/fondos/hero2.png",
        "img/fondos/hero3.png"
    ];

    backgrounds.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    let current = 0;

    setInterval(() => {
        hero.classList.remove("uncover");
        hero.classList.add("reveal");

        setTimeout(() => {
            current = (current + 1) % backgrounds.length;
            hero.style.background = `
                linear-gradient(rgba(26,26,27,0.85), rgba(26,26,27,0.85)),
                url("${backgrounds[current]}") center/cover no-repeat
            `;

            hero.classList.remove("reveal");
            hero.classList.add("uncover");
        }, 1200);
    }, 4000);
}

// ===== DROPDOWN MENU =====
function toggleDropdown(event) {
    event.stopPropagation(); // evita que el click cierre el menú inmediatamente
    const menu = document.getElementById("dropdownMenu");
    menu.classList.toggle("show");
}

// Cerrar dropdown si se hace click fuera
document.addEventListener("click", function () {
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
        menu.classList.remove("show");
    }
});
