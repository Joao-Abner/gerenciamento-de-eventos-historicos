document.addEventListener("DOMContentLoaded", function () {
  // Função para alternar a visibilidade do campo de pesquisa
  function toggleSearch() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput.type === "hidden") {
      searchInput.type = "text";
    } else {
      searchInput.type = "hidden";
    }
  }

  // Adiciona o evento de clique ao botão de pesquisa
  const searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.addEventListener("click", toggleSearch);
  }
});

// animacao menu esquerdo
document.addEventListener("DOMContentLoaded", function () {
  var menuButton = document.querySelector(".menu-button");
  var menuLateralEsquerdo = document.querySelector(".menu-lateral-esquerdo");

  menuButton.addEventListener("click", function () {
    if (menuLateralEsquerdo.classList.contains("oculto")) {
      menuLateralEsquerdo.classList.remove("oculto");
    } else {
      menuLateralEsquerdo.classList.add("oculto");
    }
  });
});

//classe ativa ao botao clicado
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".new-event-button,.star-button,.menu-all-button"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove a classe active de todos os botões
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona a classe active ao botão clicado
      this.classList.add("active");
    });
  });
});
