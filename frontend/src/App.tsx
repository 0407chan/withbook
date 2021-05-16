import Header from '@/components/common/Header'
import LandingPage from '@/pages/LandingPage'
import MainPage from '@/pages/MainPage'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BookPage from './pages/BookPage'

const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={MainPage} />
        <Route exact path="/book/:id" component={BookPage} />
        <Route
          exact
          path="/book/:id/bookmark/:bookmarkId"
          component={BookPage}
        />
      </Switch>
    </Router>
  )
}

export default App
