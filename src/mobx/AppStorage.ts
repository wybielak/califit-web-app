import { signInWithPopup, signOut } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth, db, googleProvider } from "../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

type Texercise = {
    id: string;
    name: string;
    count: number;
    goal: number;
    unit: string;
}

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

    workoutRef = collection(db, 'workout')

    exercises = <Texercise[]>[]

    setExercises = (data: Texercise[]) => {
        this.exercises = data
    }

    getExercises = async () => {
        const myExercisesRef = query(this.workoutRef, where('userId', '==', `${auth!.currentUser!.uid}`))

        const data = await getDocs(myExercisesRef)
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Texercise))


        this.setExercises(filteredData)

        console.log('Pobrano cwiczenia')

        console.log(this.exercises[0].name)

    }
}