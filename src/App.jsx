import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Particles from './components/Particles';
import Navbar from './components/UI/Navbar';
import Home from './pages/Home/Home';
import DeepDiveNfsMw2005 from './pages/DeepDive/NFS_MW_2005';
import XCorpBSteel from './pages/DeepDive/XCorpBSteel';
import CJIndustries from './pages/DeepDive/CJIndustries';
import AromaFinechem from './pages/DeepDive/AromaFinechem';
import ChryslerKeiretsu from './pages/DeepDive/ChryslerKeiretsu';
import BangaloreAgri from './pages/DeepDive/BangaloreAgri';
import CiscoSystems from './pages/DeepDive/CiscoSystems';
import bgMusic from './assets/audio/Battlefield 1 The Flight of the Pigeon.mp3';
import { AUDIO_ENABLED } from './config/audioConfig';

const RedirectToVenusGate = () => {
    useEffect(() => {
        window.location.replace('/venus-gate/');
    }, []);
    return null;
};

const RedirectToBindingConstraint = () => {
    useEffect(() => {
        window.location.replace('/binding-constraint/');
    }, []);
    return null;
};

const RedirectToNfsMostWanted = () => {
    useEffect(() => {
        window.location.replace('/nfs-most-wanted/');
    }, []);
    return null;
};

const RedirectToTauReadiness = () => {
    useEffect(() => {
        window.location.replace('/tau-readiness/');
    }, []);
    return null;
};

const RedirectToFallBridge = () => {
    useEffect(() => {
        window.location.replace('/fall-bridge/');
    }, []);
    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/DeepDive/NFS_MW_2005" element={<RedirectToNfsMostWanted />} />
                <Route path="/DeepDive/VenusGate" element={<RedirectToVenusGate />} />
                <Route path="/DeepDive/BindingConstraint" element={<RedirectToBindingConstraint />} />
                <Route path="/DeepDive/TauReadiness" element={<RedirectToTauReadiness />} />
                <Route path="/DeepDive/FallBridge" element={<RedirectToFallBridge />} />
                <Route path="/DeepDive/XCorpBSteel" element={<XCorpBSteel />} />
                <Route path="/DeepDive/CJIndustries" element={<CJIndustries />} />
                <Route path="/DeepDive/AromaFinechem" element={<AromaFinechem />} />
                <Route path="/DeepDive/ChryslerKeiretsu" element={<ChryslerKeiretsu />} />
                <Route path="/DeepDive/BangaloreAgri" element={<BangaloreAgri />} />
                <Route path="/DeepDive/CiscoSystems" element={<CiscoSystems />} />
            </Routes>
        </AnimatePresence>
    );
};

const AppContent = ({ audioRef }) => {
    const location = useLocation();
    const isDeepDive = location.pathname.startsWith('/DeepDive');

    return (
        <div className="App unlocked">
            {!isDeepDive && <Navbar />}

            {!isDeepDive && (
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
            )}

            <AnimatedRoutes />

            {/* Background Audio - Preserved in code; deactivated while AUDIO_ENABLED is false */}
            {AUDIO_ENABLED && (
                <audio id="bg-music" ref={audioRef} preload="auto">
                    <source src={bgMusic} type="audio/mpeg" />
                </audio>
            )}
        </div>
    );
};

function App() {
    const audioRef = useRef(null);

    useEffect(() => {
        console.log(
            '%cBuilt with AI tools. Written, verified and shipped by Adwaith V.',
            'color:#D4AF37;font-family:monospace;font-size:12px'
        );
    }, []);

    // Set music to trigger on scroll or user interaction
    useEffect(() => {
        // Disabled until AUDIO_ENABLED is set to true in src/config/audioConfig.js
        if (!AUDIO_ENABLED) return;

        let hasTriggered = false;

        const startAudio = () => {
            if (hasTriggered) return;
            const audio = audioRef.current || document.getElementById('bg-music');
            if (audio) {
                audio.play()
                    .then(() => {
                        hasTriggered = true;
                        cleanup();
                    })
                    .catch(err => {
                        // User gesture needed under browser Autoplay Policy;
                        // listeners remain active until first user interaction
                        console.log('Audio waiting for user gesture:', err.message);
                    });
            }
        };

        const cleanup = () => {
            window.removeEventListener('scroll', startAudio);
            window.removeEventListener('wheel', startAudio);
            window.removeEventListener('touchmove', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('pointerdown', startAudio);
            window.removeEventListener('mousedown', startAudio);
            window.removeEventListener('keydown', startAudio);
            window.removeEventListener('click', startAudio);
            document.removeEventListener('click', startAudio);
            document.removeEventListener('pointerdown', startAudio);
        };

        window.addEventListener('scroll', startAudio, { passive: true });
        window.addEventListener('wheel', startAudio, { passive: true });
        window.addEventListener('touchmove', startAudio, { passive: true });
        window.addEventListener('touchstart', startAudio, { passive: true });
        window.addEventListener('pointerdown', startAudio, { passive: true });
        window.addEventListener('mousedown', startAudio, { passive: true });
        window.addEventListener('keydown', startAudio, { passive: true });
        window.addEventListener('click', startAudio, { passive: true });
        document.addEventListener('click', startAudio, { passive: true });
        document.addEventListener('pointerdown', startAudio, { passive: true });

        return cleanup;
    }, []);

    return (
        <HashRouter>
            <AppContent audioRef={audioRef} />
        </HashRouter>
    );
}

export default App;
