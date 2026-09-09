
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/');     
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">СКАН</Link>
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="#">Тарифы</Link>
          <Link to="#">FAQ</Link>
        </nav>

        <div className="auth-area">
          {isAuth ? (
            <div className="user-panel">
              <div className="limits-info">
                <span>Использовано компаний: 34</span>
                <span>Лимит: 100</span>
              </div>
              <div className="user-name">Александр А.</div>
              <button className="logout-btn" onClick={handleLogout}>Выйти</button>
            </div>
          ) : (
            <div className="guest-buttons">
              <button className="register-link">Зарегистрироваться</button>
              <button className="login-btn" onClick={() => navigate('/login')}>Войти</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;