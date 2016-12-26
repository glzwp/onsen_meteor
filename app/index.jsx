//import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import App from './components/App.jsx';
import alt from './libs/alt';

/*we don't need local storage since we are connecting to meteor backend*/
/*
import storage from './libs/storage';
import persist from './libs/persist';
persist(alt, storage, 'app');
*/
ons.ready(() => {
    ReactDOM.render(<App />, document.getElementById('app'));
});