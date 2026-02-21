// ================= HERO DINÁMICO =================
document.addEventListener("DOMContentLoaded", () => {

    const hero = document.getElementById("hero");

    if (hero) {

        const backgrounds = [
            "img/fondos/hero1.png",
            "img/fondos/hero2.png",
            "img/fondos/hero3.png"
        ];

        // Precarga de imágenes
        backgrounds.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        let current = 0;
        let intervalId = null;

        function cambiarFondo() {
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
        }

        function iniciarSlider() {
            if (!intervalId) {
                intervalId = setInterval(cambiarFondo, 4000);
            }
        }

        function detenerSlider() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        iniciarSlider();

        // Pausar cuando la pestaña no esté visible
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                detenerSlider();
            } else {
                iniciarSlider();
            }
        });
    }

});

// ================= DROPDOWN MENU =================
function toggleDropdown(event) {
    event.stopPropagation();

    const menu = document.getElementById("dropdownMenu");
    const button = event.currentTarget;

    if (!menu) return;

    const isOpen = menu.classList.toggle("show");

    if (button) {
        button.setAttribute("aria-expanded", isOpen);
    }
}

// Cerrar dropdown si se hace click fuera
document.addEventListener("click", function () {
    const menu = document.getElementById("dropdownMenu");
    const button = document.querySelector(".dropbtn");

    if (menu && menu.classList.contains("show")) {
        menu.classList.remove("show");
        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
    }
});
