// import {baseUrl} from "./constants.js"

class MoviesApi {
    constructor({ options }) {
        this._url = options.baseUrl;
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
    baseUrl: 'http://localhost:3000',
});

export default apiMovies