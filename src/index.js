import React from 'react';
import ReactDOM from 'react-dom/client';
import * as amplitude from '@amplitude/unified';
import App from './App';

const amplitudeApiKey = process.env.REACT_APP_AMPLITUDE_API_KEY;
if (!amplitudeApiKey) {
  console.warn('Amplitude API key missing — analytics disabled');
} else {
  amplitude.initAll(amplitudeApiKey, {
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 1 },
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
