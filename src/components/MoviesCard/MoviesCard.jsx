import "./MoviesCard.css"
import { useLocation } from 'react-router-dom'
import { useState } from 'react'


export default function MoviesCard({ name }) {
    const { pathname } = useLocation()
    const poster = require('../../images/movie.png');
    const [isLike, setIsLike] = useState()

    function onClick() {
        if (isLike) {
            setIsLike(false)
        } else {
            setIsLike(true)
        }
    }

    return (

        <li className='movie__card'>
            <article>
                <img src={poster} alt="постер фильма" className='movie__poster' />
                <div className='movie__about'>
                    <div className='movie__info'>
                        <p className='movie__title'>33 слова о дизайне</p>
                        {pathname === '/movies' ?
                            <button className={`movie__save ${isLike ? 'movie__save_active' : ''}`} type='button' onClick={onClick} ></button>
                            :
                            <button className={`movie__save movie__save_delete`} type='button' onClick={onClick} ></button>
                        }
                    </div>
                    <span className='movie__duration'>1ч 42м</span>
                </div>
            </article>
        </li>
    )
}