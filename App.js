import React from 'react';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';     // distribue le store et ses reducers à toute l'application.
import Store from './Store/configureStore';

export default class App extends React.Component {
    render() {
        return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
        );
    }
}


