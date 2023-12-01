import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Movies() {
    return (
        <>
            <Header />

            <main className='movies'>
                <SearchForm name='movies' />
                <MoviesCardList />
            </main>

            <Footer />
        </>
    )
}
