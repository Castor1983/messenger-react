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
        <div style={{ maxWidth: '400px', margin: '0 auto', border: 'solid' }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                {isRegister && (
                    <div>
                        <label style={{
                            margin: '5px 0',
                            color: '#007bff',
                        }}>Nickname</label>
                        <input style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            type="text"
                            {...register('nickName', {
                                required: 'This field is required',
                                minLength: {
                                    value: 3,
                                    message: 'Nickname must be at least 3 characters long',
                                },
                            } )} placeholder="Your nick"
                        />
                        {errors.nickName && <p>{errors.nickName.message}</p>}
                    </div>
                )}
                <div>
                    <label style={{
                        margin: '5px 0',
                        color: '#007bff',
                    }}>Phone</label>
                    <input style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        type="text"
                        {...register('phone', {
                            required: 'This field is required',
                            pattern: {
                                value: /^0\d{9}$/,
                                message: 'The phone number must start with 0 and have 10 digits',
                        }})} placeholder="0951234567"
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <div>
                    <label style={{
                        margin: '5px 0',
                        color: '#007bff',
                    }}>Password</label>
                    <input style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        type="password"
                        {...register('password', {
                            required: 'This field is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
                                    message: 'Password must be at least 8 characters long, ' +
                                        'contain at least one number, one special character, ' +
                                        'one uppercase letter, one lowercase letter',
                        }})} placeholder="Qw13452!"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button  style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button  style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'I already have an account' : 'Register'}
            </button>
        </div>
    );
};

export {AuthForm};
