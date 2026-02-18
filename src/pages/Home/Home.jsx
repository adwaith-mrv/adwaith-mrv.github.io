import React, { useEffect } from 'react';
import KnowMoreButton from '../../components/UI/KnowMoreButton';
import './Home.css';

const Home = ({ isLocked, onUnlock }) => {
    useEffect(() => {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // We run this once on mount, and we provide a small buffer to ensure
        // all elements are in the DOM even if they are rendering conditionally.
        // But now we render them always.
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xMid = rect.width / 2;
        const yMid = rect.height / 2;
        const rotateY = (x - xMid) / xMid * 15;
        const rotateX = -(y - yMid) / yMid * 12;

        card.style.transform = `perspective(1000px) scale(1.05) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        card.style.boxShadow = `0 25px 50px rgba(255, 143, 0, 0.25), 0 10px 30px rgba(79, 195, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
        card.style.borderColor = 'rgba(255, 143, 0, 0.5)';
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const subject = `Portfolio Inquiry from ${data.name}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not specified'}\nRole: ${data.role || 'Not specified'}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:adwaith.mrv@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        alert('Thank you! Your email client should open with your message.');
        e.target.reset();
    };

    return (
        <main className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="premium-title">Adwaith V</h1>
                    <p className="tagline">Product Manager</p>
                    <p className="subtitle">FinTech • Gaming • AI-Powered Solutions</p>
                    {isLocked && <KnowMoreButton onClick={onUnlock} />}
                </div>
            </section>

            <section id="about" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">About Me</h2>
                    <div className="about-stats-row fade-in">
                        {[
                            { num: '2+', label: 'Years PM Experience' },
                            { num: '6+', label: 'Products Delivered' },
                            { num: '25%', label: 'Reduced Rework' },
                            { num: '100%', label: 'Sprint Adherence' }
                        ].map((stat, i) => (
                            <div key={i} className="comet-card stat-card fade-in" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="comet-card-content">
                                    <span className="stat-number">{stat.num}</span>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about-text fade-in">
                        <p>Product Manager with expertise in FinTech innovation and a passion for gaming. Previously leading cross-functional product efforts at Bajaj Finserv, where I've successfully delivered multiple lending and credit card products that have transformed user experiences and business outcomes.</p>
                        <p>My journey from Computer Science Engineering to Product Management has been fueled by my analytical mindset and love for strategic problem-solving - skills I've honed through years of competitive gaming and basketball leadership. I specialize in building AI-powered financial solutions, having reduced release cycles by 2 weeks and improved conversions by 15% through data-driven product decisions.</p>
                        <p>When I'm not optimizing user funnels or conducting UAT testing with 140+ test cases, you'll find me exploring the latest gaming trends, playing basketball, or experimenting with no-code automation tools to enhance team productivity.</p>
                    </div>
                </div>
            </section>

            <section id="experience" className="section fade-in">
                <div className="container">
                    <h2 className="fade-in">Experience Timeline</h2>
                    <div className="timeline fade-in">
                        {[
                            { title: 'Product Manager', company: 'Bajaj Finserv - Bharat Lending CoE • Jan 2025 - July 2025', desc: 'Led SME lending BRD tailoring and requirement gathering, cutting rework by 25%. Designed workflows and wireframes, expediting sign-off cycles by 30%. Collaborated with 3+ tech teams to deliver PWA & SFDC integration, reducing release cycle by 2 weeks. Conducted extensive UAT testing with 140+ cases, cutting production bugs by 20%.' },
                            { title: 'Junior Product Manager - Lending', company: 'Bajaj Finserv - Bharat Lending CoE • Nov 2024 - Jan 2025', desc: 'Authored BRDs for BFL-BFDL and Airtel-BFL partnerships, accelerating partner approvals by 20%. Developed technical workflows and Figma mockups, cutting review cycles by 30%. Coordinated UAT with 25+ test cases, enabling successful first-pass testing.' },
                            { title: 'Junior Product Manager - Credit Cards', company: 'Bajaj Finserv - Credit Cards CoE • Jun 2023 - Nov 2024', desc: 'Conducted funnel analysis and implemented UI/UX improvements, increasing conversions by 15%. Owned BRDs and backlog alignment, improving sprint velocity by 20%. Developed Salesforce dashboards for data-driven decisions, increasing engagement by 12%. Led Agile coordination with 100% sprint target adherence over 6 releases.' },
                            { title: 'Education Journey', company: 'MS Business Analytics (Buffalo) • MBA Operations (Amrita) • BE Computer Science', desc: 'Specialized in Business Analytics with 3.644/4 GPA. MBA with specialization excellence award and leadership as class representative. Captain of Men\'s Basketball Team during engineering, combining technical skills with leadership experience.' }
                        ].map((exp, i) => (
                            <div key={i} className="timeline-item fade-in">
                                <div className="timeline-dot"></div>
                                <div className="comet-card timeline-content" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                    <div className="comet-card-content">
                                        <div className="job-title">{exp.title}</div>
                                        <div className="company">{exp.company}</div>
                                        <div className="job-description">{exp.desc}</div>
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
                            { icon: '🎯', title: 'McKinsey Forward Program', issuer: 'McKinsey & Company', url: 'https://drive.google.com/file/d/1TcQ5ppMFA6zHqUWm42qVWlzqknuvnotK/view?usp=drive_link' },
                            { icon: '🤖', title: 'AI for Product Management', issuer: 'Pendo', url: 'https://www.credly.com/badges/69a873f8-a661-41f9-a4f8-d861370d62e3' },
                            { icon: '☁️', title: 'Google Cloud Platform', issuer: 'Google Cloud', url: 'https://www.credly.com/users/adwaith-v.6245a192/badges#credly' },
                            { icon: '🎮', title: 'Product Management', issuer: 'Electronic Arts (EA)', url: 'https://drive.google.com/file/d/1X_k1YVgSUKADt47Cr4ayuSEXIJI63GF-/view?usp=drive_link' },
                            { icon: '⚡', title: 'Agile Program', issuer: 'JP Morgan Chase', url: 'https://drive.google.com/file/d/1YvqzZOqKWoiieEZLnl8TuSj3KGNe0syM/view?usp=drive_link' },
                            { icon: '🔧', title: 'n8n Automation Level 1', issuer: 'n8n', url: 'https://community.n8n.io/badges/104/completed-n8n-course-level-1?username=beingsavage' }
                        ].map((cert, i) => (
                            <div key={i} className="comet-card cert-card fade-in" onClick={() => window.open(cert.url, '_blank')} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                <div className="comet-card-content">
                                    <div className="cert-icon">{cert.icon}</div>
                                    <div className="cert-title">{cert.title}</div>
                                    <div className="cert-issuer">{cert.issuer}</div>
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
                            { title: 'Product Management', skills: ['Product Roadmapping & Strategy', 'Agile/Scrum Methodologies', 'BRD Creation & Requirements Gathering', 'Wireframing (Draw.io, Figma)', 'UAT Testing & Test Case Creation', 'Cross-Functional Team Leadership'] },
                            { title: 'FinTech & Technical', skills: ['Salesforce (SFDC) Integration', 'Progressive Web Apps (PWA)', 'SQL & Data Analysis', 'No Code/Low Code Automation (n8n)', 'Manual Testing & Issue Resolution', 'Process Improvement & Monitoring'] },
                            { title: 'Business & Analytics', skills: ['Business Analytics (MS Degree)', 'Funnel Analysis & Optimization', 'Dashboard Development', 'Stakeholder Management', 'Business Analysis & Strategy', 'Process Optimization'] },
                            { title: 'Leadership & Interests', skills: ['Team Leadership (Basketball Captain)', 'Gaming & Strategic Thinking', 'Problem-Solving & Innovation', 'Cross-Functional Collaboration', 'Music & Creative Expression', 'AI Tools & Automation'] }
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
                <div className="container">
                    <h2 className="fade-in">Contact & CTA</h2>
                    <form className="contact-form fade-in" id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" name="company" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Your Role</label>
                            <input type="text" id="role" name="role" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" rows="5" placeholder="Tell me about the opportunity or how we can work together..." required></textarea>
                        </div>
                        <button type="submit" className="submit-btn" id="submitBtn">Let's Connect</button>
                    </form>
                </div>
            </section>

            <div className="ai-badge fade-in">
                🤖 Built with AI Tools
            </div>
        </main>
    );
};

export default Home;
