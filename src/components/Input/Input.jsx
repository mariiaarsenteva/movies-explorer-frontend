import { useContext } from 'react';
import './Input.css'
import { useLocation } from 'react-router-dom';
import SendContext from '../../contexts/SendContext';

export default function Input({ isEdit, isInputValid, title, name, type, error, placeholder, minLength, value, onChange, pattern }) {
    const { pathname } = useLocation()
    const isSend = useContext(SendContext)


    return (
        <>
            {pathname !== '/profile' ?
                <label className='input_container'>
                    <span className='input__subtitle'>{title}</span>
                    <input
                        required
                        className={`input ${isInputValid === undefined || isInputValid ? '' : 'input_invaid'}`}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        minLength={minLength || ''}
                        value={value || ''}
                        onChange={onChange}
                        disabled={isSend}
                        pattern={pattern}

                    />
                    <span className='input__error'>{error}</span>

                </label>
                :
                <>
                    <label className='profile__container'>
                        <span className='profile__subtitle'>{title}</span>
                        <input
                            required
                            className={`profile__input ${ isInputValid ? '' : 'profile__input_invaid'}`}
                            type={type}
                            name={name}
                            minLength={minLength || ''}
                            value={value || ''}
                            onChange={onChange}
                            disabled={isSend || !isEdit}
                            pattern={pattern}
                        />
                    </label>
                    <span className={`profile__error ${name === 'username' ? 'profile__error_type_name' : ''}`}>{error}</span>
                </>
            }
        </>
    )
}