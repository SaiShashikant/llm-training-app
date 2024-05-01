import React from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import {ls_page_num, ls_query_ans, ls_query_qa, ls_rows_per_page} from "./utils/Constants";
// import {ToastProvider} from "./components/ToastContext";



const App: React.FC = () => {
    if (!localStorage.getItem(ls_page_num)){
        localStorage.setItem(ls_page_num,"1")
    }
    if (!localStorage.getItem(ls_rows_per_page)){
        localStorage.setItem(ls_rows_per_page,"50")
    }
    if (!localStorage.getItem(ls_query_qa)){
        localStorage.setItem(ls_query_qa,"")
    }
    if (!localStorage.getItem(ls_query_ans)){
        localStorage.setItem(ls_query_ans,"")
    }


    return (<div className="">

        {/*<ToastProvider>*/}
            <Header/>
            <Body/>
        {/*</ToastProvider>*/}
    </div>);
};

export default App;
