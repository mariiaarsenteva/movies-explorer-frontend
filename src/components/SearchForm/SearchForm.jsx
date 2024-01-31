import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'



export default function SearchForm({ savedMovies, searchMovies, isCheck, toggleFilterShort, movies, setIsCheck }) {

  const { pathname } = useLocation()

  const { values,  handleChange } = useFormValidation()
  const [isSearchValid, setIsSearchValid] = useState(true); // Состояние для валидации формы поиска
  const [hasSearched, setHasSearched] = useState(false); // Был ли выполнение поиск 
  
  const [isFilterChecked, setIsFilterChecked] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState(''); // поле ввода 

  const handleCheckboxChange = (newValue) => {
    setIsFilterChecked(newValue);
    if (pathname !== "/saved-movies") { 
      const storageKey = `isFilterChecked_${pathname}`;
      localStorage.setItem(storageKey, JSON.stringify(newValue));
    }
  };

  // Обрабатываем поле Input
  const handleChangeInput = (evt) => {
    const name = evt.target.name
    const value = evt.target.value
  
    handleChange(evt); // Передача данных в функцию useFormValidation
  
    if (name === 'search') {
      setSearchInputValue(value); // Обновление состояния для отображения в поле ввода
      if (pathname !== "/saved-movies") {  
        const storageKey = `searchInputValue_${pathname}`;
        localStorage.setItem(storageKey, value);
      }
    }
  };

  // Сохраняем поле Input в LocalStorage
  useEffect(() => {
    if (pathname !== "/saved-movies") {  
      const storageKey = `searchInputValue_${pathname}`;
      setSearchInputValue(localStorage.getItem(storageKey) || '');
    }
  }, [pathname]);


  function onSubmit(evt) {
    evt.preventDefault();
    const searchTerm = evt.target.search.value;
    if (searchTerm) {
      searchMovies(searchTerm);
      setIsSearchValid(true);
      setHasSearched(true);
      if (searchTerm && pathname === "/movies") {
        const storageKey = `searchInputValue_${pathname}`;
        localStorage.setItem(storageKey, searchTerm);
      }
    } else {
      setIsSearchValid(false);
    }
  }

  // Выполняем запрос только если поиск был выполнен или изменён чекбокс 
  useEffect(() => {
    if (hasSearched || isCheck) {
      searchMovies(searchInputValue || values.search);
    }
  }, [hasSearched, searchMovies, searchInputValue, values.search]);

  function changeCheckbox() {
    if (isCheck) {
      setIsCheck(false)
      toggleFilterShort(searchInputValue || values.search, false, movies)
    } else {
      setIsCheck(true)
      toggleFilterShort(searchInputValue || values.search, true, movies)
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
                      // Данные которые ввели, либо из LocalStorage 
                      value={values.search || searchInputValue || ''}
                      onChange={(evt) => handleChangeInput(evt)}
                      disabled={pathname === "/saved-movies" ? (!savedMovies.length) : false}
                      required 
                  />
                  <button className={`search__button ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__button_disabled' : ''}`}>Найти</button>
              </form>
              {!isSearchValid && <p className="search__error-message">Нужно ввести ключевое слово</p>}
              <FilterCheckbox isCheck={isFilterChecked} toggleFilterShort={toggleFilterShort} onChange={changeCheckbox} onCheckboxChange={handleCheckboxChange}/>
          </div>
      </section>


  )
}