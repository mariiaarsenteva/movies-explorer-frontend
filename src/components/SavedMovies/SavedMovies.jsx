import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


export default function SavedMovies() {
    return (
        <>
            <Header />
            <main className='saved-movies'>
                <SearchForm />
                <MoviesCardList />
            </main>
       <Footer/>
       </>


    )
}