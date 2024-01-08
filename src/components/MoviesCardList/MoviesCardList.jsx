import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

export default function MoviesCardList({movies, isLoading, savedMovies, serverError, firstLogin}) {
    const { pathname } = useLocation()
    const [count, setCount] = useState('')
    const fact = movies.slice(0, count)
  
    function showCards() {
      const counter = { init: InitMoreMaxScreen, step: StepMaxScreen }
      if (window.innerWidth < MaxScreen) {
        counter.init = InitLessMaxScreen
        counter.step = StepMediumScreen
      }
      if (window.innerWidth < MediumScreen) {
        counter.init = InitMediumScreen
        counter.step = StepSmallScreen
      }
      if (window.innerWidth < SmallScreen) {
        counter.init = InitSmallScreen
        counter.step = StepSmallScreen
      }
      return counter
    }
  
    useEffect(() => {
      if (pathname === '/movies') {
        setCount(showCards().init)
        function printCardsForResize() {
          if (window.innerWidth >= StepMaxScreen) {
            setCount(showCards().init)
          }
          if (window.innerWidth < StepMaxScreen) {
            setCount(showCards().init)
          }
          if (window.innerWidth < MediumScreen) {
            setCount(showCards().init)
          }
          if (window.innerWidth < SmallScreen) {
            setCount(showCards().init)
          }
        }
        window.addEventListener('resize', printCardsForResize)
        return () => window.removeEventListener('resize', printCardsForResize)
      }
    }, [pathname, movies])
  
    function buttonMore() {
      setCount(count + showCards().step)
    }


    return (
        <section className='cards'>
            <ul className='cards__lists'>
            {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                //   addMovie={addMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    // onDelete={onDelete}
                    data={data}
                  />
                )
              }) : serverError ?
                <span className='cards__search-error'>«Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз»
                </span>
                : !firstLogin ?
                <span className='cards__saerch-error'>«Ничего не найдено»</span>
                : pathname === '/movies' ?
                <span className='cards__search-error'>«Выполните поиск, чтобы увидеть список фильмов»</span>
                :
                <span className='cards__search-error'>«Вы еще ничего не сохранили»</span>
        }
                {/* <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard /> */}

            </ul>

            <button className={`cards__button ${count >= movies.length && 'cards__button_hidden'}`} type='button' onClick={buttonMore}>Ещё</button>

        </section>
    )
}