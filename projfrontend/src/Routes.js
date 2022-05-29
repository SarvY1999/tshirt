import React from 'react'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import Home from "./core/Home"
/**
 * 
 * Note: From version 6 onwards, the react-router-dom has replaced “Switch” with “Routes”
 */
const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path ="/" exact element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}

export default Routers;