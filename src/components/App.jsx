import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import Movies from "./Movies/Movies.jsx"
import SavedMovies from './SavedMovies/SavedMovies.jsx'
import Profile from "./Profile/Profile.jsx"
import Error from './Error/Error.jsx'
import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "../components/App.css";
import apiMain from "../utils/MainApi.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"
// import Preloader from "../components/Preloader/Preloader.js"

import SendContext from "../contexts/SendContext.js";
import ErrorContext from "../contexts/ErrorContext.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js"

export default function App() {
  const navigate = useNavigate()

  // стейт логина
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [isError, setIsError] = useState(false)

  const [currentUser, setCurrentUser] = useState({}) //объект юзера
  const [savedMovies, setSavedMovies] = useState([]) //массив фильмов


  function handleRegister(username, email, password) {
    setIsSend(true)
    apiMain.registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          apiMain.login(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
            })
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
    apiMain.login(email, password)
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

  function handleLogout(){
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  function editUserData(username, email) {
    setIsSend(true)
    apiMain.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <div className="page">
      {/* {isCheckToken ? <Preloader /> : */}
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
                    <Header name="home" loggedIn={loggedIn} />
                    <Main name="home" />
                    <Footer />
                  </>
                } />

                <Route path="/movies" element={
                  <ProtectedRoute>
                    <Header />
                    <Movies name="movies" />
                    <Footer />
                  </ProtectedRoute>
                } />

                <Route path="/saved-movies" element={
                  <ProtectedRoute>
                    <Header />
                    <SavedMovies name="savedmovies" />
                    <Footer />
                  </ProtectedRoute>

                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Header />
                    <Profile name="profile"
                     onLogout={handleLogout}
                     editUserData={editUserData}
                      />
                    {/* <Footer /> */}
                  </ProtectedRoute>
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
        {/* } */}
            </div>

  );
      }
