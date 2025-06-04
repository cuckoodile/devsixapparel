import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div >
      <Header />

      <div className="h-full flex justify-center text-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
