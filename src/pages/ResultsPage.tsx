// src/pages/ResultsPage.tsx
import searchResultHero from '../assets/search-result-hero.svg';
import docSkillfactory from '../assets/doc-skillfactory.svg';
import docDataScience from '../assets/doc-data-science.svg';
import './ResultsPage.css';

const ResultsPage = () => {
  const periods = [
    { date: '10.09.2021', total: 5, risk: 0 },
    { date: '13.09.2021', total: 2, risk: 0 },
    { date: '17.09.2021', total: 6, risk: 2 },
    { date: '20.09.2021', total: 8, risk: 0 },
    { date: '12.10.2021', total: 1, risk: 0 },
    { date: '15.10.2021', total: 10, risk: 2 },
    { date: '16.10.2021', total: 4, risk: 0 },
    { date: '17.10.2021', total: 3, risk: 0 },
  ];

  const documents = [
    {
      id: 1,
      date: '13.09.2021',
      source: 'Комсомольская правда KP.RU',
      title: 'Скиллфактори — лучшая онлайн-школа для будущих айтишников',
      tags: ['Технические новости'],
      image: docSkillfactory, // ИСПОЛЬЗУЕМ ТВОЮ КАРТИНКУ!
      text: 'SkillFactory — школа для всех, кто хочет изменить свою жизнь и начать карьеру в IT. Основатели школы понимают, что многие люди чувствуют себя некомфортно в современном мире.',
      wordCount: 2453
    },
    {
      id: 2,
      date: '15.10.2021',
      source: 'VC.RU',
      title: 'Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций',
      tags: ['Технические новости'],
      image: docDataScience, // ИСПОЛЬЗУЕМ ТВОЮ КАРТИНКУ!
      text: 'Кто такой Data Scientist и чем он занимается? Специалист, который объединяет аналитика, математика и программирование, чтобы извлекать полезные выводы из больших объёмов данных.',
      wordCount: 3233
    }
  ];

  return (
    <div className="results-page container">
      <div className="results-hero">
        <div className="hero-text-block">
          <h1>ИЩЕМ. СКОРО БУДУТ РЕЗУЛЬТАТЫ</h1>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <img src={searchResultHero} alt="Девочка с мишенью" className="results-hero-img" />
      </div>

      <div className="summary-section">
        <h2>ОБЩАЯ СВОДКА</h2>
        <p className="summary-subtitle">Найдено 221 вариантов</p>

        <div className="summary-table">
          <div className="periods-carousel">
            <button className="carousel-btn left">←</button>

            <div className="periods-list">
              {periods.map((period, index) => (
                <div key={index} className={`period-cell ${index === 0 ? 'active-cell' : ''}`}>
                  <div className="period-date">{period.date}</div>
                  <div className="period-row"><span>Всего</span><strong>{period.total}</strong></div>
                  <div className="period-row"><span>Риски</span><strong>{period.risk}</strong></div>
                </div>
              ))}
            </div>

            <button className="carousel-btn right">→</button>
          </div>
        </div>
      </div>

      <div className="documents-section">
        <h2>СПИСОК ДОКУМЕНТОВ</h2>

        <div className="documents-list">
          {documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-card-header">
                <span className="doc-date">{doc.date}</span>
                <span className="doc-source">{doc.source}</span>
              </div>
              <h3 className="doc-title">{doc.title}</h3>
              <div className="doc-tags">
                {doc.tags.map((tag, i) => (
                  <span key={i} className="doc-tag">{tag}</span>
                ))}
              </div>
              <img src={doc.image} alt="Превью" className="doc-image" />
              <p className="doc-text">{doc.text}</p>
              <div className="doc-footer">
                <button className="btn-read-source">Читать в источнике</button>
                <span className="doc-word-count">{doc.wordCount} слова</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-show-more">Показать больше</button>
      </div>
    </div>
  );
};

export default ResultsPage;