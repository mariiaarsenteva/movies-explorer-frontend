class MainApi {
    constructor(options) {
        this._url = options.baseUrl;
    }


    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status)
    }


    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponse)
    }

    setUserInfo(username, email, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username,
                email: email
            })
        }).then(this._checkResponse)
    }

    getMovies(token) {
        return fetch(`${this._url}/movies`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponse)
    }

    addMovie(data, token) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                description: data.description,
                year: data.year,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            })
        }).then(this._checkResponse)
    }

    removeMovie(cardId, token) {
        return fetch(`${this._url}/movies/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponse)
    }
}

//создаем экземпляр класса Api

const apiMain = new MainApi({
    baseUrl: 'http://localhost:3001',
    // api.mariia.movies.nomoredomainsrocks.ru
});

export default apiMain