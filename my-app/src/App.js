import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import Registr from "./pages/Registr";
import PrivateRoute from "./hoc/PrivateRoute";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/registr" element={<Registr />} />

      <Route path="/login" element={<Login />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <ToDo />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
