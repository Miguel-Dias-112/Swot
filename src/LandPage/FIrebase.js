
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { collection, addDoc,writeBatch, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let uid = ''
export let dados =''
const firebaseConfig = {

  apiKey: "AIzaSyAF2K1Yc2qLyEXYzGry6-2-yi0_pYQvq0E",

  authDomain: "swot-27754.firebaseapp.com",

  projectId: "swot-27754",

  storageBucket: "swot-27754.appspot.com",

  messagingSenderId: "439078276346",

  appId: "1:439078276346:web:06ef9b50c29dd5a9060d43",

  measurementId: "G-Z7B4GLVG0F"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function setdados(_dados){
  dados=_dados
}
export function CreateUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('registrei')
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}


export function LoginUser(email, password) {
  console.log(email,password)

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)

      uid = user.uid
      await PuxarDados()

      let linkto=document.getElementById('ProjectPage')
      linkto.click()
      console.log('Firebase Dao: estou executando')
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
}


const provider = new GoogleAuthProvider();

export function LoginEmail(params) {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      uid = user.uid
      await PuxarDados()

      let linkto=document.getElementById('ProjectPage')
      linkto.click()

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('Firebase Dao: estou executando')
 
      
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;  
      console.log(errorMessage)
    });

}

export async function NovoSwot(nome,Data) {

  const db = getFirestore(app);


  let F=
   {
    Forças: Data['Forças'],
    Fraquezas:Data['Fraquezas'],
    Oportunidades:Data['Ameaças'],
    Ameaças:Data['Oportunidades']
   }
  let json ='{ "'+nome+'": '+ JSON.stringify(F) +'}' 


  console.log(json)


  
  const batch = writeBatch(db);

// Set the value of 'NYC'
  const nycRef = doc(db, "users", uid);
  batch.update(nycRef, JSON.parse(json));

 // await setDoc(doc(db, "users", uid),JSON.parse(json));
  //console.log(obj)
  await batch.commit();
  console.log('Firebase Dao: dados escritos')

}

export  async function PuxarDados() {
  const db = getFirestore(app);

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    let _dados = docSnap.data()
    dados=_dados
    console.log(dados)

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return 'nada encontrado'

  }
}


