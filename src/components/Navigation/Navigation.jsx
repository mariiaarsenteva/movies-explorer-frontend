import "./Navigation.css";
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navigation({ name, loggedIn }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  function handelClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  // function clickLink() {
  //   setIsOpen(false)
  // }

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

      {name === 'home' && !loggedIn ? (
        <nav >
          <ul className="header__links-container">
            <li>
              <Link to='/signup' className="header__signup">Регистрация</Link>
            </li>
            <li>
              <Link to='/signin' className="header__signin">Войти</Link>
            </li>
          </ul>
        </nav >
      ) : (

        <>
          <nav className={`header__navigation ${isOpen ? "header__navigation_open" : ""}`}>
            <ul className="header__links-container header__links ">
              <li className="header__links-list">
                <Link to='/' className={` ${pathname === '/' ? 'header__link_active' : ''} && header__link || ${pathname !== '/' ? 'header__link_white' : ''} `} >Главная</Link>
              </li>

              <li className="header__links-list">
                <Link to='/movies' className={`  ${pathname === '/movies' ? 'header__link_active' : ''} && header__link || ${pathname !== '/' ? 'header__link_white' : ''}`} >Фильмы</Link>
              </li>

              <li className="header__links-list">
                <Link to='/saved-movies' className={` ${pathname === '/saved-movies' ? 'header__link_active' : ''} && header__link || ${pathname !== '/' ? 'header__link_white' : ''}`} >Сохранённые фильмы</Link>
              </li>

              <li className="header__links-list">
                <Link to='/profile' className={` ${pathname === '/profile' ? 'header__link_active' : ''} && header__account-icon || ${pathname === '/profile' ? 'header__account-icon_white' : '' }`} ></Link>
              </li>
            </ul>
            <button type='button' className='header__burger-close' onClick={handelClick}></button>
          </nav>
          <button type='button' className={`header__burger || ${pathname !== '/' ? 'header__burger_dark' : ''}`} onClick={handelClick}></button>
        </>
      )
      }
    </>
  )
}

