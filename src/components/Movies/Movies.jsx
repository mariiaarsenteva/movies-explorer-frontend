import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import apiMovies from '../../utils/MoviesApi';



export default function Movies({ setIsError, addMovie, savedMovies }) {

  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstLogin, setFirstLogin] = useState(true)
  const [serverError, setServerError] = useState(false)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isCheck))
    localStorage.setItem('allmovies', JSON.stringify(movies))
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      apiMovies.getMovies()
        .then((res) => {
          setAllMovies(res)
          setIsCheck(false)
          setServerError(false)
          filter(search, isCheck, res)
        })
        .catch(err => {
          setServerError(true)
          console.error(`Ошибка при поиске ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filter(search, isCheck, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies)
      const isCheck = JSON.parse(localStorage.shorts)
      const search = JSON.parse(localStorage.movie)
      setServerError(false)
      setSearchedMovie(search)
      setIsCheck(isCheck)
      setAllMovies(movies)
      setFirstLogin(false)
      filter(search, isCheck, movies)
    }
  }, [filter])

  function filterShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(searchedMovie, false, allMovies)
      localStorage.setItem('shorts', JSON.stringify(false))
    } else {
      setIsCheck(true)
      filter(searchedMovie, true, allMovies)
      localStorage.setItem('shorts', JSON.stringify(true))
    }
  }


  return (
    <>
      <Header />

      <main className='movies'>
        <SearchForm name='movies'
          isCheck={isCheck}
          searchMovies={searchMovies}
          searchedMovie={searchedMovie}
          filterShort={filterShort}
          setIsError={setIsError}
          movies={allMovies}
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
