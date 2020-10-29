import {useState, useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
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
            history.push(user ? '/app' : '/login');
        });
        console.log("v0.0.1");
    }, [history]);

    return (
        <AuthUserContext.Provider value={[authUser]}> 
            <Switch>
                <Route exact path='/'/>
                <Route path='/login' component={Login}/>
                <Route path='/app' component={App}/>
            </Switch>
        </AuthUserContext.Provider> 
    );
}

export default withRouter(Start);
