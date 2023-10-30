import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'


export default function SearchForm() {

    return (
        <section className='search'>
            <div className='search__container'>
                <form noValidate className='search__form'>
                    <input type="text" placeholder='Фильм' className='search__input' required />
                    <button className='search_button'>Найти</button>
                </form>
                <FilterCheckbox />
            </div>
        </section>

    )
}