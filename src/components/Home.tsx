import { observer } from "mobx-react-lite";
import BottomMenu from "./BottomMenu";
import Header from "./Header";


export default observer(function Home() {
  return (
    <>
      <Header />
      <div>Home</div>
      <BottomMenu />
    </>
  )
})
