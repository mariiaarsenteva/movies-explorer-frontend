import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";
import { EmailRegex } from "../../utils/constants";
import useFormValidation from "../../utils/useFormValidation/useFormValidation";

export default function Login({ handleLogin, name }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onLogin(evt) {
        evt.preventDefault()
        handleLogin(values.email, values.password)
    }

    return (
        <SectionAuth name={name} isValid={isValid} onSubmit={onLogin}>
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
                placeholder='Введите ваш пароль'
                value={values.password}
                error={errors.password}
                onChange={handleChange}
                isInputValid={isInputValid.password}
            />

        </SectionAuth>
    )
}