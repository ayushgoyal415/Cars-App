import ReactDOM from 'react-dom/client'; // Note: cannot write client.js

import App from './App.jsx';

import './styles/.css';
import './styles/credentials.css';
import './styles/tooltip.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
