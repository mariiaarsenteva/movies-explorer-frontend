import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import apiMovies from '../../utils/MoviesApi';



export default function Movies({ setIsError, addMovie,  savedMovies }) {

  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstLogin, setFirstLogin] = useState(true)
  const [serverError, setServerError] = useState(false)


  useEffect(() => {
    const fetchMovies = async () => {
      if (!localStorage.allmovies && !localStorage.shorts && !localStorage.movie) {
        try {
          setIsLoading(true);
          const res = await apiMovies.getMovies();
          setAllMovies(res);
          setIsCheck(false);
          setServerError(false);
          filterMovies(localStorage.movie, JSON.parse(localStorage.shorts), res);
        } catch (err) {
          setServerError(false);
          console.error(`Ошибка при поиске фильмов ${err}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        const movies = localStorage.allmovies ? JSON.parse(localStorage.allmovies) : [];
        const shorts = localStorage.shorts ? JSON.parse(localStorage.shorts) : [];
        const movie = localStorage.movie ? JSON.parse(localStorage.movie) : '';
        setServerError(false);
        setSearchedMovie(movie);
        setIsCheck(shorts);
        setAllMovies(movies);
        setFirstLogin(false);
        filterMovies(movie, shorts, movies);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    if (localStorage.searchedMovie && localStorage.isCheck && localStorage.allMovies) {
      const searchedMovieFromStorage = localStorage.searchedMovie;
      const isCheckFromStorage = localStorage.isCheck === 'true';
      const allMoviesFromStorage = JSON.parse(localStorage.allMovies);

      setSearchedMovie(searchedMovieFromStorage);
      setIsCheck(isCheckFromStorage);
      
      filterMovies(searchedMovieFromStorage, isCheckFromStorage, allMoviesFromStorage);
    }
  }, []);

  const filterMovies = (search, isCheck, movies) => {
    setSearchedMovie(search);
    localStorage.setItem('movie', JSON.stringify(search));
    localStorage.setItem('shorts', JSON.stringify(isCheck));
    localStorage.setItem('allmovies', JSON.stringify(movies));
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isCheck ? (searchName && movie.duration <= 40) : searchName;
    }));
  };

  const searchMovies = (search) => {
    if (allMovies.length === 0) {
      setIsLoading(true);
      apiMovies.getMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          setServerError(false);
          filterMovies(search, isCheck, res);
        })
        .catch(err => {
          setServerError(true);
          console.error(`Ошибка при поиске ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filterMovies(search, isCheck, allMovies);
    }
  };

  const toggleFilterShort = () => {
    if (isCheck) {
      setIsCheck(false);
      filterMovies(searchedMovie, false, allMovies);
      localStorage.setItem('shorts', JSON.stringify(false));
    } else {
      setIsCheck(true);
      filterMovies(searchedMovie, true, allMovies);
      localStorage.setItem('shorts', JSON.stringify(true));
    }
  };
  



  return (
    <>
      <Header />

      <main className='movies'>
        <SearchForm name='movies'
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          searchMovies={searchMovies}
          searchedMovie={searchedMovie}
          // filterShort={toggleFilterShort}
          setIsError={setIsError}
          movies={allMovies}
          toggleFilterShort={toggleFilterShort}
        />
        <MoviesCardList
          movies={filteredMovies}
          addMovie={addMovie}
          firstLogin={firstLogin}
          savedMovies={savedMovies}
          isLoading={isLoading}
          serverError={serverError}

        />
      </main>

      <Footer />
    </>
  )
}
