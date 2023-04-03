
import { initializeApp } from 'firebase/app';

  import {getFirestore,setDoc, collection, updateDoc,writeBatch, doc, deleteField, getDoc } from  "firebase/firestore"

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function setdados(_dados){
  dados=_dados
}
export function CreateUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('registrei')
      console.log(user)

      uid=user.uid()
      await PuxarDados()
     // await setDoc(doc(db, "users",user.uid), new Object);
      

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)

      console.log(errorMessage)

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


  let Swot = new Object()
  Swot[nome]=Data


  const batch = writeBatch(db);
  const nycRef = doc(db, "users", uid);
  batch.update(nycRef, Swot);

  
  await batch.commit();
  console.log('Firebase: dados escritos')

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

    let linkto=document.getElementById('ProjectPage')
    linkto.click()
    console.log('Firebase Dao: estou executando')
    return true

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    const db = getFirestore(app);
    await setDoc(doc(db, "users",uid), new Object);
    PuxarDados()
    return false
  }
}


export async function updateprojeto(nome,data){
  const db = getFirestore(app);
  const batch = writeBatch(db);
  const ref = doc(db, "users", uid);
  let json ='{ "'+nome+'": '+ JSON.stringify(data) +'}' 
  batch.update(ref, JSON.parse(json));
  await batch.commit();
  console.log('Firebase Dao: dados escritos')
}

export async function deletarprojeto(nome){
  const db = getFirestore(app);

  const ref = doc(db, "users", uid);
  
  let obj=new Object()
  obj[nome]=deleteField( )
  await updateDoc(ref,obj);

}
export async function deslogar(){
  uid=''
  dados=''
}
