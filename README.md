# CineStream

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![TMDB](https://img.shields.io/badge/API-TMDB-01B4E4?logo=themoviedb&logoColor=white)

Plataforma de streaming simulada em HTML, CSS e JavaScript puro, consumindo a API do The Movie Database (TMDB).

## Funcionalidades

- **Hero dinâmico** na home: a cada acesso, um filme é sorteado entre os populares,
  com backdrop, título e sinopse carregados em tempo real — dificilmente se repete
- Carrosséis de filmes e séries populares com navegação por botões
- Página de listagem completa com busca por nome em tempo real
- Página de detalhes com pôster, backdrop, gêneros, data de lançamento e sinopse
- Para séries: listagem de temporadas com número de episódios e datas
- Navegação entre páginas via query params (`?id=` e `?serie=`)
- Animações CSS de entrada (slideIn e slideRight)

## Estrutura

| Pasta / Arquivo | Descrição |
|---|---|
| `index.html` | Home com hero dinâmico e carrosséis |
| `scripts.js` | Lógica da home |
| `style.css` | Estilos da home |
| `animation.css` | Animações globais (slideIn, slideRight) |
| `AllPage/` | Listagem completa de filmes ou séries |
| `ViewPage/` | Página de detalhes de filme ou série |

## Como executar

Abra o `index.html` diretamente no navegador ou use uma extensão como Live Server no VS Code.

> A aplicação consome a [API do TMDB](https://www.themoviedb.org/documentation/api). Para rodar localmente com sua própria chave, substitua o token Bearer nos arquivos `scripts.js` de cada pasta.

## Stack

- HTML5, CSS3, JavaScript ES6+ (sem frameworks)
- Fetch API com async/await
- CSS Grid, Flexbox e animações com @keyframes
- The Movie Database API (TMDB)
