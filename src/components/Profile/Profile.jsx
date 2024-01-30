import './Profile.css'
import Form from '../Form/Form'
import Input from '../Input/Input'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import useFormValidation from '../../utils/useFormValidation/useFormValidation'
import { EmailRegex } from '../../utils/constants'
import Header from '../Header/Header'

export default function Profile({
  onLogout,
  isEdit,
  setIsEdit,
  editUserData,isSuccess
}) {
  const currentUser = useContext(CurrentUserContext)
  const [isDataChanged, setIsDataChanged] = useState(false);

  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

  useEffect(()=>{
    setValue('username', currentUser.name)
    setValue('email', currentUser.email)
  },[currentUser, setValue, isEdit])


  function onSubmit(evt) {
    evt.preventDefault()
    editUserData(values.username, values.email, reset)
  }

  useEffect(() => {
    if (values.username !== currentUser.name || values.email !== currentUser.email) {
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [values.username, values.email, currentUser.name, currentUser.email]);

  return (
  <>
  <Header />
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <Form
          
          isValid={isValid}
          onSubmit={onSubmit}
          values={values}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          isSuccess={isSuccess}
          isDataChanged={isDataChanged} 
        
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
            value={values.email ? values.email : ''}
            error={errors.email}
            onChange={handleChange}
            isInputValid={isInputValid.email}
            pattern={EmailRegex}
            isEdit={isEdit}
          />
        </Form>
        <Link to={'/'} onClick={onLogout} className='profile__link'>
          Выйти из аккаунта
        </Link>
      </section>
      </>
  )
}
