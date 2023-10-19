import "./Navigation.css";
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import BurgerMenu from '../BurgerMenu/BurgerMenu'

export default function Navigation({ name, loggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  function handelClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > "767") {
        setIsOpen(false);
        window.removeEventListener("resize", closeBurgerForResize);
      }
    }
    if (isOpen) {
      window.addEventListener("resize", closeBurgerForResize);
      return () => window.removeEventListener("resize", closeBurgerForResize);
    }
  }, [isOpen]);

  return (
    <>
      {!loggedIn ? (
        <nav>
          <ul className="header__links-container">
            <li>
              <Link to='/signup' className="header__signup">Регистрация</Link>
            </li>
            <li>
              <Link to='/signin' className="header__signin ">Войти</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav className={`header__navigation ${isOpen ? "header__navigation_open" : ""}`}>
            <ul className="header__links-container header__links ">
              <li>
                <NavLink to='/' className="header__link" activeClassLink="header__link-active">Главная</NavLink>
                <NavLink to='/movies' className="header__link" activeClassLink="header__link-active">Фильмы</NavLink>
                <NavLink to='/saved-movies' className="header__link" activeClassLink="header__link-active">Сохраненные фильмы</NavLink>
              </li>
              <li>
                <Link to='/profile'>
                  <button className="header__link header_link_account" activeClassLink="header__link-active">Аккаунт</button>
                </Link>
              </li>
            </ul>
            <button type='button' className='header__burger-close' onClick={handelClick}></button>
          </nav>
          <button type='button' className='header__burger' onClick={handelClick}></button>
        </>
      )
      }
    </>
  )
}

