const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const serie = params.get('serie');


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM4YmQ2NGRkOTI0MzZhOWQ2NDliMzY3OGEwM2E2YiIsIm5iZiI6MTcxOTMxMzM4Ni4yNTcxOTYsInN1YiI6IjY2N2FhMmU5NDU1MTA2NTBlZmEwYWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g6JQnv6gFnnFG3cKt80c267MgJqANtHh372SUYRUr4Q'
    }
};

let api = async (url, info) => {

    let response = await fetch(url, options)
    let data = await response.json()
    let results = data;

    // console.log(results)

    return results[info];

}

// https://api.themoviedb.org/3/movie/573435?language=pt-BR


let viewMovie = async (url) => {

    const section = document.getElementById('sec1');

    const content = document.createElement('div');
    content.classList = 'content';

    const background = document.createElement('div');
    background.classList = 'background';

    const conatiner = document.createElement('div');
    conatiner.classList = 'background-dark';


    background.appendChild(conatiner);
    content.appendChild(background)
    section.appendChild(content);


    // Obter imagem de fundo
    let response = await fetch('https://api.themoviedb.org/3/movie/' + id + '/images', options)
    let dataImg = await response.json()
    let results = dataImg['backdrops'];
    let filePath = results[0]['file_path']
    let imgUrl = 'https://image.tmdb.org/t/p/w500/' + filePath;
    const tagBackground = document.querySelector('.background');
    tagBackground.style = 'background-image: url(' + imgUrl + ')';






    // Obter o título
    const title = document.createElement('span');
    title.classList = 'movie-title';
    let infoTitle = await api(url, 'title')
    title.innerText = infoTitle;



    // Obter o poster
    const image = document.createElement('img');
    image.classList = 'movie-img';
    let infoImg = await api(url, 'poster_path');
    let imgPoster = 'https://image.tmdb.org/t/p/w500/' + infoImg;
    image.setAttribute('src', imgPoster);



    // Obter gêneros
    const spanGeneros = document.createElement('span');
    spanGeneros.classList = 'movie-genres'
    let generos = await api(url, 'genres')
    let vetorGeneros = []
    for (let i = 0; i < generos.length; i++) {
        vetorGeneros.push(generos[i]['name'])
    }
    spanGeneros.innerText = 'Filme de ';
    for (let i = 0; i < vetorGeneros.length; i++) {
        if (i < vetorGeneros.length - 2) {
            spanGeneros.innerText += vetorGeneros[i] + ', ';
        } else if (i == vetorGeneros.length - 2) {
            spanGeneros.innerText += vetorGeneros[i] + ' e ';
        } else {
            spanGeneros.innerText += vetorGeneros[i] + '.';
        }
    }



    // Obter o status lançado ou não
    const spanLancado = document.createElement('span');
    spanLancado.classList = 'movie-status'
    let status = await api(url, 'status')
    let dataLancamento = await api(url, 'release_date')
    if (status == 'Released') {
        spanLancado.innerText = 'Lançado em ' + dataLancamento.split('-').reverse().join('/')
    } else {
        spanLancado.innerText = 'Em breve'
    }



    // Obter descrição do filme
    const tagDescription = document.createElement('span');
    tagDescription.classList = 'movie-description';
    let description = await api(url, 'overview');
    tagDescription.innerHTML = description;





    const divText = document.createElement('div')
    divText.classList = 'container-text';


    divText.appendChild(title);
    divText.appendChild(spanGeneros);
    divText.appendChild(spanLancado);
    divText.appendChild(tagDescription);
    conatiner.appendChild(image);
    conatiner.appendChild(divText);

    document.title = infoTitle;

}

let viewSerie = async (url) => {

    const section = document.getElementById('sec1');

    const content = document.createElement('div');
    content.classList = 'content';

    const background = document.createElement('div');
    background.classList = 'background';

    const conatiner = document.createElement('div');
    conatiner.classList = 'background-dark';


    background.appendChild(conatiner);
    content.appendChild(background)
    section.appendChild(content);

    // Obter imagem de fundo
    let response = await fetch('https://api.themoviedb.org/3/tv/' + id + '/images', options)
    let dataImg = await response.json()
    let results = dataImg['backdrops'];
    let filePath = results[0]['file_path']
    let imgUrl = 'https://image.tmdb.org/t/p/w500/' + filePath;
    const tagBackground = document.querySelector('.background');
    tagBackground.style = 'background-image: url(' + imgUrl + ')';





    // Obter o título
    const title = document.createElement('span');
    title.classList = 'movie-title';
    let infoTitle = await api(url, 'name')
    title.innerText = infoTitle;



    // Obter o poster
    const image = document.createElement('img');
    image.classList = 'movie-img';
    let infoImg = await api(url, 'poster_path');
    let imgPoster = 'https://image.tmdb.org/t/p/w500/' + infoImg;
    if (infoImg) {
        image.setAttribute('src', imgPoster);
    } else {
        image.setAttribute('src', 'https://images.sftcdn.net/images/t_app-icon-s/p/95912911-0042-497c-8684-92f21813fabf/478169664/projetocine-filmes-series-logo');
    }



    // Obter gêneros
    const spanGeneros = document.createElement('span');
    spanGeneros.classList = 'movie-genres'
    let generos = await api(url, 'genres')
    let vetorGeneros = []
    for (let i = 0; i < generos.length; i++) {
        vetorGeneros.push(generos[i]['name'])
    }
    spanGeneros.innerText = 'Série de ';
    for (let i = 0; i < vetorGeneros.length; i++) {
        if (i < vetorGeneros.length - 2) {
            spanGeneros.innerText += vetorGeneros[i] + ', ';
        } else if (i == vetorGeneros.length - 2) {
            spanGeneros.innerText += vetorGeneros[i] + ' e ';
        } else {
            spanGeneros.innerText += vetorGeneros[i] + '.';
        }
    }



    // Obter o status lançado ou não
    const spanLancado = document.createElement('span');
    spanLancado.classList = 'movie-status'
    let status = await api(url, 'status')
    let dataLancamento = await api(url, 'first_air_date')
    if (status == 'Returning Series') {
        spanLancado.innerText = 'Lançado em ' + dataLancamento.split('-').reverse().join('/')
    } else if (status == 'Ended') {
        let dataTermino = (await api(url, 'last_air_date')).split('-').reverse().join('/');

        spanLancado.innerText = 'Foi lançada em ' + dataLancamento.split('-').reverse().join('/') + ' e se encerrou em ' + dataTermino;
    } else {
        spanLancado.innerText = 'Em breve'
    }

    // Obter total de episódios e temporadas
    const epsTemps = document.createElement('span');
    epsTemps.classList = 'number-seasons-episodes';
    let totalTemporadas = await api(url, 'number_of_seasons');
    let totalEpisodios = await api(url, 'number_of_episodes');
    epsTemps.innerHTML = 'A série possuí ' + totalTemporadas + ' temporadas e ' + totalEpisodios + ' episódios.'




    // Obter descrição
    const tagDescription = document.createElement('span');
    tagDescription.classList = 'movie-description';
    let description = await api(url, 'overview');
    tagDescription.innerHTML = description;





    // Obter temporadas

    let temporadas = await api(url, 'seasons');

    console.log(temporadas);

    temporadas.forEach(element => {
        const sec2 = document.querySelector('.sec2');
        const divTemporada = document.createElement('div')
        divTemporada.classList = 'div-season';

        const temporadaNome = document.createElement('span');
        temporadaNome.classList = 'name-of-season';
        temporadaNome.innerHTML = element['name'];

        const temporadaEps = document.createElement('span');
        temporadaEps.classList = 'eps-of-season';
        temporadaEps.innerHTML = element['episode_count'] + ' episódios ';

        const temporadaData = document.createElement('span');
        temporadaData.classList = 'date-of-season';
        if (element['air_date']) {
            temporadaData.innerHTML = 'Lançado em ' + (element['air_date']).split('-').reverse().join('/');
        } else {
            temporadaData.innerHTML = 'Data indisponível';
        }

        divTemporada.appendChild(temporadaNome);
        divTemporada.appendChild(temporadaEps);
        divTemporada.appendChild(temporadaData);
        sec2.appendChild(divTemporada);
    });





    const divText = document.createElement('div')
    divText.classList = 'container-text';


    divText.appendChild(title);
    divText.appendChild(spanGeneros);
    divText.appendChild(spanLancado);
    divText.appendChild(epsTemps);
    divText.appendChild(tagDescription);
    conatiner.appendChild(image);
    conatiner.appendChild(divText)

    document.title = infoTitle

}




if (serie) {
    viewSerie('https://api.themoviedb.org/3/tv/' + id + '?language=pt-BR');
} else {
    viewMovie('https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR');
}



