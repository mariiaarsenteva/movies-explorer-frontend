import './Portfolio.css'
import { Link } from 'react-router-dom'
import Wrapper from '../Wrapper/Wrapper'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <Wrapper>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className="portfolio__navigation">
          <ul className='portfolio__lists'>
            <li className='portfolio__list'>
              <Link to={'https://github.com/mariiaarsenteva/how-to-learn'} className='portfolio__link' target='_blank' >
                <p className='portfolio__subtitle'>Статичный сайт</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://github.com/mariiaarsenteva/russian-travel'}  className='portfolio__link' target='_blank'>
                <p className='portfolio__subtitle'>Адаптивный сайт</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://github.com/mariiaarsenteva/react-mesto-auth'}  className='portfolio__link portfolio__link_last-of-type ' target='_blank'>
                <p className='portfolio__subtitle'>Одностраничное приложение</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
          </ul>
        </nav>
      </Wrapper>
    </section>
  )
}