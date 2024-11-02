import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {IUserCredentials, IUserRegister } from '../types/userType';
import {requestServices} from '../services/api.service'
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../router/appRoutes';


const AuthFormComponent: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserRegister>();
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IUserRegister | IUserCredentials > = async (data) => {

        try{
            if (isRegister) {

                await requestServices.authService.register(data as IUserRegister)
                reset()
                setIsRegister(true)
            } else {
                const token = await requestServices.authService.login ({phone:data.phone, password: data.password});
                reset()
                sessionStorage.setItem('token', token.accessToken);
                 navigate(appRoutes.CHAT)

            }
            setError(null);
        } catch (error: any) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }

    };

    return (
        <div className= 'authFormConteiner'>
                <h2 style={{textAlign: 'center', color: '#282c34'}}>{isRegister ? 'Register' : 'Login'}</h2>
            <form className='authForm' onSubmit={handleSubmit(onSubmit)}>
                {isRegister && (
                    <div>
                        <label>Nickname</label>
                        <input
                            type="text"
                            {...register('nickName', {
                                required: 'This field is required',
                                minLength: {
                                    value: 3,
                                    message: 'Nickname must be at least 3 characters long',
                                },
                            })} placeholder="Your nick"
                        />
                        {errors.nickName && <p style={{color: 'red'}}>{errors.nickName.message}</p>}
                    </div>
                )}
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        {...register('phone', {
                            required: 'This field is required',
                            pattern: {
                                value: /^0\d{9}$/,
                                message: 'The phone number must start with 0 and have 10 digits',
                            }
                        })} placeholder="0951234567"
                    />
                    {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'This field is required',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
                                message: 'Password must be at least 8 characters long, ' +
                                    'contain at least one number, one special character, ' +
                                    'one uppercase letter, one lowercase letter',
                            }
                        })} placeholder="Qw13452!"
                    />
                    {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                </div>
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                <button onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'I already have an account' : 'Register'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>);
};

export {AuthFormComponent};
