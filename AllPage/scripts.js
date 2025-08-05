const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM4YmQ2NGRkOTI0MzZhOWQ2NDliMzY3OGEwM2E2YiIsIm5iZiI6MTcxOTMxMzM4Ni4yNTcxOTYsInN1YiI6IjY2N2FhMmU5NDU1MTA2NTBlZmEwYWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g6JQnv6gFnnFG3cKt80c267MgJqANtHh372SUYRUr4Q'
    }
};

let api = async (url) => {

    let response = await fetch(url, options)
    let data = await response.json()
    let results = data['results'];

    return results;

}


let listMovies = async () => {

    // const navBar = document.querySelector('.links-nav');
    // const linkMovie = document.querySelector('.link-movie');
    // navBar.removeChild(linkMovie)
    const navBar = document.querySelector('.links-nav');
    const linkMovie = document.querySelector('.link-movie');
    navBar.removeChild(linkMovie)
    const iconSearch = document.createElement('i')
    iconSearch.classList = 'fa-solid fa-magnifying-glass'


    const divSearch = document.createElement('div');
    divSearch.classList = 'div-search'

    navBar.appendChild(divSearch)

    divSearch.appendChild(iconSearch)

    const input = document.createElement('input');
    input.setAttribute('type', 'text')
    input.classList = 'input-search'
    divSearch.appendChild(input)

    iconSearch.addEventListener('click', () => {
        input.style.width = '80%'
        input.style.backgroundColor = ' rgb(18, 18, 18)'
        input.style.borderBottom = 'solid 0.5px white'
        input.style.borderRadius = '2px'
        input.style.color = 'white'
        input.style.padding = '1%'
        input.focus()
    })

    input.addEventListener('blur', () => {
        input.style.width = '0%'
        input.style.backgroundColor = 'transparente'
        input.style.borderBottom = 'none'
        input.style.borderRadius = '0'
        input.style.color = 'transparente'
        input.style.padding = '0%'
    })





    document.addEventListener('DOMContentLoaded', () => {
        const inputSearch = document.querySelector('.input-search');
        const divAllMovies = document.querySelector('.div-all-movies');
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM4YmQ2NGRkOTI0MzZhOWQ2NDliMzY3OGEwM2E2YiIsIm5iZiI6MTcxOTMxMzM4Ni4yNTcxOTYsInN1YiI6IjY2N2FhMmU5NDU1MTA2NTBlZmEwYWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g6JQnv6gFnnFG3cKt80c267MgJqANtHh372SUYRUr4Q';

        async function fetchMovies() {
            let allMovies = [];
            for (let i = 1; i <= 50; i++) {
                try {
                    let response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${i}&sort_by=popularity.desc`, {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                    let data = await response.json();

                    if (data.results) {
                        data.results.forEach(element => {
                            allMovies.push([element.id, element.title.toLowerCase(), element.poster_path]);
                        });
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados da API:', error);
                }
            }
            return allMovies;
        }

        async function displayFilteredMovies(value) {
            let moviesToDisplay = [];

            if (value) {
                const movies = await fetchMovies();
                moviesToDisplay = movies.filter(movie => movie[1].startsWith(value));
            } else {
                moviesToDisplay = await fetchMovies();
            }

            divAllMovies.innerHTML = '';

            moviesToDisplay.forEach(([id, title, posterPath]) => {
                const cardMovie = document.createElement('div');
                cardMovie.classList = 'movie';

                const acessMovieLink = document.createElement('a');
                acessMovieLink.classList = 'acessMovieLink';
                acessMovieLink.setAttribute('href', `../ViewPage/index.html?id=${id}`);

                const image = document.createElement('img');
                image.classList = 'movie-img';
                let infoImg = 'https://image.tmdb.org/t/p/w500' + posterPath;
                image.setAttribute('src', infoImg);

                const titleElement = document.createElement('span');
                titleElement.classList = 'movie-title';
                titleElement.innerText = title;

                cardMovie.appendChild(image);
                cardMovie.appendChild(titleElement);
                acessMovieLink.appendChild(cardMovie);
                divAllMovies.appendChild(acessMovieLink);
            });
        }

        inputSearch.addEventListener('input', () => {
            let value = inputSearch.value.trim().toLowerCase();
            displayFilteredMovies(value);
        });

        displayFilteredMovies('');
    });










    const titleOfPage = document.querySelector('.title-of-page').innerText = 'Todos os Filmes'

    document.title = 'Todos os Filmes'

    const divAllMovies = document.createElement('div');
    divAllMovies.classList = 'div-all-movies';


    const sec1 = document.querySelector('.sec1');
    sec1.appendChild(divAllMovies);









    for (let i = 1; i < 50; i++) {

        let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=' + i + '&sort_by=popularity.desc'

        let movie = await api(url);

        movie.forEach(element => {

            let id = element['id'];

            const cardMovie = document.createElement('div');
            cardMovie.classList = 'movie';

            const acessMovieLink = document.createElement('a');
            acessMovieLink.classList = 'acessMovieLink';
            acessMovieLink.setAttribute('href', '../ViewPage/index.html?id=' + id)

            const image = document.createElement('img');
            image.classList = 'movie-img';
            let infoImg = 'https://image.tmdb.org/t/p/w500' + element['poster_path'];
            image.setAttribute('src', infoImg);

            const title = document.createElement('span');
            title.classList = 'movie-title';
            let infoTitle = element['title']
            title.innerText = infoTitle;

            cardMovie.appendChild(image);
            cardMovie.appendChild(title);
            acessMovieLink.appendChild(cardMovie)
            divAllMovies.appendChild(acessMovieLink);

        });

    }
}

let listSeries = async () => {

    const navBar = document.querySelector('.links-nav');
    const linkSerie = document.querySelector('.link-serie');
    navBar.removeChild(linkSerie)
    const iconSearch = document.createElement('i')
    iconSearch.classList = 'fa-solid fa-magnifying-glass'




    const divSearch = document.createElement('div');
    divSearch.classList = 'div-search'

    navBar.appendChild(divSearch)

    divSearch.appendChild(iconSearch)

    const input = document.createElement('input');
    input.setAttribute('type', 'text')
    input.classList = 'input-search'
    divSearch.appendChild(input)

    iconSearch.addEventListener('click', () => {
        input.style.width = '80%'
        input.style.backgroundColor = ' rgb(18, 18, 18)'
        input.style.borderBottom = 'solid 0.5px white'
        input.style.borderRadius = '2px'
        input.style.color = 'white'
        input.style.padding = '1%'
        input.focus()
    })

    input.addEventListener('blur', () => {
        input.style.width = '0%'
        input.style.backgroundColor = 'transparente'
        input.style.borderBottom = 'none'
        input.style.borderRadius = '0'
        input.style.color = 'transparente'
        input.style.padding = '0%'
    })





    const titleOfPage = document.querySelector('.title-of-page').innerText = 'Todas as Séries'

    document.title = 'Todas as Séries'

    const divAllMovies = document.createElement('div');
    divAllMovies.classList = 'div-all-movies';


    const sec1 = document.querySelector('.sec1');
    sec1.appendChild(divAllMovies);

    document.addEventListener('DOMContentLoaded', () => {
        const inputSearch = document.querySelector('.input-search');
        const divAllMovies = document.querySelector('.div-all-movies');
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM4YmQ2NGRkOTI0MzZhOWQ2NDliMzY3OGEwM2E2YiIsIm5iZiI6MTcxOTMxMzM4Ni4yNTcxOTYsInN1YiI6IjY2N2FhMmU5NDU1MTA2NTBlZmEwYWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g6JQnv6gFnnFG3cKt80c267MgJqANtHh372SUYRUr4Q';

        async function fetchMovies() {
            let allMovies = [];
            for (let i = 1; i <= 50; i++) {
                try {
                    let response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${i}&sort_by=popularity.desc`, {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    });
                    let data = await response.json();

                    if (data.results) {
                        data.results.forEach(element => {
                            allMovies.push([element.id, element.name.toLowerCase(), element.poster_path]);
                        });
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados da API:', error);
                }
            }
            return allMovies;
        }

        async function displayFilteredMovies(value) {
            let moviesToDisplay = [];

            if (value) {
                const movies = await fetchMovies();
                moviesToDisplay = movies.filter(movie => movie[1].startsWith(value));
            } else {
                moviesToDisplay = await fetchMovies();
            }

            divAllMovies.innerHTML = '';

            moviesToDisplay.forEach(([id, title, posterPath]) => {
                const cardMovie = document.createElement('div');
                cardMovie.classList = 'movie';

                const acessMovieLink = document.createElement('a');
                acessMovieLink.classList = 'acessMovieLink';
                acessMovieLink.setAttribute('href', '../ViewPage/index.html?id=' + id + '&serie=' + true)

                const image = document.createElement('img');
                image.classList = 'movie-img';
                let infoImg = 'https://image.tmdb.org/t/p/w500' + posterPath;
                image.setAttribute('src', infoImg);

                const titleElement = document.createElement('span');
                titleElement.classList = 'movie-title';
                titleElement.innerText = title;

                cardMovie.appendChild(image);
                cardMovie.appendChild(titleElement);
                acessMovieLink.appendChild(cardMovie);
                divAllMovies.appendChild(acessMovieLink);
            });
        }

        inputSearch.addEventListener('input', () => {
            let value = inputSearch.value.trim().toLowerCase();
            displayFilteredMovies(value);
        });

        displayFilteredMovies('');
    });

    for (let i = 1; i < 50; i++) {

        let url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=' + i + '&sort_by=popularity.desc'

        let movie = await api(url);

        movie.forEach(element => {

            let id = element['id'];

            const cardMovie = document.createElement('div');
            cardMovie.classList = 'movie';

            const acessMovieLink = document.createElement('a');
            acessMovieLink.classList = 'acessMovieLink';
            acessMovieLink.setAttribute('href', '../ViewPage/index.html?id=' + id + '&serie=' + true)

            const image = document.createElement('img');
            image.classList = 'movie-img';
            let infoImg = 'https://image.tmdb.org/t/p/w500' + element['poster_path'];
            if (element['poster_path']) {
                image.setAttribute('src', infoImg);
            } else {
                image.setAttribute('src', 'https://images.sftcdn.net/images/t_app-icon-s/p/95912911-0042-497c-8684-92f21813fabf/478169664/projetocine-filmes-series-logo');
            }

            const title = document.createElement('span');
            title.classList = 'movie-title';
            let infoTitle = element['name']
            title.innerText = infoTitle;

            cardMovie.appendChild(image);
            cardMovie.appendChild(title);
            acessMovieLink.appendChild(cardMovie)
            divAllMovies.appendChild(acessMovieLink);


        });

    }
}


if (id == 'movie') {
    listMovies();
} else {
    listSeries();
}