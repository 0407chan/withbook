import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './components/home'
import ViewBook from './pages/ViewBook'

const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book/:id" component={ViewBook} />
      </Switch>
    </Router>
  )
}

export default App
