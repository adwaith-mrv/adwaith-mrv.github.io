import React, { useEffect, useState, useRef } from 'react';
import * as amplitude from '@amplitude/unified';
import ScrollAffordance from '../../components/UI/ScrollAffordance';
import ResumeButton from '../../components/UI/ResumeButton';
import ContactButton from '../../components/UI/ContactButton';
import LinkedInButton from '../../components/UI/LinkedInButton';
import DepthCarousel from '../../components/UI/DepthCarousel';
import { AUDIO_ENABLED } from '../../config/audioConfig';
import machinationsLogo from '../../assets/icons/machinationsLogo.svg';
import anthropicLogo from '../../assets/icons/Anthropic.webp';
import eaLogo from '../../assets/icons/Electronic-Arts-Logo.svg';
import mckinseyLogo from '../../assets/icons/McKinsey-Forward-Program.svg';
import jpmcLogo from '../../assets/icons/JPMC.svg';
import pendoLogo from '../../assets/icons/Pendo_idc1rR1vR5_1.svg';
import gcpLogo from '../../assets/icons/google-cloud-logo.svg';
import n8nLogo from '../../assets/icons/n8n_pink+white_logo.svg';
import './Home.css';

// 7 Strategic Deep Dives
const deepDiveItems = [
    {
        id: 'offer-explorer',
        title: 'Where a match-3 asks you to pay',
        kicker: 'Mobile F2P',
        oneLiner: '52 levels, logged by hand, and the tool that reads them.',
        mediaType: 'image',
        media: '/offer-explorer/assets/explorer-card.webp',
        route: '/offer-explorer/',
        badgePosition: 'top-left',
        fit: 'cover'
    },
    {
        id: 'venus-gate',
        title: 'Warframe: Venus Gate',
        mediaType: 'image',
        media: '/assets/images/warframe-venus-gate.png',
        route: '/venus-gate/',
        badgePosition: 'top-left',
        fit: 'contain'
    },
    {
        id: 'binding-constraint',
        title: 'Publish the Bill Before the Grind',
        mediaType: 'image',
        media: '/assets/images/warframe-venus-gate.png',
        route: '/binding-constraint/',
        badgePosition: 'top-left',
        fit: 'contain'
    },
    {
        id: 'tau-readiness',
        title: 'Warframe: Tau',
        kicker: 'Launch Readiness',
        oneLiner: 'The metric that greenlights Tau and the one that rescues it point in opposite directions.',
        mediaType: 'image',
        media: '/tau-readiness/assets/tau-card.webp',
        route: '/tau-readiness/',
        badgePosition: 'top-left',
        fit: 'cover'
    },
    {
        id: 'fall-bridge',
        title: 'Warframe: Iceblade of Narin',
        kicker: 'Retention Plan',
        oneLiner: 'A rework wins in the loadout, not the patch notes.',
        mediaType: 'image',
        media: '/fall-bridge/assets/tennocon-2026-badge-ice.webp',
        route: '/fall-bridge/',
        badgePosition: 'top-left',
        fit: 'cover'
    },
    {
        id: 'forecast-scorecard',
        title: 'Warframe: Forecast Scorecard',
        kicker: 'Graded Forecast',
        oneLiner: "A prediction nobody checks isn't one.",
        mediaType: 'image',
        media: '/forecast-scorecard/assets/forecast-cover.webp',
        route: '/forecast-scorecard/',
        badgePosition: 'top-left',
        fit: 'cover',
        position: 'left center'
    },
    {
        id: 'nfs-mw',
        title: 'NFS Most Wanted (2005)',
        mediaType: 'video',
        media: '/assets/video/Most Wanted Style Background.mp4',
        route: '/nfs-most-wanted/',
        badgePosition: 'bottom-left'
    }
];

const Home = () => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const contactFormRef = useRef(null);

    const handleOpenForm = () => {
        setShowContactForm(true);
        setTimeout(() => {
            if (contactFormRef.current) {
                contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 120);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const subject = `Portfolio Inquiry from ${data.name}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not specified'}\nRole: ${data.role || 'Not specified'}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:adwaith.mrv@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Copy message to clipboard as an ultra-reliable fallback for webmail users
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(`To: adwaith.mrv@gmail.com\nSubject: ${subject}\n\n${body}`).catch(() => {});
        }

        window.location.href = mailtoLink;
        setFormSubmitted(true);
        e.target.reset();
    };

    useEffect(() => {
        amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' }); // helps improve this setup flow — safe to remove once you've verified the event lands
    }, []);

    useEffect(() => {
        // If returning back to deep-dives section
        if (window.location.hash === '#deep-dives') {
            setTimeout(() => {
                const deepDivesSection = document.getElementById('deep-dives');
                if (deepDivesSection) {
                    deepDivesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    useEffect(() => {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        // Prevent sticky tilt effects on touch/mobile devices
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    };

    const scrollToAbout = () => {
        if (AUDIO_ENABLED) {
            const audio = document.getElementById('bg-music');
            if (audio && audio.paused) {
                audio.play().catch((err) => {
                    console.log('Audio playback waiting for gesture:', err);
                });
            }
        }
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // The Google Drive link for your latest resume
    const resumeUrl = "https://drive.google.com/file/d/1wuO7PbXZuMGzbPrPeImM9hFlnzgt6xKE/view?usp=sharing";

    return (
        <main className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="premium-title">Adwaith V</h1>
                    <p className="tagline">Product Manager - Game Economy &amp; LiveOps</p>
                    <div className="subtitle">
                        <span className="subtitle-line">Systems &amp; Platform PM | 0-to-1 launch</span>
                        <span className="subtitle-line">+15% conversion | -40% failure rates</span>
                        <span className="subtitle-line">Machinations Certified | Warframe LR1 at 938h</span>
                    </div>
                    <ScrollAffordance onClick={scrollToAbout} />
                </div>
            </section>

            <section id="about" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">About Me</h2>
                    <div className="about-text fade-in">
                        <p>I take live-service game economies apart and publish the numbers.</p>
                        <p>Warframe, Legendary Rank 1 at 938 tracked hours - community reports for LR1 sit at 2,000 to 4,000. Star chart 238/238, Steel Path 238/238, 6,483 missions. The gap is method, not volume.</p>
                        <p>The industry reads player-hostile monetisation as a revenue decision. Most of the time it is a measurement decision. A team watching conversion and quarterly revenue sees a system working, and the number that would catch it lying is D180 cohort retention, which arrives far too late to argue with in a quarterly review. So the pattern repeats, and each repetition spends trust that does not come back. That gap is the work I want: building the instrumentation that makes the long-horizon number visible early enough to defend.</p>
                        <p>Since July 2025 I have published measured teardowns of live-service systems - Digital Extremes, EA, Valve, Netflix × Mattel - modelled in Machinations under declared protocols. Certified Game Economy Designer.</p>
                        <p>Before that, two years as a Product Manager at Bajaj Finserv: a 0-to-1 digital lending platform taken from 1% to 100% of traffic in six weeks with zero P0 blockers, +15% application conversion, -40% transmission failure rates.</p>
                        <p>I am looking for a Product Manager seat on a live-service game - economy, LiveOps, or player progression. If your D30 curve is doing something your dashboards have not explained yet, that is the conversation I want.</p>
                    </div>

                    <div className="about-stats-row fade-in">
                        {[
                            { num: '2+', label: 'Years PM Experience' },
                            { num: '6+', label: 'Products Delivered' },
                            { num: 'LR1', label: 'Warframe Legendary Rank 1 · 938 tracked hours' },
                            { num: '4', label: 'Studios torn down and published' }
                        ].map((stat, i) => (
                            <div key={i} className="comet-card stat-card fade-in" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="comet-card-content">
                                    <span className="stat-number">{stat.num}</span>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="deep-dives" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">Strategic Deep Dives</h2>
                    <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }} className="fade-in">Swipe or click to explore product analyses and case studies.</p>
                    <div className="fade-in">
                        <DepthCarousel items={deepDiveItems} />
                    </div>
                </div>
            </section>

            <section id="experience" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">Experience Timeline</h2>
                    <div className="timeline fade-in">
                        {[
                            {
                                title: 'Product Manager - Game Systems & Live Economy Analysis (Independent)',
                                company: ['Independent Practice', 'Nov 2025 - Present'],
                                desc: 'Started alongside caregiving in Nov 2025, full time since Mar 2026. Model and publish quantitative economy teardowns of live-service games (Warframe in Machinations; NFS Most Wanted 2005), under declared protocols. Reconstruct early-game progression to locate drop gates, resource bottlenecks and pacing constraints, stress-tested with Monte Carlo simulation. The work ends in product briefs that resolve the binding constraint without devaluing the grind. Certifications: Game Economy Designer, Machinations Essentials.',
                                tags: ['Game Economy Design', 'Systems Design', 'Machinations.io', 'Monte Carlo Simulation', 'LiveOps', 'Progression Modeling']
                            },
                            {
                                title: 'Career Break - Caregiving',
                                company: ['Personal', 'Aug 2025 - Mar 2026'],
                                desc: 'Dedicated time to family health and caregiving responsibilities while maintaining continuous independent research, economy modeling, and game systems analysis.',
                                isMuted: true
                            },
                            {
                                title: 'Product Manager',
                                company: ['Bajaj Finserv - Bharat Lending CoE', 'Jan 2025 - Jul 2025'],
                                desc: 'Led SME lending BRD tailoring and requirement gathering, cutting rework by 25%. Collaborated with 3+ tech teams to deliver PWA & SFDC integration, reducing release cycle by 2 weeks. Ran release readiness end to end: 250+ UAT/CUG test cases across PWA, middleware and SFDC automations, zero P0 blockers at launch.'
                            },
                            {
                                title: 'Associate Product Manager',
                                company: ['Bajaj Finserv - Bharat Lending CoE', 'Nov 2024 - Jan 2025'],
                                desc: 'Authored BRDs for BFL-BFDL and Airtel-BFL partnerships, accelerating partner approvals by 20%. Developed technical workflows and Figma mockups, cutting review cycles by 30%. Coordinated UAT with 25+ test cases, enabling successful first-pass testing.'
                            },
                            {
                                title: 'Associate Product Manager',
                                company: ['Bajaj Finserv - Credit Cards CoE', 'Jun 2023 - Nov 2024'],
                                desc: 'Lifted application conversion 15% through SoQL funnel analysis, ETB/NTB segmentation, dynamic auto-fill and targeted UI/UX optimisation. Owned BRDs and backlog alignment, improving sprint velocity by 20%. Developed Salesforce dashboards for data-driven decisions, increasing engagement by 12%. Led Agile coordination with 100% sprint target adherence over 6 releases.'
                            },
                            {
                                title: 'Education Journey',
                                company: [
                                    'M.S. Management Science: Business Analytics & Systems • University at Buffalo',
                                    'M.B.A., Operations • Amrita School of Business, Bengaluru',
                                    'B.E., Computer Science Engineering • Dr. Ambedkar Institute of Technology, Bengaluru'
                                ],
                                desc: 'Specialized in Business Analytics with 3.644/4 GPA. MBA with specialization excellence award and leadership as class representative. Captain of Men\'s Basketball Team during engineering, combining technical skills with leadership experience.'
                            }
                        ].map((exp, i) => (
                            <div key={i} className={`timeline-item fade-in ${exp.isMuted ? 'timeline-item-muted' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="comet-card timeline-content" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                    <div className="comet-card-content">
                                        <div className="job-title">{exp.title}</div>
                                        <div className="company">
                                            {Array.isArray(exp.company) ? (
                                                exp.company.map((line, idx) => (
                                                    <div key={idx} className="company-line">{line}</div>
                                                ))
                                            ) : (
                                                <div className="company-line">{exp.company}</div>
                                            )}
                                        </div>
                                        <div className="job-description">{exp.desc}</div>
                                        {exp.tags && (
                                            <div className="timeline-tags" style={{ marginTop: '0.8rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                {exp.tags.map((tag, ti) => (
                                                    <span key={ti} style={{
                                                        fontSize: '0.75rem',
                                                        padding: '0.2rem 0.6rem',
                                                        background: 'rgba(255, 143, 0, 0.12)',
                                                        border: '1px solid rgba(255, 143, 0, 0.3)',
                                                        borderRadius: '12px',
                                                        color: '#FFE0B2'
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="certifications" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">Certifications</h2>
                    <div className="cert-grid fade-in">
                        {[
                            { logo: machinationsLogo, logoClass: '', title: 'Certified Game Economy Designer', issuer: 'Machinations.io • 2026', url: '/assets/certificates/machinations-certified-game-economy-designer.pdf' },
                            { logo: machinationsLogo, logoClass: '', title: 'Machinations Essentials', issuer: 'Machinations.io • 2026', url: '/assets/certificates/machinations-essentials.pdf' },
                            { logo: anthropicLogo, logoClass: 'cert-logo-anthropic', title: 'AI Fluency', issuer: 'Anthropic • 2026', url: 'https://verify.skilljar.com/c/6ubvqq8ijdyd' },
                            { logo: eaLogo, logoClass: 'cert-logo-ea', title: 'Product Management', issuer: 'Electronic Arts (EA)', url: '/assets/certificates/ea-product-management.png' },
                            { logo: mckinseyLogo, logoClass: 'cert-logo-mckinsey', title: 'McKinsey Forward Program', issuer: 'McKinsey & Company', url: '/assets/certificates/mckinsey-forward-program.pdf' },
                            { logo: jpmcLogo, logoClass: 'cert-logo-jpmc', title: 'Agile Program', issuer: 'JP Morgan Chase', url: '/assets/certificates/jpmorgan-chase-agile-program.png' },
                            { logo: pendoLogo, logoClass: 'cert-logo-pendo', title: 'AI for Product Management', issuer: 'Pendo', url: 'https://www.credly.com/badges/69a873f8-a661-41f9-a4f8-d861370d62e3' },
                            { logo: gcpLogo, logoClass: 'cert-logo-gcp', title: 'Google Cloud Platform', issuer: 'Google Cloud', url: 'https://www.credly.com/users/adwaith-v.6245a192/badges#credly' },
                            { logo: n8nLogo, logoClass: 'cert-logo-n8n', title: 'n8n Automation Level 1', issuer: 'n8n', url: 'https://community.n8n.io/badges/104/completed-n8n-course-level-1?username=beingsavage' }
                        ].map((cert, i) => (
                            <div key={i} className="comet-card cert-card fade-in" onClick={() => window.open(cert.url, '_blank')} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="comet-card-content" style={{ textAlign: 'center', alignItems: 'center' }}>
                                    <div className="cert-icon-container">
                                        <img className={`cert-logo ${cert.logoClass || ''}`} src={cert.logo} alt={cert.issuer} />
                                    </div>
                                    <div className="cert-title" style={{ textAlign: 'center', width: '100%', margin: '0 auto 0.8rem auto' }}>{cert.title}</div>
                                    <div className="cert-issuer" style={{ textAlign: 'center', width: '100%' }}>{cert.issuer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="skills" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">Skills & Expertise</h2>
                    <div className="skills-grid fade-in">
                        {[
                            {
                                title: 'Game Economy & Systems',
                                skills: ['Economy Modeling & Balancing', 'Machinations.io', 'Progression & Level Pacing', 'Sink & Source Accounting', 'Drop Tables & Probabilistic Design', 'Monte Carlo Simulations']
                            },
                            {
                                title: 'LiveOps & Player Lifecycle',
                                skills: ['Event Architecture & Cadence', 'FTUE & Friction Analysis', 'Cohort Retention (D1/D7/D30/D180)', 'Churn Diagnostic Modeling', 'Monetisation Ethics & Guardrails', 'Battle Pass & Reward Curves']
                            },
                            {
                                title: 'Product & Delivery',
                                skills: ['0-to-1 Product Launches', 'BRD & PRD Authoring', 'Cross-Functional Leadership', 'Agile / Scrum (6+ Releases)', 'UAT & Test Case Design', 'Stakeholder Alignment']
                            },
                            {
                                title: 'Data & Instrumentation',
                                skills: ['Funnel Telemetry & Event Taxonomies', 'Dashboarding (Tableau, Salesforce)', 'SQL & Exploratory Data Analysis', 'Cohort Analysis & Segmentation', 'Statistical Significance Testing', 'Quantitative User Research']
                            },
                            {
                                title: 'Platform & Tooling',
                                skills: ['Salesforce (SFDC) Integration', 'Progressive Web Apps (PWA)', 'API & System Architecture', 'No-Code / Low-Code (n8n)', 'Git & Modern Dev Workflows', 'AI Augmentation & Automation']
                            }
                        ].map((cat, i) => (
                            <div key={i} className="comet-card skill-category fade-in" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="comet-card-content">
                                    <h3>{cat.title}</h3>
                                    <ul className="skill-list">
                                        {cat.skills.map((skill, si) => (
                                            <li key={si}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="section fade-in">
                <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
                    <h2 className="fade-in">Contact</h2>
                    <p className="contact-subtitle fade-in" style={{ color: '#A8AEB8', fontSize: '1.05rem', margin: '1.5rem 0' }}>
                        If your D30 curve is doing something your dashboards have not explained yet, let's talk.
                    </p>
                    <div className="contact-button-group fade-in">
                        <ContactButton email="adwaith.mrv@gmail.com" onOpenForm={handleOpenForm} />
                        <LinkedInButton />
                    </div>

                    {!showContactForm && (
                        <button 
                            type="button" 
                            className="contact-form-toggle fade-in"
                            onClick={handleOpenForm}
                        >
                            Or send a message via direct contact form ↓
                        </button>
                    )}

                    {showContactForm && (
                        <div ref={contactFormRef} className="contact-form-wrapper fade-in visible">
                            <div className="contact-form-header">
                                <h3>Send a Direct Message</h3>
                                <button 
                                    type="button" 
                                    className="contact-form-close-btn"
                                    onClick={() => { setShowContactForm(false); setFormSubmitted(false); }}
                                    aria-label="Close Contact Form"
                                >
                                    ✕ Close
                                </button>
                            </div>
                            
                            {formSubmitted ? (
                                <div className="contact-form-success">
                                    <div className="success-icon">✓</div>
                                    <h4>Message Prepared!</h4>
                                    <p>Your default email client has been launched with your message pre-filled.</p>
                                    <p className="success-sub">A copy of your message has also been saved to your clipboard in case you prefer pasting directly into webmail.</p>
                                    <button 
                                        type="button" 
                                        className="submit-btn" 
                                        style={{ marginTop: '1.5rem' }}
                                        onClick={() => { setFormSubmitted(false); setShowContactForm(false); }}
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input type="text" id="name" name="name" required placeholder="Your name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input type="email" id="email" name="email" required placeholder="your.email@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input type="text" id="company" name="company" placeholder="Company or Studio" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Your Role</label>
                                        <input type="text" id="role" name="role" placeholder="e.g. Lead Producer, VP of Product" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message *</label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="5" 
                                            placeholder="Tell me about the opportunity or how we can work together..." 
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn" id="submitBtn">Let's Connect</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Home;
