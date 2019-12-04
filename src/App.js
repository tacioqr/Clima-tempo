import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/Login'
import Weather from './components/Weather'

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/">
            <Login />
          </Route>
      </Switch>
    </Router>
  )
}

export default App
