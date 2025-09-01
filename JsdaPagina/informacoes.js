document.addEventListener("DOMContentLoaded", () => {
  // Atualiza ano do rodapé
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Seletores do popup
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const popupTitle = document.getElementById("popup-title");
  const popupIcon = document.getElementById("popup-icon");
  const popupClose = document.getElementById("popup-close");

  // Abrir popup (.btn ou .btn-info)
  document.querySelectorAll(".btn[data-info], .btn-info[data-info]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      // Texto detalhado
      popupText.textContent = btn.getAttribute("data-info");

      // Título → pega h2 ou h3 do card
      const titleEl = btn.closest(".info-card").querySelector("h2, h3");
      if (titleEl) popupTitle.textContent = titleEl.textContent;

      // Ícone → baseado no alt da imagem
      const img = btn.closest(".info-card").querySelector("img");
      if (img) {
        const alt = img.alt.toLowerCase();
        if (alt.includes("lei")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/942/942799.png"; // ⚖️
        } else if (alt.includes("compra") || alt.includes("venda")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/1170/1170678.png"; // 🛒
        } else if (alt.includes("socorro") || alt.includes("primeiros")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/2966/2966487.png"; // 🚑
        } else if (alt.includes("pet")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/616/616408.png"; // 🐾
        } else if (alt.includes("casamento")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/3643/3643046.png"; // 💍
        } else if (alt.includes("manuseio")) {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"; // 🧯
        } else {
          popupIcon.src = "https://cdn-icons-png.flaticon.com/512/565/565547.png"; // ℹ️ padrão
        }
      }

      popup.classList.add("show");
    });
  });

  // Fechar popup
  if (popupClose) {
    popupClose.addEventListener("click", () => popup.classList.remove("show"));
  }

  // Fechar ao clicar fora
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("show");
  });

  // Fechar com ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") popup.classList.remove("show");
  });
});