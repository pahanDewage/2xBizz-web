import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3oLuE49u-MwqUhFY6Nyh8T77cZkDVPLs",
  authDomain: "xbizz2.firebaseapp.com",
  projectId: "xbizz2",
  storageBucket: "xbizz2.firebasestorage.app",
  messagingSenderId: "695485346604",
  appId: "1:695485346604:web:442ae43439396566127289"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBZUgxglLeCx0UP5IJAtaU0nGkE5f9uuyo',
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log('API KEY:', process.env.REACT_APP_FIREBASE_API_KEY);

export { auth };
