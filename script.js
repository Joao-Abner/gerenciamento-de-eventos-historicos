document.addEventListener("DOMContentLoaded", function () {
  // Função para alternar a visibilidade do campo de pesquisa
  function toggleSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.type = searchInput.type === "hidden" ? "text" : "hidden";
  }

  // Adiciona o evento de clique ao botão de pesquisa
  const searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.addEventListener("click", toggleSearch);
  }

  // Controla a animação do menu lateral esquerdo
  const menuButton = document.querySelector(".menu-button");
  const menuLateralEsquerdo = document.querySelector(".menu-lateral-esquerdo");

  if (menuButton && menuLateralEsquerdo) {
    menuButton.addEventListener("click", function () {
      menuLateralEsquerdo.classList.toggle("oculto");
    });
  }

  // Gerencia a classe ativa ao botão clicado
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

// função com o Jquery para o modal
$(function () {
  // Encontre o botão "Novo Evento" no menu esquerdo
  $(".new-event-button").on("click", function () {
    // Abra o modal
    $("#novoEventoModal").modal("show");
  });
});

// Requisição para o API ninjas
// const apiKey = "";
// const apiUrl = `https://api.api-ninjas.com/v1/historicalevents?key=${apiKey}`;

// fetch(apiUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // Verifica os dados no console
//     displayHistoricalEvents(data);
//   })
//   .catch((error) => console.error("Erro:", error));

// function displayHistoricalEvents(data) {
//   const eventsContainer = document.getElementById("historicalEvents");
//   data.forEach((event) => {
//     const eventElement = document.createElement("p");
//     eventElement.textContent = `${event.name}: ${event.description}`; // Ajuste conforme a estrutura dos seus dados
//     eventsContainer.appendChild(eventElement);
//   });
// }
