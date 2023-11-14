import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation()

  return (
    <header className={`header || ${pathname === '/' ? 'header_dark' : ''}`}>

      <Link to="/">
        <Logo />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}
