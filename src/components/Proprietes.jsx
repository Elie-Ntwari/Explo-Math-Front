import React, { useState } from 'react';
import '../styles/Proprietes.css';
import myLo from '../assets/undraw_reading-time_gcvc.svg';
import { FaArrowDown, FaArrowUp, FaCheck, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Proprietes({proprietes}) {
  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="timeline">
    
      {Object.entries(proprietes).map(([nom, item], index) => {
        const isExpanded = expandedItems[index];
        const desc = item.description;
        console.log(desc)
        const description = desc || '';
        const shouldTruncate = description.length > 100 && !isExpanded;

        return (
          <div key={nom} className={`container ${index % 2 === 0 ? 'left-container' : 'right-container'}`}>
            <img src={myLo} alt="Illustration" />
            <div className="text-box">
              <h2>{nom.replace(/_/g, ' ')}</h2>

              {item.appartient === true ? (
                <div className="value-indicator success">
                  <FaCheck /> Vérifié
                </div>
              ) : item.appartient === false ? (
                <div className="value-indicator error">
                  <FaTimes /> Non vérifié
                </div>
              ) : (
                <small>Valeur : {item.appartient?.toString() || 'N/A'}</small>
              )}

              <p className={`description ${isExpanded ? 'expanded' : 'truncated'}`}>
                {shouldTruncate ? `${description.substring(0, 100)}...` : description}
              </p>
              {isExpanded && item.explication && (
                <div className="explication">
                  <strong>Explication :</strong>
                  <p>{item.explication}</p>
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

              <span className={`${index % 2 === 0 ? 'left-container-arrow' : 'right-container-arrow'}`}></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Proprietes;