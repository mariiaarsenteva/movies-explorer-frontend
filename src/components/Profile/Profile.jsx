import "./Profile.css"
import Form from '../Form/Form'
import Input from '../Input/Input'
import { Link } from 'react-router-dom'


export default function Profile() {

    return (
        <main>
            <section className="profile">
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <Form>
                    <Input
                        name='username'
                        type='text'
                        title='Имя'
                        minLength='3'
                        maxLength='40'
                        placeholder= "Имя"
                    />
                    <Input
                        name='email'
                        type='email'
                        title='E-mail'
                        placeholder="E-mail"
                    />
                </Form>
                <Link to={'/'} className='profile__link'>Выйти из аккаунта</Link>
            </section>
        </main>
    )
}