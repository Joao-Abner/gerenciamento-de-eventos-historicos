# Gerenciamento de Eventos Históricos

Este projeto tem como objetivo implementar progressivamente e de forma didática uma aplicação web sobre organizar e mostrar eventos importantes da história.

## Endereço de Deploy - GitHub Pages

`em desenvolvimento`

## Protótipo

`em desenvolvimento`

## Checklist

- [ ] Criar o repositório no GitHub com a estrutura do Gitflow, ou seja, branches main e develop.
- [ ] Usar componentes de algum framework CSS (Bootstrap, Materialize ou outro)
- [ ] Apresentar as telas com layout responsivo usando ou não algum framework CSS.
- [ ] Construir páginas web com o conceito de componentes.
- [ ] Criar o layout da aplicação com componentes, ou seja, o cabeçalho e rodapé precisam ser componentes.
- [ ] Usar pelo menos dois tipos de data-binding (Interpolation, Property Binding, Event Binding e Two Way Data Binding).
- [ ] Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output.
- [ ] Mapear componentes à rotas no módulo de rotas.
- [ ] Criar navegação entre páginas por meio de rotas.
- [ ] Passar dados entre componentes que representam diferentes telas via parâmetros de rotas.
- [ ] Validar campos do formulário com REGEX e apresentar os erros.
- [ ] Desabilitar o botão de submit enquanto o formulário está inválido.
- [ ] Fazer requisições a API com tratamento da resposta com Promises ou Observables.
- [ ] Cadastrar uma entidade no JSON Server.
- [ ] Apresentar uma lista de dados com a diretiva estrutural ngFor.
- [ ] Usar a diretiva ngIf
- [ ] Formatar a apresentação de dados com Pipes.
- [ ] Build e deploy da aplicação.

## Manual de execução
- Clonar o repositório com `git clone`
- Fazer checkout no branch `develop` que contém as modificações mais recentes
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode ou qualquer terminal do seu Sistema Operacional apontando para o diretório raiz do projeto 
- Instalar as dependências contidas no `package.json`
  - Comando: `npm i`
- (Opcional) Instalar o JSON Server globalmente disponível em `https://www.npmjs.com/package/json-server`
  - Comando: `npm i -g json-server` 
  - É opcional porque a dependência já vem cadastrada no arquivo `package.json` para instalação local na pasta `node_modules`
- Executar a API Fake (JSON Server) via um dos seguintes comandos: 
  - Execução via script registrado no `package.json`: `npm run json:server:routes` 
  - Ou via Execução explícita: `json-server --watch db.json --routes routes.json`
- O comando para execução do JSON Server deve ser aplicado no diretório raiz do projeto, ou seja, que contém o arquivo `db.json` e `routes.json`.
  - Por padrão, a aplicação JSON Server executa no endereço `localhost:3000`    
- Abrir um novo terminal pelo VSCode e então executar o projeto Angular
  - Comando: `ng s -o`
