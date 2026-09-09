// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          
          {/* Если авторизован - не пускаем на логин */}
          <Route path="/login" element={isAuth ? <Navigate to="/search" replace /> : <LoginPage />} />
          
          {/* Если НЕ авторизован - не пускаем на поиск и результаты */}
          <Route path="/search" element={isAuth ? <SearchPage /> : <Navigate to="/" replace />} />
          <Route path="/search/results" element={isAuth ? <ResultsPage /> : <Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;