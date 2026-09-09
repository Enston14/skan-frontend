// src/pages/LoginPage.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loginUser } from '../store/slices/authSlice';
import authImage from '../assets/auth-image.svg';
import lockIcon from '../assets/lock-icon.svg';
import './LoginPage.css';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const isFormValid = login.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const result = await dispatch(loginUser({ login, password }));
    
    if (loginUser.fulfilled.match(result)) {
      navigate('/search', { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <h1>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ.</h1>
        <img src={authImage} alt="Люди с ключом" className="login-image" />
      </div>

      <div className="login-right-side">
        <img src={lockIcon} alt="Замочек" className="lock-icon" />
        
        <div className="auth-card">
          <div className="auth-tabs">
            <button className="active">Войти</button>
            <button>Зарегистрироваться</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Логин или номер телефона:</label>
              <input 
                type="text" 
                value={login} 
                onChange={(e) => setLogin(e.target.value)} 
                placeholder="Введите данные" 
                className={error ? 'input-error' : ''}
                autoComplete="username"
              />
            </div>
            
            <div className="form-group">
              <label>Пароль:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Введите пароль" 
                className={error ? 'input-error' : ''}
                autoComplete="current-password"
              />
              {error && <div className="error-text">Непарвильный пароль</div>}
            </div>

            <button 
              type="submit"
              className={`submit-btn ${isFormValid && !isLoading ? '' : 'disabled'}`} 
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
            <a href="#" className="forgot-pass">Восстановить пароль</a>
          </form>

          <div className="social-login">
            <p>Войти через:</p>
            <div className="social-buttons">
              <button type="button">Google</button>
              <button type="button">Facebook</button>
              <button type="button">Яндекс</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;