import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Button } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyCexX4P9O_MBBuBBZJeQkkMh2-geXOcZr8",
    authDomain: "nintenwho.firebaseapp.com",
    projectId: "nintenwho",
    storageBucket: "nintenwho.appspot.com",
    messagingSenderId: "428499765307",
    appId: "1:428499765307:web:ebe273fb2d9fac20c5341e"
};

export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore()

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export const SignOut = () => {
    return auth.currentUser && (
        <Button title='Se déconnecter' onPress={() => auth.signOut()} />
    )
}

export const deleteAllInCollection = async (path) => {
    const snap = await firestore.collection(path).get()
    snap.docs.map(doc => {
        doc.ref.delete()
    })
}
