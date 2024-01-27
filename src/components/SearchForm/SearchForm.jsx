import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'



export default function SearchForm({ savedMovies, searchMovies, isCheck, toggleFilterShort, movies, setIsCheck }) {

    const { pathname } = useLocation()
    const { values,  handleChange } = useFormValidation()
    const [isSearchValid, setIsSearchValid] = useState(true); // Состояние для валидации формы поиска
   
    const [isFilterChecked, setIsFilterChecked] = useState(false);

    const handleCheckboxChange = (newValue) => {
      setIsFilterChecked(newValue);
      // Здесь можно также сохранять значение в localStorage, чтобы при обновлении страницы состояние чекбокса сохранялось
      localStorage.setItem('isFilterChecked', newValue);
    };
  
  
      function onSubmit(evt) {
        evt.preventDefault();
        const searchTerm = evt.target.search.value;
        if (searchTerm) {
          searchMovies(searchTerm);
          setIsSearchValid(true);
          if (searchTerm && pathname === "/movies") {
            localStorage.setItem("searchInputValue", searchTerm);
          }
        } else {
          setIsSearchValid(false);
        }
      }

      function changeCheckbox() {
        if (isCheck) {
          setIsCheck(false)
          toggleFilterShort(values.search, false, movies)
        } else {
          setIsCheck(true)
          toggleFilterShort(values.search, true, movies)
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
                        onChange={(evt) => handleChange(evt)}
                        disabled={savedMovies ? (savedMovies.length > 0 && true) : false}
                        required />
                    <button className={`search__button ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__button_disabled' : ''}`}>Найти</button>
                </form>
                {!isSearchValid && <p className="search__error-message">Нужно ввести ключевое слово</p>}
                <FilterCheckbox isCheck={isFilterChecked} toggleFilterShort={toggleFilterShort} onChange={changeCheckbox} onCheckboxChange={handleCheckboxChange}/>
            </div>
        </section>


    )
}