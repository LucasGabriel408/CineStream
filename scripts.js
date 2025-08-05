// Rodar no prompt para baixar a biblioteca
// npm install node-fetch@2 --save








const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWM4YmQ2NGRkOTI0MzZhOWQ2NDliMzY3OGEwM2E2YiIsIm5iZiI6MTcxOTMxMzM4Ni4yNTcxOTYsInN1YiI6IjY2N2FhMmU5NDU1MTA2NTBlZmEwYWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g6JQnv6gFnnFG3cKt80c267MgJqANtHh372SUYRUr4Q'
    }
};








let api = async (url, info, element) => {

    let response = await fetch(url, options)
    let data = await response.json()
    let results = data['results'];

    // console.log(results)

    return results[element][info];
   


}
// api('https://api.themoviedb.org/3/tv/popular?language=pt-BR')












// https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US
const backgroundSec1 = document.querySelector('.background');
const containerTitle = document.querySelector('.background-dark')



let imageBackground = async (url) => {
    let dataBaseIds = []
    for (let i = 0; i < 20; i++) {
        let id = await api(url, 'id', i);
        dataBaseIds.push(id);
    }

    let num = Math.floor(Math.random() * 19);
    let id = 0;
   
    if (num != 0) {
        id = dataBaseIds[num];
    } else {
        id = dataBaseIds[num] + 1;
    }

    let urlBackImg = 'https://api.themoviedb.org/3/movie/'+id+'/images'


    let response = await fetch(urlBackImg, options)
    let data = await response.json()
    let results = data['backdrops'];
    


    let numImg = Math.floor(Math.random() * 7);

    let filePath = results[numImg]['file_path']
    let imgUrl = 'https://image.tmdb.org/t/p/w500/' + filePath;


    const image = document.createElement('img')
    image.classList = 'img-of-trailer';
    image.setAttribute('src', imgUrl)
    backgroundSec1.appendChild(image)



    const tagTitleTrailer = document.createElement('span')
    tagTitleTrailer.classList = 'title-of-trailer';
    let titleTrailer = await api(url, 'title', num);
    tagTitleTrailer.innerText = titleTrailer;
    containerTitle.appendChild(tagTitleTrailer);
   

    const tagDescriptionTrailer = document.createElement('span');
    tagDescriptionTrailer.classList = 'description-of-trailer';
    let descriptionTrailer = await api(url, 'overview', num);
    tagDescriptionTrailer.innerText = descriptionTrailer;
    containerTitle.appendChild(tagDescriptionTrailer);
   

    const btnAcess = document.createElement('button');
    btnAcess.classList = 'btn-info-trailer';
    btnAcess.setAttribute('type', 'button')
    btnAcess.innerText = 'Acessar';
    containerTitle.appendChild(btnAcess);

    btnAcess.addEventListener('click', () => {
        setTimeout(() => {
            window.location.href = 'ViewPage/index.html?id='+id;
        }, 100);
    })
   
}




imageBackground('https://api.themoviedb.org/3/movie/popular?language=pt-BR')






const divPopularMovies = document.querySelector('.div-popular-movies');

const btnScrollLeftMovie = document.createElement('button');
const btnScrollRightMovie = document.createElement('button');

btnScrollLeftMovie.classList = 'left-arrow-bnt'
btnScrollRightMovie.classList = 'right-arrow-bnt';

btnScrollLeftMovie.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
btnScrollRightMovie.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

btnScrollLeftMovie.addEventListener('click', () => {
    document.querySelector('.div-popular-movies').scrollBy({
        left: -300,
        behavior: 'smooth'
    })
})

btnScrollRightMovie.addEventListener('click', () => {
    document.querySelector('.div-popular-movies').scrollBy({
        left: 300,
        behavior: 'smooth'
    })
})




let listMovies = async (url, q) => {

    divPopularMovies.appendChild(btnScrollLeftMovie);

    for (let i = 1; i < q; i++) {
        const divMovie = document.createElement('div');
        divMovie.classList = 'movie';

        let id = await api(url, 'id', i);


        const acessMovieLink = document.createElement('a');
        acessMovieLink.classList = 'acessMovieLink';
        acessMovieLink.setAttribute('href', 'ViewPage/index.html?id='+id)




        // Imagem
        const image = document.createElement('img');
        image.classList = 'movie-img';
        let infoImg = await api(url, 'poster_path', i);
        let imgUrl = 'https://image.tmdb.org/t/p/w500/' + infoImg;
        image.setAttribute('src', imgUrl);








        // Título
        const title = document.createElement('span');
        title.classList = 'movie-title';
        let infoTitle = await api(url, 'title', i)
        title.innerText = infoTitle;







       




        divMovie.appendChild(image);
        divMovie.appendChild(title);
        acessMovieLink.appendChild(divMovie)
        divPopularMovies.appendChild(acessMovieLink);
    }

    divPopularMovies.appendChild(btnScrollRightMovie);

};
listMovies('https://api.themoviedb.org/3/movie/popular?language=pt-BR', 20)










const divPopularSeries = document.querySelector('.div-popular-series');

const btnScrollLeftSerie = document.createElement('button');
const btnScrollRightSerie = document.createElement('button');

btnScrollLeftSerie.classList = 'left-arrow-bnt'
btnScrollRightSerie.classList = 'right-arrow-bnt';

btnScrollLeftSerie.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
btnScrollRightSerie.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

btnScrollLeftSerie.addEventListener('click', () => {
    document.querySelector('.div-popular-series').scrollBy({
        left: -300,
        behavior: 'smooth'
    })
})


btnScrollRightSerie.addEventListener('click', () => {
    document.querySelector('.div-popular-series').scrollBy({
        left: 300,
        behavior: 'smooth'
    })
})






let listSeries = async (url, q) => {
    divPopularSeries.appendChild(btnScrollLeftSerie);

    for (let i = 1; i < q; i++) {
        const divSerie = document.createElement('div');
        divSerie.classList = 'serie';

        let id = await api(url, 'id', i);

        const acessMovieLink = document.createElement('a');
        acessMovieLink.classList = 'acessMovieLink';
        acessMovieLink.setAttribute('href', 'ViewPage/index.html?id='+id+'&serie='+true)





        // Imagem
        const image = document.createElement('img');
        image.classList = 'serie-img';
        let infoImg = await api(url, 'poster_path', i);
        let imgUrl = 'https://image.tmdb.org/t/p/w500/' + infoImg;
        image.setAttribute('src', imgUrl);








        // Título
        const title = document.createElement('span');
        title.classList = 'serie-title';
        let infoTitle = await api(url, 'name', i)
        title.innerText = infoTitle;











       




        divSerie.appendChild(image);
        divSerie.appendChild(title);
        acessMovieLink.appendChild(divSerie)
        divPopularSeries.appendChild(acessMovieLink);
    }

    divPopularSeries.appendChild(btnScrollRightSerie);

};
listSeries('https://api.themoviedb.org/3/tv/popular?language=pt-BR', 20)











const divAllMovies = document.querySelector('.all-movies')
const divAllSeries = document.querySelector('.all-series')

let listAllMovies = async (url) => {
    for (let i = 0; i < 8; i++) {
        const cardMovie = document.createElement('div');
        cardMovie.classList = 'movie';

        let id = await api(url, 'id', i)

        const acessMovieLink = document.createElement('a');
        acessMovieLink.classList = 'acessMovieLink';
        acessMovieLink.setAttribute('href', 'ViewPage/index.html?id=' + id)

        const image = document.createElement('img');
        image.classList = 'movie-img';
        let infoImg = await api(url, 'poster_path', i);
        let imgUrl = 'https://image.tmdb.org/t/p/w500/' + infoImg;
        image.setAttribute('src', imgUrl);

        const title = document.createElement('span');
        title.classList = 'movie-title';
        let infoTitle = await api(url, 'title', i)
        title.innerText = infoTitle;

        cardMovie.appendChild(image);
        cardMovie.appendChild(title);
        acessMovieLink.appendChild(cardMovie)
        divAllMovies.appendChild(acessMovieLink);
    }
}

listAllMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=2&sort_by=popularity.desc')



let listAllSeries = async (url) => {
    for (let i = 0; i < 8; i++) {
        const cardSerie = document.createElement('div');
        cardSerie.classList = 'serie';

        let id = await api(url, 'id', i)

        const acessSerieLink = document.createElement('a');
        acessSerieLink.classList = 'acessSerieLink';
        acessSerieLink.setAttribute('href', 'ViewPage/index.html?id=' + id + '&serie=' + true)

        const image = document.createElement('img');
        image.classList = 'serie-img';
        let infoImg = await api(url, 'poster_path', i);
        let imgUrl = 'https://image.tmdb.org/t/p/w500/' + infoImg;
        image.setAttribute('src', imgUrl);

        const title = document.createElement('span');
        title.classList = 'serie-title';
        let infoTitle = await api(url, 'name', i)
        title.innerText = infoTitle;

        cardSerie.appendChild(image);
        cardSerie.appendChild(title);
        acessSerieLink.appendChild(cardSerie)
        divAllSeries.appendChild(acessSerieLink);
    }
}

listAllSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=2&sort_by=popularity.desc')





const btnAllMovies = document.querySelector('.view-all-movies');
const btnAllSeries = document.querySelector('.view-all-series');


btnAllMovies.addEventListener('click', () => {
    setTimeout(() => {
        window.location.href = 'AllPage/index.html?id=movie';
    }, 100);
})

btnAllSeries.addEventListener('click', () => {
    setTimeout(() => {
        window.location.href = 'AllPage/index.html?id=serie';
    }, 100);
})