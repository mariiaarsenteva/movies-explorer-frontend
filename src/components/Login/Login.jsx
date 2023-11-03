import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";

export default function Login() {

    return (
        <SectionAuth>
            <Input
                name='email'
                type='email'
                title='E-mail'
                placeholder='Введите вашу электронную почту'
            />
            <Input
                name='password'
                type='password'
                title='Пароль'
                minLength='3'
                placeholder='Введите ваш пароль'
            />
        </SectionAuth>
    )
}