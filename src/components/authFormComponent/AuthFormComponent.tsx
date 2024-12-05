import React, { useState } from 'react';
import { SubmitHandler,useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import css from './AuthForm.module.css';
import '../index.module.css';
import { passwordPattern, phonePattern } from '../../constants/patterns';
import { appRoutes } from '../../router/appRoutes';
import { authService } from '../../services/auth.service';
import { IUserCredentials, IUserRegister } from '../../types/userType';

const AuthFormComponent: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserRegister>();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IUserRegister | IUserCredentials > = async (data) => {

    try{
      if (isRegister) {

        await authService.register(data as IUserRegister);
        reset();
        setIsRegister(true);
      } else {
        const token = await authService.login ({ phone:data.phone, password: data.password });
        reset();
        sessionStorage.setItem('token', token.accessToken);
        navigate(appRoutes.CHAT);
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
    <div className={ css.authFormContainer }>
      <h2>{ isRegister ? 'Register' : 'Login' }</h2>
      <form className={ css.authForm } onSubmit={ handleSubmit(onSubmit) }>
        { isRegister && (
          <div>
            <label>Nickname</label>
            <input
              type="text"
              { ...register('nickName', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'Nickname must be at least 3 characters long',
                },
              }) } placeholder="Your nick"
            />
            { errors.nickName && <p style={ { color: 'red' } }>{ errors.nickName.message }</p> }
          </div>
        ) }
        <div>
          <label>Phone</label>
          <input
            type="text"
            { ...register('phone', {
              required: 'This field is required',
              pattern: phonePattern
            }) } placeholder="0951234567"
          />
          { errors.phone && <p style={ { color: 'red' } }>{ errors.phone.message }</p> }
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            { ...register('password', {
              required: 'This field is required',
              pattern: passwordPattern
            }) } placeholder="Qw13452!"
          />
          { errors.password && <p style={ { color: 'red' } }>{ errors.password.message }</p> }
        </div>
        <button type="submit">{ isRegister ? 'Register' : 'Login' }</button>
        <button onClick={ () => setIsRegister(!isRegister) }>
          { isRegister ? 'I already have an account' : 'Register' }
        </button>
      </form>
      { error && <p style={ { color: 'red' } }>{ error }</p> }
    </div>);
};

export { AuthFormComponent };
