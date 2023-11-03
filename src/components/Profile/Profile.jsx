import "./Profile.css"
import Form from '../Form/Form'
import Input from '../Input/Input'
import { Link } from 'react-router-dom'


export default function Profile() {

    return (
        <section className="profile">
            <h2 className='profile__title'>Привет, Виталий!</h2>
            <Form>
                <Input
                    name='username'
                    type='text'
                    title='Имя'
                    minLength='3'
                />
                <Input
                    name='email'
                    type='email'
                    title='E-mail'
                />
            </Form>
            <Link to={'/'} className='profile__link'>Выйти из аккаунта</Link>
        </section>
    )
}