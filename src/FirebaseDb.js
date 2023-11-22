import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
};

const firebaseApp = initializeApp(firebaseConfig);
//const storage = getStorage(firebaseApp, url);

console.log(1);
console.log(firebaseApp)
console.log(1.1);

const db = getDatabase(firebaseApp);
console.log(db);
console.log(2);

//export { storage };
export default firebaseApp;