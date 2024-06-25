$(function () {
  // Função para alternar a visibilidade do campo de pesquisa
  function toggleSearch() {
    const searchInput = $("#searchInput");
    searchInput.prop(
      "type",
      searchInput.prop("type") === "hidden" ? "text" : "hidden"
    );
  }

  // Adiciona o evento de clique ao botão de pesquisa
  $(".search-button").on("click", toggleSearch);

  // Controla a animação do menu lateral esquerdo
  $(".menu-button").on("click", function () {
    $(".menu-lateral-esquerdo").toggleClass("oculto");
  });

  // Gerencia a classe ativa ao botão clicado
  $(".new-event-button,.star-button,.menu-all-button").on("click", function () {
    // Remove a classe active de todos os botões
    $(".new-event-button,.star-button,.menu-all-button").removeClass("active");
    // Adiciona a classe active ao botão clicado
    $(this).addClass("active");
  });

  // Função para abrir o modal "Novo Evento"
  $(".new-event-button").on("click", function () {
    // Abra o modal
    $("#novoEventoModal").modal("show");
  });
});

// transição menu-lateral esquerdo
document
  .querySelector(".menu-lateral-esquerdo")
  .addEventListener("click", function () {
    this.classList.toggle("oculto");
  });

// Função para validar a descrição, permitindo apenas letras, números e espaços
function validaDescrizao(descricao) {
  const regex = /^[A-Za-z0-9\s]+$/;
  return regex.test(descricao);
}

document
  .getElementById("eventoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Validações personalizadas
    const titulo = document.getElementById("eventoTitulo").value.trim();
    const anoInput = document.getElementById("eventoAno").value.trim();
    const descricao = document.getElementById("eventoDescricao").value.trim();

    // Verifica se o ano é um número
    if (!isNaN(anoInput)) {
      const anoNumero = parseFloat(anoInput);
      // Usa Math.sign para verificar se o ano é negativo
      if (Math.sign(anoNumero) === -1 && descricao.trim() === "") {
        alert(
          "Eventos históricos podem ter anos negativos, mas é necessário fornecer uma descrição."
        );
        return false; // Retorna false para impedir a submissão do formulário
      }
    } else {
      alert("Por favor, insira um ano válido.");
      return false; // Retorna false para impedir a submissão do formulário
    }

    // Valida a descrição
    if (!validaDescrizao(descricao)) {
      document.querySelector(".errormsg").style.display = "block"; // Mostra a mensagem de erro
      return false; // Retorna false para impedir a submissão do formulário
    }

    // Se todas as validações passarem
    console.log("Formulário válido");

    // Armazena como um único objeto
    const eventoFormDados = {
      titulo,
      anoInput,
      descricao,
    };

    localStorage.setItem("eventoFormDados", JSON.stringify(eventoFormDados));

    console.log("Dados do formulário armazenados no localStorage");

    try {
      const response = await fetch("http://localhost:3000/posts", {
        // Envia para a URL do JSON Server
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventoFormDados }),
      });
    } catch (error) {
      console.error(error.message);
    }
  });

// Função para ler e exibir os dados do localStorage
window.addEventListener("DOMContentLoaded", (event) => {
  function exibirDadosLocalStorage() {
    const dadosArmazenados = localStorage.getItem("eventoFormDados");
    if (dadosArmazenados) {
      const dadosObjeto = JSON.parse(dadosArmazenados);
      const divEventos = document.getElementById("historicalEvents");
      divEventos.innerHTML = ""; // Limpa a div antes de adicionar novos dados
      Object.entries(dadosObjeto).forEach(([chave, valor]) => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = `${chave}: ${valor}`;
        divEventos.appendChild(paragrafo);
      });
    } else {
      divEventos.innerHTML = "<p>Nenhum dado encontrado.</p>";
    }
  }

  exibirDadosLocalStorage();
});
