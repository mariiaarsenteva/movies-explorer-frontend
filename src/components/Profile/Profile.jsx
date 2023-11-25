import './Profile.css'
import Form from '../Form/Form'
import Input from '../Input/Input'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'
import { emailRegex } from '../../utils/constants'

export default function Profile ({
  onLogout,
  name,
  isEdit,
  setIsEdit,
  isSuccess,
  setIsError
}) {
  const { values, errors, isValid, isInputValid, setSuccess, handleChange, reset, editUserData } =
    useFormValidation()
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    reset({ username: currentUser.username, email: currentUser.email })
  }, [reset, currentUser, isEdit]) //сохраняются данные в профиле

  function onSubmit(evt) {
    evt.preventDefault()
    editUserData(values.username, values.email)
  }

  return (
    <main>
      <section className='profile'>
        <h1 className='profile__title'>Привет, ${currentUser.name}!</h1>
        <Form
          isValid={isValid}
          onSubmit={onSubmit}
          setIsError={setIsError}
          values={values}
          isSuccess={isSuccess}
          setSuccess={setSuccess}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        >
          <Input
            name='username'
            type='text'
            title='Имя'
            minLength='3'
            maxLength='40'
            placeholder='Имя'
            value={values.username}
            error={errors.username}
            onChange={handleChange}
            isInputValid={isInputValid.username}
            isEdit={isEdit}
          />
          <Input
            name='email'
            type='email'
            title='E-mail'
            placeholder='E-mail'
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            isInputValid={isInputValid.email}
            pattern={emailRegex}
            isEdit={isEdit}
          />
        </Form>
        <Link to={'/'} onClick={onLogout} className='profile__link'>
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  )
}
