import React from 'react';
import './KnowMoreButton.css'; // Reuse the exact same CSS and hover/particle effects

const ResumeButton = ({ href }) => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="know-more-btn contact-action-btn"
            style={{ marginTop: '1.8rem', display: 'inline-block', textDecoration: 'none' }}
        >
            <span className="btn-text">Download Resume</span>
            <div className="btn-glow"></div>
            <div className="btn-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </a>
    );
};

export default ResumeButton;
