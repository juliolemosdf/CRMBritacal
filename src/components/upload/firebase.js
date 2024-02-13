import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBkNFQz7cUY_1_2JbcrTo3rbq-dL6Ok8SM",
  authDomain: "crmbritacal.firebaseapp.com",
  projectId: "crmbritacal",
  storageBucket: "crmbritacal.appspot.com",
  messagingSenderId: "125114827719",
  appId: "1:125114827719:web:fe839a139873fd9156cfe2",
  measurementId: "G-XJFGWTXCS4"
};

console.log(firebaseConfig);

let firebaseapp;
if (!firebase.apps.length) {
  firebaseapp = firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

export { storage };