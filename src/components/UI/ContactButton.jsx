import React from 'react';
import './KnowMoreButton.css'; // Reuses signature button styling, hover glow, and particle burst effects

const ContactButton = ({ email = "adwaith.mrv@gmail.com" }) => {
    return (
        <a 
            href={'mailto:' + email}
            className="know-more-btn contact-email-btn"
            aria-label={'Send email to ' + email}
            title={'Send email to ' + email}
        >
            <span className="btn-text">{email}</span>
            <div className="btn-glow"></div>
            <div className="btn-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </a>
    );
};

export default ContactButton;
