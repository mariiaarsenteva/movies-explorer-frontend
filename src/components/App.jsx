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
import { Route, Routes } from "react-router-dom";
import "../components/App.css";

export default function App() {
  // стейт логина
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="page">
      <Routes>
        <Route path="/signin"
          element={
            <Login name="signin" setLoggedIn={setLoggedIn} />
          }
        />

        <Route path="/signup"
          element={
            <Register name="signup" setLoggedIn={setLoggedIn} />
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
          <>
            <Header />
            <Movies name="movies" />
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header />
            <SavedMovies name="savedmovies" />
            <Footer />
          </>
        } />

        <Route path="/profile" element={
          <>
            <Header />
            <Profile name="profile" setLoggedIn={setLoggedIn} />
            {/* <Footer /> */}
          </>
        } />

        <Route path='*' element={
          <>
            <Error name='error' />
          </>
        } />


      </Routes>
    </div>
  );
}
