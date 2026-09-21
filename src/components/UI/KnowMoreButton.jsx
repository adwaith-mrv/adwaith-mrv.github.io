import React from 'react';
import './KnowMoreButton.css';

const KnowMoreButton = ({ onClick }) => {
    return (
        <div className="know-more-container">
            <button
                className="know-more-btn"
                onClick={onClick}
                aria-label="Know More - Scroll to About Me"
            >
                <span className="btn-text">Know More</span>
                <div className="btn-glow"></div>
                <div className="btn-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </button>
            <div className="scroll-affordance" aria-hidden="true">
                <span className="scroll-text">Scroll to explore</span>
                <svg className="scroll-chevron" viewBox="0 0 24 24" width="20" height="20">
                    <path
                        d="M7 10l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default KnowMoreButton;
