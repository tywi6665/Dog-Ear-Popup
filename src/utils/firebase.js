import * as firebase from 'firebase';
import 'firebase/firestore';

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyD9SrA01N_4vLdkCLrddWlCGQl_ylIszaI",
    authDomain: "dog-ear-recipe-extension-4bfbf.firebaseapp.com",
    databaseURL: "https://dog-ear-recipe-extension-4bfbf.firebaseio.com",
    projectId: "dog-ear-recipe-extension-4bfbf",
    storageBucket: "dog-ear-recipe-extension-4bfbf.appspot.com",
    messagingSenderId: "147277096133",
    appId: "1:147277096133:web:6e74a347d42254b231bcac",
    measurementId: "G-5GEY75XZWH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;