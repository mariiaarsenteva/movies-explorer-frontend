import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {

    return (
        <section className='cards'>
            <ul className='cards__lists'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />

            </ul>

            <button className={'cards__button cards__button_hidden'} type='button'>Ещё</button>

        </section>
    )
}