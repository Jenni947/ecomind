

"use strict";

/* =====================================
   ECOMINDI 2.0
   Interações e funcionalidades
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ANO AUTOMÁTICO
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MENU MOBILE
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // PESQUISA E FILTRO DE ESPÉCIES
  const searchInput = document.getElementById("speciesSearch");
  const categoryFilter = document.getElementById("speciesFilter");
  const speciesCards = document.querySelectorAll(".species-card");
  const noResults = document.getElementById("noResults");

  function normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function filterSpecies() {

    if (!searchInput || !categoryFilter) return;

    const searchTerm = normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    speciesCards.forEach(card => {

      const name = normalizeText(
        card.dataset.name || ""
      );

      const content = normalizeText(card.textContent);

      const category = card.dataset.category;

      const matchesSearch =
        name.includes(searchTerm) ||
        content.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "todas" ||
        category === selectedCategory;

      const visible = matchesSearch && matchesCategory;

      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterSpecies);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterSpecies);
  }

  // CALCULADORA DE CONSUMO DE ÁGUA
  const waterInput = document.getElementById("waterInput");
  const calculateButton = document.getElementById("calculateButton");
  const waterResult = document.getElementById("waterResult");
  const waterMessage = document.getElementById("waterMessage");

  function calculateWater() {

    if (!waterInput || !waterResult || !waterMessage) return;

    const dailyConsumption = Number(waterInput.value);

    if (
      waterInput.value.trim() === "" ||
      !Number.isFinite(dailyConsumption) ||
      dailyConsumption < 0 ||
      dailyConsumption > 10000
    ) {
      waterResult.textContent = "Valor inválido";
      waterMessage.textContent =
        "Informe um número entre 0 e 10.000 litros.";
      return;
    }

    const monthlyConsumption = dailyConsumption * 30;

    waterResult.textContent =
      monthlyConsumption.toLocaleString("pt-BR") + " litros";

    waterMessage.textContent =
      `Considerando ${dailyConsumption.toLocaleString("pt-BR")} litros por dia durante 30 dias.`;
  }

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateWater);
  }

  if (waterInput) {
    waterInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        calculateWater();
      }
    });
  }

  // NAVEGAÇÃO SUAVE
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

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

  // ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
  const animatedElements = document.querySelectorAll(
    ".feature-card, .species-card, .calculator-card, .knowledge-layout"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }

        });

      },
      { threshold: 0.12 }
    );

    animatedElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  }

  console.log("EcoMindi 2.0 iniciado com sucesso!");

});
