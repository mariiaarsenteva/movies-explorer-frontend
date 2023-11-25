import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";
import { emailRegex } from "../../utils/constants";
import useFormValidation from "../../utils/useFormValidation/useFormValidation";

export default function Login({onLogin, name }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  
    function onSubmit(evt) {
        evt.preventDefault()
        onLogin(values.password, values.email, values.username)
      }
  
    return (
        <SectionAuth name={name} isValid = {isValid} onSubmit={onSubmit}>
            <Input
                name='email'
                type='email'
                title='E-mail'
                placeholder='Введите вашу электронную почту'
                value={values.email}
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
                placeholder='Введите ваш пароль'
                value={values.password}
                error={errors.password}
                onChange={handleChange}
                isInputValid={isInputValid.password}
            />

        </SectionAuth>
    )
}