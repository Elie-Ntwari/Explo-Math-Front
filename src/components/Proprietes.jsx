import React, { useState } from 'react';
import '../styles/Proprietes.css';
import myLo from '../assets/undraw_reading-time_gcvc.svg';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Icônes React

function Proprietes() {
  // Utilisation d'un objet pour gérer l'état de chaque container
  const [showMore, setShowMore] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  const handleShowMore = (index) => {
    setShowMore(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="timeline">
      {/* Premier élément */}
      <div className="container left-container">
        <img src={myLo} alt="Logo-Cara" />
        <div className="text-box">
          <h2>Aphabet Inc.</h2>
          <small>2018 - 2019</small>
          <p className={showMore[0] ? 'expanded' : ''}>
          assumenda suscipit veritatis possimus blanditiis sed quis obcaecati voluptatum temporibus?
            {showMore[0] && ' Extra content visible now  aspernatur repellat, nobis vel alias dolorum iste placeat!'}
          </p>
          <button className="show-more-btn" onClick={() => handleShowMore(0)}>
            {showMore[0] ? <FaArrowUp /> : <FaArrowDown />} {showMore[0] ? 'Voir moins' : 'Voir plus'}
          </button>
          <span className='left-container-arrow'></span>
        </div>
      </div>

      {/* Deuxième élément */}
      <div className="container right-container">
        <img src={myLo} alt="Logo-Cara" />
        <div className="text-box">
          <h2>Aphabet Inc.</h2>
          <small>2018 - 2019</small>
          <p className={showMore[1] ? 'expanded' : ''}>
          assumenda suscipit veritatis possimus blanditiis sed quis obcaecati voluptatum temporibus?
            {showMore[1] && ' Extra content visible now  aspernatur repellat, nobis vel alias dolorum iste placeat!'}
          </p>
          <button className="show-more-btn" onClick={() => handleShowMore(1)}>
            {showMore[1] ? <FaArrowUp /> : <FaArrowDown />} {showMore[1] ? 'Voir moins' : 'Voir plus'}
          </button>
          <span className='right-container-arrow'></span>
        </div>
      </div>

      {/* Troisième élément */}
      <div className="container left-container">
        <img src={myLo} alt="Logo-Cara" />
        <div className="text-box">
          <h2>Aphabet Inc.</h2>
          <small>2018 - 2019</small>
          <p className={showMore[2] ? 'expanded' : ''}>
          assumenda suscipit veritatis possimus blanditiis sed quis obcaecati voluptatum temporibus?
            {showMore[2] && ' Extra content visible now  aspernatur repellat, nobis vel alias dolorum iste placeat!'}
          </p>
          <button className="show-more-btn" onClick={() => handleShowMore(2)}>
            {showMore[2] ? <FaArrowUp /> : <FaArrowDown />} {showMore[2] ? 'Voir moins' : 'Voir plus'}
          </button>
          <span className='left-container-arrow'></span>
        </div>
      </div>

      {/* Quatrième élément */}
      <div className="container right-container">
        <img src={myLo} alt="Logo-Cara" />
        <div className="text-box">
          <h2>Aphabet Inc.</h2>
          <small>2018 - 2019</small>
          <p className={showMore[3] ? 'expanded' : ''}>
            nobis vel alias dolorum iste placeat assumenda suscipit veritatis possimus blanditiis sed quis obcaecati voluptatum temporibus?
            {showMore[3] && ' Extra content visible now!  Lorem ipsum dolor sit amet consectetur adipisicing el'}
          </p>
          <button className="show-more-btn" onClick={() => handleShowMore(3)}>
            {showMore[3] ? <FaArrowUp /> : <FaArrowDown />} {showMore[3] ? 'Voir moins' : 'Voir plus'}
          </button>
          <span className='right-container-arrow'></span>
        </div>
      </div>

      {/* Cinquième élément */}
      <div className="container left-container">
        <img src={myLo} alt="Logo-Cara" />
        <div className="text-box">
          <h2>Aphabet Inc.</h2>
          <small>2018 - 2019</small>
          <p className={showMore[4] ? 'expanded' : ''}>
             Illum laudantium et quidem, aspernatur repellat, nobis vel alias dolorum iste placeat assumenda suscipit veritatis possimus blanditiis sed quis obcaecati voluptatum temporibus?
            {showMore[4] && ' Extra content visible now! Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
          </p>
          <button className="show-more-btn" onClick={() => handleShowMore(4)}>
            {showMore[4] ? <FaArrowUp /> : <FaArrowDown />} {showMore[4] ? 'Voir moins' : 'Voir plus'}
          </button>
          <span className='left-container-arrow'></span>
        </div>
      </div>
    </div>
  );
}

export default Proprietes;
