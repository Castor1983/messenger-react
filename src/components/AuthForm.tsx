import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {IUserCredentials, IUserRegister } from '../types/userType';
import {requestServices} from '../services/api.service'
import axios from 'axios';


const AuthForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserRegister>();
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IUserRegister | IUserCredentials > = async (data) => {

        try{
            if (isRegister) {

                await requestServices.authService.register(data as IUserRegister)
                reset()
            } else {
                console.log(data)
                const token = await requestServices.authService.login (data as IUserCredentials);
                reset()
                sessionStorage.setItem('token', token.accessToken);
            }
        } catch (error) {
            if ( axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            })}
                        />
                        {errors.nickName && <p>{errors.nickName.message}</p>}
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
                        }})}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
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
                        }})}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'I already have an account' : 'Register'}
            </button>
        </div>
    );
};

export {AuthForm};
