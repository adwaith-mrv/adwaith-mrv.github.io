import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Particles from './components/Particles';
import Home from './pages/Home/Home';
import bgMusic from './assets/audio/Battlefield 1 The Flight of the Pigeon.mp3';

function App() {
    const [isLocked, setIsLocked] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        }
    }, [isLocked]);

    const handleUnlock = () => {
        setIsLocked(false);
        if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio error:', err));
        }
        // Smooth scroll to scroll to about section after unlock
        setTimeout(() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    return (
        <div className={`App ${isLocked ? 'locked' : 'unlocked'}`}>
            <div id="reactbits-particles">
                <Particles
                    particleCount={200}
                    particleSpread={10}
                    speed={0.06}
                    moveParticlesOnHover={true}
                    particleHoverFactor={2.0}
                    alphaParticles={false}
                    particleBaseSize={80}
                    sizeRandomness={1.2}
                    cameraDistance={18}
                    disableRotation={false}
                />
            </div>

            <Home isLocked={isLocked} onUnlock={handleUnlock} />

            <audio id="bg-music" ref={audioRef} preload="auto">
                <source src={bgMusic} type="audio/mpeg" />
            </audio>
        </div>
    );
}

export default App;
