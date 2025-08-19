import React, { useState } from 'react';
import '../styles/Proprietes.css';
import myLo from '../assets/undraw_reading-time_gcvc.svg';
import { FaArrowDown, FaArrowUp, FaCheck, FaTimes } from 'react-icons/fa';

function Proprietes({ proprietes }) {
  const [expandedItems, setExpandedItems] = useState({});

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
                  <FaCheck /> Vérifié
                </div>
              ) : item.belongs === false ? (
                <div className="value-indicator error">
                  <FaTimes /> Non vérifié
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
                      <strong>Définition :</strong> {item.definition}
                    </p>
                  )}
                  {item.example && (
                    <p>
                      <strong>Exemples :</strong> {item.example}
                    </p>
                  )}
                  {item.explanation && (
                    <p>
                      <strong>Explication :</strong> {item.explanation}
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
                  {isExpanded ? 'Voir moins' : 'Voir plus'}
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
