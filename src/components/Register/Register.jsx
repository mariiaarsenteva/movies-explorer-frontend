import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";
import useFormValidation from "../../utils/useFormValidation/useFormValidation"
import { emailRegex } from "../../utils/constants"

export default function Register({name, onRegister}) {

  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  
  function handleSubmit(evt) {
    evt.preventDefault()
    onRegister(values.name, values.email, values.password) 
  }

  return (
    <SectionAuth name={name} isValid = {isValid} onSubmit={handleSubmit} >
      <Input
        name='name'
        type='text'
        title='Имя'
        minLength='2'
        maxLength='40'
        placeholder='Введите ваше имя'
        value = {values.name}
        error={errors.name}
        onChange={handleChange}
        isInputValid={isInputValid.name}


      />
      <Input
        name='email'
        type='email'
        title='E-mail'
        placeholder='Введите вашу электронную почту'
        value = {values.email}
        error={errors.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        pattern={emailRegex}
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength='3'
        maxLength='40'
        placeholder='Введите ваш пароль'
        value = {values.password}
        error={errors.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
      />
    </SectionAuth>
  )
}