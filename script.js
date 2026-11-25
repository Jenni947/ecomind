
"use strict";

// =====================================
// ECOMINDI - INTERAÇÕES DA PLATAFORMA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // Ano automático no rodapé
    const footer = document.querySelector("footer");

    if (footer) {
        footer.innerHTML = `
            <p>© ${new Date().getFullYear()} EcoMindi.
            Todos os direitos reservados.</p>
        `;
    }

    // Navegação suave
    const links = document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Animação suave dos cards ao aparecerem
    const cards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        cards.forEach((card) => {
            observer.observe(card);
        });
    } else {
        cards.forEach((card) => {
            card.classList.add("visible");
        });
    }

    console.log("EcoMindi iniciado com sucesso! 🌱");

});
