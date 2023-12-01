import { useContext, useEffect } from 'react'
import './Form.css'
import { useLocation } from 'react-router-dom'
import SendContext from "../../contexts/SendContext"
import ErrorContext from "../../contexts/ErrorContext"
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Form({ name, isValid, children, onSubmit, isEdit, setIsEdit, setSuccess, values, setIsError}) {
  const { pathname } = useLocation()
  const isSend = useContext(SendContext)
  const isError = useContext(ErrorContext)
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    if (pathname === '/profile') {
      setIsEdit(false)
    }
  }, [ setIsEdit, pathname])

  return (
    <form className='form' noValidate name={name} onSubmit={onSubmit}>
      {children}
      {pathname === '/signin' ?
        <>
          {/* <span className='login__error'>{'При авторизации произошла ошибка.'}</span> */}
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >Войти</button>
        </>
        :
        pathname === '/signup' ?
          <>
            {/* <span className='login__error login__error_registration'>При регистрации пользователя произошла ошибка.</span> */}
            <button 
            type="submit"
            className={`login__submit_reg login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
            >Зарегистрироваться</button>
          </>
          : !isEdit ?
          <>
            {/* <span className='profile__error'>{'При обновлении профиля произошла ошибка.'}</span> */}
            <button 
            type="submit" 
            className='profile__submit'
            onClick={() => {
              setIsEdit(true)
            }}
            >Редактировать</button>
          </>
          :
          <>
          {/* <span className='profile__error'>{'При обновлении профиля произошла ошибка.'}</span> */}
          <button 
          type="submit" 
          className={`login__submit ${(values.name === currentUser.username && values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
          disabled={!isValid || isSend || isError}
          >Сохранить</button>
           <button 
          type="submit" 
          className='profile__submit'
          onClick={() => {
            setIsEdit(false)
            setIsError(false)
          }}
          >Отменить редактирование</button>
        </>
      }
    </form>
  )
}