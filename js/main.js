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
        // CUBRE
        hero.classList.remove("uncover");
        hero.classList.add("reveal");

        setTimeout(() => {
            // CAMBIA IMAGEN
            current = (current + 1) % backgrounds.length;
            hero.style.background = `
                linear-gradient(rgba(26,26,27,0.85), rgba(26,26,27,0.85)),
                url("${backgrounds[current]}") center/cover no-repeat
            `;

            // DESCUBRE
            hero.classList.remove("reveal");
            hero.classList.add("uncover");
        }, 1200); // coincide con el CSS

    }, 4000); // un poco más largo para respirar
}

