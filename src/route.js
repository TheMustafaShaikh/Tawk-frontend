import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/home"
import Category from "./pages/category"
import Context from "./context"

export default function Routes() {
    let GlobalID = useState("")
    return (
        <div>
            <Context.Provider value={GlobalID}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/category" component={Category}/>
                    </Switch>
                </Router>
             </Context.Provider>
        </div>
    )
}
