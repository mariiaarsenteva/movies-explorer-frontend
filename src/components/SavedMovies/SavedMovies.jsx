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


    const filterMovies = useCallback((movies, search, isCheck) => {
        return movies.filter((movie) => {
            if (search) {
                return movie.nameRU && movie.nameRU.toLowerCase().includes(search.toLowerCase());
            } else {
                return true; 
            }
        }).filter(movie => isCheck ? (movie && movie.duration <= 40) : true);
    }, []);
    const handleSearchMovies = (search) => {
        setFirstLogin(false);
        setSearchedMovie(search);
        setFilteredMovies(filterMovies(savedMovies, search, isCheck));
    };

    const toggleFilterShort = () => {
        setIsCheck((prevCheck) => {
            const newCheck = !prevCheck;
            setFirstLogin(false);
            setFilteredMovies(filterMovies(savedMovies, searchedMovie, newCheck));
            return newCheck;
        });
    };

    useEffect(() => {
        if (savedMovies.length === 0) {
            setFirstLogin(true);
        } else {
            setFirstLogin(false);
        }
        setFilteredMovies(filterMovies(savedMovies, searchedMovie, isCheck));
    }, [savedMovies, filterMovies, searchedMovie, isCheck]);




    return (
        <>
            <Header />
            <main className='saved-movies'>
                <SearchForm
                    isCheck={isCheck}
                    searchMovies={handleSearchMovies}
                    searchedMovie={searchedMovie}
                    savedMovies={savedMovies}
                    movies={savedMovies}
                    toggleFilterShort={toggleFilterShort}
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