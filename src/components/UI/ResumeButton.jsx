import React from 'react';
import './KnowMoreButton.css'; // Reuse the exact same CSS and hover/particle effects

const ResumeButton = ({ href }) => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', textDecoration: 'none' }}
        >
            <button className="know-more-btn" style={{ marginTop: '2rem' }}>
                <span className="btn-text">Download Resume</span>
                <div className="btn-glow"></div>
                <div className="btn-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </button>
        </a>
    );
};

export default ResumeButton;
