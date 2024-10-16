import { observer } from "mobx-react-lite";
import BottomMenu from "./BottomMenu";
import Header from "./Header";
import { useStore } from "../mobx/Store";
import { useEffect, useRef, useState } from "react";
import { LuLoader } from "react-icons/lu";
import Exercise from "./Exercise";
import { MdClose } from "react-icons/md";


export default observer(function Home() {

  const { appStorage } = useStore()

  const [load, setLoad] = useState(true)

  useEffect(() => {
    appStorage.getExercises().then(() => {
      setLoad(false)
    })
  }, [])

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    dialogRef.current?.showModal();
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsDialogOpen(false);

    appStorage.setNewExerciseName("")
    appStorage.setNewExerciseGoal(0)
    appStorage.setNewExerciseUnit("")
  }

  return (
    <>
      <Header />
      <div className="my-20 w-full">
        {load ? <h2 className="text-4xl flex flex-col items-center justify-center" ><LuLoader /></h2> :
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">{appStorage.exercises.length > 0 ? "Twój trening" : "Rozpocznij trening"}</h2>
            <div className="mt-2 flex flex-col items-center">
              {appStorage.exercises!.map((exercise, indx) => (
                <Exercise key={indx} id={exercise.id} name={exercise.name} count={exercise.count} goal={exercise.goal} unit={exercise.unit} />
              ))}
              <span className="mt-2">
                <button className="bg-dark w-44 h-10 flex items-center justify-center border border-transparent rounded-md" type='button' onClick={() => openDialog()}>
                  Dodaj ćwiczenie
                </button>
              </span>
            </div>
          </div>
        }
      </div>

      {isDialogOpen && <div className="overlay"></div>}

      <dialog ref={dialogRef} className="dialog bg-darker text-light p-4 border-gradient">
        <span className="w-full flex items-end justify-end mb-2">
          <button className="bg-dark text-2xl w-8 h-8 flex items-center justify-center border border-transparent rounded-md" type='button' onClick={closeDialog}><MdClose /></button>
        </span>
        <h2 className="text-center font-semibold text-lg my-2">Dodaj ćwiczenie do treningu</h2>
        <form className="flex flex-col">
          <div className="my-2 flex justify-between items-center">
            <label htmlFor="name">Nazwa:</label>
            <input className="bg-dark rounded-md p-2 ml-2" autoComplete="off" type="text" id="name" value={appStorage.newExerciseName} onChange={(e) => appStorage.setNewExerciseName(e.target.value)} required />
          </div>

          <div className="my-2 flex justify-between items-center">
            <label htmlFor="goal">Cel:</label>
            <input className="bg-dark rounded-md p-2 ml-2" type="number" id="goal" value={appStorage.newExerciseGoal} onChange={(e) => appStorage.setNewExerciseGoal(Number(e.target.value))} required />
          </div>

          <div className="my-2 flex justify-between items-center">
            <label htmlFor="unit">Jednostka:</label>
            <select className="bg-dark rounded-md p-2 ml-2" id="unit" value={appStorage.newExerciseUnit} onChange={(e) => appStorage.setNewExerciseUnit(e.target.value)} >
              <option value="">Wybierz</option>
              <option value="kilometry">Kilometry</option>
              <option value="minuty">Minuty</option>
              <option value="powtórzenia">Powtórzenia</option>
            </select>
          </div>

          <button className="self-center mt-2 bg-dark w-44 h-10 flex items-center justify-center border border-transparent rounded-md" type="button" onClick={() => { appStorage.addNewExercise(); closeDialog() }} >Zatwierdź</button>
        </form>
      </dialog>

      <BottomMenu />
    </>
  )
})
