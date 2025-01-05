import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useStore } from '../mobx/Store';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

type Texercise = {
    id: string;
    name: string;
    count: number;
    goal: number;
    unit: string;
}

export default observer(function Exercise({ id, name, count, goal, unit }: Texercise) {

    const { appStorage } = useStore()

    const [increaseCount, setIncreaseCount] = useState<number>(1)

    return (
        <>
            <div className={`w-80 flex flex-col items-center justify-center m-2 p-4 ${count < goal ? "border-gradient" : "border-good"}`}>
                <div className="w-full flex flex-row justify-between">
                    <h2 className="mb-2 text-xl font-semibold" >{name}</h2>
                    {count < goal ?
                        <span className="flex flex-row flex-nowrap justify-center items-start">
                            <button className="bg-dark w-8 h-8 flex items-center justify-center border border-transparent rounded-md" type='button' onClick={() => {appStorage.decrease(id, count, increaseCount); setIncreaseCount(1)}} ><FaMinus /></button>
                            <input className="mx-1 bg-dark w-8 h-8 rounded-md text-light text-center" type="number" value={increaseCount} onChange={(e) => { setIncreaseCount(Number(e.target.value)) }} />
                            <button className="bg-dark w-8 h-8 flex items-center justify-center border border-transparent rounded-md" type='button' onClick={() => {appStorage.increase(id, count, increaseCount); setIncreaseCount(1)}} ><FaPlus /></button>
                        </span>
                        : <h2 className="mb-2 text-xl font-semibold text-good" >Ukończono 🎉</h2>}
                </div>
                <div className="flex flex-row flex-wrap items-center justify-center text-2xl">
                    <p className="w-full text-center text-4xl font-bold">{count}</p> <span>/</span> <p>{goal}</p>
                </div>
                <div className="self-end mt--10">
                    <p>{unit}</p>
                </div>
                <div className='self-start'>
                    <button onClick={() => appStorage.removeExercise(id)} className='w-8 h-8 flex items-center justify-center border rounded-md text-evil border-evil bg-evildarker' type='button'><RiDeleteBinLine /></button>
                </div>
            </div>
        </>
    )
})
