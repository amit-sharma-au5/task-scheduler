import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Link, Switch } from "react-router-dom";
import Home from './Components/Home'




class App extends React.Component {
  render() {
    return (
      <div className="my-app">

        <BrowserRouter>
         
          
            <Switch>

              <Route exact path="/" component={Home} />
                
            </Switch>

          
        </BrowserRouter>

      </div>
    )
  }
}


export default App;
