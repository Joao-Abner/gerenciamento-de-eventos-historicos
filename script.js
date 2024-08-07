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

// Manipula eventos do form 'eventoForm'
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
      const response = await fetch("http://localhost:3000/events", {
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

// Requisição para o JSON server
fetch("http://localhost:3000/events")
  .then((response) => response.json())
  .then((data) => {
    const historicalEventsDiv = document.getElementById("historicalEvents");

    historicalEventsDiv.innerHTML = ""; // Limpa a div antes de adicionar novos dados

    // Cria um elemento de título e define seu conteúdo
    const titleElement = document.createElement("h1"); // Escolha o nível de título apropriado
    titleElement.textContent = "Eventos Históricos Adicionados"; // Substitua por seu título de identificação
    historicalEventsDiv.appendChild(titleElement); // Adiciona o título à div

    data.forEach((elemento) => {
      // Cria um container para cada elemento
      const elementoContainer = document.createElement("div");
      elementoContainer.classList.add("event-item");

      // Cria título, ano de entrada e descrição
      const titleElement = document.createElement("h3");
      titleElement.classList.add("event-title");
      titleElement.textContent = `Titulo: ${elemento.eventoFormDados.titulo}`;

      const yearInputElement = document.createElement("p");
      yearInputElement.classList.add("event-year");
      yearInputElement.textContent = `Ano do Evento: ${elemento.eventoFormDados.anoInput}`; // Ajuste aqui

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("event-description");
      descriptionElement.textContent = `Descrição: ${elemento.eventoFormDados.descricao}`;

      // Adiciona título, ano de entrada e descrição ao container
      elementoContainer.appendChild(titleElement);
      elementoContainer.appendChild(yearInputElement); // Adiciona o elemento de ano de entrada
      elementoContainer.appendChild(descriptionElement);

      // Adiciona botão de deleção
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn"; // Adiciona a classe 'delete-btn'
      deleteButton.textContent = "Deletar";
      deleteButton.onclick = () => handleDelete(elemento.id); // Implemente esta função
      elementoContainer.appendChild(deleteButton);

      // Adiciona o container à div principal
      historicalEventsDiv.appendChild(elementoContainer);
    });
  })
  .catch((error) => console.error("Erro ao carregar eventos:", error));

// função para deletar um item do json-server
function handleDelete(itemId) {
  fetch(`http://localhost:3000/events/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Remove o item da lista
        const itemToRemove = document.getElementById(`item-${itemId}`);
        itemToRemove.parentNode.removeChild(itemToRemove);
        console.log("Item deletado com sucesso.");
      } else {
        console.error("Erro ao deletar item:", response.statusText);
      }
    })
    .catch((error) => console.error("Erro ao deletar item:", error));
}

// Seleciona o botão de busca
const buttonSearchEvents = document.getElementById("search-events");

// Adiciona um event listener ao botão
buttonSearchEvents.addEventListener("click", function () {
  // Mostra o modal
  const modal = new bootstrap.Modal(
    document.getElementById("buscarEventoModal")
  );
  modal.show();
});

// Seleciona o elemento do formulário
const formularioBuscaEvento = document.getElementById("buscarEventoForm");

// Adiciona um event listener ao formulário
formularioBuscaEvento.addEventListener("submit", async (event) => {
  // Previne o comportamento padrão do formulário (recarrega a página)
  event.preventDefault();

  // Coleta o valor do campo de entrada
  const inputTexto = document.getElementById("buscarEventoInput").value;

  // Chama a função para buscar eventos históricos com o texto fornecido
  const eventos = await buscarEventosHistoricos(inputTexto);

  // Exibe os eventos na página ou em um modal, conforme necessário
  exibirEventosNaPagina(eventos);
});

// Função assíncrona para buscar eventos históricos
async function buscarEventosHistoricos(texto) {
  // Chave da API
  const apiKey = "RpA2AxVD+aYUC7zfMiDMEA==IdtUfJiaOgltBG0t";

  const url = `https://api.api-ninjas.com/v1/historicalevents?text=${encodeURIComponent(
    texto
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey, // Alterado para X-Api-Key
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Retorna os dados para manipulação posterior
  } catch (error) {
    console.error("Erro ao buscar eventos históricos:", error);
    return null;
  }
}

/// Função para exibir eventos na página
function exibirEventosNaPagina(eventos) {
  if (eventos && eventos.length > 0) {
    const container = document.getElementById("api-historicalEvents");
    container.innerHTML = ""; // Limpa o container antes de adicionar novos itens

    // Cria um elemento de título e define seu conteúdo
    const titleElement = document.createElement("h1");
    titleElement.textContent = "Eventos Históricos via API";
    container.insertBefore(titleElement, container.firstChild); // Insere o título como o primeiro filho

    eventos.forEach((evento) => {
      const eventoItem = document.createElement("div");
      eventoItem.className = "event-item"; // Usando 'event-item' para exibir os eventos

      // Cria e configura o título do evento
      const eventTitle = document.createElement("h3");
      eventTitle.className = "event-title";
      eventTitle.textContent = `Ano: ${evento.year} Mês: ${evento.month} Dia: ${evento.day}`;
      eventoItem.appendChild(eventTitle);

      // Cria e configura a descrição do evento
      const eventDescription = document.createElement("p");
      eventDescription.className = "event-description";
      eventDescription.textContent = `${evento.event}`;
      eventoItem.appendChild(eventDescription);

      // Cria o botão de deleção
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn"; // Adiciona a classe 'delete-btn'
      deleteButton.textContent = "Deletar";
      deleteButton.addEventListener("click", function () {
        // Adiciona o manipulador de eventos
        this.parentElement.remove(); // Remove o elemento pai (event-item)
      });

      // Adiciona o botão de deleção ao evento
      eventoItem.appendChild(deleteButton);

      // Adiciona o eventoItem ao container
      container.appendChild(eventoItem);
    });
    console.log("Eventos encontrados:", eventos);
    // Implemente a lógica de exibição conforme necessário
  } else {
    alert("Nenhum evento encontrado com o texto fornecido.");
  }
}
