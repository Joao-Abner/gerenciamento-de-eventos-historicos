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
