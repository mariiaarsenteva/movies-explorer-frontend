import './Footer.css'
import { Link } from 'react-router-dom'


export default function Footer() {

    return (
        <footer className='footer'>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">© 2023</p>
                <nav className="footer__navigation">
                    <Link to={'https://practicum.yandex.ru/'} className="footer__link" target='_blank' >Яндекс.Практикум</Link>
                    <Link to={'https://github.com/mariiaarsenteva'} className="footer__link" target='_blank' >Github</Link>
                </nav>
            </div>
        </footer>
    )
}