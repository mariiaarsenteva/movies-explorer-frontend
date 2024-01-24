import "./MoviesCard.css"
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function MoviesCard({ data, addMovie, onDelete, savedMovies }) {
    const { pathname } = useLocation()
    const [isLike, setIsLike] = useState()

    useEffect(() => {
        const checkIfMovieIsLiked = () => {
            if (pathname === '/movies') {
                const isLiked = savedMovies.some(element => data.id === element.movieId);
                setIsLike(isLiked);
            }
        };
        checkIfMovieIsLiked();
    }, [savedMovies, data.id, setIsLike, pathname]);

    function onClick() {
        if (isLike) {
            setIsLike(false)
            addMovie(data)
        } else {
            setIsLike(true)
            addMovie(data)
        }
    }


    function getHours(duration) {
        const hours = Math.floor(duration / 60);
        return hours;
    }
    
    function getMinutes(duration) {
        const minutes = duration % 60;
        return minutes;
    }
    
    function convertTime(duration) {
        const hours = getHours(duration);
        const minutes = getMinutes(duration);
        return (hours === 0 ? minutes + 'м' : minutes === 0 ? hours + 'ч' : hours + 'ч' + minutes + 'м')
    }

    return (


        <li className='movie'>
            <article>
                <Link to={data.trailerLink} target='_blank'>
                    <img className="movie__poster" src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} />
                </Link>
                <div className='movie__about'>
                    <div className='movie__info'>
                        <p className='movie__title'>{data.nameRU}</p>
                        {pathname === '/movies' ?
                            <button className={`movie__save ${isLike ? 'movie__save_active' : ''}`} type='button' onClick={onClick} ></button>
                            :
                            <button className={`movie__save movie__save_delete`} type='button' onClick={() => onDelete(data._id)} ></button>
                        }
                    </div>
                    <span className='movie__duration'>{convertTime(data.duration)}</span>
                </div>
            </article>
        </li>
    )
}