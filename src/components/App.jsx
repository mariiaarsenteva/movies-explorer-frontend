// import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../components/App.css";

export default function App() {
  //стейт логина
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="page">
      <Routes>
        <Route path="/signin"
        element={
          <Main name="signin" setLoggedIn={setLoggedIn} />
        }
        />

        <Route path="/signup"
        element={
          <Main name="signup" setLoggedIn={setLoggedIn} />
        }
        />

        <Route path="/" element={
          <>
            <Header name="home" loggedIn={loggedIn} />
            <Main name="home" />
            {/* <Footer /> */}
          </>
        } />

        <Route path="/movies" element={
          <>
            <Header />
            <Main name="movies" />
            {/* <Footer /> */}
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header />
            <Main name="savedmovies" />
            {/* <Footer /> */}
          </>
        } />

        <Route path="/prifile" element={
          <>
            <Header />
            <Main name="profile" setLoggedIn={setLoggedIn} />
            {/* <Footer /> */}
          </>
        } />

        <Route path='*' element={
          <>
            <Main name='error' />
          </>
        } />


      </Routes>
    </div>
  );
}
