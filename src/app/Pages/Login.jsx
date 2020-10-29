import {useEffect} from 'react';
import {ui, firebase} from '../controller/libs/firestore';
import 'firebaseui/dist/firebaseui.css';

const Login = () => {
    useEffect(() => {
        ui.start('#auth-container', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            // tosUrl: '<your-tos-url>',
        });
    })
    return (
        <div className="login-page">
            app
            <div id="auth-container"></div>
        </div>
    );
}

export default Login;
