import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import Notfound from './components/Notfound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route component={Notfound} />
  </Switch>
)

export default App
