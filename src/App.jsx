import Header from "./Header"
import { Outlet } from "react-router"


function App() {

  return (
    <>
    <Header/>
    <Outlet/>

    </>
  )
}

export default App
