import "./Header.css";
import { Link } from "react-router-dom";
// import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'

export default function Header({ loggedIn }) {

  // useEffect(() => {
  //   function closeBurgerForResize() {
  //     if (document.documentElement.clientWidth > "767") {
  //       setIsOpen(false);
  //       window.removeEventListener("resize", closeBurgerForResize);
  //     }
  //   }
  //   if (isOpen === true) {
  //     window.addEventListener("resize", closeBurgerForResize);
  //     return () => window.removeEventListener("resize", closeBurgerForResize);
  //   }
  // }, [isOpen]);

  return (
    <header className={`header header__page`}>
      <Link to="/">
        <Logo />
      </Link>
      {/* <Navigation loggedIn={loggedIn} /> */}
    </header>
  );
}
