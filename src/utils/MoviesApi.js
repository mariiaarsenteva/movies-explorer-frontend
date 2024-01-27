
class MoviesApi {
    constructor( options ) {
        this._url = options.BaseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject
    }
    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkResponse)
    }
    
    getMovies() {
        return this._request('/')
    }
    
}


//создаем экземпляр класса Api

const apiMovies = new MoviesApi({
    BaseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    //'https://api.nomoreparties.co/beatfilm-movies'//
});

export default apiMovies