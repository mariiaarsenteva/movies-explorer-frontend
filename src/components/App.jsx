import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import Movies from "./Movies/Movies.jsx"
import SavedMovies from './SavedMovies/SavedMovies.jsx'
import Profile from "./Profile/Profile.jsx"
import Error from './Error/Error.jsx'
import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../components/App.css";
import { login, registration, } from "../utils/auth.js"

import apiMain from "../utils/MainApi.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"
import ProtectedPage from "./ProtectedPage/ProtectedPage.jsx"
import Preloader from "../components/Preloader/Preloader.jsx"

import SendContext from "../contexts/SendContext.js";
import ErrorContext from "../contexts/ErrorContext.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js"

export default function App() {
  const navigate = useNavigate()

  // стейты пользователя 
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)

  const [isEdit, setIsEdit] = useState(false)


  const [currentUser, setCurrentUser] = useState({}) //объект текущего юзера
  const [savedMovies, setSavedMovies] = useState([]) //массив фильмов
const [isSuccess, setIsSuccess] = useState(false)



// useEffect для инициализации пользователя
  useEffect(() => {
    const handleInitialUser = async () => {
      try {
         // Проверяем, авторизован ли пользователь
        if (localStorage.jwt) {
           // Получаем информацию о пользователе и фильмах
           const userData = await apiMain.getUserInfo(localStorage.jwt);
           const movieData = await apiMain.getMovies(localStorage.jwt);
          // Обновляем состояния
          setSavedMovies(movieData.reverse());
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckToken(false);
        } else {
          setLoggedIn(false);
          setIsCheckToken(false);
          localStorage.clear();
        }
      } catch (error) {
        console.error(`Ошибка авторизации при повторном входе: ${error}`);
        setIsCheckToken(false);
        localStorage.clear();
      }
    };
    handleInitialUser();
  }, [loggedIn]);

  const editUserData = useCallback((username, email) => {
    apiMain.setUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsEdit(true);
        setIsSend(false);
        setIsSuccess(true);
        
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при редактировании данных пользователя ${err}`);
        setIsSend(false);
        setIsSuccess(false);
      });
  },
    [setCurrentUser, setIsEdit, setIsError, setIsSend]
  );

    // Функция для убирания фильма из сохраненных
  const handleDislikeMovie = useCallback((deletemovieId) => {
    apiMain.removeMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== deletemovieId));
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`));
  }, [savedMovies]);

  // Функция для добавления фильма в сохраненные
  const handleLikeMovie = useCallback((data) => {
    const isLiked = savedMovies.some(movie => data.id === movie.movieId);
    if (isLiked) {
      const clickedMovie = savedMovies.find(movie => movie.movieId === data.id);
      handleDislikeMovie(clickedMovie._id);
    } else {
      apiMain.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }, [savedMovies, handleDislikeMovie]);


  function handleRegister(username, email, password) {
    setIsSend(true)
    registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          handleLogin(email, password) //логин сразу после регистрации 
            .catch((error) => {
              setIsError(true)
              console.error(`Ошибка при авторизации после регистрации ${error}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((error) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleLogin(email, password) {
    setIsSend(true)
    login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        window.scrollTo(0, 0)
      })
      .catch((error) => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleLogout() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="page">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>

              <Routes>
                <Route path="/signin"
                  element={
                    loggedIn ? <Navigate to='/movies' replace /> :
                      <Login name="signin" handleLogin={handleLogin} />
                  }
                />

                <Route path="/signup"
                  element={
                    loggedIn ? <Navigate to='/movies' replace /> :
                      <Register name="signup" handleRegister={handleRegister} />
                  }
                />

                <Route path="/" element={
                  <>
                    <Header name="home"  loggedIn={loggedIn}/>
                    <Main name="home" />
                    <Footer />
                  </>
                } />

                <Route path="/movies" element={
                  <ProtectedRoute
                    component={Movies} name="movies"
                    savedMovies={savedMovies}
                    addMovie={handleLikeMovie}
                    loggedIn={loggedIn}
                    setIsError={setIsError}
                  />

                } />

                <Route path="/saved-movies" element={
                  <ProtectedRoute
                    component={SavedMovies}
                    name="savedmovies"
                    element={ProtectedPage}
                    onDelete={handleDislikeMovie}
                    savedMovies={savedMovies}
                    loggedIn={loggedIn}
                    setIsError={setIsError} />



                } />

                <Route path="/profile" element={
                  <ProtectedRoute
                    component={Profile}
                    loggedIn={loggedIn}
                    onLogout={handleLogout}
                    editUserData={editUserData}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                    setIsError={setIsError}
                    isSuccess ={isSuccess}
                  />

                } />

                <Route path='*' element={
                  <>
                    <Error name='error' />
                  </>
                } />


              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      }
    </div>

  );
}
