import Header from '@/components/common/Header'
import ViewBook from '@/components/viewBook'
import Home from '@/pages/Home'
import LandingPage from '@/pages/LandingPage'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
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
