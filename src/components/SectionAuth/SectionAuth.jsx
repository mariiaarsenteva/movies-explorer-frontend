import  './SectionAuth.css'
import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import { useLocation } from 'react-router-dom';


export default function SectionAuth ({children}) {
  const { pathname } = useLocation()
  return (
    <section className='login'>
      <Link to={'/'} className="login__logo"></Link>
      <h2 className='login__title'>{pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
      <Form >
        {children}
      </Form>
      {pathname === '/signin' ?
        <p className='login__question'>Ещё не зарегистрированы? <Link to={'/signup'} className='login__link'>Регистрация</Link></p>
        : pathname === '/signup' ?
          <p className='login__question'>Уже зарегистрированы? <Link to={'/signin'} className='login__link'>Войти</Link></p>
          :
          <Link to={'/'}>Выйти из аккаунта</Link>
      }
    </section>
  )
}