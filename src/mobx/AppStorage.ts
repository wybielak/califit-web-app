import { signInWithPopup, signOut } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth, googleProvider } from "../config/FirebaseConfig";


export default class AppStorage {
    constructor() {
        makeAutoObservable(this)
    }

    //SECTION - autoryzacja

    signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            console.log("Zalogowano")
        } catch (err) {
            console.error(err)
        }
    }

    logOut = async () => {
        try {
            await signOut(auth)
            console.log("Wylogowano")
        } catch (err) {
            console.error(err)
        }
    }

    //SECTION - przechowywanie danych
}