
import firebase from "firebase/app"
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyD9V1pPqlUNngkdmEqICi1R2MT2RJ3doac",
    authDomain: "rachel7580test.firebaseapp.com",
    databaseURL: "https://rachel7580test.firebaseio.com",
    projectId: "rachel7580test",
    storageBucket: "rachel7580test.appspot.com",
    messagingSenderId: "705711408462",
    appId: "1:705711408462:web:cfaa45ca773b7e27"
};

firebase.initializeApp(firebaseConfig);
export default firebase;