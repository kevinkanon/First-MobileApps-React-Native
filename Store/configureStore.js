// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';

/* 
    Le reducer est déclarer dans le Store à travers la function createStore() 
    qui lui même sera rendu disponible à toute notre application via son entrée App.js
*/

export default createStore(toggleFavorite);