import React from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import {ToastProvider} from "./components/ToastContext";


const App: React.FC = () => {
    return (<div className="">

        <ToastProvider>
            <Header/>
            <Body/>
        </ToastProvider>
        </div>);
};

export default App;
