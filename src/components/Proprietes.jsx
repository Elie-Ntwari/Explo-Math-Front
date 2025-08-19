import React, { useState } from 'react';
import '../styles/Proprietes.css';
import myLo from '../assets/undraw_reading-time_gcvc.svg';
import { FaArrowDown, FaArrowUp, FaCheck, FaTimes } from 'react-icons/fa';
import { useI18n } from '../contexts/I18nContext';

function Proprietes({ proprietes }) {
  const [expandedItems, setExpandedItems] = useState({});
  const { t, i18n } = useI18n();

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="timeline">
      {Object.entries(proprietes).map(([key, item], index) => {
        const isExpanded = expandedItems[index];
        const description = item.description || '';
        const shouldTruncate = description.length > 100 && !isExpanded;

        return (
          <div
            key={key}
            className={`container ${
              index % 2 === 0 ? 'left-container' : 'right-container'
            }`}
          >
            <img src={myLo} alt="Illustration" />
            <div className="text-box">
              <h2>{item.name || key.replace(/_/g, ' ')}</h2>

              {item.belongs === true ? (
                <div className="value-indicator success">
                  <FaCheck />{i18n.language === 'fr' ? ' Vérifié' : ' Verified'}
                </div>
              ) : item.belongs === false ? (
                <div className="value-indicator error">
                  <FaTimes /> {i18n.language === 'fr' ? 'Non vérifié' : ' Not Verified'}
                </div>
              ) : (
                <small>Valeur : {item.belongs?.toString() || 'N/A'}</small>
              )}

              <p
                className={`description ${
                  isExpanded ? 'expanded' : 'truncated'
                }`}
              >
                {shouldTruncate
                  ? `${description.substring(0, 100)}...`
                  : description}
              </p>

              {isExpanded && (
                <div className="details">
                  {item.definition && (
                    <p>
                      <strong>{i18n.language === 'fr' ? 'Définition :' : 'Definition :'}</strong> {item.definition}
                    </p>
                  )}
                  {item.example && (
                    <p>
                      <strong>{i18n.language === 'fr' ? 'Exemples :' : 'Examples :'}</strong> {item.example}
                    </p>
                  )}
                  {item.explanation && (
                    <p>
                      <strong>{i18n.language === 'fr' ? 'Explication :' : 'Explanation :'}</strong> {item.explanation}
                    </p>
                  )}
                </div>
              )}

              {description.length > 10 && (
                <button
                  onClick={() => toggleExpand(index)}
                  className="show-more-btn"
                  aria-label={isExpanded ? 'Réduire' : 'Développer'}
                >
                  {isExpanded ? <FaArrowUp /> : <FaArrowDown />}
                  {i18n.language === 'fr' ? (isExpanded  ? 'Voir moins' : 'Voir plus') : (isExpanded  ? 'See less' : 'See more')}
                </button>
              )}

              <span
                className={`${
                  index % 2 === 0
                    ? 'left-container-arrow'
                    : 'right-container-arrow'
                }`}
              ></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Proprietes;
