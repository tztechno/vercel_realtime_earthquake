// App.jsx or wherever your routes are defined
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout'; // Import Layout component
import NavigationPage from './pages/NavigationPage'; // Import the Navigation standalone page

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route path="/navigation" component={NavigationPage} />
            </Switch>
        </Router>
    );
}

export default App;