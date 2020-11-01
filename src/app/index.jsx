import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import {init} from './controller/libs/firestore';
import AuthUserContext from './controller/contexts/AuthUserContext';
import Login from './pages/Login';
import App from './App';
import './styles/main.scss';

const Start = ({history}) => {
    const [authUser, setAuthUser] = useState();
    useEffect(() => {
        init(user => {
            setAuthUser(user);
            // history.push(user ? '/app' : '/');
            history.push('/app')
        });
    }, [history]);

    return (
        <AuthUserContext.Provider value={[authUser]}> 
            <Switch>
                <Route path='/app'>
                    <Router basename={process.env.PUBLIC_URL}>
                        <App />
                    </Router>
                </Route>
                <Route exact path='/' component={Login}/>
            </Switch>
        </AuthUserContext.Provider> 
    );
}

export default withRouter(Start);
