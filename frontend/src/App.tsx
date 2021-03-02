import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './components/home'
import ViewBook from './components/viewBook'

const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book/:id" component={ViewBook} />
        <Route
          exact
          path="/book/:id/bookmark/:bookmarkId"
          component={ViewBook}
        />
      </Switch>
    </Router>
  )
}

export default App
