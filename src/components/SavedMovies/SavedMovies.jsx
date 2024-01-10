import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useState, useCallback, useEffect } from 'react';



export default function SavedMovies({ onDelete, savedMovies, setIsError }) {

    const [filteredMovies, setFilteredMovies] = useState(savedMovies)
    const [searchedMovie, setSearchedMovie] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const [firstLogin, setFirstLogin] = useState(true)

    const filter = useCallback((search, isCheck, movies) => {
        setSearchedMovie(search)
        setFilteredMovies(movies.filter((movie) => {
            const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
            return isCheck ? (searchName && movie.duration <= 40) : searchName
        }))
    }, [])

    function searchMovies(search) {
        setFirstLogin(false)
        filter(search, isCheck, savedMovies)
    }

    useEffect(() => {
        if (savedMovies.length === 0) {
            setFirstLogin(true)
        } else {
            setFirstLogin(false)
        }
        filter(searchedMovie, isCheck, savedMovies)
    }, [filter, savedMovies, isCheck, searchedMovie])

    function filterShort() {
        if (isCheck) {
            setIsCheck(false)
            setFirstLogin(false)
            filter(searchedMovie, false, savedMovies)
        } else {
            setIsCheck(true)
            setFirstLogin(false)
            filter(searchedMovie, true, savedMovies)
        }
    }

    return (
        <>
            <Header />
            <main className='saved-movies'>
                <SearchForm
                    isCheck={isCheck}
                    searchMovies={searchMovies}
                    searchedMovie={searchedMovie}
                    savedMovies={savedMovies}
                    movies={savedMovies}
                    filterShort={filterShort}
                    setIsCheck={setIsCheck}
                    setIsError={setIsError}
                />
                <MoviesCardList

                    movies={filteredMovies}
                    onDelete={onDelete}
                    firstLogin={firstLogin} />
            </main>
            <Footer />
        </>


    )
}