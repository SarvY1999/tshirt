import React from 'react'
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"
import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from './user/Signup'
/**
 * 
 * Note: From version 6 onwards, the react-router-dom has replaced “Switch” with “Routes”
 */
const Routers = () => {
    return (
        <Router>
            <Switch>
                <Route path ="/" exact component={Home}></Route>
                <Route path ="/signup" exact component={Signup}></Route>
                <Route path ="/signin" exact component={Signin}></Route>
            </Switch>
        </Router>
    )
}

export default Routers;