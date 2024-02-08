import { useContext, useEffect } from 'react'
import './Form.css'
import { useLocation } from 'react-router-dom'
import SendContext from "../../contexts/SendContext"
import ErrorContext from "../../contexts/ErrorContext"
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Form({ isValid, children, isDataChanged, onSubmit, isEdit, setIsEdit, values, isSuccess }) {
  const { pathname } = useLocation()
  const isSend = useContext(SendContext)
  const isError = useContext(ErrorContext)
  const currentUser = useContext(CurrentUserContext)



  useEffect(() => {
    if (pathname === '/profile') {
      setIsEdit(false)
    }
  }, [setIsEdit, pathname])



  return (
    <form className='form' noValidate onSubmit={onSubmit}>
      {children}
      {pathname === '/signin' ?
        <>
        {isError && <p className="login__error-message">При входе произошла ошибка.</p>}
          <button
            type="submit"
            className={`login__submit ${isValid  ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend }
          >{isSend ? '' : 'Войти'}</button>
        </>
        :
        pathname === '/signup' ?
          <>
          {isError && <p className="login__error-message">При регистрации произошла ошибка.</p>}
            <button 
              type="submit"
              className={`login__submit_reg login__submit ${isValid ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend }
            >{isSend ? '' : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
            <>
            
              <button
                type="submit"
                className='profile__submit'
                onClick={() => setIsEdit(true)}
              >Редактировать</button>
            </>
            :
            <>
            {isSend && isError ? <p className="login__error-message">При обновлении профиля произошла ошибка.</p> : (isSuccess && isEdit ? <p className="login__success-message">Профиль успешно сохранен!</p> : '')}

            
              <button
                type="submit"
                className={`login__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
                disabled={!isDataChanged || !isValid || isSend || isError }
              >{isSend ? '' : 'Сохранить'}</button>
              
              {/* <button
                type="submit"
                className='profile__submit'
                onClick={() => setIsEdit(false)}
              >Отменить редактирование</button> */}
            </>
      }
    </form>
  )
}