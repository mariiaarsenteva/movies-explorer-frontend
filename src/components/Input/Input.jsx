import './Input.css'
// import { useLocation } from 'react-router-dom';

export default function Input({ isInputValid, title, name, error }) {
    // const { pathname } = useLocation()


    return (
        <>
            {name !== 'profile' ?
                <label className='input_container'>
                    <span className='input__subtitle'>{title}</span>
                    <input required className={`input ${isInputValid === undefined || isInputValid ? '' : 'input_invaid'}`}
                    />
                    <span className='input__error'>{error}</span>

                </label>
                :
                <>
                    <label className='profile__container'>
                        <span className='profile__subtitle'>{title}</span>
                        <input required className={`profile__input ${isInputValid === undefined || isInputValid ? '' : 'profile__input_invaid'}`}

                        />
                    </label>
                    <span className={`profile__error ${name === 'username' ? 'profile__error_type_name' : ''}`}>{error}</span>
                </>
            }
        </>
    )
}