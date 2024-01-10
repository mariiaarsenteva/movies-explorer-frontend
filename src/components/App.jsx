import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import Movies from "./Movies/Movies.jsx"
import SavedMovies from './SavedMovies/SavedMovies.jsx'
import Profile from "./Profile/Profile.jsx"
import Error from './Error/Error.jsx'
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../components/App.css";
import { login, registration, } from "../utils/auth.js"

import apiMain from "../utils/MainApi.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"
import ProtectedPage from "./ProtectedPage/ProtectedPage.jsx"
import Preloader from "../components/Preloader/Preloader.js"

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



  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([apiMain.getUserInfo(localStorage.jwt), apiMain.getMovies(localStorage.jwt)])
        .then(([userData, movieData]) => {
          setSavedMovies(movieData.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка авторизации при повторном входе ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

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

  function editUserData(username, email) {
    setIsSend(true)
    apiMain.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function dislikeMovie(deletemovieId) {
    apiMain.removeMovie(deletemovieId, localStorage.jwt)  // делаем запрос delete по id фильма
      // если все успешно, то возравщаем массив ещё не удаленных фильмов
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function likeMovie(data) {
    const isLiked = savedMovies.find(element => data.id === element.movieId)
    const clickedMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isLiked) {
      dislikeMovie(clickedMovie[0]._id)
    } else {
      apiMain.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
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
                      <Login name="signin" onLogin={handleLogin} />
                  }
                />

                <Route path="/signup"
                  element={
                    loggedIn ? <Navigate to='/movies' replace /> :
                      <Register name="signup" onRegister={handleRegister} />
                  }
                />

                <Route path="/" element={
                  <>
                    <Header name="home" />
                    <Main name="home" />
                    <Footer />
                  </>
                } />

                <Route path="/movies" element={
                  <ProtectedRoute
                    component={Movies} name="movies"
                    savedMovies={savedMovies}
                    addMovie={likeMovie}
                    loggedIn={loggedIn}
                    setIsError={setIsError}
                  />

                } />

                <Route path="/saved-movies" element={
                  <ProtectedRoute
                    component={SavedMovies}
                    name="savedmovies"
                    element={ProtectedPage}
                    onDelete={dislikeMovie}
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
