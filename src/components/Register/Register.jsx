import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";
import useFormValidation from "../../utils/useFormValidation/useFormValidation"
import { EmailRegex } from "../../utils/constants"

export default function Register({ name, handleRegister }) {

  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onRegister(evt) {
    evt.preventDefault()
    handleRegister(values.username, values.email, values.password)
  }


  return (
    <SectionAuth name={name} isValid={isValid} onSubmit={onRegister} >
      <Input
        name='username'
        type='text'
        title='Имя'
        minLength='2'
        maxLength='40'
        placeholder='Введите ваше имя'
        value={values.username}
        error={errors.username}
        onChange={handleChange}
        isInputValid={isInputValid.username}


      />
      <Input
        name='email'
        type='email'
        title='E-mail'
        placeholder='Введите вашу электронную почту'
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        pattern={EmailRegex}
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength='3'
        maxLength='40'
        placeholder='Введите ваш пароль'
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
      />
    </SectionAuth>
  )
}