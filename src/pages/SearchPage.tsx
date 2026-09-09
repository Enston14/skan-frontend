// src/pages/SearchPage.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { fetchSearchResults } from '../store/slices/searchSlice';
import searchDocs from '../assets/search-docs.svg';
import searchFolder from '../assets/search-folder.svg';
import searchRocket from '../assets/search-rocket.svg';
import './SearchPage.css';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [inn, setInn] = useState('');
  const [tonality, setTonality] = useState('any');
  const [docCount, setDocCount] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [maxFullness, setMaxFullness] = useState(false);
  const [inBusinessNews, setInBusinessNews] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(false);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(false);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(false);
  const [excludeDigests, setExcludeDigests] = useState(false);
  
  const [errors, setErrors] = useState({ inn: '', date: '' });

  const validateInn = (value: string) => {
    if (!/^\d+$/.test(value)) return 'ИНН должен содержать только цифры';
    if (value.length !== 10 && value.length !== 12) return 'ИНН должен содержать 10 или 12 цифр';
    return '';
  };

  const validateDates = (start: string, end: string) => {
    const now = new Date().toISOString().split('T')[0];
    if (start > now || end > now) return 'Даты не могут быть в будущем';
    if (start > end) return 'Дата начала не может быть позже даты конца';
    return '';
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const innError = validateInn(inn);
    const dateError = validateDates(startDate, endDate);

    setErrors({ inn: innError, date: dateError });

    if (innError || dateError) return;

    const params = {
      intervalType: 'month',
      histogramTypes: ['totalDocuments', 'riskFactors'],
      issueDateInterval: {
        startDate: `${startDate}T00:00:00+03:00`,
        endDate: `${endDate}T23:59:59+03:00`,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: 'company',
              sparkId: null,
              entityId: null,
              inn: Number(inn),
              maxFullness,
              inBusinessNews,
            }
          ],
          onlyMainRole,
          tonality,
          onlyWithRiskFactors,
          riskFactors: { and: [], or: [], not: [] },
          themes: { and: [], or: [], not: [] },
        },
        themesFilter: { and: [], or: [], not: [] },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews,
        excludeAnnouncements,
        excludeDigests,
      },
      similarMode: 'duplicates',
      limit: docCount,
      sortType: 'sourceInfluence',
      sortDirectionType: 'desc',
    };

    // ВАЖНО: Отправляем реальный запрос
    dispatch(fetchSearchResults(params));
    navigate('/search/results');
  };

  return (
    <div className="search-page container">
      <h1 className="search-title">НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ.</h1>
      <p className="search-subtitle">Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</p>

      <div className="search-layout">
        <div className="search-form-wrapper">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-grid">
              <div className="left-column">
                <div className="form-group">
                  <label>ИНН компании *</label>
                  <input 
                    type="text" 
                    value={inn} 
                    onChange={(e) => setInn(e.target.value)} 
                    placeholder="10 цифр" 
                    className={errors.inn ? 'input-error' : ''}
                  />
                  {errors.inn && <span className="error-text">{errors.inn}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Тональность</label>
                    <select value={tonality} onChange={(e) => setTonality(e.target.value)}>
                      <option value="any">Любая</option>
                      <option value="positive">Позитивная</option>
                      <option value="negative">Негативная</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Количество документов в выдаче *</label>
                    <input 
                      type="number" 
                      min="1" max="1000" 
                      value={docCount} 
                      onChange={(e) => setDocCount(Number(e.target.value))} 
                      placeholder="От 1 до 1000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Диапазон дат *</label>
                  <div className="date-inputs">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>
              </div>

              <div className="right-column">
                <div className="form-checkboxes">
                  <label className="checkbox-item">
                    <input type="checkbox" checked={maxFullness} onChange={(e) => setMaxFullness(e.target.checked)} />
                    <span>Признак максимальной полноты</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={inBusinessNews} onChange={(e) => setInBusinessNews(e.target.checked)} />
                    <span>Упоминания в бизнес-контексте</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={onlyMainRole} onChange={(e) => setOnlyMainRole(e.target.checked)} />
                    <span>Главная роль в публикации</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={onlyWithRiskFactors} onChange={(e) => setOnlyWithRiskFactors(e.target.checked)} />
                    <span>Публикации только с риск-факторами</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={excludeTechNews} onChange={(e) => setExcludeTechNews(e.target.checked)} />
                    <span>Включать технические новости рынков</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={excludeAnnouncements} onChange={(e) => setExcludeAnnouncements(e.target.checked)} />
                    <span>Включать анонсы и календари</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" checked={excludeDigests} onChange={(e) => setExcludeDigests(e.target.checked)} />
                    <span>Включать сводки новостей</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="search-actions">
              <button type="submit" className="btn-primary search-btn">Поиск</button>
              <p className="required-note">* Обязательные к заполнению поля</p>
            </div>
          </form>
        </div>

        <div className="search-illustrations">
          <img src={searchDocs} alt="Документы" className="search-docs" />
          <img src={searchFolder} alt="Папка с ручкой" className="search-folder" />
          <img src={searchRocket} alt="Ракета" className="search-rocket" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;