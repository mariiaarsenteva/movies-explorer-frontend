import { Link, useNavigate } from 'react-router-dom'
import './Error.css'

export default function Error() {
  const navigate = useNavigate()

  function navigateBack() {
    navigate(-1);
  }

  return (
    <main>
      <section className='error'>
        <div className='error__container'>
          <h1 className='error__title'>404</h1>
          <p className='error__text'>Страница не найдена</p>
          <Link className='error__link' onClick={navigateBack}>Назад</Link>
        </div>
      </section>
    </main>
  )
}