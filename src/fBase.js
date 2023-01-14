
import {initializeApp} from "firebase/app";
import * as firbaseAuthIntance from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

const fApp = initializeApp(firebaseConfig);

const authService = {
  auth : firbaseAuthIntance.getAuth(fApp) ,
  authIntance : firbaseAuthIntance
}

export default authService ;