import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useState } from 'react';
// import { useEffect } from 'react';
import apiMovies from '../../utils/MoviesApi';



export default function Movies({ setIsError, addMovie,  savedMovies }) {

  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstLogin, setFirstLogin] = useState(true)
  const [serverError, setServerError] = useState(false)


  const searchMovies = async (search) => {
    setIsLoading(true);
  
    const shorts = JSON.parse(localStorage.getItem('shorts') || '[]');
    const movie = JSON.parse(localStorage.getItem('movie') || '[]');
  
    try {
      let movies;
      // Проверяем есть ли данные в ЛС
      if (!localStorage.getItem('allmovies') || !localStorage.getItem('shorts') || !localStorage.getItem('movie')) {
        // Запрос на сервер
        movies = await apiMovies.getMovies();
        // Сохраняем в ЛС
        localStorage.setItem('allmovies', JSON.stringify(movies));
      } else {
        // Берём данные из ЛС
        movies = JSON.parse(localStorage.getItem('allmovies'));
      }
  
      setSearchedMovie(movie);
      setIsCheck(shorts);
      setAllMovies(movies);
      setFirstLogin(false);
      filterMovies(search || movie, shorts, movies);
      setServerError(false);
    } catch (err) {
      setServerError(true);
      console.error(`Ошибка при поиске ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const filterMovies = (search, isCheck, movies) => {
    setSearchedMovie(search);
    if (search !== undefined) {
      localStorage.setItem('movie', JSON.stringify(search));
    }
    localStorage.setItem('shorts', JSON.stringify(isCheck));
    localStorage.setItem('allmovies', JSON.stringify(movies));
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes((search || '').toLowerCase());
      return isCheck ? (searchName && movie.duration <= 40) : searchName;
    }));
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
