import Input from "../Input/Input";
import SectionAuth from "../SectionAuth/SectionAuth";

export default function Register() {

  return (
    <SectionAuth >
      <Input
        name='username'
        type='text'
        title='Имя'
        minLength='2'
        maxLength='40'
        placeholder='Введите ваше имя'
      />
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