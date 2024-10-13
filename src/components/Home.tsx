import { observer } from "mobx-react-lite";
import BottomMenu from "./BottomMenu";
import Header from "./Header";
import { useStore } from "../mobx/Store";
import { useEffect, useState } from "react";


export default observer(function Home() {

  const { appStorage } = useStore()

  const [load, setLoad] = useState(true)

  useEffect(() => {
    appStorage.getExercises().then(() => {
      setLoad(false)
    })
  }, [])

  return (
    <>
      <Header />
      <div>Home</div>
      <BottomMenu />
    </>
  )
})
