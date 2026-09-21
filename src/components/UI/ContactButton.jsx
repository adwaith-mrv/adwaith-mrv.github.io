import React from 'react';
import './KnowMoreButton.css'; // Reuses signature button styling, hover glow, and particle burst effects

const ContactButton = ({ email = "adwaith.mrv@gmail.com", onOpenForm }) => {
    const handleClick = (e) => {
        let appOpened = false;
        const handleBlur = () => {
            appOpened = true;
            window.removeEventListener('blur', handleBlur);
        };
        window.addEventListener('blur', handleBlur);

        // Attempt to launch user's default email client
        window.location.href = 'mailto:' + email;

        // Fallback: If after 900ms window has NOT blurred (no email client launched), reveal the Contact Form
        setTimeout(() => {
            window.removeEventListener('blur', handleBlur);
            if (!appOpened && onOpenForm) {
                onOpenForm();
            }
        }, 900);
    };

    return (
        <a 
            href={'mailto:' + email}
            onClick={handleClick}
            className="know-more-btn contact-action-btn contact-email-btn"
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
