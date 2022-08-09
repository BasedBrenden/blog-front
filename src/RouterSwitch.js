import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from "./App";
import Form from "./components/Form";
import Article from "./components/Article"

const RouteSwitch = () =>{


    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/admin" element={<Form/>} />
            <Route path="/article" element ={<Article/>}/>
        </Routes>
        
        </BrowserRouter>
    )
}

export default RouteSwitch