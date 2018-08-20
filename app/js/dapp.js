import App from './components/App';
import EmbarkJS from 'Embark/EmbarkJS';
import React from 'react';
import DReddit from 'Embark/contracts/DReddit';
import {render} from 'react-dom';

window.EmbarkJS = EmbarkJS;
window.DReddit = DReddit;

render(<App />, document.getElementById('root'));
