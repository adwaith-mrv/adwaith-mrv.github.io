import React from 'react';
import './KnowMoreButton.css';

const KnowMoreButton = ({ onClick }) => {
    return (
        <button className="know-more-btn" onClick={onClick}>
            <span className="btn-text">Know More</span>
            <div className="btn-glow"></div>
            <div className="btn-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </button>
    );
};

export default KnowMoreButton;
