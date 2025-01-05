import { signInWithPopup, signOut } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth, db, googleProvider } from "../config/FirebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

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

    newExerciseName = ""
    newExerciseCount = 0
    newExerciseGoal = 0
    newExerciseUnit = ""

    setExercises = (data: Texercise[]) => {
        this.exercises = data

        console.log("Ustawiono ćwiczenia")
    }

    getExercises = async () => {
        const myExercisesRef = query(this.workoutRef, where('userId', '==', `${auth!.currentUser!.uid}`))

        const data = await getDocs(myExercisesRef)
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Texercise))

        this.setExercises(filteredData)

        console.log('Pobrano cwiczenia')
    }

    increase = async (id: string, oldval: number, increaseCount: number) => {
        const docRef = doc(this.workoutRef, id)

        await updateDoc(docRef, {
            count: oldval + increaseCount
        })

        console.log('Zaktualizowano ćwiczenie')

        await this.getExercises()
    }

    decrease = async (id: string, oldval: number, increaseCount: number) => {
        const docRef = doc(this.workoutRef, id)

        await updateDoc(docRef, {
            count: oldval - increaseCount
        })

        console.log('Zaktualizowano ćwiczenie')

        await this.getExercises()
    }

    setNewExerciseName = (data: string) => {
        this.newExerciseName = data

        console.log("Ustawiono nazwę nowego ćwiczenia")
    }

    setNewExerciseGoal = (data: number) => {
        this.newExerciseGoal = data

        console.log("Ustawiono cel nowego ćwiczenia")
    }

    setNewExerciseUnit = (data: string) => {
        this.newExerciseUnit = data

        console.log("Ustawiono jednostkę nowego ćwiczenia")
    }

    addNewExercise = async () => {

        if (this.newExerciseName != "" && this.newExerciseGoal != 0 && this.newExerciseUnit != "") {
            await addDoc(this.workoutRef, {
                name: this.newExerciseName,
                count: this.newExerciseCount,
                goal: this.newExerciseGoal,
                unit: this.newExerciseUnit,
                userId: auth!.currentUser!.uid
            })

            console.log('Dodano ćwiczenie')

            await this.getExercises()
        } else {
            console.log("Brakujące dane")
        }
    }

    removeExercise = async (id: string) => {
        const docRef = doc(this.workoutRef, id)

        await deleteDoc(docRef)

        console.log('Usunięto ćwiczenie')

        await this.getExercises()
    }

    removeExerciseHelper = async (id: string) => {
        const docRef = doc(this.workoutRef, id)

        await deleteDoc(docRef)

        console.log('Usunięto ćwiczenie')
    }

    beginNewWorkout = async () => {
        this.exercises.forEach(exercise => {
            this.removeExerciseHelper(exercise.id)
        })

        console.log('Rozpoczęto nowy trening')
    }
}