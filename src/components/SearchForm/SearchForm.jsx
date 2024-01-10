import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'



export default function SearchForm({ savedMovies, searchedMovie, searchMovies, setIsError, isCheck, filterShort }) {

    const { pathname } = useLocation()
    const { reset, values, handleChange, } = useFormValidation()

    useEffect(() => {
        if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
            reset({ search: '' })
        } else {
            reset({ search: searchedMovie })
        }
        setIsError(false)
    }, [searchedMovie, setIsError, pathname, savedMovies])


    function onSubmit(evt) {
        evt.preventDefault()
        if (evt.target.search.value) {
            searchMovies(evt.target.search.value)
            setIsError(false)
        } else {
            setIsError(true)
        }
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
                        onChange={(evt) => {
                            handleChange(evt)
                            setIsError(false)
                        }}
                        disabled={savedMovies ? (savedMovies.length === 0 && true) : false}
                        required />
                    <button className={`search__button ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__button_disabled' : ''}`}>Найти</button>
                </form>
                <FilterCheckbox isCheck={isCheck} filterShort={filterShort} />
            </div>
        </section>


    )
}