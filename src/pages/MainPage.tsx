// src/pages/MainPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import heroMan from '../assets/hero-man.svg';
import whyUsMan from '../assets/why-us-man.svg';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [currentIndex, setCurrentIndex] = useState(1);

  const features = [
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#029491" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: 'Высокая и оперативная скорость обработки заявки'
    },
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#029491" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      ),
      title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#029491" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#029491" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: 'Поддержка 24/7'
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="main-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН</h1>
            <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            
            {/* Если залогинен -> /search, если нет -> /login */}
            <button 
              className="hero-btn" 
              onClick={() => navigate(isAuth ? '/search' : '/login')}
            >
              Запросить данные
            </button>
          </div>
          <div className="hero-img">
            <img src={heroMan} alt="Человек за компьютером" />
          </div>
        </div>
      </section>

      <section className="why-us">
        <div className="container">
          <h2>ПОЧЕМУ ИМЕННО МЫ</h2>
          
          <div className="carousel-wrapper">
            <button className="carousel-btn left" onClick={prevSlide}>←</button>
            
            <div className="carousel-content">
              {[-1, 0, 1].map((offset) => {
                const index = (currentIndex + offset + features.length) % features.length;
                const isActive = offset === 0;
                
                return (
                  <div key={index} className={`why-card ${isActive ? 'active' : 'inactive'}`}>
                    <div className="why-card-icon-container">
                      {features[index].icon}
                    </div>
                    <h3>{features[index].title}</h3>
                  </div>
                );
              })}
            </div>

            <button className="carousel-btn right" onClick={nextSlide}>→</button>
          </div>

          <div className="why-us-image">
            <img src={whyUsMan} alt="Человек с галочкой" />
          </div>
        </div>
      </section>

      <section className="tariffs">
        <div className="container">
          <h2>НАШИ ТАРИФЫ</h2>
          <div className="tariff-cards">
            <div className="tariff-card beginner">
              <div className="tariff-header">
                <div>
                  <h3>Beginner</h3>
                  <p>Для небольшого исследования</p>
                </div>
                <span className="tariff-icon">🌞</span>
              </div>
              <div className="tariff-body">
                <div className="price">
                  <span className="current">799 ₽</span>
                  <s className="old">1 200 ₽</s>
                  <p className="installment">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                </div>
                <div className="features">
                  <h4>В тариф входит:</h4>
                  <ul>
                    <li>Безлимитная история запросов</li>
                    <li>Безопасная сделка</li>
                    <li>Поддержка 24/7</li>
                  </ul>
                </div>
                <button className="btn-disabled" disabled>Перейти в личный кабинет</button>
              </div>
            </div>

            <div className="tariff-card pro">
              <div className="tariff-header">
                <div>
                  <h3>Pro</h3>
                  <p>Для HR и фрилансеров</p>
                </div>
                <span className="tariff-icon">🎯</span>
              </div>
              <div className="tariff-body">
                <div className="price">
                  <span className="current">1 299 ₽</span>
                  <s className="old">2 600 ₽</s>
                  <p className="installment">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                </div>
                <div className="features">
                  <h4>В тариф входит:</h4>
                  <ul>
                    <li>Все пункты тарифа Beginner</li>
                    <li>Экспорт истории</li>
                    <li>Рекомендации по приоритетам</li>
                  </ul>
                </div>
                <button className="btn-blue">Подробнее</button>
              </div>
            </div>

            <div className="tariff-card business">
              <div className="tariff-header">
                <div>
                  <h3>Business</h3>
                  <p>Для корпоративных клиентов</p>
                </div>
                <span className="tariff-icon">🏢</span>
              </div>
              <div className="tariff-body">
                <div className="price">
                  <span className="current">2 379 ₽</span>
                  <s className="old">3 700 ₽</s>
                  <p className="installment">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                </div>
                <div className="features">
                  <h4>В тариф входит:</h4>
                  <ul>
                    <li>Все пункты тарифа Pro</li>
                    <li>Безлимитное количество запросов</li>
                    <li>Приоритетная поддержка</li>
                  </ul>
                </div>
                <button className="btn-blue">Подробнее</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;