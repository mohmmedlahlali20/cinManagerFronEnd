import {RouterProvider} from "react-router-dom";
import router from "./components/Route/index.jsx";

function App() {

  return (
      <>

          <RouterProvider router={router} />
      </>
  )
}

export default App
