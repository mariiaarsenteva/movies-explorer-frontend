import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import { useLocation } from 'react-router-dom'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'



export default function SearchForm({ savedMovies, searchedMovie, searchMovies, setIsError, isCheck, filterShort }) {

    const { pathname } = useLocation()
    const { values,  handleChange } = useFormValidation()


    function onSubmit(evt) {
        evt.preventDefault()
        searchMovies(evt.target.search.value,)
    }
    return (
        <section className='search'>
            <div className='search__container'>
                <form noValidate className='search__form' onSubmit={onSubmit} >
                    <input
                        name="search"
                        type="text"
                        placeholder='Фильм'
                        className='search__input'
                        value={values.search || ''}
                        onChange={(evt) => handleChange(evt)}
                        disabled={savedMovies ? (savedMovies.length === 0 && true) : false}
                        required />
                    <button className={`search__button ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__button_disabled' : ''}`}>Найти</button>
                </form>
                <FilterCheckbox isCheck={isCheck} filterShort={filterShort} />
            </div>
        </section>


    )
}