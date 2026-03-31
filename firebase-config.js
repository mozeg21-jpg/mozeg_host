const firebaseConfig={
    apiKey:"AIzaSyAR7iTjOX7NffkuqMmJ1rSbltvdRI269tg",
    authDomain:"data-cebe2.firebaseapp.com",
    databaseURL:"https://data-cebe2-default-rtdb.firebaseio.com",
    projectId:"data-cebe2",
    storageBucket:"data-cebe2.firebasestorage.app",
    messagingSenderId:"573329103250",
    appId:"1:573329103250:web:1b0f096bf5d8a0a421894b",
    measurementId:"G-L6TYMK9HFL"
};
if(!firebase.apps.length){firebase.initializeApp(firebaseConfig)}
const auth=firebase.auth();
const db=firebase.firestore();
const storage=firebase.storage();
auth.onAuthStateChanged((user)=>{
    if(user){if(window.location.pathname.includes('login')||window.location.pathname.includes('index')){window.location.href='dashboard.html'}}
    else{if(window.location.pathname.includes('dashboard')){window.location.href='login.html'}}
});
