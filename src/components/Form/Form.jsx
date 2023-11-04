import './Form.css'
import { useLocation } from 'react-router-dom'

export default function Form({ name, isValid, children }) {
  const { pathname } = useLocation()

  return (
    <form className='form' noValidate >
      {children}
      {pathname === '/signin' ?
        <>
          {/* <span className='login__error'>{'При авторизации произошла ошибка.'}</span> */}
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid}
          >Войти</button>
        </>
        :
        pathname === '/signup' ?
          <>
            {/* <span className='login__error login__error_registration'>При регистрации пользователя произошла ошибка.</span> */}
            <button type="submit" className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}>Зарегистрироваться</button>
          </>
          :
          <>
            {/* <span className='profile__error'>{'При обновлении профиля произошла ошибка.'}</span> */}
            <button type="submit" className='profile__submit'>Редактировать</button>
          </>
      }
    </form>
  )
}