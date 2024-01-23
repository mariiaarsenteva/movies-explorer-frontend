import { useContext, useEffect } from 'react'
import './Form.css'
import { useLocation } from 'react-router-dom'
import SendContext from "../../contexts/SendContext"
import ErrorContext from "../../contexts/ErrorContext"
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Form({ isValid, children, onSubmit, isEdit, setIsEdit, values }) {
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
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? '' : 'Войти'}</button>
        </>
        :
        pathname === '/signup' ?
          <>
            <button
              type="submit"
              className={`login__submit_reg login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
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
              <button
                type="submit"
                className={`login__submit ${(values.username === currentUser.name || values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
                disabled={!isValid || isSend || isError}
              >{isSend ? '' : 'Сохранить'}</button>
              <button
                type="submit"
                className='profile__submit'
                onClick={() => setIsEdit(false)}
              >Отменить редактирование</button>
            </>
      }
    </form>
  )
}