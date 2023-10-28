import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

export default function Header({ loggedIn }) {

  return (
    <header className={`header`}>

      <Link to="/">
        <Logo />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}
