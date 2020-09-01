import React from 'react'
import reactDom from 'react-dom'
import Hello from './hello'
import './index.css'
import Popular from './components/popular'
import Battle from './components/battle'
import Result from './components/result'
import {ThemeProvider} from './context/context'
import Nav from './components/nav'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        theme:'light',
        toggleTheme: () =>{
          this.setState(({theme})=>({
            theme:theme === 'light' ? 'dark' : 'light'
          }))
        }
      }
    }
    render(){
        return (
          <Router>
            <ThemeProvider value={this.state}>
              <div className={this.state.theme}>
                <div className="container">
                  <Nav />
                  <Switch>
                      <Route exact path='/' component={Popular}/>
                  <Route exact path='/battle' component={Battle}/>
                  <Route path='/battle/results' component={Result}/>
                  <Route render={()=><h1>404. Not Found</h1>}/>
                  </Switch>
                </div>
              </div>
            </ThemeProvider>
          </Router>
        );
    }
}

reactDom.render(
    <App/>,
    document.getElementById('app')
)