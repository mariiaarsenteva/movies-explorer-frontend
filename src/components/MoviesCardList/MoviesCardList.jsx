import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MaxScreen,
  MediumScreen,
  SmallScreen,
  InitMoreMaxScreen,
  InitLessMaxScreen,
  InitMediumScreen,
  InitSmallScreen,
  StepMaxScreen,
  StepMediumScreen,
  StepSmallScreen
} from "../../utils/constants";

export default function MoviesCardList({ movies, isLoading, savedMovies, searchMovies, handleSearch, searchInput, serverError, firstLogin, addMovie, onDelete }) {
  const { pathname } = useLocation();
  const [count, setCount] = useState('');
  const isMoviePath = pathname === '/movies';
  const isSavedMoviePath = pathname === '/saved-movies';
  // const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      let initCount = InitMoreMaxScreen;
      if (window.innerWidth < MaxScreen) {
        initCount = InitLessMaxScreen;
      } else if (window.innerWidth < MediumScreen) {
        initCount = InitMediumScreen;
      } else if (window.innerWidth < SmallScreen) {
        initCount = InitSmallScreen;
      }
      setCount(initCount);
    };

    if (isMoviePath || isSavedMoviePath) {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMoviePath, isSavedMoviePath]);

  const handleMoreButtonClick = () => {
    setCount(count + (window.innerWidth < MediumScreen && window.innerWidth > SmallScreen
      ? StepSmallScreen
      : window.innerWidth < SmallScreen
        ? StepSmallScreen
        : window.innerWidth > MediumScreen && window.innerWidth < MaxScreen
          ? StepMediumScreen
          : StepMaxScreen
    ));
  };

  // const handleSearch = (searchTerm) => {
  //   if (searchTerm && !isSearched) {
  //     searchMovies(searchInput);
  //     setIsSearched(true);
  //   }
  // };

  // useEffect(() => {
  //   if (searchInput) {
  //     handleSearch(searchInput);
  //   }
  // }, [searchInput]);


  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {!isLoading && !serverError && (
        <ul className="cards__lists">
          {isMoviePath && movies.length > 0 && movies.slice(0, count).map(data => (
            <MoviesCard
              key={data.id}
              data={data}
              savedMovies={savedMovies}
              addMovie={addMovie}
              onDelete={onDelete}
            />
          ))}
          {isMoviePath && !isLoading && movies.length === 0 && (
            <p>{'Ничего не найдено'}</p>
          )}
          {isSavedMoviePath && movies.length > 0 && movies.map(data => (
            <MoviesCard
              key={data._id}
              data={data}
              onDelete={onDelete}
            />
          ))}
          {isSavedMoviePath && !isLoading && movies.length === 0 && (
            <p>Вы еще ничего не сохранили</p>
          )}
        </ul>
      )}
      {!isLoading && serverError && (
        <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
      )}
      {isMoviePath && !isLoading && movies.length > count && (
        <button
          className={`cards__button ${count >= movies.length ? 'cards__button_hidden' : ''}`}
          type="button"
          onClick={handleMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}