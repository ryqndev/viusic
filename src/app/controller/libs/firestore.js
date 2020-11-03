import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

firebase.initializeApp({
    apiKey: "AIzaSyCEYBizu78ygR4c077CpPkcL7f-aQDpIaM",
    authDomain: "viusic.firebaseapp.com",
    databaseURL: "https://viusic.firebaseio.com",
    projectId: "viusic",
    storageBucket: "viusic.appspot.com",
    messagingSenderId: "330131056852",
    appId: "1:330131056852:web:d5e4a08dc0fa733bc1f341",
    measurementId: "G-GHCRGN47RE"
});

let database, ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

database = firebase.firestore(); 
database.enablePersistence().catch(err => {console.error(err)});


const init = (callback) => {
    firebase.auth().onAuthStateChanged(callback);
}
const logout = () => {
    firebase.auth().signOut().then(function() {
        localStorage.clear();
        window.location.reload();
    }).catch(err => {
        console.error(err)
    });      
}
export {
    ui,
    firebase,
    init,
    logout,
    database,
}