import React, { useState } from 'react';
import '../styles/Proprietes.css';
import myLo from '../assets/undraw_reading-time_gcvc.svg';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Proprietes() {
  const location = useLocation();
  const { proprietes = [], nombre = 0 } = location.state || {};
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="timeline">
      <div className='number'><p><strong>{nombre}</strong></p></div>
      {proprietes.map((item, index) => {
        const isExpanded = expandedItems[index];
        const description = item.description || '';
        const shouldTruncate = description.length > 100 && !isExpanded;

        return (
          <div key={item.id || index} className={`container ${index % 2 === 0 ? 'left-container' : 'right-container'}`}>
            <img src={myLo} alt="Illustration" />
            <div className="text-box">
              <h2>{item.nom || 'Titre inconnu'}</h2>
              <small>Valeur : {item.valeur?.toString() || 'N/A'}</small>
              <p className={`description ${isExpanded ? 'expanded' : 'truncated'}`}>
              {shouldTruncate ? `${description.substring(0, 100)}...` : description}
              </p>
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
              <span className={`${index % 2 === 0 ? 'left-container-arrow' : 'right-container-arrow'}`}></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Proprietes;